import React, { useState } from "react";
import SeoHead from "../components/SeoHead";
import { ShieldCheck, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Heart, BookOpen, Search, HelpCircle, FileText, Send, UserCheck, Layers } from "lucide-react";

// Wrapper component for legal layouts
function LegalLayout({ title, description, path, children }: { title: string; description: string; path: string; children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <SeoHead title={title} description={description} canonicalPath={path} />
      <div className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl transition-all">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 dark:text-white pb-4 border-b border-gray-150 dark:border-slate-800 mb-8 tracking-tight">
          {title}
        </h1>
        <article className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-6">
          {children}
        </article>
      </div>
    </div>
  );
}

// 1. PRIVACY POLICY
export function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy | GDPR & CCPA Compliance"
      description="Review our comprehensive Privacy Policy detailing how we handle username checks, analytics, and cookies."
      path="/privacy-policy"
    >
      <p className="font-mono text-xs text-gray-400">Amended & Effective: June 20, 2026</p>
      <p>
        At <strong>HandleHunt</strong>, we take the confidentiality of your searches and digital identity seriously. Because we help users scan and consolidate their personal brands, we maintain strict technical rules regarding how input query logs are processed.
      </p>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display mt-6">1. Real-Time Query Telemetry and Isolation</h3>
      <p>
        When you run consecutive searches on HandleHunt to verify a handle's availability, our Express servers temporarily perform rapid asynchronous checks against social media developer APIs and public gateways.
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>We do NOT log or harvest searched usernames for corporate resale.</strong></li>
        <li><strong>We do NOT run automated bulk reservation systems</strong> targeting names checked by our users.</li>
        <li>All query caches are held in transit in volatile system memory and automatically flushed within 24 hours.</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display mt-6">2. European General Data Protection Regulation (GDPR) Rights</h3>
      <p>
        For European Union residents, HandleHunt acts as a Data Processor under GDPR frameworks. You have the right to inspect, limit, or delete local collection arrays stored in your browser's localStorage. Because we do not store raw emails or account credentials during anonymous platform checks, our platform is structured with native Privacy-by-Design safeguards.
      </p>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display mt-6">3. CCPA Opt-Out and Sale of Personal Data</h3>
      <p>
        Under California Consumer Privacy Act (CCPA) standards, you are guaranteed that <strong>we sell zero customer datasets</strong> to external marketing brokers. We utilize only aggregate diagnostic analytics to serve local monetization slots.
      </p>
    </LegalLayout>
  );
}

// 2. COOKIE POLICY
export function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      description="How we utilize cookie files and localStorage caching to optimize your search preference experience."
      path="/cookie-policy"
    >
      <p className="font-mono text-xs text-gray-400">Effective: June 20, 2026</p>
      <p>
        Our platform relies on small browser storage blocks (including standard cookies and localStorage states) to ensure fluid interaction. We do not engage in persistent cross-site behavioral telemetry.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Why We Use Caching</h3>
      <p>
        We utilize localStorage to maintain your **Saved Handles Collection**. This keeps your saved lists intact when you reload your browser or navigate pages, without forcing you to create an account or provide private passwords.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Third-Party Ads</h3>
      <p>
        We run premium monetization programs with Google AdSense. AdSense partners may deploy cookies to deliver localized programmatic banners based on your general geographical vicinity. You can modify your browser settings to deny or purge cookies at any time.
      </p>
    </LegalLayout>
  );
}

