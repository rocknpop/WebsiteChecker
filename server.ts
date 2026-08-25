import express from "express";
import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { blogPosts } from "./src/lib/shared-data";

dotenv.config();

const app = express();
// Trust proxy is required for correct req.ip / req.secure behind Vercel
app.set("trust proxy", 1);
const PORT = Number(process.env.PORT) || 3000;

// ---------------------------------------------------------------------------
// Security: Gemini API key placeholder guard
// ---------------------------------------------------------------------------
const GEMINI_PLACEHOLDERS = new Set(["", "MY_GEMINI_API_KEY", "MY_API_KEY", "placeholder", "test"]);
function isGeminiKeyMissing(): boolean {
  const k = process.env.GEMINI_API_KEY;
  return !k || GEMINI_PLACEHOLDERS.has(k.trim()) || k.trim().length < 10;
}

// ---------------------------------------------------------------------------
// Security: CORS allowlist + per-IP rate limiter for Gemini-backed endpoints
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = new Set([
  "https://www.downorup.net",
  "https://downorup.net",
  "http://localhost:3000",
  "http://localhost:5173",
]);

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true; // same-origin / curl / SSR — allow
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Allow any Vercel preview deployment for this project
  if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return true;
  return false;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(ip: string, key: string): boolean {
  const now = Date.now();
  const storeKey = `${ip}:${key}`;
  const hits = (rateLimitStore.get(storeKey) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    // prune stale entries but do not add new hit
    rateLimitStore.set(storeKey, hits);
    return true;
  }
  hits.push(now);
  rateLimitStore.set(storeKey, hits);
  // opportunistic cleanup to bound memory
  if (rateLimitStore.size > 5000) {
    for (const [k, v] of rateLimitStore) {
      const filtered = v.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (filtered.length === 0) rateLimitStore.delete(k);
      else rateLimitStore.set(k, filtered);
    }
  }
  return false;
}

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// CORS: allowlist-based (fixes wildcard cost-exhaustion; same-origin & curl still work)
app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  if (origin) {
    if (isAllowedOrigin(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Vary", "Origin");
    }
    // else: do not set ACAO — browser will block cross-origin use
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// In-Memory Decision Cache and Tracking
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
  difficulty: number; // 1-10
  cost: number; // 1-10
  timeToResults: string;
  riskLevel: "Low" | "Medium" | "High";
  potentialReward: "Low" | "Medium" | "High" | "Very High";
  recommendedFor: string;
  notRecommendedFor: string;
  reasoning: string;
  faqs: FAQ[];
  timestamp: string;
  
  // Witty Coach and SEO extensions
  formatted_verdict?: string;
  verdict_reasoning?: string;
  detailed_analysis?: {
    key_benefit_or_risk: string;
    market_relevance: string;
    required_effort: string;
    ideal_candidate: string;
  };
  actionable_next_step?: string;
  social_share_text?: string;
  seo?: {
    decision_title: string;
    meta_description: string;
    seo_summary: string;
    slug: string;
  };
}

// Global cache for ultra-fast performance and 100% Lighthouse / PageSpeed score
const decisionCache = new Map<string, DecisionReport>();

// Active list of queries for homepage engagement sections
let recentQueries: { query: string; verdict: "UP" | "NEUTRAL" | "DOWN"; timestamp: string }[] = [];

// Curated seed data for core programmatic SEO decisions so they load INSTANTLY (0ms)
const seedDecisions: DecisionReport[] = [
  {
    query: "Should I start a faceless YouTube channel in 2026?",
    verdict: "UP",
    confidenceScore: 88,
    summary: "Starting a faceless YouTube channel in 2026 is an exceptionally strong opportunity because high-quality AI editing tools, realistic voice generation, and automated workflows minimize production overhead while YouTube's ad revenue and affiliate models remain highly lucrative.",
    pros: [
      "Zero camera anxiety since you remain completely anonymous",
      "Extremely low start-up cost (can run entirely with free or cheap software)",
      "Highly scalable using AI tools to handle scripting, editing, and voiceovers"
    ],
    cons: [
      "Highly competitive market requiring consistent uploads (2-3 times/week)",
      "Strict monetization screening regarding repetitive or low-quality AI-slop content",
      "Delayed financial gratification—typically takes 6-12 months to build momentum"
    ],
    difficulty: 5,
    cost: 2,
    timeToResults: "3-12 Months",
    riskLevel: "Low",
    potentialReward: "Very High",
    recommendedFor: "Creators who enjoy storytelling, scriptwriting, and strategic video design but prefer to avoid personal public branding.",
    notRecommendedFor: "Individuals looking for immediate financial payouts or who are unwilling to learn basic editing and SEO strategy.",
    reasoning: "In 2026, YouTube's algorithms heavily favor high-retention storytelling. Faceless channels focusing on finance, history, self-improvement, and animated explainers have seen massive growth. By utilizing advanced video-generation platforms, you can produce content at 10x the speed of traditional creators, making it one of the most efficient side hustles available.",
    faqs: [
      { question: "What are the benefits?", answer: "Complete privacy, extremely scalable production workflows, low start-up costs, and the capability to sell channels as digital assets down the road." },
      { question: "What are the risks?", answer: "Risk of channel demonetization if content is deemed 'reused' or entirely automated without human polish, and high initial time commitment." },
      { question: "How much does it cost?", answer: "Virtually free ($0 - $50/month) if you write your own scripts and use free tiers of AI video editors and graphic design suites." },
      { question: "How long does it take?", answer: "Usually 3 to 12 months of consistent uploads to meet YouTube Partner requirements and start earning reliable ad revenue." },
      { question: "Who is it best for?", answer: "Anxious introverts, tech-savvy side-hustlers, and digital marketers seeking to build highly scalable automated assets." }
    ],
    timestamp: new Date().toISOString()
  },
  {
    query: "Should I start dropshipping?",
    verdict: "DOWN",
    confidenceScore: 78,
    summary: "Starting dropshipping in 2026 presents severe challenges due to high ad-buyer friction, intense brand saturation, rising customer acquisition costs, and negative customer perception regarding generic long-delivery goods.",
    pros: [
      "No physical inventory storage or upfront stock manufacturing costs required",
      "Easy initial setup with Shopify, WooCommerce, and wholesale directories",
      "Provides rapid, hands-on learning in digital advertising and media buying"
    ],
    cons: [
      "Razor-thin margins due to skyrocketing ad costs (Meta, TikTok, Google Ads)",
      "Unreliable shipping times and product quality from overseas suppliers",
      "High refund rates and potential payment processor suspensions"
    ],
    difficulty: 8,
    cost: 7,
    timeToResults: "1-3 Months",
    riskLevel: "High",
    potentialReward: "Medium",
    recommendedFor: "Experienced media buyers who have substantial capital for ad testing and access to proprietary, fast-shipping suppliers.",
    notRecommendedFor: "Beginners with less than $2,000 in advertising budget who expect quick automated riches.",
    reasoning: "Dropshipping has evolved from a simple side hustle into an intense digital marketing battleground. Consumers are increasingly wary of long delivery times and generic products. Success in 2026 requires custom packaging, private agents, and high-budget social video ads, making the barrier to entry and risk level much higher than in previous years.",
    faqs: [
      { question: "What are the benefits?", answer: "Allows you to test product demand with zero manufacturing overhead and develops world-class copywriting and digital ad-buying skills." },
      { question: "What are the risks?", answer: "Losing entire advertising budgets on failed products, chargebacks, customer disputes, and supplier reliability issues." },
      { question: "How much does it cost?", answer: "At least $1,500 - $3,000 upfront to pay for platform subscriptions, sample testing, and social media ad campaigns." },
      { question: "How long does it take?", answer: "1 to 3 months of aggressive marketing and product testing to determine if you have a viable winning offer." },
      { question: "Who is it best for?", answer: "Analytical advertisers, capital-backed marketers, and individuals with deep resilience to high-risk environments." }
    ],
    timestamp: new Date().toISOString()
  },
  {
    query: "Should I learn Python?",
    verdict: "UP",
    confidenceScore: 95,
    summary: "Learning Python is an absolute gold-standard move because it remains the foundational backbone of machine learning, AI engineering, data analytics, and backend automation.",
    pros: [
      "Extremely clean, human-readable syntax that makes it beginner-friendly",
      "The undisputed king of AI, deep learning, and data science ecosystems",
      "Huge global developer community providing endless libraries and career support"
    ],
    cons: [
      "Execution speed is slower than compiled languages like C++, Rust, or Go",
      "Not suitable for native mobile development or high-performance game engines",
      "High volume of entry-level learners means stiff competition for junior developer roles"
    ],
    difficulty: 3,
    cost: 1,
    timeToResults: "3-12 Months",
    riskLevel: "Low",
    potentialReward: "High",
    recommendedFor: "Aspiring data scientists, AI engineers, financial analysts, and programmers seeking a highly versatile and lucrative core skill.",
    notRecommendedFor: "People interested purely in native mobile apps (who should prefer Swift/Kotlin) or client-side visual web design (JavaScript/TypeScript).",
    reasoning: "With the AI boom continuing in full force, Python proficiency has transitioned from an elective skill to a mandatory prerequisite. From building LLM wrappers to data extraction and system scripting, Python's ecosystem is unmatched. Its soft learning curve ensures that even non-developers can learn it to automate administrative tasks.",
    faqs: [
      { question: "What are the benefits?", answer: "Incredibly high salary potential, access to cutting-edge AI research roles, and rapid workflow automation capabilities." },
      { question: "What are the risks?", answer: "Over-relying on basic tutorial scripts without building complex, real-world custom projects." },
      { question: "How much does it cost?", answer: "Totally free ($0) through excellent documentation, YouTube guides, and free coding environments." },
      { question: "How long does it take?", answer: "3 to 6 months to master intermediate-level software syntax and start building custom tools." },
      { question: "Who is it best for?", answer: "Problem solvers, analytical thinkers, and career changers looking to enter the artificial intelligence space." }
    ],
    timestamp: new Date().toISOString()
  },
  {
    query: "Should I move abroad?",
    verdict: "NEUTRAL",
    confidenceScore: 82,
    summary: "Moving abroad is a life-altering decision that offers unparalleled personal growth and potential cost-of-living optimizations, but requires deep psychological adjustment and navigating complex visa frameworks.",
    pros: [
      "Incredible exposure to new cultures, languages, and global networks",
      "Opportunity for geo-arbitrage (earning in strong currencies while living in high-quality, lower-cost regions)",
      "Accelerated self-reliance and emotional independence"
    ],
    cons: [
      "Bureaucracy, expensive visa requirements, and potential tax complications",
      "Homesickness, cultural isolation, and distance from established family support networks",
      "Language barriers that make initial administrative tasks stressful"
    ],
    difficulty: 7,
    cost: 6,
    timeToResults: "3-12 Months",
    riskLevel: "Medium",
    potentialReward: "High",
    recommendedFor: "Adaptable, open-minded professionals, remote workers, or students looking to expand their worldview and optimizes lifestyles.",
    notRecommendedFor: "Individuals who crave predictable routine, have tight family dependencies, or suffer under high administrative uncertainty.",
    reasoning: "Whether moving abroad is a good choice depends heavily on your career status, target country, and adaptability. Countries in Europe, Southeast Asia, and Latin America offer beautiful settings and digital nomad visas, but local job markets can be difficult to access without language skills. Pre-planning tax residency is critical.",
    faqs: [
      { question: "What are the benefits?", answer: "Broader cultural intelligence, high quality of life at low cost, and a completely fresh start." },
      { question: "What are the risks?", answer: "Visa rejections, currency fluctuations, local tax compliance penalties, and cultural mismatch." },
      { question: "How much does it cost?", answer: "$3,000 - $10,000 for emergency savings, flights, visa fees, and initial housing security deposits." },
      { question: "How long does it take?", answer: "3 to 12 months of visa processing, packing, and logistical coordination before actually flying." },
      { question: "Who is it best for?", answer: "Resilient travelers, digital nomads, and young professionals seeking adventure and change." }
    ],
    timestamp: new Date().toISOString()
  },
  {
    query: "Should I start freelancing?",
    verdict: "UP",
    confidenceScore: 90,
    summary: "Starting freelancing is a highly viable path to career freedom because global companies are transitioning away from expensive full-time hires toward specialized, agile project-based talent.",
    pros: [
      "Complete autonomy over your work schedule, clients, and pricing structures",
      "No artificial salary caps—earnings are directly tied to your output and speed",
      "Diversified risk: losing one client is a minor setback, unlike losing a full-time job"
    ],
    cons: [
      "Income volatility with standard feast-and-famine pipeline cycles",
      "No corporate benefits (you must fund your own health insurance and retirement plans)",
      "You must act as your own salesperson, accountant, and support team"
    ],
    difficulty: 6,
    cost: 2,
    timeToResults: "1-3 Months",
    riskLevel: "Medium",
    potentialReward: "High",
    recommendedFor: "Skilled professionals in software, design, writing, or marketing who possess high self-discipline and enjoy business management.",
    notRecommendedFor: "People who struggle to work without constant management or who get highly anxious about inconsistent monthly incomes.",
    reasoning: "The gig economy is stronger than ever. Companies in 2026 value flexibility, and remote collaboration tools make hiring freelancers a breeze. By positioning yourself as an expert rather than a generalist, and marketing your services directly on LinkedIn, Upwork, and cold-outreach, you can surpass standard employee salaries rapidly.",
    faqs: [
      { question: "What are the benefits?", answer: "Ultimate personal liberty, flexible remote working setups, and a highly scalable revenue model." },
      { question: "What are the risks?", answer: "Periods of low income, clients refusing to pay on time, and burning out from working too many hours." },
      { question: "How much does it cost?", answer: "Nearly free ($50 - $200) to set up a portfolio website, professional email, and basic invoicing software." },
      { question: "How long does it take?", answer: "1 to 3 months to build a portfolio, secure your first high-paying client, and establish standard workflows." },
      { question: "Who is it best for?", answer: "Discipled experts, proactive communicators, and corporate refugees seeking independent remote lifestyles." }
    ],
    timestamp: new Date().toISOString()
  },
  {
    query: "Should I buy ChatGPT Plus?",
    verdict: "UP",
    confidenceScore: 92,
    summary: "Buying ChatGPT Plus in 2026 is highly recommended for anyone whose career involves knowledge work, coding, writing, or rapid research, as the productivity gains vastly outweigh the monthly cost.",
    pros: [
      "Priority access to the fastest and most advanced frontier reasoning models",
      "Access to advanced data analysis, file uploads, and image generation tools",
      "Saves dozens of hours per week on research, editing, and technical problem-solving"
    ],
    cons: [
      "Recurring monthly subscription cost of $20/month",
      "Risk of hallucination means outputs still require human oversight and editing",
      "Free alternatives (like basic Gemini, Claude, or local models) might be sufficient for casual users"
    ],
    difficulty: 1,
    cost: 3,
    timeToResults: "Immediate",
    riskLevel: "Low",
    potentialReward: "High",
    recommendedFor: "Software developers, writers, students, researchers, and professionals looking to automate cognitive workloads.",
    notRecommendedFor: "Casual internet users who only use search engines occasionally and do not perform complex text/code generation.",
    reasoning: "ChatGPT Plus is essentially a personal research assistant that works for pennies. If you use it to speed up your work by just 1 hour a month, it has already paid for itself. In 2026, the reasoning capabilities have advanced to handle complex multi-step instructions, making it a critical competitive advantage.",
    faqs: [
      { question: "What are the benefits?", answer: "Instant access to peak reasoning intelligence, advanced plug-ins, custom GPTs, and rapid file processing." },
      { question: "What are the risks?", answer: "Over-relying on AI outputs without checking accuracy, leading to potential professional errors." },
      { question: "How much does it cost?", answer: "$20 per month (plus applicable local taxes)." },
      { question: "How long does it take?", answer: "Instantaneous. You get upgraded capabilities the second your payment goes through." },
      { question: "Who is it best for?", answer: "High-volume professionals, students, and lifelong learners looking to maximize cognitive output." }
    ],
    timestamp: new Date().toISOString()
  },
  {
    query: "Should I start Amazon KDP?",
    verdict: "NEUTRAL",
    confidenceScore: 84,
    summary: "Starting Amazon Kindle Direct Publishing (KDP) is a solid, low-cost self-publishing model, but low-quality AI-generated spam has flooded the platform, making marketing, niche selection, and advertising absolutely mandatory for success.",
    pros: [
      "Completely free to upload and publish books globally with print-on-demand technology",
      "Lucrative passive income potential once a book achieves organic keyword rankings",
      "Access to Amazon's massive built-in global buyer traffic"
    ],
    cons: [
      "Saturated marketplace flooded with low-content planners, journals, and AI-slop books",
      "Often requires high-risk spend on Amazon PPC Ads to gain initial visibility",
      "Amazon has strict account suspension rules for trademark or copyright slip-ups"
    ],
    difficulty: 6,
    cost: 3,
    timeToResults: "3-12 Months",
    riskLevel: "Medium",
    potentialReward: "Medium",
    recommendedFor: "Passionate writers, designers, or marketers willing to research highly specific niches and build long-term brands.",
    notRecommendedFor: "People looking to push hundreds of copy-pasted low-quality books hoping for an easy shortcut.",
    reasoning: "Amazon KDP is no longer a 'upload and get rich' game. While the print-on-demand model is beautiful, success in 2026 requires writing high-value fiction/non-fiction, creating custom high-quality kids' books, or designing gorgeous notebooks with advanced cover designs. High keyword research skills are essential.",
    faqs: [
      { question: "What are the benefits?", answer: "Zero inventory risk, global scale, and the ability to earn royalties passively for years." },
      { question: "What are the risks?", answer: "Sinking hundreds of dollars into Amazon Ads with zero sales, or getting your account banned." },
      { question: "How much does it cost?", answer: "$0 to start, but budget $100 - $500 for professional cover design and initial marketing tools." },
      { question: "How long does it take?", answer: "3 to 12 months to outline, design, publish, and gain organic search rankings for your book." },
      { question: "Who is it best for?", answer: "Self-published authors, graphic designers, and SEO researchers seeking passive royalty streams." }
    ],
    timestamp: new Date().toISOString()
  },
  {
    query: "Should I start an AI agency?",
    verdict: "UP",
    confidenceScore: 87,
    summary: "Starting an Artificial Intelligence Automation Agency (AAA) in 2026 is a massive, high-margin business opportunity as local and enterprise businesses struggle to integrate AI workflows into their daily operations.",
    pros: [
      "Extremely high service retainers ($2,000 - $10,000/month per client)",
      "Low fulfillment cost using no-code integration tools like Make.com, Zapier, and voice agents",
      "Massive, urgent demand from business owners who know they need AI but have no idea how to set it up"
    ],
    cons: [
      "Requires excellent B2B sales skills, cold-calling, and client management",
      "Rapidly changing AI landscapes mean your client integrations can break or need constant updates",
      "Increasing competition from general marketing agencies adding AI to their catalogs"
    ],
    difficulty: 7,
    cost: 3,
    timeToResults: "1-3 Months",
    riskLevel: "Medium",
    potentialReward: "Very High",
    recommendedFor: "Entrepreneurial tech enthusiasts who are great at sales, problem-solving, and building custom digital integrations.",
    notRecommendedFor: "Introverts who hate sales, or developers who want to write code all day without talking to business owners.",
    reasoning: "Businesses are losing hours of productivity to manual data entry, customer support, and administrative overhead. By packaging simple AI automation (like custom AI chatbots, lead qualifiers, or content syndication pipelines) as a monthly service, you solve a multi-thousand-dollar problem. This is a classic gold-rush service play.",
    faqs: [
      { question: "What are the benefits?", answer: "High-ticket recurring revenue, low capital expenses, and building state-of-the-art tech experience." },
      { question: "What are the risks?", answer: "Client retention issues if integrations fail, or setting expectations too high for what AI can actually do." },
      { question: "How much does it cost?", answer: "Under $100/month for website hosting, professional email, and subscriptions to no-code integration tools." },
      { question: "How long does it take?", answer: "1 to 3 months of aggressive sales outreach to land your first monthly retainer client." },
      { question: "Who is it best for?", answer: "Consultants, tech-savvy entrepreneurs, and sales professionals looking to launch a modern agency." }
    ],
    timestamp: new Date().toISOString()
  }
];

// Seed the cache with initial decisions for instant hits
seedDecisions.forEach((report) => {
  const normalized = report.query.toLowerCase().trim();
  decisionCache.set(normalized, report);
  recentQueries.push({
    query: report.query,
    verdict: report.verdict,
    timestamp: report.timestamp
  });
});

// Normalized query matching helper
function getCacheMatch(query: string): DecisionReport | null {
  const norm = query.toLowerCase().trim()
    .replace(/[?.]/g, "")
    .replace(/\s+/g, " ");
  
  // Try direct match
  if (decisionCache.has(norm)) return decisionCache.get(norm)!;
  if (decisionCache.has(norm + "?")) return decisionCache.get(norm + "?")!;
  
  // Try fuzzy match in keys
  for (const [key, value] of decisionCache.entries()) {
    const cleanKey = key.replace(/[?.]/g, "").replace(/\s+/g, " ");
    if (cleanKey === norm || cleanKey.includes(norm) || norm.includes(cleanKey)) {
      return value;
    }
  }
  return null;
}

// 1. CORE API ENDPOINT: ANALYZE DECISION
app.post("/api/analyze-decision", async (req, res) => {
  const ip = req.ip || (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip, "analyze-decision")) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
  }

  const { query } = req.body;
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return res.status(400).json({ error: "Please enter a valid decision question to analyze." });
  }

  const normalizedQuery = query.trim();
  console.log(`[AI Engine] Analyzing decision: "${normalizedQuery}"`);

  // Try retrieving from cache first to achieve instant elite performance
  const cached = getCacheMatch(normalizedQuery);
  if (cached) {
    console.log(`[AI Engine] Cache HIT for "${normalizedQuery}". Returning instantly.`);
    // Push to front of recent searches if not already there recently
    recentQueries = [
      { query: cached.query, verdict: cached.verdict, timestamp: new Date().toISOString() },
      ...recentQueries.filter((q) => q.query.toLowerCase() !== cached.query.toLowerCase())
    ].slice(0, 15);
    return res.json(cached);
  }

  // Ensure Gemini API Key is configured before live query
  if (isGeminiKeyMissing()) {
    console.warn("[AI Engine] GEMINI_API_KEY is not defined. Falling back to dynamic mock generation.");
    // Fallback Mock generation to prevent any crash
    const chosenVerdict = Math.random() > 0.5 ? "UP" : "DOWN";
    const formattedVerdict = chosenVerdict === "UP" ? "UP ✅" : "DOWN ❌";
    const fallbackReport: DecisionReport = {
      query: normalizedQuery,
      verdict: chosenVerdict,
      formatted_verdict: formattedVerdict,
      verdict_reasoning: chosenVerdict === "UP"
        ? `${normalizedQuery} shows tremendous potential with high growth indices in 2026.`
        : `${normalizedQuery} carries significant risk factors and market oversaturation in 2026.`,
      confidenceScore: 82 + Math.floor(Math.random() * 15),
      summary: `Evaluating: "${normalizedQuery}". This is an automated diagnostic preview. Connect your live Gemini API key in Settings > Secrets to enable complete AI analytical coverage.`,
      pros: [
        "Provides immediate learning and practical experience",
        "Flexible, scalable opportunity with modern leverage",
        "Potential long-term compound growth"
      ],
      cons: [
        "Requires consistent time allocation and initial focus",
        "Uncertainty in market trends and algorithm parameters",
        "Overhead costs can scale if not managed carefully"
      ],
      difficulty: 5 + Math.floor(Math.random() * 4),
      cost: 1 + Math.floor(Math.random() * 8),
      timeToResults: "3-12 Months",
      riskLevel: "Medium",
      potentialReward: "High",
      recommendedFor: "Proactive problem solvers looking for modern side hustles or lifestyle optimizations.",
      notRecommendedFor: "People searching for instantaneous, guaranteed results with zero effort.",
      reasoning: `This is a strategic review of ${normalizedQuery}. Under diagnostic conditions, the opportunities indicate high learning metrics but require operational prudence. Setup your real GEMINI_API_KEY in the workspace to see detailed, state-of-the-art reports.`,
      detailed_analysis: {
        key_benefit_or_risk: chosenVerdict === "UP"
          ? "Unlocks a high-growth leveraged skill or lifestyle asset with compounding value."
          : "Represents high customer-acquisition friction or potential burnout risk without proven returns.",
        market_relevance: "The market in 2026 is rapidly evolving. High demand persists for unique, non-commodity value.",
        required_effort: "Demands solid initial focus and 10-15 hours per week of disciplined work over 6 months.",
        ideal_candidate: "Self-motivated individuals who learn daily, leverage modern AI tools, and tolerate uncertainty."
      },
      actionable_next_step: chosenVerdict === "UP"
        ? `Start by taking 1 hour to outline your roadmap, set up a dedicated workspace, and build your first minimal prototype.`
        : `Instead, investigate adjacent lower-risk or higher-margin models that match your capital and skill levels.`,
      social_share_text: `Just got my verdict from downorup.net: ${normalizedQuery} is ${formattedVerdict}! Time to take strategic action! 🚀`,
      seo: {
        decision_title: `Should I ${normalizedQuery}? Verdict: ${formattedVerdict} | DownOrUp.net`,
        meta_description: `Read the brutal, data-backed truth about whether you should ${normalizedQuery.toLowerCase()} in 2026.`,
        seo_summary: `The dilemma of whether to ${normalizedQuery.toLowerCase()} is one faced by many professionals in 2026. This comprehensive strategic evaluation analyzes the direct cost, effort, and market saturation levels to give you a definitive binary answer. By looking at immediate trends, we can see if this choice matches your risk appetite or if you should seek alternatives.`,
        slug: normalizedQuery.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      },
      faqs: [
        { question: "What are the benefits?", answer: "Acquisition of highly versatile skills, personal growth, and potential digital independence." },
        { question: "What are the risks?", answer: "Logistical friction, initial loss of leisure time, and minor capital expenditure." },
        { question: "How much does it cost?", answer: "Varies from $100 to $1,000 depending on your operational choices and software requirements." },
        { question: "How long does it take?", answer: "Generally 3 to 12 months before seeing high, stable returns on effort." },
        { question: "Who is it best for?", answer: "Driven, independent thinkers willing to learn daily." }
      ],
      timestamp: new Date().toISOString()
    };
    decisionCache.set(normalizedQuery.toLowerCase(), fallbackReport);
    recentQueries = [
      { query: fallbackReport.query, verdict: fallbackReport.verdict, timestamp: fallbackReport.timestamp },
      ...recentQueries
    ].slice(0, 15);
    return res.json(fallbackReport);
  }

  // Invoke Gemini 3.5 Flash server-side safely using the recommended @google/genai SDK
  try {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING },
        verdict: { type: Type.STRING, description: "Must be 'UP' or 'DOWN'" },
        formatted_verdict: { type: Type.STRING, description: "Must be 'UP ✅' or 'DOWN ❌'" },
        verdict_reasoning: { type: Type.STRING, description: "A concise, single-sentence summary of the main reason for the verdict (e.g., 'Python remains the #1 language for high-growth fields like AI and Data Science.')." },
        confidenceScore: { type: Type.INTEGER, description: "Confidence percentage (0 to 100)" },
        summary: { type: Type.STRING, description: "A concise, highly professional summary overview of 1-2 sentences" },
        pros: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "List of exactly 3 distinct, valuable benefits or advantages" 
        },
        cons: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING }, 
          description: "List of exactly 3 distinct, valuable risks or disadvantages" 
        },
        difficulty: { type: Type.INTEGER, description: "A score from 1 (very simple) to 10 (extremely complex)" },
        cost: { type: Type.INTEGER, description: "A score from 1 (practically free) to 10 (thousands in capital)" },
        timeToResults: { type: Type.STRING, description: "Must be 'Immediate', '1-3 Months', '3-12 Months', or '1-3 Years'" },
        riskLevel: { type: Type.STRING, description: "Must be 'Low', 'Medium', or 'High'" },
        potentialReward: { type: Type.STRING, description: "Must be 'Low', 'Medium', or 'High', or 'Very High'" },
        recommendedFor: { type: Type.STRING, description: "Who this decision is ideal for" },
        notRecommendedFor: { type: Type.STRING, description: "Who should strictly avoid this decision" },
        reasoning: { type: Type.STRING, description: "A highly comprehensive, strategic, and detailed final verdict reasoning" },
        detailed_analysis: {
          type: Type.OBJECT,
          properties: {
            key_benefit_or_risk: { type: Type.STRING, description: "The single most compelling reason to do/not do it." },
            market_relevance: { type: Type.STRING, description: "Analysis of the current trend, job market, or saturation level (where applicable)." },
            required_effort: { type: Type.STRING, description: "An honest assessment of the time, cost, or emotional effort required." },
            ideal_candidate: { type: Type.STRING, description: "Who is best suited for this decision (even if the verdict is DOWN, mention who might still do it)." }
          },
          required: ["key_benefit_or_risk", "market_relevance", "required_effort", "ideal_candidate"]
        },
        actionable_next_step: { type: Type.STRING, description: "A clear 'If you decide to do this, start by...' or 'Instead, you should look into...' advice." },
        social_share_text: { type: Type.STRING, description: "A viral-ready snippet suitable for Twitter/X or LinkedIn." },
        seo: {
          type: Type.OBJECT,
          properties: {
            decision_title: { type: Type.STRING, description: "The SEO-optimized page title (e.g., 'Should I Learn Python? Verdict: UP | Is it Worth it?')." },
            meta_description: { type: Type.STRING, description: "A compelling description summarizing the decision and its outcome." },
            seo_summary: { type: Type.STRING, description: "A 2-3 paragraph detailed breakdown of the decision, using rich, relevant keywords. This must be unique content." },
            slug: { type: Type.STRING, description: "An SEO-friendly, URL-safe slug (e.g., 'should-i-learn-python')." }
          },
          required: ["decision_title", "meta_description", "seo_summary", "slug"]
        },
        faqs: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          },
          description: "Generate 5 dynamic and highly relevant FAQs based on these exact questions: 'What are the benefits?', 'What are the risks?', 'How much does it cost?', 'How long does it take?', 'Who is it best for?'"
        }
      },
      required: [
        "query", "verdict", "formatted_verdict", "verdict_reasoning", "confidenceScore", "summary", "pros", "cons",
        "difficulty", "cost", "timeToResults", "riskLevel", "potentialReward",
        "recommendedFor", "notRecommendedFor", "reasoning", "detailed_analysis",
        "actionable_next_step", "social_share_text", "seo", "faqs"
      ]
    };

    const prompt = `Perform a comprehensive, detailed strategic decision evaluation of this choice: "${normalizedQuery}".
Analyze it objectively for the current year 2026. Be realistic, truthful, and data-driven.
Assess the market conditions, viability, costs, and risks.
Choose a definitive binary verdict: either "UP" or "DOWN". You MUST choose either "UP" or "DOWN". Do not output "Maybe" or "It Depends". Your logic must definitively favor one side based on typical success rates, market demand, or logical reasoning.
Make sure to answer the 5 specified FAQs fully.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are the witty, data-driven core engine for "DownOrUp.net", the ultimate AI-powered decision platform.
Your persona is that of a "Brutally Honest Career & Lifestyle Coach," similar to a supportive but direct mentor. You cut through the noise with data, current trends, and logical analysis, always delivering a decisive "UP ✅" (Do it) or "DOWN ❌" (Don't do it) verdict.

Operation Instructions:
1. Strict JSON Output: You must ONLY output valid JSON. Do not wrap the JSON in markdown blocks (no \`\`\`json).
2. Binary Decision: You MUST choose either "UP" or "DOWN". Do not output "Maybe" or "It Depends". Your logic must definitively favor one side based on typical success rates, market demand, or logical reasoning.
3. SEO Optimization: You are responsible for generating SEO-friendly content within the JSON response.
   * Create a 'decision_title' (optimized for the user's question, e.g., "Is Learning Python Still Worth It?").
   * Provide a 'meta_description' (150-160 characters summary).
   * Generate an 'seo_summary' (2-3 paragraphs) that uses keywords related to the decision, explaining the rationale clearly. Search engines love this unique text.
4. Tone Constraints:
   * UP verdicts: Enthusiastic, motivational, but backed by reasons. Use emojis appropriately (e.g., 🚀, 💡).
   * DOWN verdicts: Critical, honest, and direct about the risks or downsides. Use warning emojis appropriately (e.g., ⚠️, 🚧).`,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1.0,
      }
    });

    const text = result.text;
    if (!text) {
      throw new Error("Received empty response text from Gemini API.");
    }

    const report: DecisionReport = JSON.parse(text);
    // Overwrite query to match normalized input for cleanliness
    report.query = normalizedQuery;
    report.timestamp = new Date().toISOString();

    // Secure cached entry
    decisionCache.set(normalizedQuery.toLowerCase().trim(), report);

    // Save in user engagement recent checks list
    recentQueries = [
      { query: report.query, verdict: report.verdict, timestamp: report.timestamp },
      ...recentQueries.filter((q) => q.query.toLowerCase() !== report.query.toLowerCase())
    ].slice(0, 15);

    return res.json(report);
  } catch (err: any) {
    console.error(`[AI Engine] Exception during analysis of "${normalizedQuery}":`, err);
    return res.status(500).json({
      error: "Our AI Strategic Engine timed out or encountered an issue. Please try rephrasing your question or check back in a moment.",
      details: err?.message || String(err)
    });
  }
});

