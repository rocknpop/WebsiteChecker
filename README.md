# DownOrUp.net — AI Decision Platform + Website Diagnostics Suite

Live: **https://www.downorup.net** · Repo: `rocknpop/WebsiteChecker`

DownOrUp.net answers uncertainty with instant structured verdicts — both "should I do this?" (AI decision reports) and "is this site up?" (status, DNS, IP, SSL, WHOIS, port checks). One brand, one verdict UI.

## Stack

- **Frontend:** Vite 6 + React 19 + TailwindCSS 4 + SSR (`src/entry-server.tsx`)
- **Backend:** Express 4 (`server.ts`) — Gemini 2.5 Flash via `@google/genai`, also exported as Vercel serverless (`api/[...path].ts`)
- **Deploy:** Vercel (primary, via `vercel.json`); `firebase.json` kept for reference — see note below

## Run locally

**Prerequisites:** Node 18+, a Gemini API key.

```bash
npm install
# create .env.local (not committed)
echo 'GEMINI_API_KEY=your_key_here' > .env.local
npm run dev      # http://localhost:3000 (tsx server.ts with Vite middleware)
npm run lint     # tsc --noEmit
npm run build    # vite build + SSR + esbuild → dist/
npm start        # node dist/server.cjs  (production SSR)
```

Env: `GEMINI_API_KEY` (required), `PORT` (default 3000), `VERCEL` (set by Vercel — guards `app.listen`).

## Project structure

```
server.ts              Express app + Gemini + SSR + /sitemap.xml + /api/*
src/pages/Home.tsx     Diagnostics suite + decision engine UI (largest file)
src/App.tsx            SPA router + getSeoMetadata() for SSR
src/hooks/useSEO.ts    Dynamic meta/OG/JSON-LD
api/[...path].ts       Vercel catch-all re-exporting the Express app
public/                Static assets + fallback sitemap.xml
```

## Deploy

- **Vercel:** push to `main` → auto-build (`npm run build`). `vercel.json` rewrites `/(.*)` → `/index.html` and ` /api/*` → serverless.
- **Firebase:** `firebase.json` is retained for reference; its `hosting.public` points to `dist/client` (the Vite build output), not the legacy `public/` folder. If you deploy to Firebase, run `npm run build` first.

## SEO / Sitemap

- Canonical host is `https://www.downorup.net` (hardcoded in `server.ts` `/sitemap.xml` to prevent host-header injection; `public/sitemap.xml` is the Vercel static fallback — keep them in sync).
- `src/services/sitemap.ts` is unused scaffolding for aspirational routes; do not emit its phantom paths without implementing the routes.
