import { supabase } from "@/lib/supabase/client";

/**
 * Helpers ที่เรียก Supabase edge functions โดยตรง (ใช้กับ chatbot ในหน้า visitor)
 *
 * - findBooth(eventId, pain) → match pain → 3 booth ที่ตรงที่สุดใน event เดียวกันเท่านั้น
 * - askEvent(eventId, question) → ตอบคำถามเรื่อง event นี้เท่านั้น
 *
 * ทั้งสอง function บังคับ event scope (event_id หรือ event_slug) ที่ backend
 * → cross-event leak ไม่เกิด
 */

export interface BoothMatch {
  booth_id: string;
  company: string;
  description: string | null;
  website: string | null;
  contact_email: string | null;
  logo_url: string | null;
  tags: string[] | null;
  competitive_edge: string | null;
  social_links: Record<string, string> | null;
  score: number;
  reasons: string[];
}

export interface FindBoothResponse {
  event: { id: string; name: string } | null;
  event_resolution: string;
  pain: string;
  total_candidates: number;
  matched: number;
  matches: BoothMatch[];
}

export interface AskEventExhibitor {
  booth_id: string;
  company: string;
  description: string | null;
  website: string | null;
  contact_email: string | null;
  tags: string[] | null;
}

export interface FaqSearchResponse {
  reply: string;
  message: string;
  answer: string;
  event: {
    id: string;
    name: string;
    location: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
  } | null;
  event_resolution: string;
  candidate_events: Array<{ name: string; slug: string }>;
  question: string;
  exhibitor_matches: AskEventExhibitor[];
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type EventRef = { id?: string | null; slug?: string | null; name?: string | null };

function eventPayload(ref: EventRef): Record<string, string> {
  const out: Record<string, string> = {};
  if (ref.id && UUID_RE.test(ref.id)) out.event_id = ref.id;
  if (ref.slug) out.event_slug = ref.slug;
  if (ref.name) out.event_name = ref.name;
  return out;
}

export async function findBooth(
  ref: EventRef,
  pain: string,
): Promise<FindBoothResponse> {
  const { data, error } = await supabase.functions.invoke<FindBoothResponse>(
    "find-booth",
    { body: { pain, ...eventPayload(ref) } },
  );
  if (error) throw error;
  if (!data) throw new Error("Empty response from find-booth");
  return data;
}

export async function askEvent(
  ref: EventRef,
  question: string,
): Promise<FaqSearchResponse> {
  const { data, error } = await supabase.functions.invoke<FaqSearchResponse>(
    "faq-search",
    { body: { question, ...eventPayload(ref) } },
  );
  if (error) throw error;
  if (!data) throw new Error("Empty response from faq-search");
  return data;
}
