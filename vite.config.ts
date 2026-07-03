import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, preview, type Plugin} from 'vite';

// Ad/analytics hosts to block during the prerender crawl — otherwise their live network
// responses (e.g. a real AdSense ad iframe referencing this build's localhost URL) get
// baked into the frozen static HTML instead of loading fresh for real visitors.
const PRERENDER_BLOCKED_HOSTS = [
  'googlesyndication.com',
  'doubleclick.net',
  'googleadservices.com',
  'google-analytics.com',
  'googletagmanager.com',
  'analytics.ahrefs.com',
  'google.com/recaptcha',
  'gstatic.com/recaptcha',
];

// The app derives canonical/OG/JSON-LD URLs from window.location.origin, which during the
// crawl is the local preview server — rewrite it to the real production domain so those
// tags aren't frozen pointing at localhost.
const PRODUCTION_ORIGIN = 'https://www.downorup.net';

// Prerenders key routes to static HTML after build by loading the built app in headless
// Chrome and saving the fully-rendered DOM. Fixes mobile FCP/LCP, which otherwise wait on
// the JS bundle to download and execute before any content paints.
function prerenderPlugin(routes: string[]): Plugin {
  return {
    name: 'prerender-routes',
    apply: 'build',
    async closeBundle() {
      if (process.env.SKIP_PRERENDER) return;

      const { default: puppeteer } = await import('puppeteer');
      const server = await preview({ preview: { port: 4173, strictPort: false } });
      const port = (server.config.preview.port as number) ?? 4173;
      const baseUrl = `http://localhost:${port}`;

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      try {
        for (const route of routes) {
          const page = await browser.newPage();
          await page.setRequestInterception(true);
          page.on('request', (req) => {
            const url = req.url();
            if (PRERENDER_BLOCKED_HOSTS.some((host) => url.includes(host))) {
              req.abort();
            } else {
              req.continue();
            }
          });
          await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
          const rawHtml = await page.content();
          const html = rawHtml.split(baseUrl).join(PRODUCTION_ORIGIN);
          const outDir = route === '/' ? 'dist' : path.join('dist', route.replace(/^\//, ''));
          fs.mkdirSync(outDir, { recursive: true });
          fs.writeFileSync(path.join(outDir, 'index.html'), html);
          await page.close();
          console.log(`[prerender] wrote ${path.join(outDir, 'index.html')}`);
        }
      } finally {
        await browser.close();
        await new Promise<void>((resolve, reject) => {
          server.httpServer.close((err) => (err ? reject(err) : resolve()));
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), prerenderPlugin(['/', '/status', '/blog', '/about'])],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    build: {
      minify: 'esbuild' as const,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            icons: ['lucide-react'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
