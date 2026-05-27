/**
 * Site-wide event Q&A engine สำหรับ "YouWalk Assistant" (floating widget)
 *
 * ตอบคำถามระดับเว็บ (ข้าม event) จากข้อมูล event จริงในระบบ เช่น
 *   • "ตอนนี้มีงานอะไรกำลังจัด?"        → งานที่ status = live (อิงวันที่จริง)
 *   • "งานเกี่ยวกับ AI / เทคโนโลยี?"     → topic match บน name + description
 *   • "เดือนหน้ามีงานอะไรบ้าง?"          → งานที่เริ่มในเดือนถัดไป
 *   • "ที่ BITEC ตอนนี้มีงานไหม?"        → venue match + live filter
 *
 * เป็น pure functions (ไม่แตะ DOM / network) เพื่อให้ unit-test ได้ตรง ๆ
 * ตัว widget จะดึง events ผ่าน listEvents() แล้วส่งเข้ามาที่ answerEventQuestion()
 */

export type AssistantStatus = "live" | "upcoming" | "past";

/** event ดิบจาก Supabase (เอาเฉพาะ field ที่ใช้ตอบคำถาม) */
export interface RawAssistantEvent {
  id: string;
  name: string;
  description?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  status?: string | null;
}

/** event ที่ normalize แล้ว ใช้ทั้งตอนคำนวณและตอน render */
export interface AssistantEvent {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: AssistantStatus;
}

export type AssistantIntent =
  | "live"
  | "upcoming"
  | "past"
  | "this-month"
  | "next-month"
  | "venue"
  | "topic"
  | "count"
  | "list"
  | "help";

export interface AssistantAnswer {
  /** ข้อความหลักที่บอทตอบ (header / สรุป) */
  text: string;
  /** event ที่ตรงคำถาม — widget เอาไปทำเป็นการ์ดกดได้ */
  events: AssistantEvent[];
  /** intent ที่ตรวจจับได้ (ใช้ debug / test) */
  intent: AssistantIntent;
}

type Lang = "th" | "en";
/** ฟอลแบ็คภาษาอื่น ๆ ที่ widget รองรับ → ใช้ en (เหมือน mock content ในแอป) */
const L = (lang: string): Lang => (lang === "th" ? "th" : "en");

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parseDate(s?: string | null): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * หา status จากวันที่จริงก่อน (เชื่อถือได้กว่า column status ที่อาจไม่อัปเดต)
 * ถ้าไม่มีวันที่ → fall back ไปใช้ค่า status ที่เก็บไว้
 */
export function deriveStatus(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  fallback: string | null | undefined,
  now: Date,
): AssistantStatus {
  const s = parseDate(startDate);
  const e = parseDate(endDate);
  const today = startOfDay(now);
  if (s) {
    const start = startOfDay(s);
    const end = startOfDay(e ?? s);
    if (today < start) return "upcoming";
    if (today > end) return "past";
    return "live";
  }
  if (fallback === "live" || fallback === "upcoming" || fallback === "past") {
    return fallback;
  }
  return "upcoming";
}

export function normalizeEvents(
  raw: RawAssistantEvent[],
  now: Date,
): AssistantEvent[] {
  return raw.map((e) => ({
    id: e.id,
    name: e.name ?? "",
    description: e.description ?? "",
    location: e.location ?? "",
    startDate: e.start_date ?? "",
    endDate: e.end_date ?? "",
    status: deriveStatus(e.start_date, e.end_date, e.status, now),
  }));
}

/* ----------------------------- keyword maps ----------------------------- */

