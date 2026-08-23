# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two roughly equal audiences arriving with different uncertainties:
- People weighing a life/career/business decision (starting a side hustle, learning a skill, buying something, moving abroad) who want a fast, structured gut-check before committing.
- Site/domain owners troubleshooting a technical problem (site seems down, DNS misconfigured, SSL expiring, WHOIS lookup, port check) who need a quick, trustworthy diagnostic answer.

## Product Purpose

DownOrUp.net is a general "answer engine" for uncertainty. One brand, one mechanism: ask a question you can't easily answer yourself, get an instant, structured, confident verdict. That mechanism is applied to two domains — "should I do this?" (an AI-generated decision report with verdict, pros/cons, risk, cost, and FAQs) and "is this working?" (free real-time website/network diagnostics: status, DNS, SSL, WHOIS, IP, port checks).

## Positioning

Competitors split these: decision/career-advice content sites don't do technical diagnostics, and uptime-checker tools don't do decision coaching. DownOrUp.net's mechanism — instant structured verdicts, delivered with the same UI and confidence language, for both "should I" and "is it up" questions — is what a single-purpose competitor could not truthfully copy without becoming a different product.

## Operating Context

- Built as a Vite + React 19 + Express/TS SSR app (`server.ts`, `src/entry-server.tsx`), deployed via Vercel/Firebase config present in repo.
- Decision reports are generated via `@google/genai` (Gemini) with a local fallback generator (`generateFallbackReport`) when the API is unavailable.
- Diagnostic tools (status, DNS, IP, SSL, WHOIS, port) call third-party APIs/proxies directly from the client (Cloudflare DNS-over-HTTPS, allorigins.win, corsproxy.io, ipapi.co, who-dat.as93.net, image-ping fallback) with layered fallback chains per tool.
- Routes: `/`, `/status`, `/dns-lookup`, `/ip-lookup`, `/ssl-checker`, `/whois-lookup`, `/port-checker`, plus SEO-seeded decision-query pages (e.g. `/should-i-start-dropshipping`) and a blog section.
- Monetized via Google AdSense (deferred/idle-loaded) and tracked via Google Analytics (gtag) and Ahrefs analytics.

## Capabilities and Constraints

- Ad revenue (AdSense) and SEO/content structure (predefined decision-query slugs, blog posts, schema.org markup, meta tags) are both load-bearing and must be preserved — neither can be sacrificed for a visual redesign.
- Diagnostic tools run entirely client-side against public/free third-party APIs with no dedicated backend for checks; results carry inherent fallback/uncertainty framing (e.g. "may be blocking checks") that must remain honest in copy, not just in code.
- Decision reports are AI-generated and explicitly time-stamped to "2026 conditions" — copy is written to sound authoritative but is a heuristic/AI output, not verified fact.

## Evidence on Hand

- Live blog content already exists (side hustles, career, tools/SEO explainer posts) under `src/pages/Home.tsx` SEED_BLOG_POSTS and served via `/api/blog-posts`.
- No customer testimonials, case studies, or usage-count proof points found in the repo; future work must not fabricate these.

## Product Principles

- One mechanism, two domains: every surface should reinforce "ask an uncertain question, get an instant confident verdict," whether the question is about life or about a website.
- Never sacrifice monetization or SEO structure for cosmetic polish — ad slots and indexed content routes are part of the product, not incidental.
- Keep diagnostic honesty: fallback/uncertain results must read as calibrated, not falsely confident, even while the brand voice stays punchy.
- Treat both audiences as equally primary in navigation and information architecture — neither the decision tool nor the diagnostics suite is a secondary feature.
