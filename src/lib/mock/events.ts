export interface PlatformEvent {
  id: string;
  name: string;
  slug: string;
  cover: string; // emoji as cover stand-in
  venue: string;
  startDate: string; // ISO
  endDate: string;
  status: "live" | "upcoming" | "past";
  exhibitorCount: number;
  sessionCount: number;
  admins: { id: string; name: string; email: string; avatar: string }[];
  bot: { connected: boolean; botId?: string; lineOaId?: string; lineOaName?: string };
  description: string;
}

export const PLATFORM_EVENTS: PlatformEvent[] = [
  {
    id: "evt-techsummit-2026",
    name: "Thailand Tech Summit 2026",
    slug: "tech-summit-2026",
    cover: "🚀",
    venue: "BITEC Bangna, Hall A-D",
    startDate: "2026-05-10",
    endDate: "2026-05-12",
    status: "live",
    exhibitorCount: 20,
    sessionCount: 8,
    admins: [
      { id: "a1", name: "Pim Suthep", email: "pim@eventiq.app", avatar: "👩‍💼" },
      { id: "a2", name: "Korn Tana", email: "korn@eventiq.app", avatar: "👨‍💼" },
    ],
    bot: { connected: true, botId: "6a013f62fb3079f00791473e", lineOaId: "@eventiq", lineOaName: "EventIQ Assistant" },
    description: "งานเทคโนโลยีที่ใหญ่ที่สุดของไทย รวม AI / Cloud / Fintech / Robotics",
  },
  {
    id: "evt-aiexpo-2026",
    name: "AI Expo Asia 2026",
    slug: "ai-expo-2026",
    cover: "🧠",
    venue: "QSNCC, Hall 1-2",
    startDate: "2026-07-22",
    endDate: "2026-07-24",
    status: "upcoming",
    exhibitorCount: 45,
    sessionCount: 32,
    admins: [{ id: "a3", name: "Naree Wong", email: "naree@aiexpo.asia", avatar: "👩‍🔬" }],
    bot: { connected: true, botId: "7b124g73gc4180g11892584f", lineOaId: "@aiexpo", lineOaName: "AI Expo Bot" },
    description: "งานรวม AI startup ระดับเอเชีย",
  },
  {
    id: "evt-foodfair-2026",
    name: "Bangkok Food Innovation Fair",
    slug: "food-fair-2026",
    cover: "🍜",
    venue: "IMPACT Muang Thong",
    startDate: "2026-09-05",
    endDate: "2026-09-08",
    status: "upcoming",
    exhibitorCount: 80,
    sessionCount: 12,
    admins: [{ id: "a4", name: "Som Krit", email: "som@foodfair.th", avatar: "👨‍🍳" }],
    bot: { connected: false },
    description: "นวัตกรรมอาหาร และ FoodTech",
  },
  {
    id: "evt-greentech-2025",
    name: "GreenTech Bangkok 2025",
    slug: "greentech-2025",
    cover: "🌱",
    venue: "BITEC Bangna",
    startDate: "2025-11-15",
    endDate: "2025-11-17",
    status: "past",
    exhibitorCount: 35,
    sessionCount: 18,
    admins: [{ id: "a5", name: "Eve Chai", email: "eve@greentech.co", avatar: "👩‍🌾" }],
    bot: { connected: true, botId: "old-bot-id", lineOaId: "@greentech", lineOaName: "GreenTech Bot" },
    description: "พลังงานสะอาดและ ESG",
  },
];
