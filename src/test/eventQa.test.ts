import { describe, it, expect } from "vitest";
import {
  answerEventQuestion,
  deriveStatus,
  normalizeEvents,
  type RawAssistantEvent,
} from "@/lib/assistant/eventQa";

// "วันนี้" สมมติ = 2026-05-27 (ตรงกับ currentDate ของแอป)
const NOW = new Date(2026, 4, 27);

const EVENTS: RawAssistantEvent[] = [
  {
    id: "tech",
    name: "Thailand Tech Summit 2026",
    description: "งานเทคโนโลยี รวม AI / Cloud / Fintech",
    location: "BITEC Bangna, Hall A-D",
    start_date: "2026-05-10",
    end_date: "2026-05-30",
    status: "upcoming", // ตั้งใจให้ค้าน date → deriveStatus ต้องชนะ
  },
  {
    id: "ai",
    name: "AI Expo Asia 2026",
    description: "งานรวม AI startup ระดับเอเชีย",
    location: "QSNCC, Hall 1-2",
    start_date: "2026-06-22",
    end_date: "2026-06-24",
    status: "upcoming",
  },
  {
    id: "food",
    name: "Bangkok Food Innovation Fair",
    description: "นวัตกรรมอาหาร และ FoodTech",
    location: "IMPACT Muang Thong",
    start_date: "2026-09-05",
    end_date: "2026-09-08",
    status: "upcoming",
  },
  {
    id: "green",
    name: "GreenTech Bangkok 2025",
    description: "พลังงานสะอาดและ ESG",
    location: "BITEC Bangna",
    start_date: "2025-11-15",
    end_date: "2025-11-17",
    status: "past",
  },
];

describe("deriveStatus", () => {
  it("derives live from dates even when stored status disagrees", () => {
    expect(deriveStatus("2026-05-10", "2026-05-30", "upcoming", NOW)).toBe("live");
  });
  it("derives upcoming for a future event", () => {
    expect(deriveStatus("2026-06-22", "2026-06-24", "upcoming", NOW)).toBe("upcoming");
  });
  it("derives past for a finished event", () => {
    expect(deriveStatus("2025-11-15", "2025-11-17", "past", NOW)).toBe("past");
  });
  it("falls back to stored status when no dates", () => {
    expect(deriveStatus(null, null, "live", NOW)).toBe("live");
    expect(deriveStatus(null, null, null, NOW)).toBe("upcoming");
  });
});

describe("normalizeEvents", () => {
  it("normalizes null fields to empty strings", () => {
    const [e] = normalizeEvents([{ id: "x", name: "X", start_date: null, end_date: null, status: "upcoming" }], NOW);
    expect(e.location).toBe("");
    expect(e.description).toBe("");
    expect(e.status).toBe("upcoming");
  });
});

describe("answerEventQuestion — image examples", () => {
  it("ตอนนี้มีงานอะไรกำลังจัด → returns the live event only", () => {
    const a = answerEventQuestion("ตอนนี้มีงานอะไรกำลังจัด?", EVENTS, "th", NOW);
    expect(a.intent).toBe("live");
    expect(a.events.map((e) => e.id)).toEqual(["tech"]);
  });

  it("งานเกี่ยวกับ AI / เทคโนโลยี → matches tech + ai events", () => {
    const a = answerEventQuestion("งานเกี่ยวกับ AI / เทคโนโลยี?", EVENTS, "th", NOW);
    expect(a.intent).toBe("topic");
    expect(a.events.map((e) => e.id).sort()).toEqual(["ai", "tech"]);
  });

  it("เดือนหน้ามีงานอะไรบ้าง → June events (next month after May)", () => {
    const a = answerEventQuestion("เดือนหน้ามีงานอะไรบ้าง?", EVENTS, "th", NOW);
    expect(a.intent).toBe("next-month");
    expect(a.events.map((e) => e.id)).toEqual(["ai"]);
  });

  it("ที่ BITEC ตอนนี้มีงานไหม → venue + live filter", () => {
    const a = answerEventQuestion("ที่ BITEC ตอนนี้มีงานไหม?", EVENTS, "th", NOW);
    // live filter applied first, then venue → only the live BITEC event
    expect(a.events.map((e) => e.id)).toEqual(["tech"]);
  });
});

describe("answerEventQuestion — other intents", () => {
  it("counts events with a scope", () => {
    const a = answerEventQuestion("ตอนนี้มีกี่งานกำลังจัด?", EVENTS, "th", NOW);
    expect(a.intent).toBe("count");
    expect(a.events.length).toBe(1);
  });

  it("lists live + upcoming for a generic question", () => {
    const a = answerEventQuestion("มีงานอะไรบ้าง", EVENTS, "th", NOW);
    expect(a.intent).toBe("list");
    // live (tech) + upcoming (ai, food), excludes past (green)
    expect(a.events.map((e) => e.id)).toEqual(["tech", "ai", "food"]);
  });

  it("returns no-result text when filter matches nothing", () => {
    const a = answerEventQuestion("ที่ QSNCC ตอนนี้มีงานไหม?", EVENTS, "th", NOW);
    expect(a.events).toEqual([]);
  });

  it("falls back to help for unrelated input", () => {
    const a = answerEventQuestion("สวัสดีจ้า", EVENTS, "th", NOW);
    expect(a.intent).toBe("help");
  });

  it("works in English too", () => {
    const a = answerEventQuestion("what events are happening now?", EVENTS, "en", NOW);
    expect(a.intent).toBe("live");
    expect(a.events.map((e) => e.id)).toEqual(["tech"]);
  });
});