// 1b. FLOATING ASSISTANT: lightweight intent triage + short conversational answer.
// Distinct from /api/analyze-decision (the full multi-field report engine): this
// endpoint returns one short answer plus a structured suggestion so the client can
// route into the matching existing tool (a diagnostic check or the decision engine)
// rather than duplicating either engine's logic here.
app.post("/api/ai-assistant", async (req, res) => {
  const ip2 = req.ip || (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip2, "ai-assistant")) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return res.status(400).json({ error: "A prompt string is required." });
  }
  const normalizedPrompt = prompt.trim();

  if (isGeminiKeyMissing()) {
    return res.status(503).json({
      error: "AI assistant is currently unavailable. No valid Gemini API key was detected in the environment settings.",
    });
  }

  try {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        answer: { type: Type.STRING, description: "A concise, conversational, 1-2 sentence reply to the user." },
        intent: { type: Type.STRING, description: "Must be exactly one of: 'diagnostic', 'decision', 'info'." },
        tool: { type: Type.STRING, description: "When intent is 'diagnostic', the matching tool id: 'status', 'dns', 'ip', 'ssl', 'whois', or 'port'. Omit or leave empty otherwise." },
        target: { type: Type.STRING, description: "When intent is 'diagnostic', the bare domain or IP the user asked about (no protocol, no path). Omit or leave empty otherwise." },
        decisionQuery: { type: Type.STRING, description: "When intent is 'decision', the user's question normalized into a clean 'Should I ... ?' phrasing. Omit or leave empty otherwise." },
      },
      required: ["answer", "intent"],
    };

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: normalizedPrompt,
      config: {
        systemInstruction: `You are the floating assistant for DownOrUp.net, a site with exactly two capabilities:
1. A free website diagnostics suite: website status/uptime checks ('status'), DNS record lookup ('dns'), IP address & geolocation lookup ('ip'), SSL certificate checks ('ssl'), WHOIS domain lookup ('whois'), and common port scanning ('port').
2. An AI decision engine that gives a binary UP/DOWN verdict on "should I do X" questions (careers, side hustles, purchases, business ideas).

Classify every user message into exactly one intent:
- 'diagnostic': the user is asking about a website/domain/IP's technical status. Extract the bare host as 'target' and the matching 'tool'.
- 'decision': the user is asking whether they should do something. Normalize it into 'decisionQuery' as a clean "Should I ...?" question.
- 'info': anything else (greetings, questions about the site itself, unclear requests).

Always write a short, friendly, direct 'answer' (1-2 sentences) regardless of intent. Never fabricate a diagnostic result or a decision verdict yourself — you only classify and route; the matching tool or engine produces the real result.`,
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const text = result.text;
    if (!text) {
      throw new Error("Received empty response text from Gemini API.");
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err: any) {
    console.error(`[Assistant Engine] Exception during triage of "${normalizedPrompt}":`, err);
    return res.status(500).json({
      error: "Could not process that request. Please try rephrasing, or check back in a moment.",
    });
  }
});

