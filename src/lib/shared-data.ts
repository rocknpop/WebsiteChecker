export interface FAQ {
  question: string;
  answer: string;
}

export interface DecisionReport {
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
  timestamp: string;
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export interface RecentDecision {
  query: string;
  verdict: "UP" | "NEUTRAL" | "DOWN";
  timestamp?: string;
}

export const seedDecisions: DecisionReport[] = [
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
    reasoning: "With the AI boom continuing in full force, Python proficiency has transitioned from an elective skill to a mandatory prerequisite. From building LLM wrappers to data extraction and system scripting, Python's ecosystem is unmatched. Its soft learning curve ensures that even non-developers can use it to automate administrative tasks.",
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
    recommendedFor: "Adaptable, open-minded professionals, remote workers, or students looking to expand their worldview and optimize lifestyles.",
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
      { question: "Who is it best for?", answer: "Disciplined experts, proactive communicators, and corporate refugees seeking independent remote lifestyles." }
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

export const blogPosts: BlogPost[] = [
  {
    id: "best-side-hustles-2026",
    title: "The Absolute Best Side Hustles to Start in 2026",
    slug: "best-side-hustles-in-2026",
    category: "Side Hustles",
    publishedAt: "June 15, 2026",
    readTime: "6 min read",
    excerpt: "Discover the high-leverage side projects that are thriving in 2026, from specialized AI Automation Agencies to print-on-demand niches that avoid the low-margin traps of traditional e-commerce.",
    content: `The side hustle landscape has completely evolved. In 2026, generic business models like dropshipping or simple affiliate blogs are facing extreme headwinds. Rising ad costs and AI saturation have raised the bar for what succeeds.

To thrive, you must focus on **high-leverage, low-overhead digital assets**. Here are the four prime side hustles for 2026:

### 1. AI Automation Agencies (AAA)
Local businesses are losing thousands of hours to manual administration. If you can build simple Zapier or Make.com workflows that sync emails with customer databases or configure voice agents, you can command $2,000/month retainers with virtually zero operational cost.

### 2. Faceless Video Production
YouTube's storytelling algorithm is more lucrative than ever. By utilizing premium AI editors, you can script, design, and render high-retention video essays in niches like history, finance, or animated science without ever showing your face on camera.

### 3. Micro-SaaS Micro-Acquisitions
Instead of trying to build the next multi-million dollar software, focus on single-purpose utility tools. Build small extensions, calculators, or templates that solve a specific problem for specific platforms (like Shopify or Notion) and sell them for steady monthly fees.

### 4. Specialized Newsletters
Audiences are fleeing generic social media feeds in search of curated, high-quality expert advice. Starting a niche newsletter in sub-sectors like climate-tech, quantum computing, or digital architecture allows you to secure premium sponsorships.`
  },
  {
    id: "is-amazon-kdp-still-worth-it",
    title: "Is Amazon KDP Still Worth It in 2026? An Honest Review",
    slug: "is-amazon-kdp-still-worth-it",
    category: "Side Hustles",
    publishedAt: "May 28, 2026",
    readTime: "8 min read",
    excerpt: "Low-content planners and generic books have flooded Amazon. We break down the exact strategy required to make self-publishing profitable today.",
    content: `If you are thinking of uploading 500 blank journals or copy-pasted low-content notebooks to Amazon KDP hoping to retire next month, we have bad news: **that model is dead.**

Amazon's marketplace has been hit by a tidal wave of automated low-content uploads, leading to extreme consumer fatigue and strict platform review guidelines. However, self-publishing is still a goldmine if you understand the new rules of the game:

### Niche Down Obsessively
Do not write a generic 'cooking guide.' Write 'The Ultimate High-Protein Air-Fryer Cookbook for Busy College Students.' Finding tiny, underserved sub-niches with high buyer search volume and low author competition is the single most important step.

### Quality Over Volume
One highly polished, professionally covered book with 50 genuine reviews will out-earn 500 low-effort journals combined. Hire cover designers or invest in learning advanced typography.

### Master Amazon PPC Ads
Organic rankings are difficult to secure initially. To succeed, you must learn to run laser-focused, low-cost PPC campaigns targeting exact-match competitor terms to trigger Amazon's positive flywheel.`
  },
  {
    id: "should-you-learn-python-2026",
    title: "Should You Still Learn Python in 2026? (AI Impact analyzed)",
    slug: "should-you-learn-python-in-2026",
    category: "Careers",
    publishedAt: "June 02, 2026",
    readTime: "5 min read",
    excerpt: "With AI tools now writing code instantly, is learning programming still worth it? We analyze the job market and why Python remains a top tier career asset.",
    content: `With advanced code-generation models writing scripts, refactoring arrays, and constructing entire databases in milliseconds, many aspiring developers are asking a vital question: *Is it still worth spending months learning to code?*

The answer is **yes, more than ever—especially with Python.**

AI is not replacing developers; it is replacing developers who don't use AI. Python remains the fundamental language of the AI revolution. Here is why you must learn it in 2026:

### The Interface of AI
Every major machine learning model, LLM framework (like LangChain or LlamaIndex), and data science toolkit is built in Python. To integrate, tune, and operationalize AI, you need Python skills.

### High-Volume Automation
Python is a superpower for non-engineers. Whether you are a marketer scrape-harvesting leads, a financial analyst automating reports, or an administrator organizing files, writing a 10-line Python script saves hours.

### Cognitive System Oversight
Because AI writes code, someone must act as the supervisor. You need to read the code, debug logical fallacies, verify API securities, and understand system architecture. Python's clean, readable syntax makes it the perfect language for this administrative role.`
  },
  {
    id: "top-ai-business-ideas",
    title: "Top AI-Powered Business Models for Solo Entrepreneurs",
    slug: "top-ai-business-ideas",
    category: "Business",
    publishedAt: "May 12, 2026",
    readTime: "7 min read",
    excerpt: "The landscape has shifted from basic wrappers to vertical business integrations. Explore the most lucrative AI ventures you can start today.",
    content: `The era of basic ChatGPT wrappers is officially behind us. Customers are no longer willing to pay for simple tools that just call the OpenAI API.

In 2026, profitable AI businesses focus on **deep workflow integrations and vertical problem-solving**. Here are the top models for solo founders:

### 1. Vertical AI Customer Support
Instead of generic chat boxes, build highly localized, fine-tuned support agents for specific industries (e.g. dental clinics, plumbing services, or boutique hotels). Feed them local FAQs, sync them with booking calendars, and charge a monthly subscription for managing patient/customer inquiries.

### 2. Micro-Copywriting Engines
Generic AI text is easily recognizable. Build specialized AI generators focusing on narrow copywriting tasks—like generating highly convertive Amazon product bullet points, real estate listing descriptions, or high-click email subject lines.

### 3. Localization and Translation Services
With businesses expanding globally, translating audio, video, and websites into perfectly native, context-aware localized languages is a massive sector. Build translation pipelines combining transcription and voice cloned synthesizers.`
  }
];

export const recentSeed: RecentDecision[] = [
  { query: "Should I start a faceless YouTube channel in 2026?", verdict: "UP" },
  { query: "Should I start dropshipping?", verdict: "DOWN" },
  { query: "Should I learn Python?", verdict: "UP" },
  { query: "Should I move abroad?", verdict: "NEUTRAL" },
  { query: "Should I start freelancing?", verdict: "UP" },
  { query: "Should I buy ChatGPT Plus?", verdict: "UP" },
  { query: "Should I start Amazon KDP?", verdict: "NEUTRAL" },
  { query: "Should I start an AI agency?", verdict: "UP" }
];

// Global cache for ultra-fast performance and 100% Lighthouse / PageSpeed score
export const decisionCache = new Map<string, DecisionReport>();

// Active list of queries for homepage engagement sections
export let recentQueries: { query: string; verdict: "UP" | "NEUTRAL" | "DOWN"; timestamp: string }[] = [];

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
export function getCacheMatch(query: string): DecisionReport | null {
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

export function generateFallbackReport(query: string): DecisionReport {
  const qLower = query.toLowerCase();

  let verdict: "UP" | "NEUTRAL" | "DOWN" = "UP";
  let score = 75;
  let difficulty = 6;
  let cost = 4;
  let riskLevel: "Low" | "Medium" | "High" = "Medium";
  let potentialReward: "Low" | "Medium" | "High" | "Very High" = "High";
  let timeToResults = "1-3 Months";

  if (qLower.includes("dropshipping") || qLower.includes("forex") || qLower.includes("crypto") || qLower.includes("day trading") || qLower.includes("mlm") || qLower.includes("gamble")) {
    verdict = "DOWN";
    score = 25;
    difficulty = 9;
    cost = 7;
    riskLevel = "High";
    potentialReward = "Low";
    timeToResults = "6+ Months";
  } else if (qLower.includes("python") || qLower.includes("coding") || qLower.includes("software") || qLower.includes("newsletter") || qLower.includes("ai") || qLower.includes("saas") || qLower.includes("engineer")) {
    verdict = "UP";
    score = 88;
    difficulty = 5;
    cost = 2;
    riskLevel = "Low";
    potentialReward = "Very High";
    timeToResults = "2-4 Weeks";
  } else if (qLower.includes("buy") || qLower.includes("purchase") || qLower.includes("get")) {
    verdict = "NEUTRAL";
    score = 50;
    difficulty = 2;
    cost = 8;
    riskLevel = "Medium";
    potentialReward = "Medium";
    timeToResults = "Immediate";
  }

  const proList = verdict === "UP" ? [
    "Extremely low initial startup costs and high scalability",
    "Massive market demand and rapid learning resources available",
    "Great leverage to build a personal brand or high-ticket portfolio"
  ] : verdict === "DOWN" ? [
    "Heavily saturated market with low organic reach",
    "Extremely high customer acquisition costs (CAC) and margin erosion",
    "High probability of burnout or financial loss without significant capital"
  ] : [
    "Immediate utility or gratification",
    "Provides reliable quality of life or operational improvements",
    "Allows testing high-performance features in daily workflows"
  ];

  const conList = verdict === "UP" ? [
    "Requires consistent effort before seeing exponential returns",
    "Initial friction in finding your exact underserved target niche",
    "Fierce competition requires unique personal positioning"
  ] : verdict === "DOWN" ? [
    "Intense pricing pressure from established global entities",
    "Highly volatile regulations, advertising costs, and account bans",
    "No long-term defensible intellectual property or asset value"
  ] : [
    "High upfront financial cost for marginal returns",
    "Substantial depreciation or subscription lock-in",
    "Overkill for basic, non-professional workflows"
  ];

  const chosenVerdict = verdict;
  const formattedVerdict = chosenVerdict === "UP" ? "UP ✅" : chosenVerdict === "DOWN" ? "DOWN ❌" : "NEUTRAL ⚠️";

  return {
    query,
    verdict,
    confidenceScore: score,
    summary: `Your career and lifestyle coach strategic evaluation for "${query}" shows this is a definitive ${verdict} decision under current 2026 conditions. ${verdict === "UP" ? "Starting this provides massive upside with low entry barriers if you focus on a specialized niche." : verdict === "DOWN" ? "This path carries significant operational friction, low margins, and highly volatile customer acquisition metrics." : "This is a balanced preference that depends on your current cash reserves and active workflow requirements."}`,
    pros: proList,
    cons: conList,
    difficulty,
    cost,
    timeToResults,
    riskLevel,
    potentialReward,
    recommendedFor: verdict === "UP" ? "Action-oriented individuals who can commit 10-15 hours a week and possess intermediate technical or creative skills." : "Anyone with very high risk tolerance and extensive capital reserves who can afford to lose their initial budget.",
    notRecommendedFor: verdict === "UP" ? "People looking for quick, overnight riches without putting in solid foundational work." : "Individuals with low risk tolerance, or those expecting a predictable, steady hourly wage.",
    reasoning: `Analysis of ${query} indicates a strong correlation with prevailing digital trends in 2026. A strategic assessment suggests targeting a micro-niche to avoid general search engine and ad channel competition. If you proceed, execute with lean operations and short validation cycles.`,
    faqs: [
      { question: "Is this highly saturated in 2026?", answer: "General categories are saturated, but specialized niches (e.g. B2B automation instead of general chatbots) have massive, untapped demand." },
      { question: "How much starting capital is required?", answer: `Typically between $0 and $${cost * 100} to launch a basic MVP and build early traction.` },
      { question: "How many hours per week should I dedicate?", answer: "At least 10 to 15 hours of deep, focused work to build momentum and achieve validation within 30 days." },
      { question: "What is the single biggest risk?", answer: "Losing focus or trying to appeal to a broad audience instead of establishing authority inside a targeted sub-sector." },
      { question: "How do I secure my first client or sale?", answer: "Perform direct, highly personalized outreach showcasing a customized free audit or prototype to prove immediate value." }
    ],
    timestamp: new Date().toISOString(),
    seo: {
      decision_title: `Is ${query} Worth It in 2026?`,
      meta_description: `Honest expert evaluation for "${query}". Get strategic cost, difficulty, and risk metrics.`,
      seo_summary: `Evaluating ${query} reveals a structured path. Standard channels have high competition, but leveraging organic vertical content or niche direct sales yields higher ROI. Review our full analytical breakdowns for detailed metrics.`,
      slug: query.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-")
    }
  };
}
