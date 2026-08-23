import type { VercelRequest, VercelResponse } from '@vercel/node';
import { blogPosts } from './_lib/blog-data';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  return res.status(200).json(blogPosts);
}
