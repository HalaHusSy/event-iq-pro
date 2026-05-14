import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../../_lib/cors';
import { getExhibitorById } from '../../_lib/data';

/**
 * GET /api/exhibitors/:id/pain-points
 * Returns the pain points this exhibitor solves — derived from their
 * problem_statements_en plus a structured use_cases summary. Useful for
 * the Botnoi bot to phrase "this booth helps with X, Y, Z" reasoning.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) return res.status(400).json({ error: 'missing_id' });

  const e = getExhibitorById(id);
  if (!e) return res.status(404).json({ error: 'not_found', id });

  res.status(200).json({
    exhibitor_id: e.id,
    exhibitor_name: e.name,
    booth_no: e.booth_no,
    pain_points: e.problem_statements_en ?? [],
    unique_value_props: e.unique_value_props ?? [],
    use_cases: (e.use_cases ?? []).map((u: any) => ({
      title: u.title,
      industry: u.industry,
      problem_th: u.problem_th,
      problem_en: u.problem_en,
      outcome_metric: u.outcome_metric,
    })),
  });
}