// 3. TERMS AND CONDITIONS
export function TermsPage() {
  return (
    <LegalLayout
      title="Terms and Conditions of Use"
      description="Read our platform terms of service. Guidelines for fair usage of username checks and identity finders."
      path="/terms-and-conditions"
    >
      <p className="font-mono text-xs text-gray-400">Revised: June 20, 2026</p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Agreement to Terms</h3>
      <p>
        By visiting or running queries on HandleHunt, you agree to comply with our general acceptable use protocols. We allow unlimited human checks for personal branding discovery.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Strict Prohibition of Bulk Domain Squatting</h3>
      <p>
        You are strictly forbidden from abusing our platform intelligence to script automation bots designed to identify, buy, or squat on high-value usernames to extort third-party founders. HandleHunt's intelligence is reserved exclusively for honest creator and startup brand growth.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">3. Disclaimer of Liability</h3>
      <p>
        HandleHunt acts as a lookup locator. Social network guidelines change frequently, and a platform may mark a name as "taken" or "possibly available" due to suspended states. We provide no legal guarantee of trademark accessibility.
      </p>
    </LegalLayout>
  );
}

// 4. DISCLAIMER
export function DisclaimerPage() {
  return (
    <LegalLayout
      title="Compliance & Trademark Disclaimer"
      description="Technical disclaimer explaining our independent scanning status across various public social media systems."
      path="/disclaimer"
    >
      <p className="font-mono text-xs text-gray-400">Effective: June 20, 2026</p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Trademark Disclosures</h3>
      <p>
        HandleHunt is an independent brand checking utility. All listed social networking logos, names, and trademark designs (including <strong>Instagram, TikTok, YouTube, X/Twitter, Twitch, Reddit, GitHub, Snapchat, Threads, Pinterest, Spotify</strong>) are the exclusive property of their respective corporate owners.
      </p>
      <p>
        Any reference to these platform names is purely nominative, intended solely to inform creators of handle availability per legal Fair Use standards.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Limitation of Accuracy</h3>
      <p>
        Our check returns are simulated and derived from live public endpoints. Because some networks restrict API access or mask closed, banned, or shadow-banned users, always check the exact profile URL directly before purchasing expensive merchandise or publishing global marketing setups.
      </p>
    </LegalLayout>
  );
}

// 5. ACCEPTABLE USE POLICY
export function AcceptableUsePage() {
  return (
    <LegalLayout
      title="Acceptable Use & Anti-Scraping Policy"
      description="Detailed rules regarding API query limits and scraping guidelines."
      path="/acceptable-use-policy"
    >
      <p className="font-mono text-xs text-gray-400">Effective: June 20, 2026</p>
      <p>
        To preserve excellent speeds for human creators worldwide, we deploy continuous rate-limiting firewalls.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Scraping and Automated Pings</h3>
      <p>
        You must not use headless scripts, sequential cURL commands, or automated cron tools to query our Express backend endpoint (`/api/check-username`). Any IP address exhibiting automated crawler characteristics will face immediate blocking.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. System Overloading</h3>
      <p>
        Attempting to duplicate server requests, inject SQL parameters, or disrupt diagnostic check pipelines is a breach of security and will be reported to appropriate cloud network blocks.
      </p>
    </LegalLayout>
  );
}

// 6. DMCA POLICY
export function DmcaPage() {
  return (
    <LegalLayout
      title="DMCA Copyright Policy"
      description="How to report intellectual property inquiries or text replacements."
      path="/dmca"
    >
      <p className="font-mono text-xs text-gray-400">Effective: June 20, 2026</p>
      <p>
        HandleHunt respects the creative assets of global creators. If you believe any article, generator suggestion, or design element on our site violates your copyright under the Digital Millennium Copyright Act (DMCA), you may submit a notice to our administration.
      </p>
      <p>
        All notices must be sent to: <strong>dmca@handlehunt.co</strong> (simulated contact) including:
      </p>
      <ul className="list-disc pl-5 text-xs space-y-1">
        <li>A signature of the copyright holder.</li>
        <li>URL and description of the infringing file.</li>
        <li>Your direct email address and telephone coordinate.</li>
        <li>A statement written in good faith that the material's use is unauthorized.</li>
      </ul>
    </LegalLayout>
  );
}

