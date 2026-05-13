import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../_lib/cors';

/**
 * POST /api/admin/sheet-sync
 * Stub for Chunk 3 — will pull Google Sheet CSV, validate, and re-generate
 * src/lib/mock/exhibitors.generated.ts. For now returns a placeholder.
 *
 * Auth: simple shared-secret in header `X-Eventiq-Token` (set ADMIN_TOKEN
 * env var). When token matches, proceed; otherwise 401.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const token = req.headers['x-eventiq-token'];
  const expected = process.env.ADMIN_TOKEN;
  if (expected && token !== expected) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  res.status(200).json({
    ok: true,
    stub: true,
    note: 'Sheet sync handler will be implemented in Chunk 3. Currently the canonical 2 seed records are served.',
    next_step: 'Run scripts/sync-sheet.ts then deploy to refresh.',
  });
}
