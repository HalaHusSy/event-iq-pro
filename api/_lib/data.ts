import { EXHIBITORS_CANONICAL } from '../../src/lib/mock/exhibitors.canonical';
import type { Exhibitor } from '../../src/lib/mock/exhibitor.zod';

/**
 * Single source of truth for serverless functions. For pitch v1 we read
 * from the canonical seed module. When `scripts/sync-sheet.ts` lands,
 * this will read from `src/lib/mock/exhibitors.generated.ts` instead.
 */
export function getExhibitors(): Exhibitor[] {
  return EXHIBITORS_CANONICAL;
}

export function getExhibitorById(id: string): Exhibitor | undefined {
  return EXHIBITORS_CANONICAL.find((e) => e.id === id);
}

/**
 * Mock FAQ corpus for pitch demo. Real data will move to Sheet in Chunk 3.
 */
export interface FaqEntry {
  id: string;
  question_th: string;
  question_en: string;
  answer_th: string;
  answer_en: string;
  category: string;
}

export const FAQ_KB: FaqEntry[] = [
  {
    id: 'faq01',
    question_th: 'งานจัดวันที่เท่าไหร่?',
    question_en: 'When is the event held?',
    answer_th: 'งาน Tech Summit 2026 จัดวันที่ 15-17 มิถุนายน 2026 ที่ศูนย์ประชุมไบเทคบางนา',
    answer_en: 'Tech Summit 2026 runs June 15-17, 2026 at BITEC Bangna.',
    category: 'schedule',
  },
  {
    id: 'faq02',
    question_th: 'มีที่จอดรถมั้ย?',
    question_en: 'Is there parking?',
    answer_th: 'มีที่จอดรถสำหรับ 3,500 คัน ฟรีตลอดงาน เข้าทางประตู 1 และ 3',
    answer_en: '3,500 free parking spots available throughout the event via Gates 1 and 3.',
    category: 'logistics',
  },
  {
    id: 'faq03',
    question_th: 'ฟู้ดคอร์ทอยู่ที่ไหน?',
    question_en: 'Where is the food court?',
    answer_th: 'ฟู้ดคอร์ทอยู่ชั้น G ฝั่งทิศตะวันออก ติดกับ Hall B เปิด 10:00-20:00',
    answer_en: 'Food court is on Ground Floor East Wing next to Hall B, open 10:00-20:00.',
    category: 'logistics',
  },
  {
    id: 'faq04',
    question_th: 'มี wifi ฟรีไหม?',
    question_en: 'Is free wifi available?',
    answer_th: 'มี wifi ฟรี SSID: TechSummit2026 password: techsummit',
    answer_en: 'Free wifi SSID: TechSummit2026, password: techsummit',
    category: 'logistics',
  },
  {
    id: 'faq05',
    question_th: 'ลงทะเบียนล่วงหน้ายังไง?',
    question_en: 'How do I pre-register?',
    answer_th: 'ลงทะเบียนได้ที่ techsummit2026.com/register ฟรีไม่มีค่าใช้จ่าย',
    answer_en: 'Pre-register at techsummit2026.com/register, free admission.',
    category: 'registration',
  },
  {
    id: 'faq06',
    question_th: 'มีเซสชั่นภาษาอังกฤษไหม?',
    question_en: 'Are there English sessions?',
    answer_th: 'มีเซสชั่นภาษาอังกฤษ 12 หัวข้อ ทั้งหมดมีล่ามแปลไทย-อังกฤษสด',
    answer_en: '12 English sessions available, all with live Thai-English interpretation.',
    category: 'sessions',
  },
];

/**
 * Tiny keyword retrieval — picks exhibitors whose tagline/long_pitch/problems
 * contain any token from the query. Pads with random picks to ensure ≥3 results
 * in mock mode. Replaces with flexsearch + Claude rerank in Chunk 5.
 */
export interface MatchCandidate {
  exhibitor: Exhibitor;
  match_score: number;
  matched_tokens: string[];
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'in', 'on', 'at', 'to', 'of', 'for', 'and', 'or',
  'how', 'what', 'where', 'when', 'why', 'i', 'we', 'our', 'us', 'my',
  'ที่', 'ใน', 'กับ', 'และ', 'หรือ', 'ของ', 'มี', 'ได้', 'ไหน', 'อะไร',
  'อยาก', 'จะ', 'ทำ', 'ให้', 'เป็น', 'ก็', 'ค่ะ', 'ครับ', 'แบบ',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,.\-_/!?()[\]{}'"　]+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export function mockMatch(pain: string): MatchCandidate[] {
  const tokens = tokenize(pain);
  const exhibitors = getExhibitors();

  const scored: MatchCandidate[] = exhibitors.map((e) => {
    const haystack = [
      e.name,
      e.tagline_en,
      e.tagline_th,
      e.description_en,
      e.description_th,
      e.long_pitch_en,
      ...e.problem_statements_en,
      ...e.unique_value_props,
      ...e.sub_industries,
      ...e.solution_categories,
      ...e.use_cases.flatMap((u) => [u.problem_en, u.problem_th, u.solution_summary, u.outcome_metric]),
    ]
      .join(' ')
      .toLowerCase();

    const matched: string[] = [];
    for (const tok of tokens) {
      if (haystack.includes(tok)) matched.push(tok);
    }
    const score = tokens.length === 0 ? 0.5 : matched.length / tokens.length;
    return { exhibitor: e, match_score: score, matched_tokens: matched };
  });

  // Sort by score desc, then by name for stability
  scored.sort((a, b) => b.match_score - a.match_score || a.exhibitor.name.localeCompare(b.exhibitor.name));

  // If nothing matched, return all exhibitors with a baseline 0.4 score
  if (scored.every((s) => s.match_score === 0)) {
    return exhibitors.map((e) => ({ exhibitor: e, match_score: 0.4, matched_tokens: [] }));
  }

  return scored.filter((s) => s.match_score > 0).slice(0, 5);
}

export function mockFaqSearch(question: string, lang: 'th' | 'en' = 'th'): FaqEntry[] {
  const tokens = tokenize(question);
  const scored = FAQ_KB.map((f) => {
    const haystack = `${f.question_th} ${f.question_en} ${f.answer_th} ${f.answer_en} ${f.category}`.toLowerCase();
    const score = tokens.filter((t) => haystack.includes(t)).length;
    return { faq: f, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((s) => s.score > 0).slice(0, 3).map((s) => s.faq);
  return top.length > 0 ? top : FAQ_KB.slice(0, 3);
}
