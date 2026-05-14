import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../_lib/cors';
import { getEventById } from '../../src/lib/mock/events-rich';

/**
 * GET /api/events/:id  (or :slug)
 * Returns full event: venue map (floors + facilities), admin contacts,
 * bot config, plus the array of exhibitor ids participating.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ error: 'missing_id' });

  const event = getEventById(id);
  if (!event) return res.status(404).json({ error: 'not_found', id });

  res.status(200).json(event);
}
