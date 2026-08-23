import type { VercelRequest, VercelResponse } from '@vercel/node';
import { blogPosts } from '../_lib/blog-data';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const { slug } = req.query;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return res.status(404).json({ error: 'Blog post not found.' });
  return res.status(200).json(post);
}
