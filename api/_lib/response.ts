import type { Exhibitor } from '../../src/lib/mock/exhibitor.zod';
import type { MatchCandidate } from './data';

export interface MatchCard {
  rank: number;
  exhibitor_id: string;
  exhibitor_name: string;
  booth_no: string;
  hall: string;
  logo: string;
  match_score: number; // 0-100
  why_match_th: string;
  why_match_en: string;
  top_use_case: string;
  quoted_outcome?: string;
  cta_url: string;
}

export interface MatchResponse {
  reply_text: string;
  reply_text_th: string;
  reply_text_en: string;
  cards: MatchCard[];
  follow_up_question: string;
  meta: {
    matched_count: number;
    used_mock_llm: boolean;
    latency_ms: number;
  };
}

export interface FaqResponse {
  answer: string;
  answer_th: string;
  answer_en: string;
  source_faq_ids: string[];
  related_questions: { id: string; question_th: string; question_en: string }[];
}

export function buildMatchCards(candidates: MatchCandidate[], lang: 'th' | 'en'): MatchCard[] {
  return candidates.map((c, idx) => buildMatchCard(c, idx + 1, lang));
}

function buildMatchCard(c: MatchCandidate, rank: number, lang: 'th' | 'en'): MatchCard {
  const e: Exhibitor = c.exhibitor;
  const topUseCase = e.use_cases[0];
  const score = Math.round(c.match_score * 60 + 40); // 40-100 range, never zero
  const matched = c.matched_tokens.slice(0, 3).join(', ');

  const why_match_th = matched
    ? `ตรงกับคำสำคัญ ${matched} — ${e.tagline_th}`
    : `${e.tagline_th} เหมาะกับโจทย์ของคุณ`;
  const why_match_en = matched
    ? `Matches keywords ${matched} — ${e.tagline_en}`
    : `${e.tagline_en} fits your need`;

  return {
    rank,
    exhibitor_id: e.id,
    exhibitor_name: e.name,
    booth_no: e.booth_no,
    hall: e.hall,
    logo: e.logo_url,
    match_score: score,
    why_match_th,
    why_match_en,
    top_use_case: topUseCase?.title ?? e.sub_industries[0] ?? '',
    quoted_outcome: topUseCase?.outcome_metric,
    cta_url: `/visitor?booth=${e.id}`,
  };
}

export function buildMatchReply(candidates: MatchCandidate[], lang: 'th' | 'en'): {
  reply_text: string;
  reply_text_th: string;
  reply_text_en: string;
  follow_up_question: string;
} {
  const count = candidates.length;
  if (count === 0) {
    return {
      reply_text_th: 'ยังไม่เจอบูธที่ตรงพอค่ะ ขอข้อมูลเพิ่ม',
      reply_text_en: "I couldn't find a strong match — could you tell me more?",
      reply_text: lang === 'th' ? 'ยังไม่เจอบูธที่ตรงพอค่ะ ขอข้อมูลเพิ่ม' : "I couldn't find a strong match — could you tell me more?",
      follow_up_question:
        lang === 'th' ? 'ลองบอกอุตสาหกรรมหรือขนาดบริษัทคุณได้มั้ยคะ?' : 'Could you share your industry or company size?',
    };
  }

  const intro_th = count >= 3
    ? `ลองดู ${count} บูธที่เหมาะกับโจทย์ค่ะ`
    : `เจอ ${count} บูธที่น่าสนใจค่ะ`;
  const intro_en = count >= 3
    ? `Here are ${count} booths that look like a fit:`
    : `Found ${count} relevant booths:`;

  return {
    reply_text_th: intro_th,
    reply_text_en: intro_en,
    reply_text: lang === 'th' ? intro_th : intro_en,
    follow_up_question:
      lang === 'th'
        ? 'อยากเปรียบเทียบ 2 บูธไหนคะ? หรือเล่า pain เพิ่มก็ได้ค่ะ'
        : 'Want to compare any of these, or share more about your pain point?',
  };
}
