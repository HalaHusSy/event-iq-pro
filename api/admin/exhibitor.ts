import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from '../_lib/cors';

/**
 * POST /api/admin/exhibitor
 * Proxy that forwards exhibitor edits to the Apps Script Web App (which
 * writes to the Google Sheet). Stub for Chunk 4.
 *
 * Expected body:
 *   { id, name, booth_no, hall, ... } (Exhibitor canonical shape)
 *
 * Auth: X-Eventiq-Token header matches ADMIN_TOKEN env var.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const token = req.headers['x-eventiq-token'];
  const expected = process.env.ADMIN_TOKEN;
  if (expected && token !== expected) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_WEBAPP_URL;
  if (!appsScriptUrl) {
    return res.status(200).json({
      ok: true,
      stub: true,
      note: 'Set APPS_SCRIPT_WEBAPP_URL env var to enable Sheet write. Body received was echoed below.',
      received: req.body,
    });
  }

  try {
    const upstream = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
    });
    const text = await upstream.text();
    const json = safeJson(text);
    res.status(upstream.status).json(json ?? { raw: text });
  } catch (err) {
    res.status(502).json({ error: 'upstream_failed', message: String(err) });
  }
}

function safeJson(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
