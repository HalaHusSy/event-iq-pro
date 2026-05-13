/**
 * Thin client for the EventIQ serverless API at /api/*.
 *
 * Base URL resolution:
 *   - In production on Vercel: VITE_AGENT_URL defaults to "/api" (same origin)
 *   - In `vercel dev`: same as above (port 3000 serves both)
 *   - When running `npm run dev` (Vite :8080) separately, point
 *     VITE_AGENT_URL to your deployed Vercel URL, e.g. https://event-iq-pro.vercel.app/api
 */
export const API_BASE_URL: string = (import.meta.env.VITE_AGENT_URL as string | undefined) ?? '/api';

export interface MatchCard {
  rank: number;
  exhibitor_id: string;
  exhibitor_name: string;
  booth_no: string;
  hall: string;
  logo: string;
  match_score: number;
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
  meta: { matched_count: number; used_mock_llm: boolean; latency_ms: number };
}

export interface FaqEntry {
  id: string;
  question_th: string;
  question_en: string;
  answer_th: string;
  answer_en: string;
  category: string;
}

export interface FaqSearchResponse {
  answer: string;
  answer_th: string;
  answer_en: string;
  source_faq_ids: string[];
  related_questions: { id: string; question_th: string; question_en: string }[];
}

export interface ApiCallResult<T> {
  ok: boolean;
  status: number;
  latency_ms: number;
  data: T | null;
  error?: string;
}

async function call<T>(path: string, init?: RequestInit): Promise<ApiCallResult<T>> {
  const url = `${API_BASE_URL}${path}`;
  const start = Date.now();
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });
    const latency = Date.now() - start;
    const text = await res.text();
    let data: T | null = null;
    try {
      data = text ? (JSON.parse(text) as T) : null;
    } catch {
      data = null;
    }
    return {
      ok: res.ok,
      status: res.status,
      latency_ms: latency,
      data,
      error: res.ok ? undefined : (data as any)?.error ?? text.slice(0, 200),
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      latency_ms: Date.now() - start,
      data: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export const eventiqClient = {
  health: () => call<{ ok: boolean; service: string; version: string; endpoints: string[] }>('/health'),
  exhibitors: (params?: { industry?: string; solution?: string; hall?: string }) => {
    const qs = params
      ? '?' + new URLSearchParams(Object.entries(params).filter(([, v]) => v) as any).toString()
      : '';
    return call<{ count: number; items: any[] }>(`/exhibitors${qs}`);
  },
  exhibitorDetail: (id: string) => call<any>(`/exhibitors/${encodeURIComponent(id)}`),
  faqList: () => call<{ count: number; items: FaqEntry[] }>('/faq'),
  faqSearch: (question: string, lang: 'th' | 'en' = 'th') =>
    call<FaqSearchResponse>('/faq', {
      method: 'POST',
      body: JSON.stringify({ question, lang }),
    }),
  match: (message: string, lang: 'th' | 'en' = 'th', user_id?: string) =>
    call<MatchResponse>('/match', {
      method: 'POST',
      body: JSON.stringify({ message, lang, user_id }),
    }),
  sheetSync: (token?: string) =>
    call<{ ok: boolean; stub?: boolean; note?: string }>('/admin/sheet-sync', {
      method: 'POST',
      headers: token ? { 'X-Eventiq-Token': token } : {},
    }),
};
