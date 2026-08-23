// Catch-all Vercel serverless function for every /api/* request.
//
// This project's app logic (server.ts) was originally built for a persistent-server
// platform (Cloud Run) — see .env.example's Cloud Run references — but is deployed on
// Vercel, which only runs code placed under /api/ as individual serverless functions.
// server.ts's app.listen() never executes on Vercel, so /api/* has been 404ing (or
// falling through to vercel.json's catch-all index.html rewrite) in production.
//
// Rather than duplicating server.ts's large decision-engine and blog-post logic here,
// this file re-exports the existing Express `app` (its /api/* routes are registered
// unconditionally at module load, before server.ts's own app.listen() call, which is
// itself guarded off under process.env.VERCEL) so Vercel invokes the exact same code
// path as local dev, for every /api/* sub-path, with zero duplicated logic.
import app from '../server';

export default app;
