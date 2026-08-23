// Standalone Vercel serverless function for POST /api/ai-assistant.
//
// This duplicates the /api/ai-assistant handler already registered on the Express
// `app` in server.ts (reused via api/[...path].ts) rather than relying on that
// catch-all alone: a specific route file (this one) always wins Vercel's routing
// priority over a dynamic catch-all, so if the catch-all's build of the larger,
// vite/fs-entangled server.ts app ever fails or misbehaves, this lightweight,
// self-contained function still serves the assistant correctly. It imports nothing
// from server.ts on purpose, to stay immune to whatever is wrong there.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { prompt } = req.body ?? {};
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'A prompt string is required.' });
  }
  const normalizedPrompt = prompt.trim();

  if (!ai) {
    return res.status(503).json({
      error: 'AI assistant is currently unavailable. No valid Gemini API key was detected in the environment settings.',
    });
  }

  try {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        answer: { type: Type.STRING, description: 'A concise, conversational, 1-2 sentence reply to the user.' },
        intent: { type: Type.STRING, description: "Must be exactly one of: 'diagnostic', 'decision', 'info'." },
        tool: { type: Type.STRING, description: "When intent is 'diagnostic', the matching tool id: 'status', 'dns', 'ip', 'ssl', 'whois', or 'port'. Omit or leave empty otherwise." },
        target: { type: Type.STRING, description: "When intent is 'diagnostic', the bare domain or IP the user asked about (no protocol, no path). Omit or leave empty otherwise." },
        decisionQuery: { type: Type.STRING, description: "When intent is 'decision', the user's question normalized into a clean 'Should I ... ?' phrasing. Omit or leave empty otherwise." },
      },
      required: ['answer', 'intent'],
    };

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    const text = result.text;
    if (!text) {
      throw new Error('Received empty response text from Gemini API.');
    }

    const parsed = JSON.parse(text);
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Assistant Engine Error:', error);
    return res.status(500).json({
      error: 'Could not process that request. Please try rephrasing, or check back in a moment.',
    });
  }
}