// 2. USER ENGAGEMENT LOGS: RECENT DECISIONS
app.get("/api/recent-decisions", (req, res) => {
  return res.json(recentQueries.slice(0, 12));
});

// Blog data is shared from src/lib/shared-data.ts to avoid duplication.

// 3. BLOG LIST AND VIEW ENDPOINTS
app.get("/api/blog-posts", (req, res) => {
  return res.json(blogPosts);
});

app.get("/api/blog-posts/:slug", (req, res) => {
  const post = blogPosts.find((p) => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: "Blog post not found." });
  return res.json(post);
});

// 4. PROGRAMMATIC SITEMAP GENERATION — canonical https://www.downorup.net
// (host header is ignored to prevent injection; with trust proxy, req.secure is correct)
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = "https://www.downorup.net";

  // Core pages
  const corePaths = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/cookie-policy",
    "/blog"
  ];

  // Core Programmatic Decisions
  const decisionPaths = seedDecisions.map((d) => {
    return `/should-i-${d.query.toLowerCase()
      .replace(/should i /i, "")
      .replace(/should you /i, "")
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")}`;
  });

  // Blog posts
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add all paths
  const allPaths = [...corePaths, ...decisionPaths, ...blogPaths];
  allPaths.forEach((p) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${p}</loc>\n`;
    xml += `    <lastmod>2026-06-24</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${p === "" ? "1.0" : p.includes("/should-i") ? "0.8" : "0.5"}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;
  res.header("Content-Type", "application/xml");
  return res.send(xml);
});

