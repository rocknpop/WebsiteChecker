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

  const categories = [
    {
      title: "Career Paths",
      links: [
        { name: "Become Software Engineer", path: "/should-i-become-software-engineer" },
        { name: "Become Data Analyst", path: "/should-i-become-data-analyst" },
        { name: "Learn Cybersecurity", path: "/should-i-learn-cybersecurity" },
        { name: "Become UX Designer", path: "/should-i-become-ux-designer" },
      ],
    },
    {
      title: "Side Hustles",
      links: [
        { name: "Start Amazon KDP", path: "/should-i-start-amazon-kdp" },
        { name: "Start Print-on-Demand", path: "/should-i-start-print-on-demand" },
        { name: "Start Dropshipping", path: "/should-i-start-dropshipping" },
        { name: "Become Freelancer", path: "/should-i-become-freelancer" },
      ],
    },
    {
      title: "Business Ideas",
      links: [
        { name: "Start AI Agency", path: "/should-i-start-ai-agency" },
        { name: "Build SaaS Product", path: "/should-i-build-saas-product" },
        { name: "Start blogging", path: "/should-i-start-blogging" },
        { name: "Create Newsletter", path: "/should-i-create-newsletter" },
      ],
    },
    {
      title: "Education & Purchases",
      links: [
        { name: "Get an MBA", path: "/should-i-get-mba" },
        { name: "Learn Coding", path: "/should-i-learn-coding" },
        { name: "Buy ChatGPT Plus", path: "/should-i-buy-chatgpt-plus" },
        { name: "Buy MacBook Pro", path: "/should-i-buy-macbook" },
      ],
    },
  ];

  return (
    <footer id="site-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      
      {/* Monetization Slot - Affiliate Recommendation Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block bg-blue-500/15 text-blue-400 text-xs px-2.5 py-1 rounded-md font-mono font-bold border border-blue-500/20 mb-2 uppercase tracking-wider">
              SPONSORED RECOMMENDATION
            </span>
            <p className="text-sm font-bold text-white">Unlock Premium Custom AI Report Generation</p>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Need a highly tailored corporate audit, deep financial modeling, or bespoke market validation reports? Access premium analytical suites from our verified SaaS partners with up to 35% discount.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => handleLinkClick(e, "/")}
              className="whitespace-nowrap bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl transition-all active:scale-95 text-center cursor-pointer"
            >
              Start Custom Analysis
            </button>
            <a 
              href="https://ai.google.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whitespace-nowrap border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors text-center"
            >
              Developer SDK
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={(e) => handleLinkClick(e, "/")}>
              <div className="h-8 w-8 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold font-sans">
                ↑
              </div>
              <span className="font-sans font-black text-lg tracking-tight bg-linear-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                DownOrUp.net
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The internet's premiere AI-powered decision platform. Get dynamic, data-driven verdicts on careers, side hustles, software, business ideas, and lifestyle decisions in seconds.
            </p>
            <div className="flex space-x-4 pt-1">
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 rounded-md border border-cyan-500/20 flex items-center gap-1.5 leading-none py-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                AI Model Online (Gemini 3.5 Flash)
              </span>
            </div>
          </div>

          {/* Programmatic Categories Columns */}
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-3 col-span-1">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">{cat.title}</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {cat.links.map((link, lidx) => (
                  <li key={lidx}>
                    <a 
                      href={link.path} 
                      onClick={(e) => handleLinkClick(e, link.path)} 
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Legal Pages Horizontal Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
            <a href="/about" onClick={(e) => handleLinkClick(e, "/about")} className="hover:text-white transition-colors">About</a>
            <span>•</span>
            <a href="/contact" onClick={(e) => handleLinkClick(e, "/contact")} className="hover:text-white transition-colors">Contact</a>
            <span>•</span>
            <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, "/privacy-policy")} className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-and-conditions" onClick={(e) => handleLinkClick(e, "/terms-and-conditions")} className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/disclaimer" onClick={(e) => handleLinkClick(e, "/disclaimer")} className="hover:text-slate-200 transition-colors">Disclaimer</a>
            <span>•</span>
            <a href="/cookie-policy" onClick={(e) => handleLinkClick(e, "/cookie-policy")} className="hover:text-slate-200 transition-colors">Cookie Policy</a>
          </div>

          <div className="text-xs text-slate-500 text-center lg:text-right font-sans">
            <p>© {currentYear} DownOrUp.net. All rights reserved. GDPR & CCPA Compliant.</p>
          </div>
        </div>

        {/* AdSense Placement Area - Highly responsive, zero layout shift */}
        <div className="mt-8 pt-4 border-t border-slate-800/40 flex justify-center">
          <div className="w-full max-w-4xl h-[90px] bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-center text-[10px] text-slate-600 font-mono tracking-widest uppercase select-none">
            ADVERTISEMENT SPACE (AdSense Responsive Banner)
          </div>
        </div>
      </div>
    </footer>
  );
}
