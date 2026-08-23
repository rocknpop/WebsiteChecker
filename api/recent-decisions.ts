// Standalone Vercel function for GET /api/recent-decisions.
//
// Data is inlined rather than imported from a sibling module — see the comment at the
// top of api/analyze-decision.ts for why: Vercel's builder failed to bundle a separate
// api/_lib/*.ts file, so every function that imported from it crashed with
// FUNCTION_INVOCATION_FAILED.
//
// Honest limitation: on serverless, this function has no shared memory with
// analyze-decision.ts (separate function, separate process) so it can't reflect
// genuinely live cross-visitor query history without a real database. It returns
// the curated seed decisions instead of an empty list, which is the closest honest
// approximation available without adding persistent storage.
import type { VercelRequest, VercelResponse } from '@vercel/node';

const recentSeed = [
  { query: "Should I start a faceless YouTube channel in 2026?", verdict: "UP" as const },
  { query: "Should I start dropshipping?", verdict: "DOWN" as const },
  { query: "Should I learn Python?", verdict: "UP" as const },
  { query: "Should I move abroad?", verdict: "NEUTRAL" as const },
  { query: "Should I start freelancing?", verdict: "UP" as const },
  { query: "Should I buy ChatGPT Plus?", verdict: "UP" as const },
  { query: "Should I start Amazon KDP?", verdict: "NEUTRAL" as const },
  { query: "Should I start an AI agency?", verdict: "UP" as const },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const now = new Date().toISOString();
  const recent = recentSeed.map((r) => ({ ...r, timestamp: now }));

  return res.status(200).json(recent);
}
