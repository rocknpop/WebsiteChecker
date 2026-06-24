import React, { useState, useEffect } from "react";
import { 
  Search, Sparkles, CheckCircle2, AlertCircle, XCircle, ChevronRight, 
  Award, Zap, ShieldCheck, Heart, ThumbsUp, Star, HelpCircle, 
  ArrowRight, BookOpen, Clock, AlertTriangle, TrendingUp, DollarSign,
  User, Check, AlertOctagon, HelpCircle as HelpIcon, ArrowLeft
} from "lucide-react";
import { getApiUrl } from "../utils/api";
import { useSEO } from "../hooks/useSEO";

interface HomeProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface FAQ {
  question: string;
  answer: string;
}

interface DecisionReport {
  query: string;
  verdict: "UP" | "NEUTRAL" | "DOWN";
  confidenceScore: number;
  summary: string;
  pros: string[];
  cons: string[];
  difficulty: number;
  cost: number;
  timeToResults: string;
  riskLevel: "Low" | "Medium" | "High";
  potentialReward: "Low" | "Medium" | "High" | "Very High";
  recommendedFor: string;
  notRecommendedFor: string;
  reasoning: string;
  faqs: FAQ[];
  timestamp?: string;
}

interface LoggedDecision {
  query: string;
  verdict: "UP" | "NEUTRAL" | "DOWN";
  timestamp: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  content: string;
}

const POPULAR_CHIPS = [
  "Start Amazon KDP",
  "Start Dropshipping",
  "Learn Python",
  "Move Abroad",
  "Start Freelancing",
  "Buy ChatGPT Plus",
  "Start a YouTube Channel",
  "Become a Data Analyst",
  "Create a SaaS Product",
  "Start an AI Agency"
];

const PRE_DEFINED_SEO_QUERIES: Record<string, string> = {
  "should-i-become-software-engineer": "Should I become a software engineer?",
  "should-i-become-data-analyst": "Should I become a data analyst?",
  "should-i-learn-cybersecurity": "Should I learn cybersecurity?",
  "should-i-become-ux-designer": "Should I become a UX designer?",
  "should-i-start-amazon-kdp": "Should I start Amazon KDP?",
  "should-i-start-print-on-demand": "Should I start print-on-demand?",
  "should-i-start-dropshipping": "Should I start dropshipping?",
  "should-i-become-freelancer": "Should I become a freelancer?",
  "should-i-start-ai-agency": "Should I start an AI agency?",
  "should-i-build-saas-product": "Should I build a SaaS product?",
  "should-i-start-blogging": "Should I start blogging?",
  "should-i-create-newsletter": "Should I create a newsletter?",
  "should-i-get-mba": "Should I get an MBA?",
  "should-i-learn-coding": "Should I learn coding?",
  "should-i-learn-python": "Should I learn Python?",
  "should-i-study-abroad": "Should I study abroad?",
  "should-i-buy-macbook": "Should I buy a MacBook Pro?",
  "should-i-buy-chatgpt-plus": "Should I buy ChatGPT Plus?",
  "should-i-buy-gaming-pc": "Should I buy a gaming PC?"
};

