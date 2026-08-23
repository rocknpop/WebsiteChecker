// Pure data + types shared by the decision-engine serverless functions. Deliberately
// has zero imports beyond plain TypeScript — no express, vite, or fs — so it's always
// safe to import from a Vercel function bundle regardless of whatever is wrong with
// server.ts's heavier SSR/dev-server machinery.

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

// Curated seed data so core programmatic SEO decisions load instantly (0ms).
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

// Normalized query matching against the seed set (a same-instance in-memory cache is
// layered on top of this per function; see analyze-decision.ts).
export function getSeedMatch(query: string): DecisionReport | null {
  const norm = query.toLowerCase().trim().replace(/[?.]/g, "").replace(/\s+/g, " ");
  for (const report of seedDecisions) {
    const cleanKey = report.query.toLowerCase().trim().replace(/[?.]/g, "").replace(/\s+/g, " ");
    if (cleanKey === norm || cleanKey.includes(norm) || norm.includes(cleanKey)) {
      return report;
    }
  }
  return null;
}
