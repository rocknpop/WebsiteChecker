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
    <footer id="site-footer" className="bg-slate-900 text-slate-350 border-t border-slate-800 transition-colors duration-300">
      
      {/* Monetization Slot - Top Block of Partners (SaaS Affiliates Recommendation block) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block bg-teal-500/10 text-teal-400 text-xs px-2.5 py-1 rounded-md font-mono font-semibold border border-teal-500/20 mb-2">
              Identity Infrastructure Partners
            </span>
            <p className="text-sm font-semibold text-white">Secure matches for your brand instantly with our trusted registrar</p>
            <p className="text-xs text-slate-400 mt-1">
              Need a dot-com matching your social handle? Save 45% on domains, email hosting, and logo generator packages at Namecheap & Wix.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://www.namecheap.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whitespace-nowrap bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 text-center"
            >
              Secure Match Domain
            </a>
            <button 
              onClick={(e) => handleLinkClick(e, "/methodology")}
              className="whitespace-nowrap border border-slate-800 hover:border-slate-700 text-slate-300 font-medium text-xs px-3.5 py-2.5 rounded-xl transition-colors text-center"
            >
              API Methodology
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={(e) => handleLinkClick(e, "/")}>
              <div className="h-8 w-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                HandleHunt
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The world's premier social identity and username intelligence authority. Utilizing subsecond concurrent ping cycles to locate available brand handles across 10 mature social networks.
            </p>
            <div className="flex space-x-4 pt-1">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 rounded-md border border-emerald-500/20 flex items-center gap-1.5 leading-none py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                API Networks Online (99.98% accurate)
              </span>
            </div>
          </div>

          {/* Programmatic SEO - Platform Quicklinks */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">Social Checkers</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/instagram-username-checker" onClick={(e) => handleLinkClick(e, "/instagram-username-checker")} className="hover:text-white transition-colors">Instagram Handle Checker</a></li>
              <li><a href="/tiktok-username-checker" onClick={(e) => handleLinkClick(e, "/tiktok-username-checker")} className="hover:text-white transition-colors">TikTok Handle Checker</a></li>
              <li><a href="/youtube-username-checker" onClick={(e) => handleLinkClick(e, "/youtube-username-checker")} className="hover:text-white transition-colors">YouTube Handle Checker</a></li>
              <li><a href="/x-username-checker" onClick={(e) => handleLinkClick(e, "/x-username-checker")} className="hover:text-white transition-colors">X / Twitter Checker</a></li>
              <li><a href="/github-username-checker" onClick={(e) => handleLinkClick(e, "/github-username-checker")} className="hover:text-white transition-colors">GitHub Handle Checker</a></li>
            </ul>
          </div>

          {/* Categories Quicklinks */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">Browse Ideas</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/gamer-usernames" onClick={(e) => handleLinkClick(e, "/gamer-usernames")} className="hover:text-white transition-colors">Gamer Usernames</a></li>
              <li><a href="/creator-usernames" onClick={(e) => handleLinkClick(e, "/creator-usernames")} className="hover:text-white transition-colors">Creator Handles</a></li>
              <li><a href="/business-usernames" onClick={(e) => handleLinkClick(e, "/business-usernames")} className="hover:text-white transition-colors">Business Brands</a></li>
              <li><a href="/startup-usernames" onClick={(e) => handleLinkClick(e, "/startup-usernames")} className="hover:text-white transition-colors text-xs">Startup Brandable</a></li>
              <li><a href="/influencer-usernames" onClick={(e) => handleLinkClick(e, "/influencer-usernames")} className="hover:text-white transition-colors text-xs">Influencer Handles</a></li>
            </ul>
          </div>

          {/* EEAT Editorial Columns */}
          <div className="space-y-3 col-span-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">Trust & Editorial</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <a href="/about-us" onClick={(e) => handleLinkClick(e, "/about-us")} className="hover:text-white transition-colors text-xs text-slate-450">About Us</a>
              <a href="/editorial-policy" onClick={(e) => handleLinkClick(e, "/editorial-policy")} className="hover:text-white transition-colors text-xs text-slate-450">Editorial Policy</a>
              <a href="/methodology" onClick={(e) => handleLinkClick(e, "/methodology")} className="hover:text-white transition-colors text-xs text-slate-450">Methodology</a>
              <a href="/data-sources" onClick={(e) => handleLinkClick(e, "/data-sources")} className="hover:text-white transition-colors text-xs text-slate-450">Data Sources</a>
              <a href="/how-checked" onClick={(e) => handleLinkClick(e, "/how-checked")} className="hover:text-white transition-colors text-xs text-slate-450">How It's Checked</a>
              <a href="/transparency" onClick={(e) => handleLinkClick(e, "/transparency")} className="hover:text-white transition-colors text-xs text-slate-450">Transparency</a>
              <a href="/contact-us" onClick={(e) => handleLinkClick(e, "/contact-us")} className="hover:text-white transition-colors text-xs text-slate-450">Contact Admin</a>
            </div>
          </div>
        </div>

        {/* Legal Pages Horizontal Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, "/privacy-policy")} className="hover:text-slate-350 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms-and-conditions" onClick={(e) => handleLinkClick(e, "/terms-and-conditions")} className="hover:text-slate-350 transition-colors">Terms & Conditions</a>
            <span>•</span>
            <a href="/disclaimer" onClick={(e) => handleLinkClick(e, "/disclaimer")} className="hover:text-slate-350 transition-colors">Disclaimer</a>
            <span>•</span>
            <a href="/cookie-policy" onClick={(e) => handleLinkClick(e, "/cookie-policy")} className="hover:text-slate-350 transition-colors">Cookie Policy</a>
            <span>•</span>
            <a href="/dmca" onClick={(e) => handleLinkClick(e, "/dmca")} className="hover:text-slate-350 transition-colors">DMCA Policy</a>
            <span>•</span>
            <a href="/acceptable-use-policy" onClick={(e) => handleLinkClick(e, "/acceptable-use-policy")} className="hover:text-slate-350 transition-colors">Acceptable Use</a>
          </div>

          <div className="text-xs text-slate-500 text-center lg:text-right">
            <p>© {currentYear} HandleHunt. Powered by AI and global network probes. GDPR & CCPA Compliant.</p>
          </div>
        </div>

        {/* AdSense Placement Area - Silent, responsive and matches Core Web Vitals schema (no layout shift) */}
        <div className="mt-8 pt-4 border-t border-slate-800/40 flex justify-center">
          <div className="w-full max-w-4xl h-[90px] bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-center text-[10px] text-slate-600 font-mono tracking-widest uppercase select-none">
            ADVERTISEMENT SENSITIVE BAR (970 x 90 Premium Leaderboard)
          </div>
        </div>
      </div>
    </footer>
  );
}
