import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../_lib/cors';
import { getExhibitorById } from '../_lib/data';

/**
 * GET /api/exhibitors/:id
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ error: 'missing_id' });

  const exhibitor = getExhibitorById(id);
  if (!exhibitor) return res.status(404).json({ error: 'not_found', id });

  const { embedding, embedding_text, ...rest } = exhibitor;
  res.status(200).json(rest);
}