// 7. ABOUT US
export function AboutUsPage() {
  return (
    <LegalLayout
      title="About Us | Our Mission & Team"
      description="Learn about the team behind HandleHunt and why we built the internet's premier social identity system."
      path="/about-us"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl mb-6">
        <div className="p-4 bg-purple-600 rounded-2xl text-white flex items-center justify-center font-bold text-2xl font-display w-16 h-16 shrink-0 shadow-lg shadow-indigo-500/20">
          HH
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white font-display text-base">We believe in Digital Unity.</h4>
          <p className="text-xs text-gray-400 mt-1">
            Founded with a mission to help creators secure cohesive brands, HandleHunt makes user name scanning beautiful, easy, and secure.
          </p>
        </div>
      </div>

      <p>
        Every brand begins with a name. But in today's crowded social landscape, securing the same identifier across networks is nearly impossible. Creators spend hours checking individual sites, only to find one link is taken.
      </p>
      <p>
        We built <strong>HandleHunt</strong> to solve this. Our technology queries 10 social platforms concurrently, calculates a cohesive brand consistency ratio, and applies AI metrics to suggest optimized alternatives. Let us handle the discovery so you can focus on creating!
      </p>
    </LegalLayout>
  );
}

// 8. EDITORIAL POLICY
export function EditorialPolicyPage() {
  return (
    <LegalLayout
      title="Editorial Policy & Content Integrity"
      description="Our guidelines regarding factual accuracy, research transparency, and content neutrality."
      path="/editorial-policy"
    >
      <p>
        The content on HandleHunt is authored and peer-reviewed by branding strategists, intellectual property lawyers, and digital creators. We hold ourselves to strict criteria of scientific accuracy and professional alignment.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">1. Independence and Neutrality</h3>
      <p>
        Our reviews are completely objective. While we recommend affiliate links for trusted domain registrars or logo generators, these advertisements have zero influence on our factual guides, brandability algorithm outputs, or checklist summaries.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">2. Regular Updates</h3>
      <p>
        Social platform terms of service and registration rules mutate regularly. Our staff continuously audits our tutorials and codebases to keep our instructions compliant with the latest changes in the API landscape.
      </p>
    </LegalLayout>
  );
}

// 9. METHODOLOGY
export function MethodologyPage() {
  return (
    <LegalLayout
      title="Measurement & Checking Methodology"
      description="The technical guidelines of our concurrency checking pipeline and status resolution."
      path="/methodology"
    >
      <p>
        To maintain subsecond pings, HandleHunt implements a sophisticated backend concurrent query pipeline. Below is an outline of how status is resolved.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 text-center">
          <Cpu className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
          <h5 className="font-bold text-xs text-gray-900 dark:text-white">1. Fetch Handshake</h5>
          <p className="text-[11px] text-gray-400 mt-1">Queries are sent with strict browser heads mimicking legitimate human checks.</p>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 text-center">
          <Search className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <h5 className="font-bold text-xs text-gray-900 dark:text-white">2. Status Parsing</h5>
          <p className="text-[11px] text-gray-400 mt-1">Resolves to "Available" on 404, or "Taken" on 200 HTTP codes, or falls back securely.</p>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 text-center">
          <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-purple-500" />
          <h5 className="font-bold text-xs text-gray-900 dark:text-white">3. Brand Scoring</h5>
          <p className="text-[11px] text-gray-400 mt-1">Calculates lengths, syllable counts, and phonetic patterns through semantic rules.</p>
        </div>
      </div>
    </LegalLayout>
  );
}