const TOPIC_GROUPS: Record<string, string[]> = {
  ai: ["ai", "a.i", "artificial intelligence", "เอไอ", "ปัญญาประดิษฐ์", "machine learning", "ml", "genai", "gen ai", "llm", "deep learning"],
  tech: ["tech", "technology", "เทคโนโลยี", "เทค", "software", "ซอฟต์แวร์", "digital", "ดิจิทัล", "ดิจิตอล", "saas", "cloud", "คลาวด์", "data", "ดาต้า", "it", "ไอที"],
  food: ["food", "อาหาร", "ฟู้ด", "culinary", "restaurant", "coffee", "กาแฟ", "เครื่องดื่ม"],
  finance: ["finance", "การเงิน", "fintech", "ฟินเทค", "bank", "ธนาคาร", "invest", "ลงทุน", "money", "การลงทุน"],
  health: ["health", "สุขภาพ", "medical", "การแพทย์", "hospital", "โรงพยาบาล", "wellness", "pharma", "เฮลท์", "เมดิคอล"],
  green: ["green", "energy", "พลังงาน", "eco", "sustain", "sustainability", "esg", "สิ่งแวดล้อม", "solar", "โซลาร์", "carbon", "กรีน"],
  education: ["education", "การศึกษา", "edu", "edtech", "เรียน", "อบรม", "training", "learn", "หลักสูตร"],
  robotics: ["robot", "robotics", "หุ่นยนต์", "automation", "ออโตเมชัน", "ระบบอัตโนมัติ"],
  beauty: ["beauty", "ความงาม", "cosmetic", "เครื่องสำอาง", "fashion", "แฟชั่น", "lifestyle", "ไลฟ์สไตล์"],
  auto: ["auto", "automotive", "ยานยนต์", "car", "รถยนต์", "mobility", "ev", "รถ"],
};

/** venue keyword → ใช้ match กับ event.location (lowercase) */
const VENUE_KEYWORDS = [
  "bitec", "ไบเทค", "บางนา", "bangna",
  "qsncc", "สิริกิติ์", "queen sirikit", "ศูนย์สิริกิติ์",
  "impact", "อิมแพ็ค", "อิมแพค", "เมืองทอง", "เมืองทองธานี", "muang thong",
  "iconsiam", "ไอคอนสยาม",
  "central", "เซ็นทรัล",
  "paragon", "พารากอน",
  "true digital park", "ทรู ดิจิทัล พาร์ค",
];

const LIVE_WORDS = ["ตอนนี้", "กำลังจัด", "กําลังจัด", "วันนี้", "ขณะนี้", "ปัจจุบัน", "now", "currently", "right now", "live", "happening", "today", "on now", "going on"];
const NEXT_MONTH_WORDS = ["เดือนหน้า", "เดือนถัดไป", "next month"];
const THIS_MONTH_WORDS = ["เดือนนี้", "this month"];
const UPCOMING_WORDS = ["เร็ว ๆ นี้", "เร็วๆนี้", "เร็ว ๆนี้", "กำลังจะมา", "กําลังจะมา", "ใกล้ ๆ นี้", "ใกล้ๆนี้", "จะมีงาน", "upcoming", "coming up", "soon", "in the future"];
const PAST_WORDS = ["ที่ผ่านมา", "ที่จบไป", "จบแล้ว", "ปีที่แล้ว", "past", "previous", "finished", "ended", "last year"];
const COUNT_WORDS = ["กี่งาน", "กี่อีเวนต์", "กี่อีเว้น", "จำนวนงาน", "จํานวนงาน", "how many", "number of events", "count"];
const LIST_WORDS = ["มีงานอะไรบ้าง", "มีอีเวนต์อะไรบ้าง", "งานทั้งหมด", "ทั้งหมด", "all events", "list events", "what events", "show events", "มีงานอะไร"];

const isAscii = (s: string): boolean => {
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 127) return false;
  }
  return true;
};

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * match keyword กับข้อความ:
 *  - ASCII (เช่น "ai", "tech") → ใช้ word boundary กัน false positive
 *    เช่น "ev" ใน "events" หรือ "tech" ใน "foodtech"
 *  - ไทย → ใช้ substring (ไม่มี word boundary ที่เชื่อถือได้)
 */
function textHas(text: string, kw: string): boolean {
  if (isAscii(kw)) return new RegExp(`\\b${escapeRe(kw)}\\b`, "i").test(text);
  return text.includes(kw);
}

function includesAny(haystack: string, needles: string[]): boolean {
  return needles.some((n) => textHas(haystack, n));
}

function detectTopics(q: string): string[] {
  const hits: string[] = [];
  for (const [group, words] of Object.entries(TOPIC_GROUPS)) {
    if (words.some((w) => textHas(q, w))) hits.push(group);
  }
  return hits;
}

function detectVenues(q: string): string[] {
  return VENUE_KEYWORDS.filter((v) => textHas(q, v));
}

function sameMonth(iso: string, year: number, month: number): boolean {
  const d = parseDate(iso);
  if (!d) return false;
  return d.getFullYear() === year && d.getMonth() === month;
}