export default function Home({ currentPath, onNavigate }: HomeProps) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [report, setReport] = useState<DecisionReport | null>(null);
  const [recentDecisions, setRecentDecisions] = useState<LoggedDecision[]>([]);
  
  // Blog-related state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Accordion active FAQ index
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  // Dynamic SEO hooks values
  const [seoTitle, setSeoTitle] = useState("DownOrUp.net - AI Decision Platform");
  const [seoDesc, setSeoDesc] = useState("Get instant AI-powered evaluation reports and verdicts before making career, side hustle, business, purchase, or educational decisions. Should you do it?");

  // Render schema configurations
  const [schemaData, setSchemaData] = useState<object[]>([]);

  useSEO({
    title: seoTitle,
    description: seoDesc,
    schemas: schemaData
  });

  // Dynamic loading messages for engaging feel
  const loadingSteps = [
    "Spinning up decision engine nodes...",
    "Scanning market datasets for 2026 conditions...",
    "Evaluating competitive saturation indexes...",
    "Calculating cost-to-difficulty multipliers...",
    "Synthesizing dynamic strategic outlook...",
    "Drafting detailed pros, cons, and FAQs..."
  ];

  // Fetch recent queries from server
  const fetchRecentDecisions = async () => {
    try {
      const resp = await fetch(getApiUrl("/api/recent-decisions"));
      if (resp.ok) {
        const data = await resp.json();
        setRecentDecisions(data);
      }
    } catch (e) {
      console.warn("Failed to retrieve recent decisions log:", e);
    }
  };

  // Fetch blog posts from server
  const fetchBlogPosts = async () => {
    try {
      const resp = await fetch(getApiUrl("/api/blog-posts"));
      if (resp.ok) {
        const data = await resp.json();
        setBlogPosts(data);
      }
    } catch (e) {
      console.warn("Failed to retrieve blog posts:", e);
    }
  };

  // Sync state on load & path change
  useEffect(() => {
    fetchRecentDecisions();
    fetchBlogPosts();

    // Check if currentPath indicates a blog post slug
    if (currentPath.startsWith("/blog/")) {
      const slug = currentPath.substring("/blog/".length);
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        setSelectedPost(post);
        updateSeoForBlogPost(post);
      } else {
        // Retrieve single post directly from API
        fetchSingleBlogPost(slug);
      }
      setReport(null);
    } else if (currentPath === "/blog") {
      setSelectedPost(null);
      setReport(null);
      setSeoTitle("Expert Strategic Advice & Business Insights Blog - DownOrUp.net");
      setSeoDesc("Read authoritative, data-driven analyses on the best side hustles, software tools, Python applications, and AI agencies thriving in 2026.");
    } else {
      setSelectedPost(null);
      
      // Determine if path is a programmatic SEO route (e.g. /should-i-start-youtube-channel)
      const pathSlug = currentPath.replace("/", "").toLowerCase();
      if (PRE_DEFINED_SEO_QUERIES[pathSlug]) {
        const queryText = PRE_DEFINED_SEO_QUERIES[pathSlug];
        setInputValue(queryText);
        performAnalysis(queryText);
      } else if (pathSlug.startsWith("should-")) {
        // Parse raw slug to readable text e.g. should-i-move-abroad -> "Should I move abroad?"
        let queryText = pathSlug
          .replace(/-/g, " ")
          .replace(/^should\s/i, "Should ")
          .replace(/\bi\b/g, "I");
        
        // capitalize letters and append ?
        queryText = queryText.charAt(0).toUpperCase() + queryText.slice(1) + "?";
        setInputValue(queryText);
        performAnalysis(queryText);
      } else {
        // Standard home page load
        setReport(null);
        setSeoTitle("DownOrUp.net – Should You Do It? AI Decision Platform");
        setSeoDesc("Get instant AI-powered analysis before making important decisions. The website evaluates business ideas, careers, purchases, side hustles, and investments.");
      }
    }
  }, [currentPath, blogPosts.length]);

  // Handle step-wise loading animations
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const fetchSingleBlogPost = async (slug: string) => {
    try {
      const resp = await fetch(getApiUrl(`/api/blog-posts/${slug}`));
      if (resp.ok) {
        const post = await resp.json();
        setSelectedPost(post);
        updateSeoForBlogPost(post);
      }
    } catch (e) {
      console.error("Failed to load blog post details:", e);
    }
  };

  const updateSeoForBlogPost = (post: BlogPost) => {
    setSeoTitle(`${post.title} - DownOrUp.net Blog`);
    setSeoDesc(post.excerpt);
    setSchemaData([
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": "2026-06-24",
        "author": {
          "@type": "Organization",
          "name": "DownOrUp.net"
        }
      }
    ]);
  };

  const performAnalysis = async (queryText: string) => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const resp = await fetch(getApiUrl("/api/analyze-decision"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText })
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${resp.status}`);
      }

      const reportData: DecisionReport = await resp.json();
      setReport(reportData);

      // Dynamically update SEO tags based on AI report contents
      const titleSuffix = reportData.verdict === "UP" ? "✅ Go For It!" : reportData.verdict === "DOWN" ? "❌ Proceed with Caution" : "⚠️ Evaluate Carefully";
      setSeoTitle(`Is ${reportData.query} Worth It in 2026? [Verdict: ${reportData.verdict}] – DownOrUp.net`);
      setSeoDesc(reportData.summary);

      // Inject structured schemas: FAQPage Schema + WebApplication Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": reportData.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };

      const appSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `AI Decision Evaluator: ${reportData.query}`,
        "description": reportData.summary,
        "applicationCategory": "EducationalApplication",
        "browserRequirements": "Requires JavaScript. Requires HTML5."
      };

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": window.location.origin },
          { "@type": "ListItem", "position": 2, "name": "Decision Analysis", "item": window.location.href }
        ]
      };

      setSchemaData([faqSchema, appSchema, breadcrumbSchema]);
      fetchRecentDecisions(); // update the list
    } catch (e: any) {
      console.error("Analysis retrieval failed:", e);
      setError(e?.message || "Failed to parse strategic report. Check internet connectivity and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Convert query into a beautiful programmatic URL to support programatic routing
    let slug = inputValue.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    
    if (!slug.startsWith("should-")) {
      slug = `should-${slug}`;
    }

    // Set URL and path nicely
    window.history.pushState({}, "", `/${slug}`);
    onNavigate(`/${slug}`);
    performAnalysis(inputValue.trim());
  };

  const handleChipClick = (chipText: string) => {
    let fullQuery = chipText;
    if (!fullQuery.toLowerCase().startsWith("should")) {
      fullQuery = `Should I ${chipText.charAt(0).toLowerCase() + chipText.slice(1)}?`;
    }
    setInputValue(fullQuery);
    
    let slug = chipText.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    if (!slug.startsWith("should-i-") && !slug.startsWith("should-you-") && !slug.startsWith("should-")) {
      slug = `should-i-${slug}`;
    }

    window.history.pushState({}, "", `/${slug}`);
    onNavigate(`/${slug}`);
    performAnalysis(fullQuery);
  };

  // Helper to determine text colors and icons based on verdict
  const getVerdictMetadata = (verdict: "UP" | "NEUTRAL" | "DOWN") => {
    switch (verdict) {
      case "UP":
        return {
          icon: <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-pulse" />,
          color: "text-emerald-500 dark:text-emerald-400",
          bg: "bg-emerald-500/10 border-emerald-500/30 dark:border-emerald-500/20",
          title: "UP ✅",
          subtitle: "Highly Viable / Strong Opportunity",
          badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        };
      case "NEUTRAL":
        return {
          icon: <AlertTriangle className="w-12 h-12 text-amber-500 animate-bounce" />,
          color: "text-amber-500 dark:text-amber-400",
          bg: "bg-amber-500/10 border-amber-500/30 dark:border-amber-500/20",
          title: "NEUTRAL ⚠️",
          subtitle: "Proceed with Caution / High Friction",
          badgeBg: "bg-amber-500/20 text-amber-400 border-amber-500/30"
        };
      case "DOWN":
        return {
          icon: <XCircle className="w-12 h-12 text-red-500 animate-wiggle" />,
          color: "text-red-500 dark:text-red-400",
          bg: "bg-red-500/10 border-red-500/30 dark:border-red-500/20",
          title: "DOWN ❌",
          subtitle: "High Risk / Poor Outlook / Saturated",
          badgeBg: "bg-red-500/20 text-red-400 border-red-500/30"
        };
    }
  };

  // Filtered Blog List rendering
  const filteredBlogPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const categories = ["All", "Careers", "Side Hustles", "Business"];

  // RENDER BLOG VIEW
  if (currentPath.startsWith("/blog") || selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12" id="blog-viewport">
        {selectedPost ? (
          /* BLOG POST DETAIL VIEW */
          <div className="space-y-8 animate-fade-in">
            <button 
              onClick={() => {
                setSelectedPost(null);
                window.history.pushState({}, "", "/blog");
                onNavigate("/blog");
              }} 
              className="flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to blog library</span>
            </button>

            <article className="bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-100 dark:bg-blue-900/45 text-blue-700 dark:text-blue-400 text-xs px-2.5 py-1 rounded-md font-semibold">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPost.readTime}
                </span>
                <span className="text-xs text-slate-400 font-mono">• {selectedPost.publishedAt}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {selectedPost.title}
              </h1>

              <div className="h-px bg-slate-100 dark:bg-slate-900" />

              {/* Rich Markdown styled output */}
              <div className="text-slate-700 dark:text-slate-200 leading-relaxed text-base space-y-5">
                {selectedPost.content.split("\n\n").map((para, i) => {
                  if (para.trim().startsWith("###")) {
                    return (
                      <h3 key={i} className="text-xl font-bold text-slate-900 dark:text-white pt-4">
                        {para.replace("###", "").trim()}
                      </h3>
                    );
                  }
                  if (para.trim().startsWith("1.")) {
                    return (
                      <div key={i} className="pl-4 border-l-2 border-indigo-500 space-y-2 py-1">
                        {para.split("\n").map((line, li) => (
                          <p key={li} className="font-medium text-slate-800 dark:text-slate-200">{line.trim()}</p>
                        ))}
                      </div>
                    );
                  }
                  return <p key={i} className="whitespace-pre-line">{para.trim()}</p>;
                })}
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-900 pt-6" />

              <div className="bg-slate-50 dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Evaluate a related decision?</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Test any idea instantly with our state-of-the-art decision engine.</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedPost(null);
                    window.history.pushState({}, "", "/");
                    onNavigate("/");
                  }} 
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Central Engine
                </button>
              </div>
            </article>
          </div>
        ) : (
          /* BLOG DIRECTORY VIEW */
          <div className="space-y-10 animate-fade-in">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                DownOrUp.net <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-amber-500 dark:from-blue-400 dark:via-cyan-450 dark:to-yellow-300 bg-clip-text text-transparent font-black">Decision Insights</span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Authoritative, objective guides analyzing the actual costs, risk metrics, and structural potential of the most searched side projects and careers in 2026.
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 border-b border-slate-100 dark:border-slate-900 pb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post Lists Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredBlogPosts.map(post => (
                <article 
                  key={post.id} 
                  className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-0.5 duration-200 transition-all group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-semibold">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      window.history.pushState({}, "", `/blog/${post.slug}`);
                      onNavigate(`/blog/${post.slug}`);
                    }}
                    className="flex items-center text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 mt-5 cursor-pointer"
                  >
                    <span>Read full report</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 duration-150 transition-transform" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // RENDER PRIMARY DECISION ENGINE
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="main-viewport">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* HERO HERO TITLE BLOCK */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold tracking-wide font-mono animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>DownOrUp.net AI Decision Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-none">
          Should You <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-amber-500 dark:from-blue-400 dark:via-cyan-450 dark:to-yellow-300 bg-clip-text text-transparent">Do It?</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
          Get instant, hyper-realistic, objective AI evaluations before launching side projects, buying gear, or making crucial career and lifestyle choices in 2026.
        </p>
      </div>

      {/* CENTRAL PROMPT FORM BLOCK */}
      <div className="max-w-2xl mx-auto mb-10">
        <form onSubmit={handleFormSubmit} className="relative group p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-xl flex items-center transition-all focus-within:ring-2 focus-within:ring-blue-500/30">
          <div className="flex-1 flex items-center pl-3">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., Should I start a faceless YouTube channel in 2026?"
              className="w-full bg-transparent border-0 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm py-2 pl-2 outline-hidden"
              disabled={loading}
              aria-label="Input decision query"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/40 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center space-x-1.5 cursor-pointer disabled:pointer-events-none"
          >
            <span>Analyze Decision</span>
          </button>
        </form>

        {/* POPULAR suggestions chips row */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {POPULAR_CHIPS.map(chip => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className="px-3 py-1 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-850/80 rounded-full text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC ANALYSIS REPORT LOADER */}
      {loading && (
        <div className="max-w-2xl mx-auto py-16 text-center space-y-6 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-900 shadow-xl animate-pulse">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Analyzing Decision Trajectory</h3>
            <p className="text-xs text-blue-500 dark:text-blue-400 font-semibold font-mono animate-bounce">
              {loadingSteps[loadingStep]}
            </p>
          </div>
        </div>
      )}

      {/* STRATEGIC ERROR VIEW */}
      {error && (
        <div className="max-w-xl mx-auto p-5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start space-x-3.5 mb-10">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-red-600 dark:text-red-400">Analysis Error</h4>
            <p className="text-xs text-red-500 mt-0.5 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* STRATEGIC REPORT DISPLAY VIEW */}
      {report && !loading && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in mb-16" id="report-view">
          
          {/* VERDICT TOP BANNER */}
          {(() => {
            const meta = getVerdictMetadata(report.verdict);
            return (
              <div className={`p-6 sm:p-8 rounded-3xl border ${meta.bg} flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs`}>
                <div className="flex items-center space-x-5 text-center sm:text-left flex-col sm:flex-row">
                  {meta.icon}
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">AI STRATEGIC VERDICT</span>
                    <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${meta.color} mt-0.5`}>
                      {meta.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold font-mono tracking-wide mt-1">
                      {meta.subtitle}
                    </p>
                  </div>
                </div>

                {/* CONFIDENCE BAR METER */}
                <div className="w-full sm:w-48 bg-slate-200 dark:bg-slate-800 p-4.5 rounded-2xl border border-slate-300/30 dark:border-slate-700/85 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-1 text-[11px] font-mono font-bold text-slate-500">
                    <span>CONFIDENCE</span>
                    <span>{report.confidenceScore}%</span>
                  </div>
                  <div className="w-full bg-slate-300 dark:bg-slate-850 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${report.confidenceScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TWO COLUMN SUMMARY & METRICS GRID */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* CONCISE OVERVIEW SUMMARY */}
            <div className="col-span-2 bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/85 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-wider font-bold text-indigo-500 dark:text-blue-450 uppercase">EXECUTIVE SUMMARY</span>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
                  {report.summary}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/85 w-fit">
                <Clock className="w-3.5 h-3.5" />
                <span>Analyzed on {report.timestamp ? new Date(report.timestamp).toLocaleDateString() : "June 2026"}</span>
              </div>
            </div>

            {/* QUICK SCORES SIDEBAR */}
            <div className="col-span-1 bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-xs space-y-4">
              <span className="text-[10px] font-mono tracking-wider font-bold text-cyan-500 dark:text-cyan-400 block uppercase mb-1">SCORE METRICS</span>
              
              {/* DIFFICULTY */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>Difficulty Index</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{report.difficulty}/10</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${report.difficulty * 10}%` }} />
                </div>
              </div>

              {/* COST */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>Capital/Cost Required</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{report.cost}/10</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${report.cost * 10}%` }} />
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 pt-1" />

              {/* THREE DYNAMIC LABELS */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-300">Risk Profile:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{report.riskLevel}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-300">Potential Return:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{report.potentialReward}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-300">Time Horizon:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{report.timeToResults}</span>
                </div>
              </div>
            </div>

          </div>

          {/* PROS & CONS SPLIT CARDS GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* PROS CARD */}
            <div className="bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-xs space-y-4">
              <span className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-xs px-2.5 py-1 rounded-md border border-emerald-500/20 font-bold uppercase tracking-wider font-mono">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Primary Advantages</span>
              </span>
              <ul className="space-y-3">
                {report.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 dark:text-slate-100 leading-relaxed">
                    <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0 bg-emerald-500/10 rounded p-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONS CARD */}
            <div className="bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-xs space-y-4">
              <span className="inline-flex items-center space-x-1.5 bg-red-500/10 text-red-500 dark:text-red-400 text-xs px-2.5 py-1 rounded-md border border-red-500/20 font-bold uppercase tracking-wider font-mono">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Primary Disadvantages</span>
              </span>
              <ul className="space-y-3">
                {report.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 dark:text-slate-100 leading-relaxed">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0 bg-red-500/10 rounded p-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* AUDIENCE PROFILES */}
          <div className="bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-xs grid sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-widest font-mono">Recommended For</h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{report.recommendedFor}</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-widest font-mono">Not Recommended For</h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{report.notRecommendedFor}</p>
            </div>
          </div>

          {/* DETAILED STRATEGIC OUTLOOK REASONING */}
          <div className="bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-xs space-y-4">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              <span className="bg-linear-to-r from-blue-600 to-amber-500 dark:from-blue-400 dark:to-yellow-300 bg-clip-text text-transparent">Detailed Strategic Outlook</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-100 leading-relaxed whitespace-pre-line">
              {report.reasoning}
            </p>
          </div>

          {/* DYNAMIC FAQ ACCORDION GENERATOR */}
          <div className="bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-xs space-y-5">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <HelpIcon className="w-5 h-5 text-cyan-500" />
              <span className="bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-200 bg-clip-text text-transparent">Frequently Asked Questions (FAQ)</span>
            </h3>
            <div className="space-y-2">
              {report.faqs.map((faq, idx) => {
                const open = activeFaqIdx === idx;
                return (
                  <div key={idx} className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => setActiveFaqIdx(open ? null : idx)}
                      className="w-full text-left px-4 py-3 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/30 dark:hover:bg-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="text-slate-400 font-mono text-xs">{open ? "−" : "+"}</span>
                    </button>
                    {open && (
                      <div className="px-4 py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800 leading-relaxed bg-white dark:bg-slate-850/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RE-EVALUATE BUTTON OUTRO */}
          <div className="text-center">
            <button
              onClick={() => {
                setReport(null);
                setInputValue("");
                window.history.pushState({}, "", "/");
                onNavigate("/");
              }}
              className="px-6 py-3 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Evaluate Another Decision
            </button>
          </div>

        </div>
      )}

      {/* CORE SEO CONTENT CATEGORIES - SEEDING INTERNAL LINKS FOR ORGANIC TRUST */}
      <div className="border-t border-slate-200/40 dark:border-slate-900 pt-10 mt-10 space-y-10">
        
        <div className="text-center space-y-2">
          <h3 className="font-extrabold text-xl text-slate-950 dark:text-white">Evaluate Key Growth Sectors</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">Explore predefined structured analytical reports for highly-searched careers and modern side hustles.</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* CATEGORY BLOCK: CARERS */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-900 space-y-3.5 shadow-2xs">
            <span className="text-[10px] font-mono tracking-widest font-bold text-blue-500 uppercase">Careers</span>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleChipClick("Become Software Engineer")} className="hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 text-left cursor-pointer">Become Software Engineer</button></li>
              <li><button onClick={() => handleChipClick("Become Data Analyst")} className="hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 text-left cursor-pointer">Become Data Analyst</button></li>
              <li><button onClick={() => handleChipClick("Learn Cybersecurity")} className="hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 text-left cursor-pointer">Learn Cybersecurity</button></li>
              <li><button onClick={() => handleChipClick("Become UX Designer")} className="hover:text-blue-600 dark:hover:text-blue-400 text-slate-500 text-left cursor-pointer">Become UX Designer</button></li>
            </ul>
          </div>

          {/* CATEGORY BLOCK: SIDE HUSTLES */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-900 space-y-3.5 shadow-2xs">
            <span className="text-[10px] font-mono tracking-widest font-bold text-emerald-500 uppercase">Side Hustles</span>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleChipClick("Start Amazon KDP")} className="hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-500 text-left cursor-pointer">Start Amazon KDP</button></li>
              <li><button onClick={() => handleChipClick("Start Print-on-Demand")} className="hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-500 text-left cursor-pointer">Start Print-on-Demand</button></li>
              <li><button onClick={() => handleChipClick("Start Dropshipping")} className="hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-500 text-left cursor-pointer">Start Dropshipping</button></li>
              <li><button onClick={() => handleChipClick("Become Freelancer")} className="hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-500 text-left cursor-pointer">Become Freelancer</button></li>
            </ul>
          </div>

          {/* CATEGORY BLOCK: BUSINESS */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-900 space-y-3.5 shadow-2xs">
            <span className="text-[10px] font-mono tracking-widest font-bold text-indigo-500 uppercase">Business Ideas</span>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleChipClick("Start AI Agency")} className="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-500 text-left cursor-pointer">Start AI Agency</button></li>
              <li><button onClick={() => handleChipClick("Build SaaS Product")} className="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-500 text-left cursor-pointer">Build SaaS Product</button></li>
              <li><button onClick={() => handleChipClick("Start Blogging")} className="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-500 text-left cursor-pointer">Start Blogging</button></li>
              <li><button onClick={() => handleChipClick("Create Newsletter")} className="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-500 text-left cursor-pointer">Create Newsletter</button></li>
            </ul>
          </div>

          {/* CATEGORY BLOCK: EDUCATION & PURCHASES */}
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-900 space-y-3.5 shadow-2xs">
            <span className="text-[10px] font-mono tracking-widest font-bold text-cyan-500 uppercase">Education & Tech</span>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleChipClick("Get an MBA")} className="hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-500 text-left cursor-pointer">Get an MBA</button></li>
              <li><button onClick={() => handleChipClick("Learn Coding")} className="hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-500 text-left cursor-pointer">Learn Coding</button></li>
              <li><button onClick={() => handleChipClick("Buy ChatGPT Plus")} className="hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-500 text-left cursor-pointer">Buy ChatGPT Plus</button></li>
              <li><button onClick={() => handleChipClick("Buy MacBook Pro")} className="hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-500 text-left cursor-pointer">Buy MacBook Pro</button></li>
            </ul>
          </div>

        </div>

      </div>

      {/* USER ENGAGEMENT: RECENT DECISION STREAM */}
      {recentDecisions.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200/40 dark:border-slate-900 space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <h4 className="font-extrabold text-lg text-slate-950 dark:text-white">Recent Decisions Evaluated</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recentDecisions.map((dec, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(dec.query)}
                className="p-3 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-850/80 rounded-2xl flex flex-col justify-between items-start text-left cursor-pointer duration-150 transition-all hover:scale-102 hover:shadow-xs group"
              >
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 mb-2">
                  {dec.query}
                </p>
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    dec.verdict === "UP" ? "bg-emerald-500/10 text-emerald-500" :
                    dec.verdict === "DOWN" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {dec.verdict}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">2026</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RECENT HIGHLIGHTED BLOG INSIGHTS IN HOMEPAGE */}
      {blogPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200/40 dark:border-slate-900 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h4 className="font-extrabold text-lg text-slate-950 dark:text-white">Expert Guides & Insights</h4>
            </div>
            <button 
              onClick={() => {
                window.history.pushState({}, "", "/blog");
                onNavigate("/blog");
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center cursor-pointer"
            >
              <span>Explore all articles</span>
              <ArrowRight className="w-4.5 h-4.5 ml-0.5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {blogPosts.slice(0, 4).map(post => (
              <article 
                key={post.id} 
                className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/50 dark:border-slate-900 p-5 flex flex-col justify-between shadow-xs hover:shadow-md duration-200 transition-all group cursor-pointer"
                onClick={() => {
                  window.history.pushState({}, "", `/blog/${post.slug}`);
                  onNavigate(`/blog/${post.slug}`);
                }}
              >
                <div className="space-y-3">
                  <span className="text-[9px] font-mono font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-4 font-mono">
                  <span>{post.publishedAt}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
