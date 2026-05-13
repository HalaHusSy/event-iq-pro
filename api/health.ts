import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from './_lib/cors';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  res.status(200).json({
    ok: true,
    service: 'eventiq-api',
    version: '0.1.0-pitch',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET  /api/health',
      'GET  /api/exhibitors',
      'GET  /api/exhibitors/:id',
      'POST /api/match',
      'GET  /api/faq',
      'POST /api/faq',
      'POST /api/admin/sheet-sync',
      'POST /api/admin/exhibitor',
    ],
  });
}
