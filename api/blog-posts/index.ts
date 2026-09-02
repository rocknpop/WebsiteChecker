// Standalone Vercel function for GET /api/blog-posts. Data inlined — see the comment
// at the top of api/analyze-decision.ts for why a shared api/_lib/*.ts import isn't
// used here: Vercel's builder failed to bundle those shared files correctly, and an
// earlier version of this function that imported from ../src/lib/shared-data returned
// FUNCTION_INVOCATION_FAILED in production.
import type { VercelRequest, VercelResponse } from '@vercel/node';

const blogPosts = [
  {
    id: "best-side-hustles-2026",
    title: "The Absolute Best Side Hustles to Start in 2026",
    slug: "best-side-hustles-in-2026",
    category: "Side Hustles",
    publishedAt: "June 15, 2026",
    readTime: "6 min read",
    excerpt: "Discover the high-leverage side projects that are thriving in 2026, from specialized AI Automation Agencies to print-on-demand niches that avoid the low-margin traps of traditional e-commerce.",
    content: `The side hustle landscape has completely evolved. In 2026, generic business models like dropshipping or simple affiliate blogs are facing extreme headwinds. Rising ad costs and AI saturation have raised the bar for what succeeds.

To thrive, you must focus on **high-leverage, low-overhead digital assets**. Here are the four prime side hustles for 2026:

### 1. AI Automation Agencies (AAA)
Local businesses are losing thousands of hours to manual administration. If you can build simple Zapier or Make.com workflows that sync emails with customer databases or configure voice agents, you can command $2,000/month retainers with virtually zero operational cost.

### 2. Faceless Video Production
YouTube's storytelling algorithm is more lucrative than ever. By utilizing premium AI editors, you can script, design, and render high-retention video essays in niches like history, finance, or animated science without ever showing your face on camera.

### 3. Micro-SaaS Micro-Acquisitions
Instead of trying to build the next multi-million dollar software, focus on single-purpose utility tools. Build small extensions, calculators, or templates that solve a specific problem for specific platforms (like Shopify or Notion) and sell them for steady monthly fees.

### 4. Specialized Newsletters
Audiences are fleeing generic social media feeds in search of curated, high-quality expert advice. Starting a niche newsletter in sub-sectors like climate-tech, quantum computing, or digital architecture allows you to secure premium sponsorships.`
  },
  {
    id: "is-amazon-kdp-still-worth-it",
    title: "Is Amazon KDP Still Worth It in 2026? An Honest Review",
    slug: "is-amazon-kdp-still-worth-it",
    category: "Side Hustles",
    publishedAt: "May 28, 2026",
    readTime: "8 min read",
    excerpt: "Low-content planners and generic books have flooded Amazon. We break down the exact strategy required to make self-publishing profitable today.",
    content: `If you are thinking of uploading 500 blank journals or copy-pasted low-content notebooks to Amazon KDP hoping to retire next month, we have bad news: **that model is dead.**

Amazon's marketplace has been hit by a tidal wave of automated low-content uploads, leading to extreme consumer fatigue and strict platform review guidelines. However, self-publishing is still a goldmine if you understand the new rules of the game:

### Niche Down Obsessively
Do not write a generic 'cooking guide.' Write 'The Ultimate High-Protein Air-Fryer Cookbook for Busy College Students.' Finding tiny, underserved sub-niches with high buyer search volume and low author competition is the single most important step.

### Quality Over Volume
One highly polished, professionally covered book with 50 genuine reviews will out-earn 500 low-effort journals combined. Hire cover designers or invest in learning advanced typography.

### Master Amazon PPC Ads
Organic rankings are difficult to secure initially. To succeed, you must learn to run laser-focused, low-cost PPC campaigns targeting exact-match competitor terms to trigger Amazon's positive flywheel.`
  },
  {
    id: "should-you-learn-python-2026",
    title: "Should You Still Learn Python in 2026? (AI Impact analyzed)",
    slug: "should-you-learn-python-in-2026",
    category: "Careers",
    publishedAt: "June 02, 2026",
    readTime: "5 min read",
    excerpt: "With AI tools now writing code instantly, is learning programming still worth it? We analyze the job market and why Python remains a top tier career asset.",
    content: `With advanced code-generation models writing scripts, refactoring arrays, and constructing entire databases in milliseconds, many aspiring developers are asking a vital question: *Is it still worth spending months learning to code?*

The answer is **yes, more than ever—especially with Python.**

AI is not replacing developers; it is replacing developers who don't use AI. Python remains the fundamental language of the AI revolution. Here is why you must learn it in 2026:

### The Interface of AI
Every major machine learning model, LLM framework (like LangChain or LlamaIndex), and data science toolkit is built in Python. To integrate, tune, and operationalize AI, you need Python skills.

### High-Volume Automation
Python is a superpower for non-engineers. Whether you are a marketer scrape-harvesting leads, a financial analyst automating reports, or an administrator organizing files, writing a 10-line Python script saves hours.

### Cognitive System Oversight
Because AI writes code, someone must act as the supervisor. You need to read the code, debug logical fallacies, verify API securities, and understand system architecture. Python's clean, readable syntax makes it the perfect language for this administrative role.`
  },
  {
    id: "top-ai-business-ideas",
    title: "Top AI-Powered Business Models for Solo Entrepreneurs",
    slug: "top-ai-business-ideas",
    category: "Business",
    publishedAt: "May 12, 2026",
    readTime: "7 min read",
    excerpt: "The landscape has shifted from basic wrappers to vertical business integrations. Explore the most lucrative AI ventures you can start today.",
    content: `The era of basic ChatGPT wrappers is officially behind us. Customers are no longer willing to pay for simple tools that just call the OpenAI API.

In 2026, profitable AI businesses focus on **deep workflow integrations and vertical problem-solving**. Here are the top models for solo founders:

### 1. Vertical AI Customer Support
Instead of generic chat boxes, build highly localized, fine-tuned support agents for specific industries (e.g. dental clinics, plumbing services, or boutique hotels). Feed them local FAQs, sync them with booking calendars, and charge a monthly subscription for managing patient/customer inquiries.

### 2. Micro-Copywriting Engines
Generic AI text is easily recognizable. Build specialized AI generators focusing on narrow copywriting tasks—like generating highly convertive Amazon product bullet points, real estate listing descriptions, or high-click email subject lines.

### 3. Localization and Translation Services
With businesses expanding globally, translating audio, video, and websites into perfectly native, context-aware localized languages is a massive sector. Build translation pipelines combining transcription and voice cloned synthesizers.`
  },
  {
    id: "how-to-tell-if-website-is-down",
    title: "How to Tell If a Website Is Down for Everyone or Just You",
    slug: "how-to-tell-if-website-is-down",
    category: "Tools",
    publishedAt: "August 28, 2026",
    readTime: "6 min read",
    excerpt: "Learn how to tell if a website is down for everyone or just you, what causes outages, and the fastest way to diagnose the problem in seconds.",
    content: `A website won't load and you need to know immediately: is it down for everyone or just you? The fastest answer is to run an independent check from outside your network. If an external checker can't reach the site either, the problem is on the server side. If it can, the issue is local to your device, browser, or connection.

### Why a Website Goes Down

Most outages fall into a handful of causes. Knowing which one helps you explain it and fix it faster.

**Server or hosting outage** — the web server crashed, ran out of resources, or the host is having an incident. Every visitor sees the same failure.

**DNS failure** — the domain's DNS records point nowhere, are misconfigured, or haven't propagated. Browsers can't translate the domain to an IP.

**Expired domain or SSL certificate** — a lapsed registration takes the whole site offline instantly. An expired SSL certificate triggers hard browser errors even though the server is still up.

**Firewall, CDN, or routing issue** — a regional network block or CDN misconfiguration makes the site unreachable from some locations but not others.

**Local problem** — stale DNS cache, aggressive VPN, browser extension, or ISP hiccup that affects only you.

### How to Check in 30 Seconds

**Step 1: Try the obvious.** Open the site in an incognito window and on another network (switch from Wi-Fi to mobile data). If it loads there, clear your browser cache and disable extensions.

**Step 2: Run an external Website Status check.** Paste the full URL into a status checker that fetches the site from outside your network and reports the HTTP status code and response time. On DownOrUp.net, the [Website Status checker](/status) does this with multiple fallback methods — proxy fetch plus DNS and image-ping fallbacks — so you get a real answer even when a site blocks simple probes.

**Step 3: Read the result.**
- **200–399** means the site is up (401/403 still counts as up — the server responded, it just requires auth).
- **500, 502, 503, 504** means the origin server is failing.
- **DNS failure / no IP resolved** points to a DNS or domain problem — verify with a [DNS Lookup](/dns-lookup).
- **Timeout from every checker** but DNS resolves suggests a firewall, CDN, or host-level block.

**Step 4: Confirm with DNS.** If the status check is ambiguous, run a [DNS Lookup](/dns-lookup) for the domain. If A records are missing or point to the wrong IP, the fix is in DNS, not the server.

### What to Do Next

**If it's down for everyone:** Check the host's status page, verify the domain hasn't expired with a [WHOIS Lookup](/whois-lookup), and check the [SSL Checker](/ssl-checker) if browsers show certificate errors. Share the status code and response time when you contact support — it cuts diagnosis time in half.

**If it's just you:** Flush your DNS cache (Windows: \`ipconfig /flushdns\`; macOS: \`sudo dscacheutil -flushcache\`), try a public DNS like 1.1.1.1 or 8.8.8.8, disable your VPN, and restart your router. If the site uses a CDN, waiting 5–10 minutes often clears a regional routing blip.

### Pro Tips to Avoid False Alarms

- Test the exact URL including \`https://\` — a redirect from http to https can look like downtime if you omit it.
- Check from more than one location if you can. A single-location failure can be a regional CDN issue, not a global outage.
- Set up monitoring if the site is yours. A one-off manual check tells you about the outage you already noticed; automated checks alert you to the next one before users do.

### FAQ

**Why is a website down for me but not others?**
Usually local DNS cache, VPN, firewall, or ISP routing. An external status checker proves the site is reachable elsewhere, so you can focus on local fixes.

**What does "DNS not resolving" mean?**
The domain name didn't translate to an IP address. The authoritative nameserver has no valid A record, or the domain expired. Check WHOIS and DNS records.

**Can an SSL error make a site look down?**
Yes. An expired certificate causes browsers to block the page with a security warning, even though the server is up. Verify the certificate dates with an SSL checker.

A quick external check answers the core question in seconds and points you to the right fix — server, DNS, SSL, or local network. Next time a site won't load, start with the [Website Status checker](/status) before troubleshooting your own device.`
  },
  {
    id: "what-is-dns-and-how-it-works",
    title: "What Is DNS and How Does It Work? A Simple Guide",
    slug: "what-is-dns-and-how-it-works",
    category: "Tools",
    publishedAt: "August 30, 2026",
    readTime: "7 min read",
    excerpt: "What is DNS? Learn how DNS turns domain names into IP addresses, the key record types, and how to check any domain's DNS in seconds.",
    content: `DNS is the system that turns a human-readable domain name like \`example.com\` into the IP address your browser actually connects to. Without it, you'd have to memorize numbers like \`93.184.215.14\` for every website. Here's how it works and how to check it yourself.

### DNS in 15 Seconds
When you type a domain, your device asks a chain of DNS servers: "What IP does this name point to?" A resolver checks its cache, then asks the root, TLD, and authoritative nameservers until it gets an answer — usually in under 50ms. That IP is what your browser then connects to. If no record exists or nameservers don't respond, the lookup fails and the site appears down even though the server might be fine.

### How DNS Resolution Actually Works
1. **Your device asks a resolver** — typically your ISP, 1.1.1.1, or 8.8.8.8. The resolver checks its own cache first.
2. **Root → TLD → Authoritative** — if not cached, the resolver walks the hierarchy: root servers point to TLD servers (\`.com\`, \`.net\`), TLD servers point to the domain's authoritative nameservers, and those nameservers return the actual record.
3. **Answer + TTL** — the authoritative server returns the record (usually an A or AAAA) with a TTL (time-to-live). The resolver caches it for that TTL so the next lookup is instant.
4. **Browser connects** — your browser now has an IP and opens a TCP/TLS connection. If DNS returned the wrong IP, you reach the wrong server; if it returned nothing, you get "DNS_PROBE_FINISHED_NXDOMAIN" or similar.

Caching is why DNS changes feel slow. Lower the TTL before you migrate, then raise it again after propagation.

### The Record Types You Actually Need
- **A** — IPv4 address (e.g., \`93.184.215.14\`). The core "where is this site" record.
- **AAAA** — IPv6 address. Increasingly required for modern hosts.
- **CNAME** — alias: \`www.example.com → example.com\`. Don't put a CNAME at the apex (use ALIAS/ANAME or A instead).
- **MX** — mail servers for the domain. Wrong MX = no email delivery.
- **TXT** — free-form text used for SPF, DKIM, and domain verification (Google, etc.).
- **NS** — which nameservers are authoritative for the domain. If NS is wrong, nothing else resolves.
- **CAA** — which certificate authorities may issue SSL for the domain.

You can inspect all of these with a [DNS Lookup](/dns-lookup) — enter any domain and compare what the resolvers actually see.

### Common DNS Problems (and How to Spot Them)
**Domain shows "not resolving"** — No A/AAAA record at the authoritative nameserver, or the domain expired. Confirm with a [WHOIS Lookup](/whois-lookup) to check expiry, then verify records with [DNS Lookup](/dns-lookup).

**Site loads for others but not you** — stale local cache or resolver cache. Flush local DNS (Windows: \`ipconfig /flushdns\`; macOS: \`sudo dscacheutil -flushcache\`), switch to 1.1.1.1/8.8.8.8, and retry.

**Email bounces after a DNS change** — MX or SPF TXT record missing/wrong. Check MX and TXT in the lookup tool.

**"Your connection is not private" after moving hosts** — DNS now points to the new IP, but the SSL certificate there doesn't cover the domain. Verify after the A record settles using the [SSL Checker](/ssl-checker).

**Intermittent timeouts** — often a firewall/CDN block rather than DNS. If [DNS Lookup](/dns-lookup) returns a valid IP but the [Website Status checker](/status) times out from multiple locations, the origin or edge is filtering traffic, not DNS.

### How to Check DNS Yourself in 20 Seconds
1. Open the free [DNS Lookup](/dns-lookup) on DownOrUp.net.
2. Enter the domain (no \`https://\` needed — just \`example.com\`).
3. Review A, AAAA, MX, TXT, and NS at a glance. Missing A/AAAA = site can't load. Missing MX/TXT = mail/verification will fail.
4. If you just changed records, re-check after the TTL window or query a different resolver (1.1.1.1 vs 8.8.8.8) to see propagation.

Pro tip: put the bare domain and the \`www\` version side-by-side — they often have different A/CNAME setups, which explains why one loads and the other doesn't.

### DNS vs. Other Checks
- **DNS tells you where to go.** **IP Lookup** ([What Is My IP](/ip-lookup)) tells you where you are. The IP you see in a DNS A record is the destination; the IP in the IP tool is your current public address.
- **WHOIS tells you who owns the domain** and when it expires ([WHOIS Lookup](/whois-lookup)). DNS tells you where the domain points right now. Check WHOIS first if DNS returns nothing — the domain may have lapsed.
- **Status is separate from DNS.** A site can have perfect DNS but return 500/503, or have broken DNS and never get to an HTTP code at all. Use [Website Status checker](/status) after DNS to separate the two.

### FAQ
**Is DNS the same as a domain name?**
No. The domain name is the readable label (\`example.com\`). DNS is the distributed database and protocol that translates that label to an IP and other records.

**What's the difference between authoritative and recursive DNS?**
Recursive resolvers (your ISP or 1.1.1.1) do the walking and caching for you. Authoritative nameservers hold the actual records for a domain and give the final answer.

**How long does DNS propagation take?**
It respects the record's TTL — often 5 minutes to 4 hours. Some resolvers cache longer, so allow up to 24 hours after a major NS change.

**Can I have multiple A records?**
Yes — round-robin DNS returns several IPs for load balancing. Browsers try them in order.

Understanding DNS makes every other diagnostic faster — when you know which record to look at, you know which tool fixes the problem. Next time a domain won't resolve, start with a [DNS Lookup](/dns-lookup) and let the records tell you what happened.`
  },
  {
    id: "how-to-check-ssl-certificate-validity",
    title: "How to Check SSL Certificates and Fix Common Errors",
    slug: "how-to-check-ssl-certificate-validity",
    category: "Tools",
    publishedAt: "August 31, 2026",
    readTime: "6 min read",
    excerpt: "Learn how to check if an SSL certificate is valid, why browsers show certificate errors, and how to fix expired or mismatched certificates in seconds.",
    content: `Your browser says "Your connection is not private" and you need a clear answer in seconds: is the SSL certificate expired, mismatched, or misconfigured? The fastest way to tell is to run an independent SSL check that shows the issuer, expiry date, and hostname coverage. If the certificate is valid for the exact hostname and not expired, the error is local; if not, the fix is on the server.

### SSL in 15 Seconds
When you open \`https://example.com\`, your browser and the server do a TLS handshake: the server presents an X.509 certificate proving it controls that hostname, signed by a trusted Certificate Authority (CA). The browser validates the chain to a trusted root, checks notBefore/notAfter dates, verifies the Subject Alternative Name (SAN) covers the hostname you typed, and checks revocation. If any step fails, the browser blocks the page — even though DNS resolves and the server returns HTTP — because the identity cannot be trusted.

### How to Check SSL Yourself in 20 Seconds
1. Open the free [SSL Checker](/ssl-checker) on DownOrUp.net.
2. Enter the domain exactly as you visit it (include \`www\` if you use \`www.example.com\` — \`example.com\` and \`www.example.com\` need separate SAN entries).
3. Review the result: issuer (CA), valid-from / valid-to dates, days until expiry, SAN list, chain completeness, and any errors.
4. If the chain is incomplete or a SAN is missing, re-check after deploying the corrected certificate — browsers cache intermediate certificates, so test in incognito too.

You can cross-check the cause in seconds: if [DNS Lookup](/dns-lookup) shows the right IP but [Website Status checker](/status) still times out or returns a TLS error, the problem is SSL, not DNS. If [WHOIS Lookup](/whois-lookup) shows the domain is not expired, DNS is fine — focus on the certificate.

### Common SSL Errors and How to Fix Them
**Expired certificate (ERR_CERT_DATE_INVALID, SEC_ERROR_EXPIRED_CERTIFICATE)** — the \`notAfter\` date is in the past. Fix: renew with your CA or ACME client (Let's Encrypt, Cloudflare, etc.), install the new fullchain, and restart/reload the web server. Set auto-renewal and an expiry alert 14 days before the next date.

**Hostname mismatch (ERR_CERT_COMMON_NAME_INVALID / SSL_ERROR_BAD_CERT_DOMAIN)** — the domain you requested is not in the certificate's SAN. Common when \`www\` is missing or after adding a new subdomain. Fix: reissue the certificate with all hostnames in the SAN — include both apex and \`www\`, plus any alias domains. Wildcard \`*.example.com\` covers one label deep but not the apex itself.

**Incomplete chain / missing intermediate (ERR_CERT_AUTHORITY_INVALID)** — the server sent only the leaf certificate. Fix: install the CA-provided fullchain/bundle (leaf + intermediate) on your origin or CDN, not just the leaf. Verify with the [SSL Checker](/ssl-checker) — it flags incomplete chains.

**Self-signed or untrusted issuer** — the certificate was not signed by a publicly trusted CA. Fix: replace with a trusted CA certificate for public sites; keep self-signed only for internal/lab hosts and import the root where needed.

**Mixed content or redirect loop after enabling HTTPS** — the page loads over HTTPS but fetches scripts/images over HTTP, or http→https redirects are misconfigured. Fix: update all asset URLs to \`https://\`, enforce HSTS, and set a single canonical redirect (http → https and non-www → www or vice versa).

**"Your connection is not private" only for you** — system clock is wrong, corporate proxy is inspecting TLS, or a stale intermediate is cached. Fix: correct your device clock, try incognito without extensions, test on mobile data vs Wi-Fi, and check the certificate from another network with the [SSL Checker](/ssl-checker).

### What Each Field Means
- **Subject / SAN** — which hostnames the certificate is valid for. If your hostname isn't listed, browsers block it.
- **Issuer (CA)** — who signed it (e.g., Let's Encrypt, Google Trust Services, Sectigo). Self-signed shows the domain itself.
- **Valid From / Valid To** — lifetime window. Modern public certificates are 90 days (Let's Encrypt) or ~1 year; renew before expiry.
- **Chain** — leaf → intermediate(s) → root. All intermediates must be served by your server; browsers don't fetch them for you.
- **Public key / signature** — proves the server holds the private key for that certificate. Never share the private key.

### Pro Tips to Avoid Surprises
- Monitor expiry: check the [SSL Checker](/ssl-checker) weekly for production domains, or automate alerts at 30/14/7 days.
- Test both apex and \`www\` separately — they often use different virtual hosts or certificates.
- After any DNS move ([DNS Lookup](/dns-lookup) shows a new A record), re-verify SSL immediately — the new server needs its own certificate for that hostname.
- Confirm domain ownership hasn't lapsed first — a quick [WHOIS Lookup](/whois-lookup) rules out expiry as the cause of "not resolving" before you chase SSL.

### FAQ
**Is an SSL error the same as the site being down?**
No. DNS and the web server can be perfectly up while browsers block the page for an expired or mismatched certificate. Use [Website Status checker](/status) to separate HTTP reachability from TLS validity; use [SSL Checker](/ssl-checker) to diagnose the certificate itself.

**Why does SSL work on one device but not another?**
Usually a wrong system clock, cached intermediate, or a corporate proxy that re-signs traffic with its own CA. An external SSL check proves the server's real certificate so you can isolate the local cause.

**How long after renewing will browsers see the new certificate?**
Immediately after you install the new fullchain and reload the server. If you see the old date, purge CDN/cache and hard-reload. No propagation delay like DNS — it's live on the next handshake.

**Does my IP affect SSL?**
No. SSL validates the hostname, not your address. Your own public address ([What Is My IP](/ip-lookup)) doesn't change the certificate, but testing from another IP/network helps rule out proxy interference.

A valid, correctly chained certificate for the exact hostname is what browsers require. Next time you see a certificate warning, run a quick [SSL Checker](/ssl-checker) — the issuer, SAN, and expiry tell you whether to renew on the server or fix a local clock/proxy issue.`
  },
  {
    id: "what-is-whois-and-how-to-check-domain-ownership",
    title: "What Is WHOIS and How to Check Who Owns a Domain",
    slug: "what-is-whois-and-how-to-check-domain-ownership",
    category: "Tools",
    publishedAt: "September 01, 2026",
    readTime: "6 min read",
    excerpt: "Learn what WHOIS is, what domain ownership data it shows, and how to run a WHOIS lookup to check expiry, registrar, and registration details in seconds.",
    content: `Need to know who owns a domain, when it expires, or who to contact about it? WHOIS is the public directory that holds that information. A quick WHOIS lookup tells you the registrar, registration and expiry dates, name servers, and ownership contacts — or why that data is hidden.

### WHOIS in 15 Seconds
Every time a domain is registered, the registrar sends core details to a public WHOIS database run by the registry (like Verisign for .com) and ICANN. Anyone can query that database by domain name and get back the current registration record. Unlike DNS, which tells you where a domain points right now, WHOIS tells you who registered it, when, and where it is managed. If WHOIS shows the domain as expired or unregistered, no DNS or website check will succeed until ownership is restored.

### What Data a WHOIS Lookup Shows
- **Domain status** — whether the domain is registered, available, expired, or on hold (clientHold, redemptionPeriod).
- **Registrar** — the company where the domain is managed (e.g., Cloudflare, GoDaddy, Namecheap) plus the registrar abuse contact.
- **Important dates** — Created/Registered on, Updated on, and Expires on. The expiry date is the single fastest clue when a site suddenly goes dark.
- **Name servers** — which DNS hosts are authoritative (e.g., \`ada.ns.cloudflare.com\`). If these are wrong, [DNS Lookup](/dns-lookup) will show no valid A records.
- **Registrant contact** — organization, country, and email/phone when not privacy-protected. Since GDPR, most personal data is redacted and replaced with "Redacted for Privacy" or the registrar's privacy service.
- **DNSSEC** — whether the domain is signed.

You can view all of this instantly with the free [WHOIS Lookup](/whois-lookup) on DownOrUp.net — just enter the bare domain (no \`https://\`).

### How to Check WHOIS Yourself in 20 Seconds
1. Open the [WHOIS Lookup](/whois-lookup) on DownOrUp.net.
2. Enter the domain exactly — \`example.com\` (without path or protocol). For subdomains, strip to the registrable domain first.
3. Review the result: registrar, creation date, expiry date, status, and name servers at the top; full raw record below for details.
4. If the domain shows privacy protection, use the registrar abuse/privacy forwarding contact shown in the record to reach the owner.

Pro tip: check both the apex and expiry together — if WHOIS says the domain expired yesterday, that explains a "not resolving" error faster than any other test.

### How to Read the Result (and What to Do Next)
**Domain is available / No match found** — nobody owns it right now. You can register it with any registrar.

**Expiry date is in the past** — the registration lapsed. Renew at the current registrar immediately; after ~30-45 days it enters redemption and costs far more to recover. Confirm with [WHOIS Lookup](/whois-lookup) before chasing DNS — no DNS record can fix an expired domain.

**Status shows clientHold / serverHold / redemptionPeriod** — the registry has suspended the domain (abuse, non-payment, or post-expiry hold). Contact the listed registrar.

**Name servers point somewhere unexpected** — the domain was moved or hijacked. Verify with [DNS Lookup](/dns-lookup) which A records those name servers actually serve, then fix at the registrar.

**Registrant is "Privacy Protected"** — you won't see a personal email. Use the registrar's forwarding address or abuse contact, or check the website's own contact page.

**Need to separate causes?** Use this order: [WHOIS Lookup](/whois-lookup) (is it still registered?) → [DNS Lookup](/dns-lookup) (where does it point?) → [Website Status checker](/status) (does the server respond?) → [SSL Checker](/ssl-checker) (is the certificate valid?). That sequence isolates ownership vs. DNS vs. server vs. TLS in under a minute.

### WHOIS vs. DNS vs. Other Checks
- **WHOIS tells you who owns the domain and when it expires.** **DNS Lookup** ([DNS Lookup](/dns-lookup)) tells you where the domain points right now (A, MX, TXT, NS records).
- **WHOIS tells you the registrar and name servers;** **IP Lookup** ([What Is My IP](/ip-lookup)) tells you your own current public address — the two IPs have nothing to do with each other.
- **WHOIS dates explain sudden downtime;** **SSL dates** ([SSL Checker](/ssl-checker)) explain browser security warnings. Check both when a site "disappears" — expiry in either system produces a similar user-visible failure.

### Pro Tips to Avoid Surprises
- Check expiry 30 and 7 days before renewal — set a calendar alert from the WHOIS Expiry date. Many outages are just a forgotten auto-renew.
- After you update name servers at the registrar, WHOIS shows the new NS immediately, but DNS resolvers cache the old NS until its TTL expires — verify propagation with [DNS Lookup](/dns-lookup) from multiple resolvers.
- For brand research, WHOIS creation date is a useful trust signal: a domain created 10 years ago is more likely legitimate than one created 10 days ago — but it is not proof on its own.
- If you contact an owner, prefer the registrar abuse/privacy forwarding address over scraping personal emails from the raw record — privacy-redacted records are intentional.

### FAQ
**Is WHOIS data always accurate?**
Registries require accurate registrant data, but privacy services hide personal details by design. Registrar, dates, status, and name servers remain accurate even when the registrant is redacted.

**Why is the owner hidden as "Redacted for Privacy"?**
GDPR and registrar privacy services intentionally mask personal contact data for public queries. The record still shows the registrar and a forwarding contact so you can reach the owner.

**Does WHOIS show when a domain will become available again?**
It shows the Expiry date and often the status. After expiry there is a grace period (~30 days) then a redemption period (~30 days) before the domain is released. The exact drop date varies by TLD — monitor WHOIS daily if you want to catch it.

**What's the difference between WHOIS and RDAP?**
RDAP is the modern, JSON-based successor to WHOIS with structured data and better privacy controls. Most tools still label it "WHOIS" but may query RDAP under the hood — the fields you see are the same.

Understanding WHOIS makes every other diagnosis faster — when you know who owns the domain and when it expires, you know whether to renew, contact the registrar, or keep troubleshooting DNS and SSL. Next time a domain won't resolve, start with a [WHOIS Lookup](/whois-lookup) and let the ownership record point you to the right fix.`
  },
  {
    id: "how-to-check-if-port-is-open",
    title: "How to Check If a Port Is Open and What It Means",
    slug: "how-to-check-if-port-is-open",
    category: "Tools",
    publishedAt: "September 02, 2026",
    readTime: "6 min read",
    excerpt: "Learn how to check if a port is open, what open vs closed vs filtered means, and how to diagnose connection failures in seconds.",
    content: `A connection fails and the error says "port closed" or "connection refused" — is the service down, or is a firewall blocking that specific port? The fastest way to tell is to check whether the port is actually open from outside the network. If an external port check reaches it, the service is listening and the problem is local. If every check times out, the port is closed or filtered upstream.

### What a Port Actually Is

An IP address gets you to the server; a port gets you to the right service on that server. Think of the IP as the street address and the port as the apartment number.

- **IP + port = full destination.** For example, \`93.184.215.14:443\` means "host 93.184.215.14, service on port 443 (HTTPS)". Your browser uses 443 for HTTPS and 80 for HTTP automatically if you don't specify a port.
- **Ports are 0–65535.** Ports 1–1023 are well-known services; 1024–49151 are registered services; 49152–65535 are ephemeral/client ports.
- **TCP vs UDP.** Most web, mail, and database services use TCP (reliable, connection-oriented). DNS and streaming often use UDP. A port can be open for TCP but closed for UDP, or vice versa.

Common ports you will see:

- **80** — HTTP (unencrypted web)
- **443** — HTTPS (encrypted web)
- **22** — SSH (secure shell / server access)
- **25, 587, 465** — SMTP (sending email)
- **110, 995** — POP3 / **143, 993** — IMAP (receiving email)
- **3306** — MySQL, **5432** — PostgreSQL, **6379** — Redis
- **53** — DNS

If a site loads in the browser, 443 (or 80) is open. If SSH times out, check 22 specifically — a web-status check alone won't tell you.

### Why You Would Check a Port

- **Website or API unreachable** — is the web port (80/443) open but the app returning 500, or is the port itself closed?
- **Email not sending/receiving** — verify 25/587/465/993 are reachable from the outside.
- **Game or app can't connect** — many games and custom apps use non-standard ports (e.g., 25565, 27015). A blocked port explains "can't connect" even when the website is up.
- **After a firewall or hosting change** — confirm the new server actually exposes the ports you expect before you chase DNS.

A quick [Website Status checker](/status) tells you if HTTP responds; a [Port Checker](/port-checker) tells you if the underlying port is reachable at all — even when HTTP is not involved.

### How to Check If a Port Is Open in 20 Seconds

1. Open the free [Port Checker](/port-checker) on DownOrUp.net.
2. Enter the host — domain (\`example.com\`) or IP (\`93.184.215.14\`). For domains, the tool resolves the IP first (verify with [DNS Lookup](/dns-lookup) if it fails to resolve).
3. Enter the port number (e.g., \`443\` for HTTPS, \`22\` for SSH, \`3306\` for MySQL). Leave it empty to test the default for that service if the tool provides one.
4. Run the check and read the result: **Open**, **Closed**, or **Filtered/Timeout**, plus response time.

Cross-check in seconds: if [DNS Lookup](/dns-lookup) returns a valid A record but the port check times out, the IP is correct and the port is blocked. If [What Is My IP](/ip-lookup) shows you are on a corporate VPN, test again off the VPN to rule out your own egress filtering.

### How to Read the Result

**Open** — the remote host accepted the connection. The service is listening and no firewall blocked the probe. If the app still fails, the issue is authentication, TLS, or application logic — not the network port.

**Closed** — the host was reachable but actively refused the connection (TCP RST). Nothing is listening on that port. Fix: start the service, bind it to 0.0.0.0 (not just 127.0.0.1), and check the server's local firewall (ufw, firewalld, Windows Firewall).

**Filtered / Timeout** — no answer at all. A firewall, security group, or ISP is silently dropping packets, or the host is down. Fix: allow the port in the cloud security group (AWS EC2, Azure NSG, Cloudflare Spectrum), the OS firewall, and any upstream CDN/WAF. Verify the server is actually running with a local \`ss -tlnp\` or \`netstat -an\`.

**Intermittent (sometimes open)** — load balancer or failover with inconsistent rules. Check every backend node individually.

### Common Reasons a Port Appears Closed

- **Service not running or bound to localhost only.** The daemon listens on \`127.0.0.1:3306\` so external probes never reach it. Rebind to \`0.0.0.0\` or the public interface.
- **OS firewall blocking.** \`ufw deny 22\` or Windows Firewall inbound rule. Allow the port for the correct profile (public/private).
- **Cloud security group.** AWS, GCP, and Azure block all ports by default — you must explicitly open them in the console.
- **ISP or carrier-grade NAT.** Residential ISPs often block 25 (SMTP) and sometimes 80/443 inbound. Use a VPS or request unblocking.
- **Wrong host or stale DNS.** You checked the old IP after a migration. Re-run [DNS Lookup](/dns-lookup) and [WHOIS Lookup](/whois-lookup) to confirm you query the current owner and address, then re-check the port against the new IP.

### Port Check vs. Other Checks

- **Port Check tells you if the door is open.** **Website Status checker** ([Website Status checker](/status)) tells you if the web app behind the door answers HTTP and which status code it returns (200, 301, 404, 502).
- **DNS tells you which address to knock on** ([DNS Lookup](/dns-lookup)). A port check is meaningless if DNS points to the wrong IP.
- **SSL validates the certificate on 443** ([SSL Checker](/ssl-checker)). A port can be open on 443 while the certificate is expired — browsers still block it.
- **Your own IP matters for egress tests** ([What Is My IP](/ip-lookup)). Your public IP may be filtered by the remote firewall even when the port is open for everyone else.

The right order: [WHOIS Lookup](/whois-lookup) (still registered?) → [DNS Lookup](/dns-lookup) (correct IP?) → [Port Checker](/port-checker) (port reachable?) → [Website Status checker](/status) or [SSL Checker](/ssl-checker) (app/TLS healthy?).

### Pro Tips

- Test both the apex and the service subdomain separately — \`example.com:443\` and \`api.example.com:443\` can hit different servers or WAF rules.
- After any DNS move ([DNS Lookup](/dns-lookup) shows a new A record), re-check the port immediately — the new host needs the same firewall exceptions.
- For databases and SSH, never expose the port to 0.0.0.0/0 without IP allow-listing. An "open" result for 22 or 3306 from the whole internet is a security finding, not a success — restrict it.
- If you control the server, confirm locally first: \`curl -v telnet://localhost:PORT\` or \`nc -zv localhost PORT\` proves the service listens before you debug the network.

### FAQ

**What does "connection refused" mean?**
The host is up but no service is listening on that port, or the service actively rejected you. Start/bind the service and open the OS firewall.

**What does "connection timed out" mean?**
Packets were silently dropped — usually a firewall, security group, or routing issue. Allow the port at every layer (OS, cloud, CDN) and retry.

**Is an open port dangerous?**
An open port is expected for public services (80, 443). For admin ports (22, 3389, 3306), it should be restricted to known IPs or hidden behind a VPN/bastion.

**Can I check UDP ports the same way?**
UDP has no handshake, so "no answer" is ambiguous. Many checkers test TCP by default. For UDP, verify with a service-specific probe (e.g., \`dig @host -p 53\` for DNS).

**Does my IP affect the result?**
Yes — some firewalls allow-list specific IPs. Your address ([What Is My IP](/ip-lookup)) may be blocked while others succeed. Test from a second network to compare.

An open port means the network path is clear and the service is listening; closed or filtered means the fix is in the service binding or the firewall — not in DNS or the app code. Next time a connection fails, run a quick [Port Checker](/port-checker) before rewriting config — the result tells you exactly which layer to fix.`
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  return res.status(200).json(blogPosts);
}
