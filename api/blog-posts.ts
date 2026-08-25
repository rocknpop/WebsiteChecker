// Standalone Vercel function for GET /api/blog-posts. Data inlined — see the comment
// at the top of api/analyze-decision.ts for why a shared api/_lib/*.ts import isn't
// used here.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { blogPosts } from '../src/lib/shared-data';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  return res.status(200).json(blogPosts);
}
