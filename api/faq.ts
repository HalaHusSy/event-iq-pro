import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, methodNotAllowed } from './_lib/cors';
import { FAQ_KB, mockFaqSearch } from './_lib/data';
import type { FaqResponse } from './_lib/response';

/**
 * GET  /api/faq               → return all FAQ entries
 * POST /api/faq               → search FAQ by question
 *   body: { "question": "...", "lang": "th"|"en" }
 *   response: { answer, source_faq_ids, related_questions }
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method === 'GET') {
    return res.status(200).json({ count: FAQ_KB.length, items: FAQ_KB });
  }

  if (req.method === 'POST') {
    const body = (typeof req.body === 'string' ? safeJsonParse(req.body) : req.body) ?? {};
    const question: string = body.question ?? body.message ?? body.text ?? '';
    const lang: 'th' | 'en' = body.lang === 'en' ? 'en' : 'th';

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'missing_question' });
    }

    const matches = mockFaqSearch(question, lang);
    const top = matches[0];

    const response: FaqResponse = {
      answer: lang === 'th' ? top.answer_th : top.answer_en,
      answer_th: top.answer_th,
      answer_en: top.answer_en,
      source_faq_ids: matches.map((m) => m.id),
      related_questions: matches.slice(1).map((m) => ({
        id: m.id,
        question_th: m.question_th,
        question_en: m.question_en,
      })),
    };

    return res.status(200).json(response);
  }

  return methodNotAllowed(res, ['GET', 'POST']);
}

function safeJsonParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