// 10. DATA SOURCES
export function DataSourcesPage() {
  return (
    <LegalLayout
      title="Authoritative Diagnostic Data Sources"
      description="The networks and developer endpoints utilized to query handle validity."
      path="/data-sources"
    >
      <p>
        HandleHunt retrieves real-time availability results directly from the primary web domains of target socials. Below are the authoritative endpoints checked for individual search parameters:
      </p>
      <ul className="space-y-3 pl-5 list-decimal text-xs">
        <li><strong>Instagram:</strong> Queries the primary profile URI structure `instagram.com/[username]/` with standard CORS-isolated requests under strict fallback blocks.</li>
        <li><strong>TikTok:</strong> Scans the active developer profile index path `tiktok.com/@[username]`.</li>
        <li><strong>YouTube:</strong> Resolves standard channel handler routes `@username` to locate active profiles.</li>
        <li><strong>X (Twitter):</strong> Translates lookups against the central profile path `x.com/[username]`.</li>
        <li><strong>GitHub:</strong> Interacts with the public GitHub API layer `api.github.com/users/[username]`.</li>
        <li><strong>Snapchat & Threads:</strong> Checks Snapchat Add routes and Threads profile headers.</li>
      </ul>
    </LegalLayout>
  );
}

// 11. HOW AVAILABILITY IS CHECKED
export function HowCheckedPage() {
  return (
    <LegalLayout
      title="How Username Availability is Checked"
      description="An educational guide explaining behind-the-scenes checks and why false positives occur."
      path="/how-checked"
    >
      <p>
        When you check your personal name on HandleHunt, our system starts a parallel processing pool on our Cloud container.
      </p>
      <p>
        For most networks, we run a secure **GET request** to the public route. If the server responds with a <strong>404 Not Found</strong> status code, it mathematically indicates that no active creator is currently allocated that specific handle. The name is resolved as **Available**.
      </p>
      <p>
        If the server responds with a **200 OK** or is readable, the handle is resolved as **Taken**.
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">Why can a taken name sometimes look available?</h3>
      <p>
        Some accounts might be temporarily suspended, locked, set to private, or deleted by the platform. In those intermediate stages, the network may return a 404 block, but won't let new users buy or claim that username yet. Always verify by typing the handle directly on the network before purchasing domains!
      </p>
    </LegalLayout>
  );
}

// 12. TRANSPARENCY REPORT
export function TransparencyReportPage() {
  return (
    <LegalLayout
      title="Transparency & Data Safety Report"
      description="Our formal compliance statement stating no tracking is used."
      path="/transparency"
    >
      <p>
        HandleHunt operates on a baseline of radical transparency. We believe in an internet free from shady data gatherers.
      </p>
      <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 my-6">
        <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 font-display flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" /> Formal Solvency Statement
        </h4>
        <p className="text-xs text-emerald-800 dark:text-emerald-350 mt-1">
          As of June 20, 2026, HandleHunt has never received any government national security letters, gag orders, or search warrants requesting user telemetry logs or private identification directories.
        </p>
      </div>
      <p>
        We run on a self-funding business architecture supported exclusively by subtle Google AdSense banners and affiliate links. We do not maintain investor agreements demanding database monetization or search telemetry tracking.
      </p>
    </LegalLayout>
  );
}

// 13. CONTACT US
export function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in">
      <SeoHead title="Contact Us – High-Priority Support" description="Get in touch with HandleHunt engineering and support teams." canonicalPath="/contact-us" />
      <div className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl">
            <Send className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white">Get in Touch</h2>
            <p className="text-xs text-gray-400 mt-0.5">We reply to administration inquires within 24 hours.</p>
          </div>
        </div>

        {sent ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center py-10 mt-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3 animate-bounce" />
            <span className="font-bold text-gray-900 dark:text-white text-base">Message Sent Successfully!</span>
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
              Thank you for reaching HandleHunt. Our technical operations coordinator has logged your transmission and will review it immediately.
            </p>
            <button 
              onClick={() => setSent(false)} 
              className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Rishi N"
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-hidden dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Coordinates</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-hidden dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Topic</label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Branding Inquiry / API error report"
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-hidden dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Message / Inquiry Details</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Provide detailed context regarding your trademark, checking error, or partnerships proposal..."
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-hidden dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/10 hover:-translate-y-0.5 duration-150 transition-all text-center"
            >
              Submit Diagnostic Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
