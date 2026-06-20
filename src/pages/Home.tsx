import React, { useState, useEffect } from "react";
import { Search, Activity, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Layers, ShieldCheck, Globe, HelpCircle, Laptop, Radio, ArrowRight, UserCheck } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { motion } from "motion/react";

interface HomeProps {
  onCheckStatus: (domain: string) => void;
  onNavigate: (path: string) => void;
}

interface MiniStatus {
  domain: string;
  name: string;
  status: "up" | "down" | "checking";
  latency?: number;
}

export default function Home({ onCheckStatus, onNavigate }: HomeProps) {
  // Focus tab state: "website" or "username"
  const [activeTab, setActiveTab] = useState<"website" | "username">("website");
  const [inputValue, setInputValue] = useState("");
  const [recentChecks, setRecentChecks] = useState<any[]>([]);
  const [recentOutages, setRecentOutages] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [popularSites, setPopularSites] = useState<MiniStatus[]>([
    { domain: "chatgpt.com", name: "ChatGPT", status: "checking" },
    { domain: "youtube.com", name: "YouTube", status: "checking" },
    { domain: "instagram.com", name: "Instagram", status: "checking" },
    { domain: "netflix.com", name: "Netflix", status: "checking" },
    { domain: "gmail.com", name: "Gmail", status: "checking" },
    { domain: "paypal.com", name: "PayPal", status: "checking" },
    { domain: "reddit.com", name: "Reddit", status: "checking" },
    { domain: "google.com", name: "Google", status: "checking" },
  ]);

  // Fetch recent queries & outages from live Express endpoint
  const fetchDashboardInfo = async () => {
    setLoadingHistory(true);
    try {
      const resp = await fetch("/api/dashboard-info");
      if (resp.ok) {
        const data = await resp.json();
        setRecentChecks(data.recentChecks || []);
        setRecentOutages(data.recentOutages || []);
      }
    } catch (err) {
      console.error("Failed to sync dashboard updates:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Run lightweight web status probes concurrently
  const probePopular = async () => {
    setPopularSites((prev) => prev.map((s) => ({ ...s, status: "checking" })));
    await Promise.all(
      popularSites.map(async (site) => {
        try {
          const response = await fetch(`/api/check-status?url=${site.domain}`);
          if (response.ok) {
            const data = await response.json();
            setPopularSites((prev) =>
              prev.map((s) =>
                s.domain === site.domain
                  ? { ...s, status: data.status, latency: data.responseTime }
                  : s
              )
            );
          } else {
            setPopularSites((prev) =>
              prev.map((s) => (s.domain === site.domain ? { ...s, status: "down" } : s))
            );
          }
        } catch (e) {
          setPopularSites((prev) =>
            prev.map((s) => (s.domain === site.domain ? { ...s, status: "down" } : s))
          );
        }
      })
    );
  };

  useEffect(() => {
    fetchDashboardInfo();
    probePopular();
    // Auto-refresh stats periodically
    const interval = setInterval(() => {
      fetchDashboardInfo();
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim().toLowerCase();
    if (!query) return;
    onCheckStatus(query);
  };

  const handlePopularClick = (domain: string) => {
    onCheckStatus(domain);
  };

  const setBenchmark = (value: string) => {
    setInputValue(value);
  };

  // Dynamic programmatically mapped outages lists for crawl maps of index
  const seoOutagePages = [
    { name: "ChatGPT Down?", path: "/is-chatgpt-down" },
    { name: "YouTube Down?", path: "/is-youtube-down" },
    { name: "Instagram Down?", path: "/is-instagram-down" },
    { name: "Facebook Down?", path: "/is-facebook-down" },
    { name: "Gmail Down?", path: "/is-gmail-down" },
    { name: "WhatsApp Down?", path: "/is-whatsapp-down" },
    { name: "Discord Down?", path: "/is-discord-down" },
    { name: "PayPal Down?", path: "/is-paypal-down" },
    { name: "Reddit Down?", path: "/is-reddit-down" },
    { name: "Netflix Down?", path: "/is-netflix-down" },
  ];

  const homeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "DownOrUp Website Checker",
      "url": window.location.origin,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "description": "Premium Website Status & Service Outage availability scanner database."
    }
  ];

  return (
    <div className="animate-fade-in" id="primary-home-view">
      <SeoHead
        title="DownOrUp - Website Status Checker"
        description="Check if any website is down, monitor service outages, and verify website availability with DownOrUp."
        canonicalPath="/"
        schemas={homeSchemas}
      />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-radial from-slate-50 via-white to-white dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950 py-16 sm:py-24 border-b border-gray-100 dark:border-slate-900" id="hero-dock">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-500/10 to-indigo-500/10 dark:from-brand-500/5 dark:to-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-linear-to-r from-brand-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-brand-150 dark:border-slate-800 rounded-full mb-6 text-brand-700 dark:text-cyan-400 font-semibold uppercase tracking-wider text-[11px] shadow-xs">
            <Radio className="h-3.5 w-3.5 animate-pulse text-brand-600 dark:text-cyan-400" />
            <span>DownOrUp - Know What's Up. Know What's Down.</span>
          </span>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none mb-6 text-gray-950 dark:text-white">
            Check If Any Website Is Down
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Instantly verify website availability, outages, and uptime status.
          </p>

          {/* Unified search box panel */}
          <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl dark:shadow-slate-950/20 transition-all">
            {/* Core input control */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2" id="unified-check-input">
              <div className="flex-grow flex items-center px-3 gap-2.5">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter website URL (e.g. chatgpt.com, youtube.com)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-transparent border-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-hidden text-sm sm:text-base py-2.5 font-mono"
                  id="target-term-input"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-brand-500/10 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-gray-400 dark:text-gray-500">
              <span className="font-semibold uppercase tracking-wider text-[9px] text-gray-400">Popular Tests:</span>
              <button type="button" onClick={() => setBenchmark("chatgpt.com")} className="underline hover:text-brand-600 dark:hover:text-amber-400">chatgpt.com</button>
              <span>•</span>
              <button type="button" onClick={() => setBenchmark("youtube.com")} className="underline hover:text-brand-600 dark:hover:text-amber-400">youtube.com</button>
              <span>•</span>
              <button type="button" onClick={() => setBenchmark("instagram.com")} className="underline hover:text-brand-600 dark:hover:text-amber-400">instagram.com</button>
              <span>•</span>
              <button type="button" onClick={() => setBenchmark("netflix.com")} className="underline hover:text-brand-600 dark:hover:text-amber-400">netflix.com</button>
            </div>
          </div>
        </div>
      </section>

      {/* MONETIZATION PLACEMENT 1: ABOVE CONTENT ADS */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-gray-50 dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl py-4 px-6 text-center shadow-xs">
          <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase block mb-1">Sponsored Advertisements</span>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Secure your domain identity immediately. Claim your brand name across extensions including .com, .net and .co with Namecheap.
          </p>
        </div>
      </div>

      {/* Grid: Popular Web Services Checking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="popular-sites-section">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-slate-800/80 pb-4 mb-8 gap-4">
          <div>
            <h2 className="font-display font-medium text-xl text-gray-900 dark:text-white tracking-tight">Global Service Outages Index</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Live metrics parsed from direct response socket handshakes.</p>
          </div>
          <button
            onClick={probePopular}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-700 dark:text-amber-400 bg-brand-50 dark:bg-slate-900 hover:bg-brand-100 dark:hover:bg-slate-800 px-4 py-2 rounded-xl border border-brand-100 dark:border-slate-800 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Verify Live States</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" id="popular-sites-grid">
          {popularSites.map((site) => (
            <div
              key={site.domain}
              onClick={() => handlePopularClick(site.domain)}
              className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-brand-150 dark:hover:border-slate-700 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between h-36 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-amber-400 transition-colors">
                  {site.name}
                </span>
                
                {site.status === "up" && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-emerald-50 dark:bg-emerald-950/20 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    Online
                  </span>
                )}
                {site.status === "down" && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-rose-50 dark:bg-rose-950/20 text-[10px] font-bold text-rose-700 dark:text-rose-400">
                    Down
                  </span>
                )}
                {site.status === "checking" && (
                  <RefreshCw className="h-3.5 w-3.5 text-brand-500 animate-spin" />
                )}
              </div>

              <div className="border-t border-gray-50 dark:border-slate-800 pt-3 flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 dark:text-gray-500">Domain</span>
                <span className="text-xs text-gray-650 dark:text-gray-300 font-mono mt-0.5 truncate">{site.domain}</span>
              </div>

              {site.latency && (
                <div className="text-[10px] font-mono text-gray-400 text-right mt-1.5">
                  Latency: {site.latency}ms
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMMATIC SEO OUTAGE CHANNELS INDEX SECTION */}
      <section className="bg-gray-50/50 dark:bg-slate-900/10 border-y border-gray-100 dark:border-slate-920 py-12" id="programmatic-seo-index">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">
              Real-Time Outage Direct Directories
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              Browse pre-rendered status telemetry checks for elite global platforms. Link mapping index for programmatic SEO.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {seoOutagePages.map((page) => (
              <span
                key={page.path}
                onClick={() => onNavigate(page.path)}
                className="cursor-pointer px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-amber-400 hover:border-brand-200 dark:hover:border-slate-700 shadow-xs hover:scale-102 transition-all inline-flex items-center space-x-1.5"
              >
                <Activity className="h-3.5 w-3.5 text-brand-500" />
                <span>{page.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MONETIZATION PLACEMENT 2: SECOND SPONSORED ADS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6 bg-linear-to-tr from-brand-600/5 to-indigo-600/5 dark:from-slate-900/60 dark:to-slate-900/10 border border-brand-100/50 dark:border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-600 dark:text-amber-400 block font-bold">Featured Partner</span>
            <h4 className="font-display font-bold text-gray-950 dark:text-white text-base">Host Private Portals with Vercel Uptime Hosting</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xl leading-normal">
              Need custom private status checking for your corporate API endpoints? Start deploying custom automated monitors running on Vercel networks in 2 clicks.
            </p>
          </div>
          <a
            href="https://vercel.com?utm_source=downorup"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 text-xs font-semibold rounded-xl transition-all shadow-md inline-flex items-center space-x-1"
          >
            <span>Learn More</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

  {/* FAQ Guide Editorial Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100 dark:border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-medium text-2xl text-gray-900 dark:text-white tracking-tight">Status & Network Insights</h2>
          <p className="text-xs text-gray-450 dark:text-gray-500 mt-1">Frequently asked questions about website uptime and networks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-normal">
          <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl space-y-3">
            <h3 className="font-display font-bold text-gray-950 dark:text-gray-100 text-base">Why Do Websites Fail and Go Down?</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
              Most website outages are caused by database connectivity gridlocks, incorrect Nginx route maps, expired secure socket layers (SSL) certificates, or sudden capacity overloads from dynamic traffic surges.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl space-y-3">
            <h3 className="font-display font-bold text-gray-950 dark:text-gray-100 text-base">What Is My Public IP Address?</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
              Your public IP address is a unique identifier assigned by your internet service provider (ISP). It represents your digital location and allows websites and remote servers to route data package returns back to you.
            </p>
            <button onClick={() => onNavigate("/my-ip")} className="text-xs font-semibold text-brand-600 dark:text-amber-400 hover:underline flex items-center space-x-1 pt-1">
              <span>Check My IP</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-850 rounded-3xl space-y-3">
            <h3 className="font-display font-bold text-gray-950 dark:text-gray-100 text-base">How Do Status Checks Work?</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
              Our servers initiate a real-time HTTP handshake probe to the input domain name, measuring round-trip connection times (latency), checking DNS records, verifying SSL status, and analyzing raw response codes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
