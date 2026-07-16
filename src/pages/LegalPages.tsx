import React, { useState } from "react";
import {
  ShieldCheck, HelpCircle, FileText, Send, CheckCircle2, Scale, Lock, BookOpen,
  Zap, Gift, ArrowUpDown, Briefcase, AlertTriangle, Globe, Search, Server,
  ShieldQuestion, KeyRound, Radar, UserX, Wifi, ArrowRight, Rocket
} from "lucide-react";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <h1 className="text-3xl font-sans font-black text-gray-900 pb-4 border-b border-gray-200 mb-8 tracking-tight">
          {title}
        </h1>
        <article className="prose max-w-none text-sm text-gray-700 leading-relaxed space-y-6">
          {children}
        </article>
      </div>
    </div>
  );
}

// 1. PRIVACY POLICY
export function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p className="font-mono text-xs text-slate-400">Effective Date: June 24, 2026</p>
      <p>
        At <strong>DownOrUp.net</strong>, we value the confidentiality of your inquiries and personal information. Because our users evaluate highly private lifestyle, investment, career, and side-hustle decisions, our architecture enforces a strict zero-retention baseline.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-6">1. Query Privacy & Processing Isolation</h3>
      <p>
        Any decisions, queries, or ideas you submit via our search bar are transmitted securely using TLS/SSL directly to our server. We utilize the official Google Gemini API to analyze your request.
      </p>
      <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500">
        <li><strong>We do not build permanent databases tracking your specific search history.</strong></li>
        <li><strong>Your private business ideas are never mined or sold to third-party competitors.</strong></li>
        <li>Aggregated logs (such as recent query counts) are held temporarily in system memory to construct popular/trending chips on the homepage, completely stripped of any personal identifiers.</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-900 mt-6">2. GDPR & CCPA Protections</h3>
      <p>
        For users residing in the European Union (GDPR) and California (CCPA), you retain the right to clear your local storage at any time. Since our searches are anonymous and do not require user accounts or password signups, we do not store, distribute, or profit from any personal data profiles.
      </p>
    </LegalLayout>
  );
}

// 2. COOKIE POLICY
export function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy">
      <p className="font-mono text-xs text-slate-400">Effective Date: June 24, 2026</p>
      <p>
        DownOrUp.net utilizes basic browser storage mechanisms (specifically, cookies and browser `localStorage` parameters) to deliver a consistent and high-performance experience.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-6">1. How We Use Cookies & Caching</h3>
      <p>
        We use browser cache mechanisms to remember your preferred visual mode (Light vs. Dark theme) so you do not experience screen flickering on subsequent pages. No persistent trackers are ever deployed.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-6">2. Third-Party Placements</h3>
      <p>
        In order to support our cloud costs and maintain this platform free of charge for creators worldwide, we allocate space for Google AdSense banners. AdSense partners may utilize anonymous tracking cookies to tailor appropriate marketing recommendations based on your approximate geographic region.
      </p>
    </LegalLayout>
  );
}

// 3. TERMS AND CONDITIONS
export function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p className="font-mono text-xs text-slate-400">Amended: June 24, 2026</p>
      <p>
        By accessing and evaluating ideas on <strong>DownOrUp.net</strong>, you agree to comply with our general acceptable use policies.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-6">1. Authorized Non-Commercial License</h3>
      <p>
        You are granted a free, non-exclusive license to run individual queries to analyze your startup ideas, side hustles, and career plans. Bulk robotic queries, programmatic scraping of our API endpoints, or stress-testing our systems is strictly prohibited.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-6">2. Limitation of Liability</h3>
      <p>
        DownOrUp.net utilizes artificial intelligence models (such as Gemini 3.5 Flash) to generate automated reports. AI text can sometimes miscalculate financial outcomes or market variables. You acknowledge that our platform's output is for informative or entertainment purposes only, and you accept full legal responsibility for any real-world outcomes resulting from your decisions.
      </p>
    </LegalLayout>
  );
}

// 4. DISCLAIMER
export function DisclaimerPage() {
  return (
    <LegalLayout title="Legal & Financial Disclaimer">
      <p className="font-mono text-xs text-slate-400 font-semibold text-red-500">CRITICAL READ NOTICE</p>
      <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-xs text-slate-500 leading-relaxed">
        <strong>DownOrUp.net is an automated AI Decision Evaluator.</strong> The recommendations, scores, difficulty ratings, pro/con reports, and final "UP/DOWN/NEUTRAL" verdicts returned by our systems are generated using artificial intelligence algorithms. They are NOT, and must never be interpreted as:
        <ul className="list-disc pl-5 mt-2 space-y-1 font-medium text-slate-600">
          <li>Professional financial, investment, or banking advice.</li>
          <li>Authorized legal, tax, or corporate structuring counsel.</li>
          <li>Certified career or psychological coaching.</li>
        </ul>
      </div>

      <p className="mt-4">
        Markets, software tools, side hustles, and career paths carry inherent risks. Prior to investing actual capital, resigning from a job, or purchasing expensive equipment, always perform extensive manual due diligence and consult certified certified professional financial planners.
      </p>
    </LegalLayout>
  );
}

// 5. ABOUT US
interface AboutUsPageProps {
  onNavigate?: (path: string) => void;
}

