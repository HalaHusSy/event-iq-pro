import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../../_lib/cors';
import { getEventById } from '../../../src/lib/mock/events-rich';
import { getExhibitors } from '../../_lib/data';

/**
 * GET /api/events/:id/exhibitors
 * Returns the roster of booths in this event (joined with the canonical
 * exhibitor data — heavy embedding fields stripped). Adds `pain_points`
 * convenience field surfaced from each exhibitor's problem_statements_en.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ error: 'missing_id' });

  const event = getEventById(id);
  if (!event) return res.status(404).json({ error: 'not_found', id });

  const all = getExhibitors();
  const byId = new Map(all.map((e) => [e.id, e] as const));

  const items = event.exhibitor_ids
    .map((eid) => byId.get(eid))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .map((e) => {
      const { embedding, embedding_text, ...rest } = e as any;
      return {
        ...rest,
        pain_points: e.problem_statements_en ?? [],
      };
    });

  res.status(200).json({
    event_id: event.id,
    event_name: event.name,
    count: items.length,
    items,
  });
}
