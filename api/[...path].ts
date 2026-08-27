// Standalone Vercel function: JSON 404 for every unmatched /api/* path.
//
// Vercel routes more specific files under api/ first (blog-posts/index.ts,
// blog-posts/[slug].ts, recent-decisions.ts, ...), so this catch-all only
// receives /api/* requests that no other function matched.
//
// History: an earlier version re-exported the Express app from ../server.ts.
// Vercel's bundler does not include root-level server.ts in the function
// bundle, so every invocation crashed at module load with
// ERR_MODULE_NOT_FOUND ("Cannot find module '/var/task/server'") and
// surfaced as 500 FUNCTION_INVOCATION_FAILED in production. Every working
// API function in this repo is standalone with no imports outside api/ —
// this handler follows the same pattern.
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(404).json({ error: 'Not found.' });
}