export function AboutUsPage({ onNavigate }: AboutUsPageProps = {}) {
  const goTo = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <>
      <LegalLayout title="About DownOrUp.net">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-blue-50 rounded-3xl border border-blue-200 mb-6">
          <div className="p-4.5 bg-blue-600 rounded-2xl text-white flex items-center justify-center font-bold text-2xl w-14 h-14 shrink-0 shadow-lg shadow-blue-200">
            ↑
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">"Should You Do It?"</h4>
            <p className="text-xs text-gray-700 mt-0.5">
              We built DownOrUp.net to remove decision paralysis. By aggregating modern market indicators with state-of-the-art AI parsing, we help founders analyze trade-offs in seconds.
            </p>
          </div>
        </div>

        <p>
          Every day, millions of people get stuck in deep decision loops: <em>"Should I learn Python?"</em>, <em>"Should I start an Amazon KDP side hustle?"</em>, <em>"Should I buy a gaming PC?"</em>. People browse dozens of threads, conflicting blogs, and promotional videos, wasting valuable hours.
        </p>
        <p>
          <strong>DownOrUp.net</strong> consolidates this entire discovery cycle. Our AI-driven platform instantly evaluates complexity, costs, risk vectors, pros, and cons, presenting a clean visual verdict. We remove the clutter so you can act with clarity.
        </p>
      </LegalLayout>

      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-10">

        {/* STATS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm text-center space-y-2">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-2xl font-sans font-black text-gray-900">6+ Free Tools</p>
            <p className="text-xs text-gray-500">IP, DNS, SSL, WHOIS, Ports & more</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm text-center space-y-2">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Gift className="w-5 h-5" />
            </div>
            <p className="text-2xl font-sans font-black text-gray-900">100% Free Forever</p>
            <p className="text-xs text-gray-500">No paywalls, no trials, no credit card</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm text-center space-y-2">
            <div className="w-11 h-11 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Lock className="w-5 h-5" />
            </div>
            <p className="text-2xl font-sans font-black text-gray-900">0 Data Stored</p>
            <p className="text-xs text-gray-500">Zero-retention query processing</p>
          </div>
        </div>

        {/* TWO COLUMNS: AI DECISION ENGINE / NETWORK DIAGNOSTICS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Rocket className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-sans font-extrabold text-lg text-gray-900">AI Decision Engine</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <ArrowUpDown className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Clear <strong>UP / DOWN</strong> verdicts for any decision, instantly generated</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>In-depth <strong>career analysis</strong> covering effort, cost, and time to results</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Structured <strong>risk assessment</strong> with pros, cons, and reward potential</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Radar className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-sans font-extrabold text-lg text-gray-900">Network Diagnostics</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>IP lookup</strong> — public IP, ISP, and geolocation</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Wifi className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Website checker</strong> — uptime and reachability status</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Search className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>DNS lookup</strong> — all primary DNS record types</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>SSL validator</strong> — certificate and protocol checks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>WHOIS lookup</strong> — registrar and domain ownership data</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Server className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Port scanner</strong> — common open port diagnostics</span>
              </li>
            </ul>
          </div>
        </div>

        {/* THREE STEPS */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-sans font-extrabold text-lg text-gray-900 text-center mb-6">How It Works</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono">1</div>
              <h4 className="font-bold text-gray-900 text-sm">Enter Question</h4>
              <p className="text-xs text-gray-500">Type any decision, idea, or domain you want checked</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono">2</div>
              <h4 className="font-bold text-gray-900 text-sm">AI Analyzes Instantly</h4>
              <p className="text-xs text-gray-500">Our engine evaluates risk, cost, and outcome in seconds</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono">3</div>
              <h4 className="font-bold text-gray-900 text-sm">Get Results</h4>
              <p className="text-xs text-gray-500">Receive a clear verdict with a full supporting breakdown</p>
            </div>
          </div>
        </div>

        {/* FOUR VALUE CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center space-y-2">
            <Gift className="w-5 h-5 text-blue-600 mx-auto" />
            <h4 className="font-bold text-gray-900 text-sm">Free Forever</h4>
            <p className="text-[11px] text-gray-500">No hidden fees, ever</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center space-y-2">
            <ShieldQuestion className="w-5 h-5 text-blue-600 mx-auto" />
            <h4 className="font-bold text-gray-900 text-sm">Privacy First</h4>
            <p className="text-[11px] text-gray-500">Zero-retention by design</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center space-y-2">
            <UserX className="w-5 h-5 text-blue-600 mx-auto" />
            <h4 className="font-bold text-gray-900 text-sm">No Signup</h4>
            <p className="text-[11px] text-gray-500">No accounts or passwords</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center space-y-2">
            <KeyRound className="w-5 h-5 text-blue-600 mx-auto" />
            <h4 className="font-bold text-gray-900 text-sm">Trusted APIs</h4>
            <p className="text-[11px] text-gray-500">Reliable, industry-grade data</p>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => goTo("/ip-lookup")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-gray-300 hover:-translate-y-0.5 duration-150 transition-all shadow-sm cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            Check My IP
          </button>
          <button
            onClick={() => goTo("/decision")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/10 hover:-translate-y-0.5 duration-150 transition-all cursor-pointer"
          >
            Try Decision Engine
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

// 6. CONTACT US
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
    <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in" id="contact-viewport">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl">
            <Send className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-sans font-black text-white">Contact Administration</h2>
            <p className="text-xs text-slate-300 mt-0.5">We reply to support inquiries within 24 hours.</p>
          </div>
        </div>

        {sent ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center py-10 mt-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3 animate-bounce" />
            <span className="font-bold text-gray-900 text-base">Message Logged Successfully</span>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Thank you for contacting DownOrUp.net. Our support coordinator has queued your request and will follow up shortly.
            </p>
            <button 
              onClick={() => setSent(false)} 
              className="mt-4 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Submit another ticket
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all outline-hidden text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">Email Coordinates</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all outline-hidden text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">Topic / Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Partnerships / Suggestion / Error report"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all outline-hidden text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">Inquiry Details</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Provide detailed description of your query or platform feedback..."
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all outline-hidden text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/10 hover:-translate-y-0.5 duration-150 transition-all text-center cursor-pointer"
            >
              Submit Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