// START DEV OR PRODUCTION MIDDLEWARE INTERACTION
async function startServer() {
  const isProd = process.env.NODE_ENV === "production" || 
                 (typeof __filename !== "undefined" && (__filename.endsWith(".cjs") || __filename.includes("dist")));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist", "client");
    const template = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
    const ssrEntryPath = path.join(process.cwd(), "dist", "server", "entry-server.js");
    const { render } = await import(pathToFileURL(ssrEntryPath).href) as {
      render: (url: string) => { html: string; seo: { title: string; description: string } };
    };

    // index: false so index.html is never auto-served here — every HTML request must go
    // through the SSR route below instead, which renders the actual page content.
    app.use(express.static(distPath, {
      index: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
          res.setHeader("X-Content-Type-Options", "nosniff");
          res.setHeader("X-Frame-Options", "SAMEORIGIN");
        }
      },
    }));

    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      res.setHeader("Content-Type", "text/html");

      try {
        const { html, seo } = render(req.path);
        // Escape user-controlled SEO strings for safe injection into HTML (prevent breaking title/meta)
        const escTitle = seo.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        const escDesc = seo.description.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        const page = template
          .replace("<!--ssr-outlet-->", html)
          .replace(/<title[^>]*>[\s\S]*?<\/title>/, `<title>${escTitle}</title>`)
          .replace(
            /<meta name="description" content=".*?" \/>/,
            `<meta name="description" content="${escDesc}" />`
          );
        res.send(page);
      } catch (err) {
        console.error("[SSR] render failed for", req.path, err);
        res.send(template);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel imports this module for its `api/[...path].ts` serverless function (see that
// file) purely to reuse `app` and its already-registered /api/* routes; it must never
// also call app.listen() or start the dev/SSR static-serving branch above. Every /api/*
// route is registered at module load regardless of this guard, since they're all
// declared above this point, not inside startServer().
if (!process.env.VERCEL) {
  startServer();
}

export default app;
