import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Tag, Rss, ArrowRight, Share2, Award, Heart } from "lucide-react";
import SeoHead from "../components/SeoHead";

interface Article {
  id: string;
  title: string;
  description: string;
  tag: string;
  readTime: string;
  keywords: string[];
  content: string[];
}

export default function Blog() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const articles: Article[] = [
    {
      id: "why-websites-go-down",
      title: "Why Websites Go Down: Demystifying Common Server Outages",
      tag: "Network Engineering",
      readTime: "6 min read",
      keywords: ["is website down", "server outage causes", "website downtime causes"],
      description: "Discover the core mechanics behind modern server outages, detailing infrastructure configuration traps and traffic locks.",
      content: [
        "In the digital landscape, website availability represents the baseline currency of trust. Yet, server-side infrastructure is a complex web of dependencies where any single fault can bring an application offline.",
        "The leading trigger for downtime relates to connection timeouts or thread pool saturation. Apache, Nginx, or IIS host engine containers run with hardcapped thread pools. When sudden, unthrottled traffic crawls or massive crawlers target un-indexed search pages, active connection threads are consumed. Subsequent users encounter blank loading queues or standard Service Unavailable notifications.",
        "Similarly, network interface card failures and datacenter backbone issues contribute heavily. Modern cloud architectures implement multiple Availability Zones (AZ) to safeguard states. However, misconfigured target load-balancers routing traffic to a single degraded zone can collapse entire platforms, regardless of the cluster budget.",
        "Lastly, physical resource saturation like memory leaks in Node runtime processes, CPU choking under unoptimized database queries, or full disk states due to uncompressed logs will freeze web operations immediately. Proactive synthetic checking remains the primary shield against unexpected disasters."
      ]
    },
    {
      id: "dns-explained",
      title: "DNS Explained: The Inner Core of Internet Hostname Resolution",
      tag: "Protocols",
      readTime: "7 min read",
      keywords: ["DNS lookup tool", "caching resolvers", "how DNS works"],
      description: "An architectural deep-dive into the Domain Name System, explaining name servers, record types, and resolution hierarchies.",
      content: [
        "To non-technical users, entering 'google.com' seems like an instantaneous bridge. Yet, this readable string triggers a multi-system, hierarchical journey known as DNS Resolution.",
        "When you dispatch a browser request, the query immediately checks your local operating system cache. If absent, it queries your recursive DNS resolver—usually supplied by your local Internet Service Provider (ISP) or third-party nodes like Cloudflare (1.1.1.1) or Google DNS (8.8.8.8). This recursive resolver is responsible for finding the answer.",
        "If the resolver does not have the target IP cached, it queries the Root Name Servers. The root server responds by pointing the resolver to the appropriate Top-Level Domain (TLD) Name Server (such as the .com registry). The TLD server then points the resolver to the domain’s Authoritative Nameserver, which holds the actual zone files. Here, the resolver retrieves the matching A-record (A pointing to IPv4 status, AAAA to IPv6 status) and forwards it back to your device browser.",
        "Understanding this intricate daisy-chain helps target where resolution errors are occurring, whether inside local residential router memories, upstream ISP routing desks, or primary authoritative providers."
      ]
    },
    {
      id: "ssl-certificate-errors",
      title: "Fixing SSL Certificate Errors and Cryptographic Handshake Blocks",
      tag: "SecOps",
      readTime: "5 min read",
      keywords: ["SSL checker", "TLS handshake failed", "expired SSL certificate"],
      description: "Learn how to debug and troubleshoot expired SSL certificates, TLS chain issues, and browser connection alerts.",
      content: [
        "An SSL (Secure Sockets Layer) or modern TLS (Transport Layer Security) certificate ensures encrypted transport tunnels between client devices and website endpoints. When cryptographic handshakes fail, browsers block rendering, alerting users of dangerous security liabilities.",
        "The primary trigger is simple certificate expiry. Modern authorities like Let's Encrypt limit certificate lifespans to strictly 90 days to reinforce security rot. If automated renewal scripts stall due to proxy configurations or file permission changes, the certificate expires, and client handshake requests reject immediately.",
        "Another difficult failure mode relates to incomplete intermediate chain certificates. Many web administrators bind only their primary leaf certificate inside Nginx configurations, neglecting the intermediate CA bundles. While desktop browsers often bypass this by dynamically downloading missing intermediates, secure API client scripts (like cURL or iOS/Android native network services) immediately abort queries under incomplete chains.",
        "Using a targeted SSL checker proactively measures days remaining, evaluates intermediate trust indicators, and processes handshake attempts on standard protocols (TLS 1.2, 1.3), preventing security errors before they reach end users."
      ]
    },
    {
      id: "how-to-troubleshoot-website-downtime",
      title: "Step-by-Step Blueprint: How to Troubleshoot Website Downtime",
      tag: "Ops Desk",
      readTime: "8 min read",
      keywords: ["is website down", "site down checker", "troubleshooting server down"],
      description: "Our engineered framework for isolating server downtime, network route drops, and local cache anomalies.",
      content: [
        "When an editor or a business client reports a site loading failure, panic is a poor response. A network engineer relies on a clean, structural troubleshooting protocol to isolate the root cause.",
        "Phase 1: Validate globally using our high-precision online checker tool. If our cloud datacenter nodes report a successful 200 OK status with responsive response times, the website is up, and you can isolate the failure to regional ISPs or local client configurations.",
        "Phase 2: Check standard name resolution. Run command line queries like 'nslookup yourdomain.com' or 'dig A yourdomain.com'. If this fails, the authoritative DNS servers are experiencing an outage or the registration was locked at the TLD level.",
        "Phase 3: Run traceroute checks ('tracert' on Windows, 'traceroute' on macOS). This prints the latency metrics for every hop your connection makes across backbone providers. A block of timeouts (printed as asterisks) pinpointing a specific upstream carrier isolates the routing bottleneck.",
        "Phase 4: Analyze server engine states. Read Nginx error logs located at '/var/log/nginx/error.log' or check task queues. If the CPU is pegged at 100%, check for locked database queries or clear excess cached memory threads to restore operations."
      ]
    },
    {
      id: "website-monitoring-guide",
      title: "The Website Monitoring Guide: Synthetic Checks vs Passive RUM",
      tag: "Monitoring",
      readTime: "6 min read",
      keywords: ["check website uptime", "synthetic monitoring", "website status checker"],
      description: "Evaluate the distinctions between synthetic ping telemetry checkers and Real User Monitoring (RUM) platforms.",
      content: [
        "To maintain continuous uptime, modern system engineers implement two complementary inspection methodologies: Synthetic Monitoring and Real User Monitoring (RUM).",
        "Synthetic Monitoring involves setting up automated, headless agents that simulate customer visits to targeted endpoints at regular intervals. These agents record response times, HTTP headers, DNS resolution status, and SSL expiration milestones.",
        "Conversely, Real User Monitoring (RUM) injects lightweight JS snippets into production pages to track actual user experiences in real-time. This reveals localized network path drops, browser version rendering bottlenecks, and localized router latency values.",
        "While RUM is unmatched for user-facing data analysis, it is blind when traffic levels are low. If a site crashes during the middle of the night, RUM won't report it until real visitors encounter the error pages. Synthetic monitoring acts as your proactive first shield, dispatching instant notifications before actual users are affected."
      ]
    },
    {
      id: "understanding-http-status-codes",
      title: "Understanding HTTP Status Codes: The Developer’s Rosetta Stone",
      tag: "Web Core",
      readTime: "7 min read",
      keywords: ["HTTP status codes", "server response codes", "explain 502 bad gateway"],
      description: "A dictionary-definition breakdown of standard HTTP codes: 2xx, 3xx, 4xx, and the critical 5xx server-side failures.",
      content: [
        "Every HTTP request you dispatch receives an engineered three-digit response code indicating its outcome. These codes represent the primary communication channel from web server engines to client browsers.",
        "The 2xx class signifies success. 200 OK means the page resolved perfectly. 3xx status codes handle redirection structures. A 301 redirects traffic permanently to a new URL, preserving organic SEO indexes, whereas a 302 handles temporary transfers.",
        "The 4xx class indicates client-side errors. 404 Not Found means the URL path does not exist on the current host. 403 Forbidden is a firewall block, often triggered when client IPs match spam heuristics or query restricted folders.",
        "The 5xx class points directly to server-side failures. A 502 (Bad Gateway) reveals that Nginx or Cloudflare proxy nodes failed to receive a valid response from the backend application container. A 503 (Service Unavailable) indicates the memory pool is exhausted or down for maintenance, and 504 (Gateway Timeout) means origin databases stalled, failing to respond within configured thresholds."
      ]
    },
    {
      id: "cdn-vs-hosting",
      title: "CDN vs Hosting: Architecting Fast and Fault-Tolerant Web Pages",
      tag: "Architecture",
      readTime: "6 min read",
      keywords: ["CDN vs hosting", "caching proxy servers", "cloudflare vs origin hosting"],
      description: "Deconstruct how origin servers work with global Content Delivery Network caches to prevent downtime.",
      content: [
        "A common point of confusion for startup administrators is the difference between primary hosting providers and global Content Delivery Networks (CDNs). Let us clarify these architectural roles.",
        "An origin host (like AWS EC2, DigitalOcean, or Heroku) is the primary engine where your central Node/Express application runs and your PostgreSQL database lives. It executes the core business logic, query calculations, and write operations.",
        "A CDN (like Cloudflare, Fastly, or CloudFront) acts as a global network of cached replica servers placed in-between your origin hosting engine and global end-users. By routing requests through the closest CDN node, assets are served from cache, reducing latency and shielding origin databases from traffic spikes.",
        "Furthermore, CDNs offer a critical layer of defense against distributed denial-of-service (DDoS) attacks. They filter out malicious requests at the edge, ensuring only clean traffic reaches your origin servers."
      ]
    },
    {
      id: "website-speed-optimization",
      title: "Website Speed Optimization: Key Lever for Organic Conversions",
      tag: "SEO Core",
      readTime: "8 min read",
      keywords: ["improve server response time", "website speed optimization", "core web vitals"],
      description: "Actionable engineering strategies to improve server response times, reduce TTFB, and secure high ranks.",
      content: [
        "In the digital marketplace, speed translates directly to bounce rates and revenue outcomes. Google's page rank algorithms prioritize quick loading speeds, meaning performance is a core SEO requirement.",
        "To optimize speed, developers must focus on reducing Time-To-First-Byte (TTFB). This latency metric measures the delay from the initial request to the very first byte returned by the server. Slow TTFB points directly to unoptimized server configurations, unindexed database tables, or insufficient bandwidth.",
        "In addition, minifying assets (HTML, CSS, JS) and compressing images with modern lightweight formats like WebP or AVIF decreases the total page weight, ensuring quick transmissions.",
        "Finally, utilizing browser caching headers (like Cache-Control) allows visitors to store static file assets locally, enabling instant load times on subsequent visits and reducing server load."
      ]
    }
  ];

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="blog-view">
      {selectedArticle ? (
        <div className="animate-fade-in" id="article-reader">
          <SeoHead
            title={`${selectedArticle.title} | Educational Resource Blog`}
            description={selectedArticle.description}
            canonicalPath={`/blog?article=${selectedArticle.id}`}
          />

          {/* Reader Core view */}
          <div className="max-w-4xl mx-auto bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-xs">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="inline-flex items-center space-x-2 text-sm text-gray-450 hover:text-brand-600 transition-colors mb-6 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Editorial Resource List</span>
            </button>

            <span className="inline-block bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-md font-semibold tracking-wider uppercase mb-4">
              {selectedArticle.tag}
            </span>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-gray-950 leading-tight mb-4">
              {selectedArticle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b border-gray-100 pb-4 mb-6 leading-none">
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gray-400" />{selectedArticle.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Tag className="h-3.5 w-3.5 text-gray-400" />SEO Keywords: {selectedArticle.keywords.join(", ")}</span>
            </div>

            <article className="prose prose-blue max-w-none space-y-5 text-gray-650 leading-relaxed text-sm sm:text-base">
              {selectedArticle.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </article>

            {/* Author box */}
            <div className="border-t border-gray-100 mt-10 pt-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm">
                  NET
                </div>
                <div>
                  <span className="block text-sm font-semibold text-gray-800 leading-none">Platform Systems Team</span>
                  <span className="text-[10px] text-gray-400">Verified Technical Content Authorities</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("Article link copied to clipboard!")}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-650 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in" id="blog-deck">
          <SeoHead
            title="Uptime Monitoring & Technical SEO Resources | Diagnostics Blog"
            description="Explore analytical network diagnostic procedures, explanations of domain name resolutions (DNS), SSL validation chains, and speed optimizations."
            canonicalPath="/blog"
          />

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center space-x-1 capitalize text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Diagnostic Technical Repository</span>
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight">Diagnostics & SEO Resource Blog</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Actionable, expert-verified literature detailing server availability diagnostics, networking, DNS records, SSL TLS validations, and performance optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-articles-grid">
            {articles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleArticleClick(art.id)}
                className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md hover:border-brand-100 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between h-80 group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-50">
                    <span className="bg-brand-50 text-brand-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                      {art.tag}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-gray-950 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 mt-2 leading-relaxed">
                    {art.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest leading-none">Read full guide</span>
                  <div className="flex items-center gap-0.5">
                    <span>Explore Article</span>
                    <ArrowRight className="h-3.5 w-3.5 hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
