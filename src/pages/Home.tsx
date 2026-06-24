import React, { useState, useEffect } from "react";
import { Search, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Bookmark, Copy, Check, ChevronRight, Award, Zap, ShieldCheck, Heart, ThumbsUp, Gamepad2, Briefcase, UserCheck, Star, HelpCircle, ArrowRight, Compass } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { getApiUrl } from "../utils/api";

interface HomeProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface PlatformResult {
  id: string;
  name: string;
  status: "available" | "taken";
  url: string;
}

interface BrandabilityMetrics {
  length: number;
  pronunciation: number;
  memorability: number;
  uniqueness: number;
  professional: number;
  overall: number;
}

interface AlternativeHandle {
  username: string;
  status: "available" | "taken";
  score: number;
}

interface SearchResponse {
  username: string;
  score: number;
  isConsistent: boolean;
  consistencyScore: number;
  brandability: BrandabilityMetrics;
  alternatives: AlternativeHandle[];
  results: PlatformResult[];
  checkedAt: string;
}

export default function Home({ currentPath, onNavigate }: HomeProps) {
  const [inputValue, setInputValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeIdeaCategory, setActiveIdeaCategory] = useState<"gamer" | "business" | "creator" | "startup" | "personal">("personal");

  // Read URL parameters on load (handles /username/alex or landing routing pre-population)
  useEffect(() => {
    const rawSaved = localStorage.getItem("hh-saved-usernames");
    if (rawSaved) {
      try {
        setSavedNames(JSON.parse(rawSaved));
      } catch (e) {}
    }

    // Capture search parameter if provided in query string e.g. /?username=gamer
    const params = new URLSearchParams(window.location.search);
    const userQuery = params.get("username") || params.get("q");
    if (userQuery) {
      setInputValue(userQuery);
      performSearch(userQuery);
    } else if (currentPath.startsWith("/username/")) {
      const parts = currentPath.split("/");
      const extracted = parts[parts.length - 1];
      if (extracted) {
        setInputValue(extracted);
        performSearch(extracted);
      }
    }
  }, [currentPath]);

  // Dynamic programmatic SEO page elements mapper
  const getSEOConfig = () => {
    const path = currentPath;
    if (path === "/instagram-username-checker") {
      return {
        h1: "Instagram Username Checker",
        boldHero: "Check Instagram Handle Availability Instantly",
        subtitle: "Instantly query Instagram account registries, locate active profile handlers, analyze trademark viability, and generate premium alternative nicknames.",
        placeholder: "Enter desired Instagram handle...",
        nicheTip: "Instagram handles must be 30 characters or less and can contain letters, numbers, periods, and underscores."
      };
    }
    if (path === "/tiktok-username-checker") {
      return {
        h1: "TikTok Username Checker",
        boldHero: "Check TikTok Username Availability Instantly",
        subtitle: "Inspect TikTok alias databases concurrently. Secure unique influencer handles, verify consistency and create an optimized digital presence.",
        placeholder: "Enter TikTok profile username...",
        nicheTip: "TikTok nicknames must contain only letters, numbers, underscores, and periods. Changing handles is restricted to once every 30 days."
      };
    }
    if (path === "/youtube-username-checker") {
      return {
        h1: "YouTube Handle Checker",
        boldHero: "Scan YouTube Handle availability",
        subtitle: "Validate custom YouTube Handles (with @ markers) instantly. Avoid trademark duplication risks and find brandable creator options.",
        placeholder: "Enter YouTube custom handle name...",
        nicheTip: "YouTube custom @handles must be between 3 and 30 characters and can only contain alphanumeric characters, underscores, periods, and hyphens."
      };
    }
    if (path === "/x-username-checker") {
      return {
        h1: "X / Twitter Handle Checker",
        boldHero: "Verify X Username Availability",
        subtitle: "Audit active Twitter profile slots in subseconds. Secure microblogging namespaces and guarantee multi-channel compatibility.",
        placeholder: "Enter X / Twitter username...",
        nicheTip: "X / Twitter handles are strictly restricted to 15 characters, alphanumeric letters, and underscores only. Dot characters are prohibited."
      };
    }
    if (path === "/github-username-checker") {
      return {
        h1: "GitHub Repository & Handle Checker",
        boldHero: "Audit GitHub Username Availability",
        subtitle: "Analyze developer namespace availability on GitHub. Discover ideal personal brand aliases, startup portfolio matches, and organization keys.",
        placeholder: "Enter developer GitHub handle...",
        nicheTip: "GitHub usernames must be 39 characters or less, start with an alphanumeric letter, and contain only alphanumeric characters and non-consecutive hyphens."
      };
    }
    if (path === "/reddit-username-checker") {
      return {
        h1: "Reddit Username Checker",
        boldHero: "Scan Reddit Account Availability",
        subtitle: "Check Reddit user databases. Verify pseudonym availability and maintain a cohesive online avatar across networks.",
        placeholder: "Enter Reddit pseudonym...",
        nicheTip: "Reddit user names require between 3 and 20 characters and cannot begin with spaces or contain special characters other than hyphens and underscores."
      };
    }

    // Default general-purpose SEO configs
    return {
      h1: "Check Username Availability Across Social Media",
      boldHero: "Check Username Availability Instantly",
      subtitle: "Find available usernames for Instagram, TikTok, YouTube, X, Reddit, GitHub, Snapchat, Threads, and Pinterest concurrently. Secure a consistent online identity.",
      placeholder: "Enter desired username...",
      nicheTip: "Ready to launch your brand? Enter any string of letters and numbers below to query 10 major social networking platforms in subseconds."
    };
  };

  const seoData = getSEOConfig();

  const performSearch = async (usernameToSearch: string) => {
    const query = usernameToSearch.trim().toLowerCase();
    if (!query) return;

    if (!/^[a-zA-Z0-9_\.-]{1,30}$/.test(query)) {
      setError("Username contains unsupported symbols. Alphanumerics, dots, or underscores only.");
      return;
    }

    setError(null);
    setSearching(true);
    setSearchResult(null);

    const targetUrl = getApiUrl(`/api/check-username?username=${encodeURIComponent(query)}`);
    console.log(`[Username Check] Initiating fetch request to URL: ${targetUrl}`);

    try {
      const resp = await fetch(targetUrl);
      const contentType = resp.headers.get("content-type") || "";
      
      if (resp.ok) {
        if (contentType.includes("application/json")) {
          const data = await resp.json();
          setSearchResult(data);
        } else {
          const text = await resp.text();
          console.error(`[Username Check] Expected JSON response but received content-type "${contentType}". Response text:`, text);
          throw new Error(`Invalid content type from server (Expected JSON, got: ${contentType.split(";")[0]}). Raw output snippet: ${text.substring(0, 100)}`);
        }
      } else {
        let errorMessage = `Server responded with status ${resp.status}`;
        let detailedError = "";
        
        try {
          if (contentType.includes("application/json")) {
            const errJson = await resp.json();
            errorMessage = errJson.error || errorMessage;
            detailedError = JSON.stringify(errJson);
          } else {
            const text = await resp.text();
            errorMessage = `${errorMessage}: ${text.substring(0, 100)}`;
            detailedError = text;
          }
        } catch (parseErr: any) {
          console.error("[Username Check] Failed to parse error response body:", parseErr);
        }
        
        console.error(`[Username Check] Request failed. URL: ${targetUrl}, Status: ${resp.status}, Error: ${errorMessage}, Detailed response:`, detailedError);
        setError(errorMessage);
      }
    } catch (e: any) {
      console.error(`[Username Check] Exception caught during fetch request. URL: ${targetUrl}, Error:`, e);
      setError(`Connection failure: ${e?.message || String(e)}. Please check your network or API endpoint configuration and retry.`);
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(inputValue);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleToggleSave = (name: string) => {
    let updated = [...savedNames];
    if (savedNames.includes(name)) {
      updated = updated.filter(n => n !== name);
    } else {
      updated.push(name);
    }
    localStorage.setItem("hh-saved-usernames", JSON.stringify(updated));
    setSavedNames(updated);
  };

  // Pre-packaged nickname databases supporting category checks
  const curatedNicknames = {
    gamer: [
      "ApexViper", "ZephyrStrike", "NexusGamer", "CyberPhreak", "AlphaRaptor", 
      "VividSpecter", "NovaWarden", "TitanQuantum", "GlitchPaladin", "SilentRogue"
    ],
    business: [
      "BrandCrest", "AlphaSentry", "CoreSynthetics", "ZenithConsult", "ApexStrive", 
      "ModusLabor", "StellarForge", "VeritasBiz", "PrimeCapital", "ElevateConsult"
    ],
    creator: [
      "PixelVlog", "VividFrames", "StudioCrafted", "TheCreativeHQ", "ScribbleVibe", 
      "AuraShaper", "ChronicleHQ", "SonicWeaver", "CanvasWaves", "EchoScribe"
    ],
    startup: [
      "SynergyGrid", "LaunchSlick", "InnoPulse", "BetaMetric", "SproutVenture", 
      "ScaleMetric", "VectraLabs", "FluxInnovate", "HatchSmart", "SprintOrbit"
    ],
    personal: [
      "TheRealJohn", "AlexHQ", "SarahOfficial", "TechRishi", "GamerAlex", 
      "CodeSarah", "DesignRishi", "CuriousJohn", "MindfulAlex", "VibeSarah"
    ]
  };

  return (
    <div className="bg-slate-50/40 dark:bg-slate-950 transition-all duration-300 min-h-screen relative overflow-hidden" id="homepage-root">
      
      {/* Absolute Backdrop ambient accent circles to fit Stripe/Linear design style */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[32rem] h-[32rem] bg-purple-600/5 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[24rem] h-[24rem] bg-teal-600/5 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-blue-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 mb-4 animate-scale-in">
            <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
            <span>Next-Generation AI Handle Allocation</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            {seoData.boldHero}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4 leading-relaxed max-w-2xl mx-auto font-sans">
            {seoData.subtitle}
          </p>
        </div>

        {/* COMPREHENSIVE SEARCH SHELF CONTROL */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white dark:bg-slate-900 border border-gray-200/60 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-indigo-500/5 hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300">
            <form onSubmit={handleSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={seoData.placeholder}
                maxLength={30}
                required
                className="w-full text-base font-semibold py-3.5 pl-12 pr-32 bg-gray-55 dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/25 focus:border-purple-500 outline-hidden dark:text-white transition-all font-mono"
              />
              <button
                type="submit"
                disabled={searching}
                className="absolute right-2 top-2 bottom-2 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 rounded-xl font-semibold text-xs transition-all flex items-center space-x-1.5 disabled:opacity-50 active:scale-95 shadow-md shadow-indigo-600/10"
              >
                {searching ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Search Handle</span>
                  </>
                )}
              </button>
            </form>

            {/* Verification Niche Help Line */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-mono leading-relaxed px-1">
              {seoData.nicheTip}
            </p>

            {/* Clickable Quick Example Tags */}
            <div className="flex flex-wrap gap-2 items-center mt-4">
              <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 uppercase">Examples:</span>
              {["johnsmith", "coolgamer", "techstartup"].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setInputValue(tag);
                    performSearch(tag);
                  }}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-gray-50 dark:bg-slate-950 border border-gray-200/40 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/20 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Form Error Message Segment */}
          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center space-x-2 animate-scale-in font-mono">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* LOADING ANIMATION SKELETON */}
        {searching && (
          <div className="max-w-5xl mx-auto space-y-6 py-6 animate-pulse" id="loading-skeleton">
            <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="h-28 w-28 rounded-full bg-gray-100 dark:bg-slate-800 animate-spin" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-48 bg-gray-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-full bg-gray-150 dark:bg-slate-850 rounded-md" />
                <div className="h-4 w-3/4 bg-gray-155 dark:bg-slate-850 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, idx) => (
                <div key={idx} className="h-20 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl" />
              ))}
            </div>
          </div>
        )}

        {/* DETAILED RESULTS DASHBOARD REPORT (Core Application Layout) */}
        {searchResult && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in" id="report-view">
            
            {/* 1. MATCH SCORE & CONSISTENCY OVERVIEW CARD */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Score gauge circle section */}
                <div className="flex items-center space-x-6 shrink-0">
                  <div className="relative h-28 w-28 flex items-center justify-center bg-gray-50 dark:bg-slate-950 rounded-full border border-gray-100 dark:border-slate-800 shadow-inner">
                    <svg className="absolute inset-0 transform -rotate-95 w-full h-full p-1.5" viewBox="0 0 36 36">
                      <path
                        className="text-gray-150 dark:text-slate-800"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-indigo-600 dark:text-purple-400 transition-all duration-1000 ease-out"
                        strokeWidth="2.5"
                        strokeDasharray={`${searchResult.score}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="text-center z-10 leading-none">
                      <span className="text-3xl font-display font-black text-gray-900 dark:text-white block">
                        {searchResult.score}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-400 mt-1 block">
                        Score
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                        Availability Assessment
                      </h3>
                      <button 
                        onClick={() => handleToggleSave(searchResult.username)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          savedNames.includes(searchResult.username)
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-gray-50 hover:bg-gray-100 dark:bg-transparent dark:hover:bg-slate-800 text-gray-500 border-gray-100 dark:border-slate-800"
                        }`}
                        title="Bookmark handle"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 max-w-md">
                      Is <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">@{searchResult.username}</span> available? 
                      {searchResult.score >= 80 
                        ? " Pristine online compatibility! Claim this username immediately across social nodes." 
                        : searchResult.score >= 40 
                          ? " Partially taken. Perfect name, but require some modifications to get consistent handles." 
                          : " Heavily occupied handle registration. Use our AI recommended alternatives below to optimize."
                      }
                    </p>
                  </div>
                </div>

                {/* Crossplatform consistency checker */}
                <div className="w-full lg:w-72 p-4 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 text-xs text-sans space-y-2.5">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-2">
                    <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase font-semibold">Consistency Check</span>
                    <span className={`font-semibold px-2 py-0.5 rounded-md ${
                      searchResult.isConsistent ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {searchResult.isConsistent ? "IDEAL MATCH" : "ADAPT REQUIRED"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Cross-Platform Consistent?</span>
                    <span className="font-bold text-gray-900 dark:text-white">{searchResult.isConsistent ? "YES" : "NO"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Global Alignment Index:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{searchResult.consistencyScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PLATFORM CHECKS GRID RESULTS */}
            <div>
              <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 uppercase block mb-3.5 tracking-widest px-1">
                Concurrently Checked Registries
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {searchResult.results.map((r) => {
                  const available = r.status === "available";
                  return (
                    <div
                      key={r.id}
                      className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:scale-[1.02] duration-200 transition-all shadow-xs relative overflow-hidden"
                    >
                      {/* Ambient corner status highlight color */}
                      <div className={`absolute top-0 right-0 h-1.5 w-1.5 rounded-bl-lg ${available ? "bg-emerald-500" : "bg-slate-400"}`} />

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-150 font-display">
                          {r.name}
                        </span>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer referrerPolicy"
                          className="text-[10px] font-semibold text-blue-500 dark:text-indigo-400 hover:underline inline-flex items-center space-x-0.5"
                        >
                          <span>Direct Profile</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className={`text-[11px] font-mono font-black uppercase rounded-lg px-2 py-1 leading-none ${
                          available 
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                            : "bg-gray-100 text-gray-400 dark:bg-slate-950 dark:text-gray-500 border border-transparent"
                        }`}>
                          {available ? "Available" : "Taken"}
                        </span>
                        <button
                          onClick={() => handleCopy(r.url)}
                          className="p-1 text-gray-400 hover:text-gray-650 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-slate-955 transition-colors"
                          title="Copy direct link"
                        >
                          {copiedText === r.url ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AD BANNER CONTAINER - FIRST AD AFTER RESULTS (CLS optimized) */}
            <div className="my-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-linear-to-r from-violet-500/5 to-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="inline-block bg-indigo-500/10 text-indigo-500 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold mb-1">
                  AFFILIATE STRATEGIC PARTNER
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Need legal trademark security for @{searchResult.username}?</p>
                <p className="text-[11px] text-slate-400">File official state trademarks, domain locks, and entity registration with LegalZoom to prevent corporate hijackers.</p>
              </div>
              <a 
                href="https://www.legalzoom.com/"
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap inline-flex items-center justify-center p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 cursor-pointer"
              >
                File Trademark Now
              </a>
            </div>

            {/* 3. AI BRANDABILITY AUDIT REPORT SHELF */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-2.5 border-b border-gray-100 dark:border-slate-800 pb-4 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white">AI Brandability Audit Reports</h4>
                  <p className="text-xs text-gray-400">Continuous phonetic matching and evaluation models for @{searchResult.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visual Bar Columns */}
                <div className="space-y-4">
                  {[
                    { label: "Pronunciation Index", value: searchResult.brandability.pronunciation, desc: "Fluid vocal transitions and low syllable collision frequency." },
                    { label: "Memorability Score", value: searchResult.brandability.memorability, desc: "Cognitive persistence. Ease of recall without spelling lookups." },
                    { label: "Length Suitability", value: searchResult.brandability.length, desc: "Character density. Compact identifiers yield cleaner UI templates." },
                    { label: "Uniqueness Factor", value: searchResult.brandability.uniqueness, desc: "Market isolation. Stands out from generic or corporate names." },
                    { label: "Professional Persona", value: searchResult.brandability.professional, desc: "Authority factor. High corporate compatibility for pitch meetings." }
                  ].map((bar) => (
                    <div key={bar.label} className="space-y-1.5 text-xs text-sans">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-700 dark:text-gray-300">{bar.label}</span>
                        <span className="font-mono text-purple-600 dark:text-purple-400">{bar.value}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-950 pr-0.5 rounded-full h-2 overflow-hidden flex">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${bar.value}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">{bar.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Overall Verdict block */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block font-semibold">Analytical Verdict</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {searchResult.brandability.overall}%
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-400">OVERALL</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Phonetic parser scans suggest this name holds {searchResult.brandability.overall >= 80 ? "elite branding capacity. Pristine resonance, instantly professional, extremely easy to pronounce and retain." : searchResult.brandability.overall >= 60 ? "solid performance. Good potential, though special characters or slightly elongated letters reduce maximum cognitive recall parameters." : "suboptimal branding capabilities. High complexity makes it difficult for mainstream audiences to remember or catalog."}
                    </p>
                  </div>

                  <div className="border-t border-gray-150 dark:border-slate-850/60 pt-4 mt-6">
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold block mb-2">Platform Registration Tips</span>
                    <ul className="text-xs text-gray-500 space-y-1 pl-4 list-disc">
                      <li>Secure .com domains matching this nickname if possible.</li>
                      <li>Avoid consecutive underscores or punctuation markers.</li>
                      <li>Maintain matching avatars across all checked networks.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. AI USERNAME RECOMMENDATIONS / ALTERNATIVES GENERATOR */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-2.5 border-b border-gray-100 dark:border-slate-800 pb-4 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white">AI Brand Alternative Recommendations</h4>
                  <p className="text-xs text-gray-400">If your name is taken, secure these highly viable, optimized combinations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResult.alternatives.map((alt) => (
                  <div
                    key={alt.username}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-55 dark:bg-slate-950 border border-gray-200/40 dark:border-slate-850 hover:border-purple-500/40 dark:hover:border-purple-400/30 transition-all duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                        @{alt.username}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[9px] font-mono text-gray-400">Brand: {alt.score}/100</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${alt.status === "available" ? "bg-emerald-500" : "bg-slate-300"}`} />
                        <span className="text-[9px] font-semibold uppercase text-gray-400">{alt.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          setInputValue(alt.username);
                          performSearch(alt.username);
                        }}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-gray-150 dark:hover:border-slate-850 duration-150 transition-colors"
                        title="Search handle"
                      >
                        Search
                      </button>
                      <button
                        onClick={() => handleToggleSave(alt.username)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          savedNames.includes(alt.username)
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-gray-50 hover:bg-gray-100 dark:bg-slate-900 text-gray-500 border-gray-150 dark:border-slate-850"
                        }`}
                        title="Bookmark handle"
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(alt.username)}
                        className="p-1.5 rounded-lg border border-gray-150 dark:border-slate-850 hover:bg-gray-100 dark:hover:bg-slate-900 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                        title="Copy text"
                      >
                        {copiedText === alt.username ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 5. INTERACTIVE NICKNAMES IDEAS GENERATOR (Bento-Grid layout) */}
        {!searchResult && !searching && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in mb-16" id="nickname-generator-shelf">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
                AI Nickname & Username Category Ideas
              </h2>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                Explore available brandable handles pre-clustered across specialized creators domains. Click to query or copy.
              </p>
            </div>

            {/* Selector Categories buttons */}
            <div className="flex flex-wrap justify-center gap-1.5 border-b border-gray-200/50 dark:border-slate-800 pb-3">
              {[
                { id: "personal", label: "Personal Branding", icon: UserCheck },
                { id: "gamer", label: "Gaming Alignments", icon: Gamepad2 },
                { id: "creator", label: "Creative Media", icon: CupIcon },
                { id: "business", label: "Corporate Business", icon: Briefcase },
                { id: "startup", label: "High Growth Startups", icon: Zap }
              ].map((cat) => {
                const active = activeIdeaCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveIdeaCategory(cat.id as any)}
                    className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 select-none ${
                      active
                        ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/10"
                        : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-850"
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Curated handles grid list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {curatedNicknames[activeIdeaCategory].map((nick) => (
                <div
                  key={nick}
                  className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-850/80 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/40 dark:hover:border-purple-400/20 duration-150 text-center shadow-xs"
                >
                  <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                    @{nick}
                  </span>
                  <div className="flex items-center justify-center space-x-1 mt-4">
                    <button
                      onClick={() => {
                        setInputValue(nick);
                        performSearch(nick);
                      }}
                      className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-indigo-100"
                    >
                      Check now
                    </button>
                    <button
                      onClick={() => handleCopy(nick)}
                      className="p-1 px-1.5 rounded-lg border border-gray-150 dark:border-slate-850 hover:bg-gray-50 text-gray-400 hover:text-gray-700"
                    >
                      {copiedText === nick ? <Check className="h-3 w-3 text-emerald-505" /> : <Copy className="h-3 w-3" />}
                    </button>
                    <button
                      onClick={() => handleToggleSave(nick)}
                      className={`p-1 px-1.5 rounded-lg border transition-colors ${
                        savedNames.includes(nick)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-gray-50 dark:bg-slate-950 border-gray-150 dark:border-slate-850 text-gray-400"
                      }`}
                    >
                      <Bookmark className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CONTENT STRATEGY - ARTICLE KNOWLEDGE BASE */}
        <div className="max-w-5xl mx-auto border-t border-gray-200/40 dark:border-slate-800 pt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xs font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-2">
              Branding Guides & Masterclass Tutorials
            </h2>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
              Perfecting Digital Identity Management
            </h3>
            <p className="text-xs sm:text-xs text-gray-500 mt-2">
              Learn how global creators synchronize handles, audit trademarks, and defend namespaces against squatters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Guide 1 */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-850 p-6 rounded-2xl space-y-3">
              <span className="font-mono text-[10px] text-indigo-500 bg-indigo-50 dark:bg-slate-950 px-2 py-0.5 rounded-md font-bold uppercase">
                Creator Tips
              </span>
              <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white leading-snug">
                How To Choose The Perfect Username for Social Media
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Branding begins with visual clarity. Discover the three fundamental principles of modern alias naming: syllable brevity, absence of continuous punctuations, and phonetics. Keep character lengths small to fit compact smartphone templates.
              </p>
              <button 
                onClick={() => onNavigate("/methodology")} 
                className="text-xs text-blue-600 font-semibold inline-flex items-center hover:underline pt-2"
              >
                <span>Read entire strategy</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </div>

            {/* Guide 2 */}
            <div className="bg-white dark:bg-slate-900 border border-gray-250/50 dark:border-slate-850 p-6 rounded-2xl space-y-3">
              <span className="font-mono text-[10px] text-purple-500 bg-purple-50 dark:bg-slate-950 px-2 py-0.5 rounded-md font-bold uppercase">
                Factual FAQ
              </span>
              <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white leading-snug">
                How To Secure The Exact Same Handle Everywhere
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Finding a consistent prefix across YouTube, Instagram, and TikTok can be daunting. Try combining optimized suffixes (like <strong>"hq"</strong>, <strong>"studio"</strong>, or <strong>"co"</strong>) or prefixes (such as <strong>"real"</strong>) to achieve maximum alignment.
              </p>
              <button 
                onClick={() => onNavigate("/how-checked")}
                className="text-xs text-blue-600 font-semibold inline-flex items-center hover:underline pt-2"
              >
                <span>Read complete tutorial</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </div>

            {/* Guide 3 */}
            <div className="bg-white dark:bg-slate-900 border border-gray-250/50 dark:border-slate-850 p-6 rounded-2xl space-y-3 col-span-1 md:col-span-2 lg:col-span-1">
              <span className="font-mono text-[10px] text-teal-500 bg-teal-50 dark:bg-slate-950 px-2 py-0.5 rounded-md font-bold uppercase">
                Law & Trademarks
              </span>
              <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white leading-snug">
                Handling Social Media Username Squatters Safely
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Did a squatter claim your official corporate trademark nick? Understand the registration dispute procedures for Instagram and Facebook. Learn when to submit trademark requests or negotiate for transfers.
              </p>
              <button 
                onClick={() => onNavigate("/editorial-policy")}
                className="text-xs text-blue-600 font-semibold inline-flex items-center hover:underline pt-2"
              >
                <span>Read regulatory guide</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </div>

          </div>

          {/* FAQS DETAILED SCHEMA SYSTEM ACROSS PAGES */}
          <div className="mt-12 bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-850 p-6 sm:p-8 rounded-3xl space-y-6">
            <h4 className="font-display font-bold text-base text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3">
              Frequently Asked Legal & Branding Questions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <span className="font-bold text-gray-800 dark:text-gray-200 block">Q: Can I claim a username that is registered but inactive?</span>
                <p className="text-gray-500">A: Most networks do not allow manual claims for inactive names unless you hold a direct, matching trademark certificate showing active copyright infringement. Simply waiting for platform name flushes is recommended.</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-gray-800 dark:text-gray-200 block">Q: Does checking a handle register it instantly?</span>
                <p className="text-gray-500">A: No. Unlike shady registrar brokers that front-run names, HandleHunt operates under a zero-telemetry caching guarantee. Your searches are kept anonymous and not logged for buyout queries.</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-gray-800 dark:text-gray-200 block">Q: Why are short usernames always taken?</span>
                <p className="text-gray-500">A: Short user IDs containing 3 to 4 characters hold hyper scarcity. Millions of early accounts have locked these names permanently since early 2012.</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-gray-800 dark:text-gray-200 block">Q: Is it illegal to sell a social handle?</span>
                <p className="text-gray-500">A: Most platforms forbid the direct commercial resale and sale of accounts in their terms of service, which can result in lifetime account bans. Trade carefully.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Convenient dummy cup icon fallback to guard lucide loading
function CupIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="14" y1="2" y2="2" />
    </svg>
  );
}
