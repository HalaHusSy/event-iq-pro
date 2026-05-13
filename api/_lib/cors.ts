import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Add permissive CORS so the Botnoi Console (different origin) can call
 * these endpoints from its bot runtime. Tighten in production if needed.
 */
export function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Eventiq-Token');
  res.setHeader('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true; // handled, caller should stop
  }
  return false;
}

export function methodNotAllowed(res: VercelResponse, allowed: string[]) {
  res.setHeader('Allow', allowed.join(', '));
  res.status(405).json({ error: 'method_not_allowed', allowed });
}