/* ------------------------------- formatting ------------------------------ */

function fmtDate(iso: string, lang: Lang): string {
  const d = parseDate(iso);
  if (!d) return "—";
  return d.toLocaleDateString(lang === "th" ? "th-TH" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function statusLabel(status: AssistantStatus, lang: Lang): string {
  if (lang === "th") {
    return status === "live" ? "กำลังจัด" : status === "upcoming" ? "เร็ว ๆ นี้" : "จบแล้ว";
  }
  return status === "live" ? "Live" : status === "upcoming" ? "Upcoming" : "Past";
}

function eventNames(events: AssistantEvent[], lang: Lang): string {
  return events
    .map((e) => `• ${e.name}${e.location ? ` — ${e.location}` : ""} (${fmtDate(e.startDate, lang)})`)
    .join("\n");
}

/* -------------------------------- main API ------------------------------- */

export function answerEventQuestion(
  question: string,
  raw: RawAssistantEvent[],
  lang: string,
  now: Date = new Date(),
): AssistantAnswer {
  const lng = L(lang);
  const q = question.trim().toLowerCase();
  const events = normalizeEvents(raw, now);

  if (!q) {
    return { text: helpText(lng), events: [], intent: "help" };
  }

  // ตรวจจับ "ตัวกรอง" หลายอันพร้อมกัน (เช่น venue + live)
  const venues = detectVenues(q);
  const topics = detectTopics(q);

  let timeFilter: AssistantIntent | null = null;
  if (includesAny(q, NEXT_MONTH_WORDS)) timeFilter = "next-month";
  else if (includesAny(q, THIS_MONTH_WORDS)) timeFilter = "this-month";
  else if (includesAny(q, LIVE_WORDS)) timeFilter = "live";
  else if (includesAny(q, UPCOMING_WORDS)) timeFilter = "upcoming";
  else if (includesAny(q, PAST_WORDS)) timeFilter = "past";

  const isCount = includesAny(q, COUNT_WORDS);

  // ----- apply filters -----
  let filtered = events;
  const nextMonth = (now.getMonth() + 1) % 12;
  const nextMonthYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();

  if (timeFilter === "live") filtered = filtered.filter((e) => e.status === "live");
  else if (timeFilter === "upcoming") filtered = filtered.filter((e) => e.status === "upcoming");
  else if (timeFilter === "past") filtered = filtered.filter((e) => e.status === "past");
  else if (timeFilter === "this-month")
    filtered = filtered.filter((e) => sameMonth(e.startDate, now.getFullYear(), now.getMonth()));
  else if (timeFilter === "next-month")
    filtered = filtered.filter((e) => sameMonth(e.startDate, nextMonthYear, nextMonth));

  if (venues.length > 0) {
    filtered = filtered.filter((e) => {
      const loc = e.location.toLowerCase();
      return venues.some((v) => textHas(loc, v));
    });
  }

  if (topics.length > 0) {
    const kws = topics.flatMap((g) => TOPIC_GROUPS[g]);
    filtered = filtered.filter((e) => {
      const hay = `${e.name} ${e.description}`.toLowerCase();
      return kws.some((k) => textHas(hay, k));
    });
  }

  const hasFilter = Boolean(timeFilter) || venues.length > 0 || topics.length > 0;

  // ----- count question -----
  if (isCount) {
    const scope = filtered.length;
    const text =
      lng === "th"
        ? `ตอนนี้มี ${scope} งาน${describeScopeTh(timeFilter, venues, topics)}ค่ะ`
        : `There ${scope === 1 ? "is" : "are"} ${scope} event${scope === 1 ? "" : "s"}${describeScopeEn(timeFilter, venues, topics)}.`;
    return { text, events: sortEvents(filtered), intent: "count" };
  }

  // ----- มีตัวกรอง → ตอบตามผลลัพธ์ -----
  if (hasFilter) {
    const sorted = sortEvents(filtered);
    const intent: AssistantIntent = timeFilter ?? (venues.length ? "venue" : "topic");
    if (sorted.length === 0) {
      return { text: noResultText(lng, timeFilter, venues, topics), events: [], intent };
    }
    const header =
      lng === "th"
        ? `พบ ${sorted.length} งาน${describeScopeTh(timeFilter, venues, topics)}ค่ะ 👇`
        : `Found ${sorted.length} event${sorted.length === 1 ? "" : "s"}${describeScopeEn(timeFilter, venues, topics)} 👇`;
    return { text: header, events: sorted, intent };
  }

  // ----- list / what events -----
  if (includesAny(q, LIST_WORDS) || /(งาน|event|exhibition|expo|นิทรรศการ)/.test(q)) {
    const live = sortEvents(events.filter((e) => e.status === "live"));
    const upcoming = sortEvents(events.filter((e) => e.status === "upcoming"));
    const show = [...live, ...upcoming];
    if (show.length === 0) {
      return {
        text: lng === "th" ? "ตอนนี้ยังไม่มีงานที่กำลังจัดหรือกำลังจะมาค่ะ 🙏" : "There are no live or upcoming events right now. 🙏",
        events: sortEvents(events),
        intent: "list",
      };
    }
    const header =
      lng === "th"
        ? `ตอนนี้มี ${live.length} งานกำลังจัด และ ${upcoming.length} งานกำลังจะมาค่ะ 👇`
        : `Right now there ${live.length === 1 ? "is" : "are"} ${live.length} live and ${upcoming.length} upcoming event${upcoming.length === 1 ? "" : "s"} 👇`;
    return { text: header, events: show, intent: "list" };
  }

  // ----- fallback / help -----
  return { text: helpText(lng), events: [], intent: "help" };
}

function sortEvents(events: AssistantEvent[]): AssistantEvent[] {
  const rank: Record<AssistantStatus, number> = { live: 0, upcoming: 1, past: 2 };
  return [...events].sort((a, b) => {
    if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
    return (a.startDate || "").localeCompare(b.startDate || "");
  });
}

function describeScopeTh(
  time: AssistantIntent | null,
  venues: string[],
  topics: string[],
): string {
  const parts: string[] = [];
  if (time === "live") parts.push("ที่กำลังจัดอยู่");
  else if (time === "upcoming") parts.push("ที่กำลังจะมา");
  else if (time === "past") parts.push("ที่จบไปแล้ว");
  else if (time === "this-month") parts.push("ในเดือนนี้");
  else if (time === "next-month") parts.push("ในเดือนหน้า");
  if (topics.length) parts.push(`เกี่ยวกับ ${topics.join(" / ")}`);
  if (venues.length) parts.push(`ที่ ${venues[0].toUpperCase()}`);
  return parts.length ? ` ${parts.join(" ")} ` : "";
}

function describeScopeEn(
  time: AssistantIntent | null,
  venues: string[],
  topics: string[],
): string {
  const parts: string[] = [];
  if (time === "live") parts.push(" happening now");
  else if (time === "upcoming") parts.push(" coming up");
  else if (time === "past") parts.push(" that already ended");
  else if (time === "this-month") parts.push(" this month");
  else if (time === "next-month") parts.push(" next month");
  if (topics.length) parts.push(` about ${topics.join(" / ")}`);
  if (venues.length) parts.push(` at ${venues[0].toUpperCase()}`);
  return parts.join("");
}

function noResultText(
  lang: Lang,
  time: AssistantIntent | null,
  venues: string[],
  topics: string[],
): string {
  if (lang === "th") {
    return `ยังไม่พบงาน${describeScopeTh(time, venues, topics)}ในระบบตอนนี้เลยค่ะ 🙏\nลองถามใหม่ เช่น "มีงานอะไรกำลังจัดบ้าง?" หรือดู "งานทั้งหมด" ได้นะคะ`;
  }
  return `I couldn't find any event${describeScopeEn(time, venues, topics)} at the moment. 🙏\nTry "What events are live now?" or browse all events.`;
}

function helpText(lang: Lang): string {
  if (lang === "th") {
    return 'ลองถามได้เลยค่ะ เช่น:\n• "ตอนนี้มีงานอะไรกำลังจัด?"\n• "งานเกี่ยวกับ AI / เทคโนโลยี?"\n• "เดือนหน้ามีงานอะไรบ้าง?"\n• "ที่ BITEC ตอนนี้มีงานไหม?"';
  }
  return 'Try asking me, e.g.:\n• "What events are happening now?"\n• "Any events about AI / technology?"\n• "What events are next month?"\n• "Any events at BITEC right now?"';
}
