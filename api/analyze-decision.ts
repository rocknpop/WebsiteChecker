// Standalone Vercel serverless function for POST /api/analyze-decision — the site's
// core "Should You Do It?" AI verdict engine. See api/ai-assistant.ts for why this is
// a self-contained function rather than routed through server.ts's app: a specific
// route file always wins Vercel's routing priority over the api/[...path].ts catch-all,
// so this stays correct even if that catch-all's build ever fails.
//
// Note on state: decisionCache and recentQueries below are per-function-instance
// in-memory state, exactly as they were in server.ts. On Vercel this cache does NOT
// persist or share across separate warm instances the way a single long-running
// process (this app's original Cloud Run target) would — it only helps repeat
// identical queries landing on the same warm instance. That's a real behavior change
// from a persistent server, not a bug introduced here; without a real database there
// is no way to share this cache/history across serverless invocations.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { DecisionReport, seedDecisions, getSeedMatch } from './_lib/decision-data';

let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
  }
} catch (err) {
  console.error('Failed to initialize Gemini AI SDK:', err);
}

const decisionCache = new Map<string, DecisionReport>();
seedDecisions.forEach((report) => decisionCache.set(report.query.toLowerCase().trim(), report));

function getCacheMatch(query: string): DecisionReport | null {
  const norm = query.toLowerCase().trim().replace(/[?.]/g, "").replace(/\s+/g, " ");
  if (decisionCache.has(norm)) return decisionCache.get(norm)!;
  if (decisionCache.has(norm + "?")) return decisionCache.get(norm + "?")!;
  for (const [key, value] of decisionCache.entries()) {
    const cleanKey = key.replace(/[?.]/g, "").replace(/\s+/g, " ");
    if (cleanKey === norm || cleanKey.includes(norm) || norm.includes(cleanKey)) return value;
  }
  return getSeedMatch(query);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { query } = req.body ?? {};
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Please enter a valid decision question to analyze.' });
  }

  const normalizedQuery = query.trim();

  const cached = getCacheMatch(normalizedQuery);
  if (cached) {
    return res.status(200).json(cached);
  }

  if (!ai) {
    const chosenVerdict = Math.random() > 0.5 ? 'UP' : 'DOWN';
    const formattedVerdict = chosenVerdict === 'UP' ? 'UP ✅' : 'DOWN ❌';
    const fallbackReport: DecisionReport = {
      query: normalizedQuery,
      verdict: chosenVerdict,
      formatted_verdict: formattedVerdict,
      verdict_reasoning: chosenVerdict === 'UP'
        ? `${normalizedQuery} shows tremendous potential with high growth indices in 2026.`
        : `${normalizedQuery} carries significant risk factors and market oversaturation in 2026.`,
      confidenceScore: 82 + Math.floor(Math.random() * 15),
      summary: `Evaluating: "${normalizedQuery}". This is an automated diagnostic preview. Connect your live Gemini API key in Settings > Secrets to enable complete AI analytical coverage.`,
      pros: [
        'Provides immediate learning and practical experience',
        'Flexible, scalable opportunity with modern leverage',
        'Potential long-term compound growth'
      ],
      cons: [
        'Requires consistent time allocation and initial focus',
        'Uncertainty in market trends and algorithm parameters',
        'Overhead costs can scale if not managed carefully'
      ],
      difficulty: 5 + Math.floor(Math.random() * 4),
      cost: 1 + Math.floor(Math.random() * 8),
      timeToResults: '3-12 Months',
      riskLevel: 'Medium',
      potentialReward: 'High',
      recommendedFor: 'Proactive problem solvers looking for modern side hustles or lifestyle optimizations.',
      notRecommendedFor: 'People searching for instantaneous, guaranteed results with zero effort.',
      reasoning: `This is a strategic review of ${normalizedQuery}. Under diagnostic conditions, the opportunities indicate high learning metrics but require operational prudence. Setup your real GEMINI_API_KEY in the workspace to see detailed, state-of-the-art reports.`,
      detailed_analysis: {
        key_benefit_or_risk: chosenVerdict === 'UP'
          ? 'Unlocks a high-growth leveraged skill or lifestyle asset with compounding value.'
          : 'Represents high customer-acquisition friction or potential burnout risk without proven returns.',
        market_relevance: 'The market in 2026 is rapidly evolving. High demand persists for unique, non-commodity value.',
        required_effort: 'Demands solid initial focus and 10-15 hours per week of disciplined work over 6 months.',
        ideal_candidate: 'Self-motivated individuals who learn daily, leverage modern AI tools, and tolerate uncertainty.'
      },
      actionable_next_step: chosenVerdict === 'UP'
        ? 'Start by taking 1 hour to outline your roadmap, set up a dedicated workspace, and build your first minimal prototype.'
        : 'Instead, investigate adjacent lower-risk or higher-margin models that match your capital and skill levels.',
      social_share_text: `Just got my verdict from downorup.net: ${normalizedQuery} is ${formattedVerdict}! Time to take strategic action! 🚀`,
      seo: {
        decision_title: `Should I ${normalizedQuery}? Verdict: ${formattedVerdict} | DownOrUp.net`,
        meta_description: `Read the brutal, data-backed truth about whether you should ${normalizedQuery.toLowerCase()} in 2026.`,
        seo_summary: `The dilemma of whether to ${normalizedQuery.toLowerCase()} is one faced by many professionals in 2026. This comprehensive strategic evaluation analyzes the direct cost, effort, and market saturation levels to give you a definitive binary answer. By looking at immediate trends, we can see if this choice matches your risk appetite or if you should seek alternatives.`,
        slug: normalizedQuery.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      },
      faqs: [
        { question: 'What are the benefits?', answer: 'Acquisition of highly versatile skills, personal growth, and potential digital independence.' },
        { question: 'What are the risks?', answer: 'Logistical friction, initial loss of leisure time, and minor capital expenditure.' },
        { question: 'How much does it cost?', answer: 'Varies from $100 to $1,000 depending on your operational choices and software requirements.' },
        { question: 'How long does it take?', answer: 'Generally 3 to 12 months before seeing high, stable returns on effort.' },
        { question: 'Who is it best for?', answer: 'Driven, independent thinkers willing to learn daily.' }
      ],
      timestamp: new Date().toISOString()
    };
    decisionCache.set(normalizedQuery.toLowerCase(), fallbackReport);
    return res.status(200).json(fallbackReport);
  }

  try {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING },
        verdict: { type: Type.STRING, description: "Must be 'UP' or 'DOWN'" },
        formatted_verdict: { type: Type.STRING, description: "Must be 'UP ✅' or 'DOWN ❌'" },
        verdict_reasoning: { type: Type.STRING, description: "A concise, single-sentence summary of the main reason for the verdict." },
        confidenceScore: { type: Type.INTEGER, description: 'Confidence percentage (0 to 100)' },
        summary: { type: Type.STRING, description: 'A concise, highly professional summary overview of 1-2 sentences' },
        pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of exactly 3 distinct, valuable benefits or advantages' },
        cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'List of exactly 3 distinct, valuable risks or disadvantages' },
        difficulty: { type: Type.INTEGER, description: 'A score from 1 (very simple) to 10 (extremely complex)' },
        cost: { type: Type.INTEGER, description: 'A score from 1 (practically free) to 10 (thousands in capital)' },
        timeToResults: { type: Type.STRING, description: "Must be 'Immediate', '1-3 Months', '3-12 Months', or '1-3 Years'" },
        riskLevel: { type: Type.STRING, description: "Must be 'Low', 'Medium', or 'High'" },
        potentialReward: { type: Type.STRING, description: "Must be 'Low', 'Medium', or 'High', or 'Very High'" },
        recommendedFor: { type: Type.STRING, description: 'Who this decision is ideal for' },
        notRecommendedFor: { type: Type.STRING, description: 'Who should strictly avoid this decision' },
        reasoning: { type: Type.STRING, description: 'A highly comprehensive, strategic, and detailed final verdict reasoning' },
        detailed_analysis: {
          type: Type.OBJECT,
          properties: {
            key_benefit_or_risk: { type: Type.STRING, description: 'The single most compelling reason to do/not do it.' },
            market_relevance: { type: Type.STRING, description: 'Analysis of the current trend, job market, or saturation level (where applicable).' },
            required_effort: { type: Type.STRING, description: 'An honest assessment of the time, cost, or emotional effort required.' },
            ideal_candidate: { type: Type.STRING, description: 'Who is best suited for this decision (even if the verdict is DOWN, mention who might still do it).' }
          },
          required: ['key_benefit_or_risk', 'market_relevance', 'required_effort', 'ideal_candidate']
        },
        actionable_next_step: { type: Type.STRING, description: "A clear 'If you decide to do this, start by...' or 'Instead, you should look into...' advice." },
        social_share_text: { type: Type.STRING, description: 'A viral-ready snippet suitable for Twitter/X or LinkedIn.' },
        seo: {
          type: Type.OBJECT,
          properties: {
            decision_title: { type: Type.STRING, description: "The SEO-optimized page title." },
            meta_description: { type: Type.STRING, description: 'A compelling description summarizing the decision and its outcome.' },
            seo_summary: { type: Type.STRING, description: 'A 2-3 paragraph detailed breakdown of the decision, using rich, relevant keywords.' },
            slug: { type: Type.STRING, description: 'An SEO-friendly, URL-safe slug.' }
          },
          required: ['decision_title', 'meta_description', 'seo_summary', 'slug']
        },
        faqs: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: { question: { type: Type.STRING }, answer: { type: Type.STRING } },
            required: ['question', 'answer']
          },
          description: "Generate 5 dynamic and highly relevant FAQs based on: 'What are the benefits?', 'What are the risks?', 'How much does it cost?', 'How long does it take?', 'Who is it best for?'"
        }
      },
      required: [
        'query', 'verdict', 'formatted_verdict', 'verdict_reasoning', 'confidenceScore', 'summary', 'pros', 'cons',
        'difficulty', 'cost', 'timeToResults', 'riskLevel', 'potentialReward',
        'recommendedFor', 'notRecommendedFor', 'reasoning', 'detailed_analysis',
        'actionable_next_step', 'social_share_text', 'seo', 'faqs'
      ]
    };

    const prompt = `Perform a comprehensive, detailed strategic decision evaluation of this choice: "${normalizedQuery}".
Analyze it objectively for the current year 2026. Be realistic, truthful, and data-driven.
Assess the market conditions, viability, costs, and risks.
Choose a definitive binary verdict: either "UP" or "DOWN". You MUST choose either "UP" or "DOWN". Do not output "Maybe" or "It Depends".
Make sure to answer the 5 specified FAQs fully.`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are the witty, data-driven core engine for "DownOrUp.net", the ultimate AI-powered decision platform.
Your persona is that of a "Brutally Honest Career & Lifestyle Coach," similar to a supportive but direct mentor. You cut through the noise with data, current trends, and logical analysis, always delivering a decisive "UP ✅" (Do it) or "DOWN ❌" (Don't do it) verdict.

Operation Instructions:
1. Strict JSON Output: You must ONLY output valid JSON. Do not wrap the JSON in markdown blocks.
2. Binary Decision: You MUST choose either "UP" or "DOWN".
3. SEO Optimization: generate 'decision_title', 'meta_description' (150-160 chars), and 'seo_summary' (2-3 paragraphs).
4. Tone: UP verdicts enthusiastic and motivational; DOWN verdicts critical and direct about risks.`,
        responseMimeType: 'application/json',
        responseSchema,
        temperature: 1.0,
      }
    });

    const text = result.text;
    if (!text) {
      throw new Error('Received empty response text from Gemini API.');
    }

    const report: DecisionReport = JSON.parse(text);
    report.query = normalizedQuery;
    report.timestamp = new Date().toISOString();

    decisionCache.set(normalizedQuery.toLowerCase().trim(), report);

    return res.status(200).json(report);
  } catch (err: any) {
    console.error(`[AI Engine] Exception during analysis of "${normalizedQuery}":`, err);
    return res.status(500).json({
      error: 'Our AI Strategic Engine timed out or encountered an issue. Please try rephrasing your question or check back in a moment.',
      details: err?.message || String(err)
    });
  }
}
