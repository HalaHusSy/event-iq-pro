import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from './_lib/cors';
import { mockMatch } from './_lib/data';
import { buildMatchCards, buildMatchReply, type MatchResponse } from './_lib/response';

/**
 * POST /api/match
 *
 * Called by Botnoi Console webhook (or our own EventIQ chat widget).
 *
 * Request body:
 *   {
 *     "message": "อยากลด call center cost ด้วย AI",
 *     "user_id": "line:U1234abcd",            // optional, for analytics
 *     "lang": "th"                            // optional, defaults to "th"
 *   }
 *
 * Response:
 *   {
 *     "reply_text": "ลองดู 2 บูธที่เหมาะกับโจทย์ค่ะ",
 *     "cards": [{rank, exhibitor_id, booth_no, why_match_th, ...}, ...],
 *     "follow_up_question": "อยากเปรียบเทียบบูธไหนคะ?",
 *     "meta": {...}
 *   }
 *
 * In Botnoi Console, map `reply_text` → bot text response, and `cards`
 * → carousel/Flex Message. The endpoint returns CORS-permissive headers
 * so Botnoi server can call cross-origin.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const start = Date.now();
  const body = (typeof req.body === 'string' ? safeJsonParse(req.body) : req.body) ?? {};
  const message: string = body.message ?? body.pain ?? body.text ?? '';
  const lang: 'th' | 'en' = body.lang === 'en' ? 'en' : 'th';

  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      error: 'missing_message',
      hint: 'Send {"message": "your pain point", "lang": "th"|"en"}',
    });
  }

  const candidates = mockMatch(message);
  const cards = buildMatchCards(candidates, lang);
  const reply = buildMatchReply(candidates, lang);

  const response: MatchResponse = {
    ...reply,
    cards,
    meta: {
      matched_count: candidates.length,
      used_mock_llm: true,
      latency_ms: Date.now() - start,
    },
  };

  res.status(200).json(response);
}

function safeJsonParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
