import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../_lib/cors';
import { getExhibitors } from '../_lib/data';

/**
 * GET /api/exhibitors
 *   ?industry=Banking          (optional filter)
 *   ?solution=Voice+AI         (optional, matches solution_categories)
 *   ?hall=Hall+A               (optional)
 *
 * Returns the canonical list. Embedding fields are stripped to keep
 * payload light.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  let items = getExhibitors();

  const industry = stringParam(req.query.industry);
  const solution = stringParam(req.query.solution);
  const hall = stringParam(req.query.hall);

  if (industry) items = items.filter((e) => e.industry === industry || e.target_industries.includes(industry as any));
  if (solution) items = items.filter((e) => e.solution_categories.includes(solution as any));
  if (hall) items = items.filter((e) => e.hall === hall);

  const lite = items.map((e) => {
    const { embedding, embedding_text, ...rest } = e;
    return rest;
  });

  res.status(200).json({ count: lite.length, items: lite });
}

function stringParam(v: string | string[] | undefined): string | undefined {
  if (!v) return undefined;
  return Array.isArray(v) ? v[0] : v;
}
