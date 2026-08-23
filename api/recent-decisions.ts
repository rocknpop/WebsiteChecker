// Standalone Vercel function for GET /api/recent-decisions.
//
// Honest limitation: on serverless, this function has no shared memory with
// analyze-decision.ts (separate function, separate process) so it can't reflect
// genuinely live cross-visitor query history without a real database. It returns
// the curated seed decisions instead of an empty list, which is the closest honest
// approximation available without adding persistent storage.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { seedDecisions } from './_lib/decision-data';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const recent = seedDecisions
    .slice(0, 12)
    .map((r) => ({ query: r.query, verdict: r.verdict, timestamp: r.timestamp }));

  return res.status(200).json(recent);
}
