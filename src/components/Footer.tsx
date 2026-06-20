import React from "react";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="site-footer" className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
      {/* Monetization Slot - Top Block (optimized for CLS to not affect layout shifts) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-800 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div>
            <span className="inline-block bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-md font-mono font-medium border border-amber-500/20 mb-1">
              Sponsored Resource
            </span>
            <p className="text-sm font-semibold text-white">Need professional-grade website and API synthetic testing?</p>
            <p className="text-xs text-gray-400">Deploy high-frequency monitors across 42 global nodes with instant Slack and SMS alerts.</p>
          </div>
          <button className="whitespace-nowrap bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors shadow-sm">
            Try Monitoring Free
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & Info column */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={(e) => handleLinkClick(e, "/")}>
              <div className="bg-brand-600 text-white p-2 rounded-xl flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                DownOrUp<span className="text-brand-500 font-bold">.net</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              An enterprise-grade public diagnostics suite providing instantaneous HTTP checks, TLS handshake audits, DNS routing audits, DNS propagation telemetry, and real-time TCP latency pings.
            </p>
            <div className="flex space-x-4 pt-1">
              <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/25 flex items-center gap-1.5 inline-block">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Cloud infrastructure normal
              </span>
            </div>
          </div>

          {/* Diagnostics Utilities column */}
          <div className="col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">Core Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" onClick={(e) => handleLinkClick(e, "/")} className="hover:text-white transition-colors">Website Status Checker</a></li>
              <li><a href="/my-ip" onClick={(e) => handleLinkClick(e, "/my-ip")} className="hover:text-white transition-colors">My IP Info</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Pages Horizontal Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, "/privacy-policy")} className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-and-conditions" onClick={(e) => handleLinkClick(e, "/terms-and-conditions")} className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/disclaimer" onClick={(e) => handleLinkClick(e, "/disclaimer")} className="hover:text-gray-300 transition-colors">Disclaimer</a>
            <span>•</span>
            <a href="/cookie-policy" onClick={(e) => handleLinkClick(e, "/cookie-policy")} className="hover:text-gray-300 transition-colors">Cookie Policy</a>
            <span>•</span>
            <a href="/dmca" onClick={(e) => handleLinkClick(e, "/dmca")} className="hover:text-gray-300 transition-colors">DMCA Policy</a>
            <span>•</span>
            <a href="/acceptable-use-policy" onClick={(e) => handleLinkClick(e, "/acceptable-use-policy")} className="hover:text-gray-300 transition-colors">Acceptable Use</a>
          </div>

          <div className="text-xs text-gray-500 text-center md:text-right">
            <p>© {currentYear} DownOrUp.net. Diagnostics fetched dynamically from localized cloud nodes. All rights reserved.</p>
          </div>
        </div>

        {/* AdSense Placement Area - Silent, responsive and matches Core Web Vitals schema (no layout shift) */}
        <div className="mt-8 pt-4 border-t border-gray-800/50 flex justify-center">
          <div className="w-full max-w-4xl h-[90px] bg-gray-900 border border-gray-800/80 rounded-md flex items-center justify-center text-xs text-gray-600 font-mono tracking-wider uppercase select-none">
            ADVERTISEMENT STRIP (970 x 90 Leaderboard Container Grid Area - GA4 Analytics Ready)
          </div>
        </div>
      </div>
    </footer>
  );
}
