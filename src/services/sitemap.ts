interface SitemapParams {
  baseUrl: string;
  domains: string[];
  ips?: string[];
}

/**
 * Dynamically generates sitemap.xml content for DownOrUp application.
 * Includes all static pages and programmatic SEO routes for crawlers.
 */
export function generateSitemapXml({ baseUrl, domains, ips = ["8.8.8.8", "1.1.1.1"] }: SitemapParams): string {
  const today = new Date().toISOString().split("T")[0];

  // List of all static tools and pages
  const staticPaths = [
    "",
    "status",
    "ip-ping-tester",
    "dns-lookup",
    "ip-lookup",
    "ssl-checker",
    "http-header-checker",
    "dns-propagation",
    "whois-lookup",
    "port-checker",
    "speed-test",
    "traceroute",
    "redirect-checker",
    "screenshot-tool",
    "email-security",
    "blacklist-scanner",
    "domain-age",
    "blog",
    "about-us",
    "editorial-policy",
    "methodology",
    "data-sources",
    "contact-us",
    "privacy-policy",
    "terms-and-conditions",
    "disclaimer",
    "cookie-policy",
    "dmca",
    "acceptable-use-policy"
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Add static paths
  staticPaths.forEach((path) => {
    const loc = path ? `${baseUrl}/${path}` : `${baseUrl}/`;
    const priority = path === "" ? "1.0" : "0.8";
    const changefreq = path === "" || path === "status" ? "daily" : "weekly";

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Add Programmatic SEO Pages per domain (status, dns, ssl, whois, http status, ports, etc.)
  domains.forEach((domain) => {
    const cleanDomain = domain.toLowerCase().trim();
    if (!cleanDomain) return;

    // We generate URLs for main diagnostic tools with parameters
    const paths = [
      { loc: `${baseUrl}/status/${cleanDomain}`, changefreq: "hourly", priority: "0.6" },
      { loc: `${baseUrl}/website-status/${cleanDomain}`, changefreq: "hourly", priority: "0.6" },
      { loc: `${baseUrl}/dns-lookup/${cleanDomain}`, changefreq: "weekly", priority: "0.5" },
      { loc: `${baseUrl}/ssl-checker/${cleanDomain}`, changefreq: "weekly", priority: "0.5" },
      { loc: `${baseUrl}/whois-lookup/${cleanDomain}`, changefreq: "weekly", priority: "0.5" },
      { loc: `${baseUrl}/http-header-checker/${cleanDomain}`, changefreq: "weekly", priority: "0.5" },
      { loc: `${baseUrl}/port-checker/${cleanDomain}`, changefreq: "weekly", priority: "0.5" }
    ];

    paths.forEach((p) => {
      xml += `  <url>\n`;
      xml += `    <loc>${p.loc}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      xml += `    <priority>${p.priority}</priority>\n`;
      xml += `  </url>\n`;
    });
  });

  // 3. Add Programmatic SEO Pages per IP
  ips.forEach((ip) => {
    const cleanIp = ip.toLowerCase().trim();
    if (!cleanIp) return;

    const paths = [
      { loc: `${baseUrl}/ip-lookup/${cleanIp}`, changefreq: "weekly", priority: "0.5" },
      { loc: `${baseUrl}/ip-ping-tester/${cleanIp}`, changefreq: "weekly", priority: "0.5" }
    ];

    paths.forEach((p) => {
      xml += `  <url>\n`;
      xml += `    <loc>${p.loc}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      xml += `    <priority>${p.priority}</priority>\n`;
      xml += `  </url>\n`;
    });
  });

  xml += `</urlset>`;
  return xml;
}
