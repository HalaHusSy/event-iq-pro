import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "th" | "en" | "zh" | "fr" | "vi" | "ja";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

type Translations = Partial<Record<Lang, string>> & { th: string; en: string };
type Dict = Record<string, Translations>;

// Helper: fall back th->en if a language is missing
const tr = (th: string, en: string, extra?: Partial<Record<Lang, string>>): Translations =>
  ({ th, en, ...(extra || {}) });

export const dict: Dict = {
  // nav
  "nav.home": tr("หน้าแรก", "Home", { zh: "首页", fr: "Accueil", vi: "Trang chủ", ja: "ホーム" }),
  "nav.events": tr("งานทั้งหมด", "Events", { zh: "活动", fr: "Événements", vi: "Sự kiện", ja: "イベント" }),
  "nav.platform": tr("แพลตฟอร์ม", "Platform", { zh: "平台", fr: "Plateforme", vi: "Nền tảng", ja: "プラットフォーム" }),
  "nav.visitor": tr("ผู้เยี่ยมชม", "Visitor", { zh: "访客", fr: "Visiteur", vi: "Khách", ja: "来場者" }),
  "nav.exhibitor": tr("ผู้ออกบูธ", "Exhibitor", { zh: "参展商", fr: "Exposant", vi: "Nhà triển lãm", ja: "出展者" }),
  "nav.speaker": tr("ผู้บรรยาย", "Speaker", { zh: "演讲者", fr: "Intervenant", vi: "Diễn giả", ja: "スピーカー" }),
  "nav.admin": tr("ผู้ดูแล", "Admin", { zh: "管理", fr: "Admin", vi: "Quản trị", ja: "管理" }),

  // hero
  "hero.title": tr(
    "หาบูธที่ใช่ใน 15 วินาที ไม่ใช่ 3 ชั่วโมง",
    "Find the right booth in 15 seconds, not 3 hours",
    { zh: "15秒找到对的展位，而非3小时", fr: "Trouvez le bon stand en 15 secondes", vi: "Tìm gian hàng phù hợp trong 15 giây", ja: "適切なブースを15秒で発見" }
  ),
  "hero.sub": tr(
    "แพลตฟอร์ม AI สำหรับงานนิทรรศการสด ขับเคลื่อนโดย Botnoi AI",
    "AI platform for live exhibition events, powered by Botnoi AI.",
    { zh: "由 Botnoi AI 驱动的现场展会AI平台", fr: "Plateforme IA pour les salons, propulsée par Botnoi AI", vi: "Nền tảng AI cho triển lãm trực tiếp, bởi Botnoi AI", ja: "Botnoi AIによる展示会向けAIプラットフォーム" }
  ),
  "hero.cta.visitor": tr("เริ่มต้นเป็นผู้เยี่ยมชม", "Start as Visitor", { zh: "以访客身份开始", fr: "Commencer comme visiteur", vi: "Bắt đầu với tư cách khách", ja: "来場者として開始" }),
  "hero.cta.exhibitor": tr("ลงทะเบียนเป็นผู้ออกบูธ", "Register as Exhibitor", { zh: "注册为参展商", fr: "S'inscrire comme exposant", vi: "Đăng ký nhà triển lãm", ja: "出展者として登録" }),

  // features (kept th/en, falls back gracefully)
  "features.title": tr("ฟีเจอร์หลัก", "Core Features", { zh: "核心功能", fr: "Fonctionnalités", vi: "Tính năng chính", ja: "主な機能" }),
  "features.sub": tr(
    "ออกแบบมาเพื่อให้ผู้เยี่ยมชมเจอบูธที่ใช่ และผู้ออกบูธได้ลูกค้าตรงเป้า",
    "Designed to help visitors find the right booth and exhibitors reach the right customers.",
    {
      zh: "帮助访客找到合适的展位，让参展商触达精准客户。",
      fr: "Conçu pour aider les visiteurs à trouver le bon stand et les exposants à toucher les bons clients.",
      vi: "Giúp khách tham quan tìm gian hàng phù hợp và nhà triển lãm tiếp cận khách hàng mục tiêu.",
      ja: "来場者に最適なブースを、出展者に最適な顧客を結び付けます。",
    }
  ),
  "f1.title": tr("จับคู่บูธอัจฉริยะ", "Booth Matching"),
  "f1.desc": tr("เล่า pain ของคุณ AI หาบูธที่ตรงที่สุดให้ทันที", "Describe your pain, get the perfect booth match instantly."),
  "f2.title": tr("ถามอะไรก็ได้เกี่ยวกับงาน", "Event FAQ"),
  "f2.desc": tr("ตารางเซสชั่น แผนที่ ร้านอาหาร ตอบครบจบในแชท", "Schedules, maps, food courts — answered in chat."),

  "how.title": tr("ใช้งานอย่างไร", "How it works", { zh: "如何使用", fr: "Comment ça marche", vi: "Cách hoạt động", ja: "使い方" }),
  "how.1": tr("เล่า pain หรือความสนใจของคุณ", "Describe your pain or interest"),
  "how.2": tr("AI วิเคราะห์และจับคู่ทันที", "AI analyzes and matches instantly"),
  "how.3": tr("เดินตรงไปยังบูธที่ใช่", "Walk directly to the right booth"),

  "trust": tr("ขับเคลื่อนโดย Botnoi AI", "Powered by Botnoi AI"),

  // visitor tabs
  "tab.find": tr("หาบูธ", "Find Booth"),
  "tab.ask": tr("ถามเรื่องงาน", "Ask Event"),

  // visitor event banner
  "visitor.currentEvent": tr("กำลังอยู่ในงาน", "Current event", { zh: "当前活动", fr: "Événement actuel", vi: "Sự kiện hiện tại", ja: "現在のイベント" }),

  // events page
  "events.title": tr("งานทั้งหมดในระบบ", "All Events", { zh: "所有活动", fr: "Tous les événements", vi: "Tất cả sự kiện", ja: "すべてのイベント" }),
  "events.sub": tr("เลือกงานที่คุณสนใจเพื่อเริ่มต้นใช้งาน", "Pick an event to get started", { zh: "选择您感兴趣的活动", fr: "Choisissez un événement", vi: "Chọn sự kiện để bắt đầu", ja: "イベントを選んで開始" }),
  "events.live": tr("กำลังจัด", "Live", { zh: "进行中", fr: "En direct", vi: "Đang diễn ra", ja: "開催中" }),
  "events.upcoming": tr("เร็วๆ นี้", "Upcoming", { zh: "即将", fr: "À venir", vi: "Sắp tới", ja: "近日開催" }),
  "events.past": tr("จบแล้ว", "Past", { zh: "已结束", fr: "Passé", vi: "Đã qua", ja: "終了" }),
  "events.enter": tr("เข้าสู่งาน", "Enter event", { zh: "进入", fr: "Entrer", vi: "Vào sự kiện", ja: "参加する" }),
  "events.exhibitors": tr("บูธ", "Exhibitors", { zh: "展位", fr: "Stands", vi: "Gian hàng", ja: "ブース" }),
  "events.sessions": tr("เซสชั่น", "Sessions", { zh: "议程", fr: "Sessions", vi: "Phiên", ja: "セッション" }),

  // platform page
  "platform.title": tr("แพลตฟอร์ม EventIQ", "EventIQ Platform", { zh: "EventIQ 平台", fr: "Plateforme EventIQ", vi: "Nền tảng EventIQ", ja: "EventIQ プラットフォーム" }),
  "platform.sub": tr("Root account · จัดการทุก event ในที่เดียว", "Root account · Manage every event in one place"),
  "platform.tab.events": tr("จัดการ Event", "Events"),
  "platform.tab.admins": tr("Event Admin", "Event Admins"),
  "platform.tab.exhibitors": tr("Exhibitors", "Exhibitors"),
  "platform.tab.bot": tr("Bot & LINE OA", "Bot & LINE OA"),
  "platform.create": tr("สร้าง Event ใหม่", "Create new event"),
  "platform.assignAdmin": tr("กำหนด Admin", "Assign admin"),
  "platform.addExhibitor": tr("เพิ่ม Exhibitor", "Add exhibitor"),
  "platform.connectBot": tr("เชื่อมต่อ Bot", "Connect bot"),
  "platform.linkLine": tr("Link LINE OA", "Link LINE OA"),
  "platform.connected": tr("เชื่อมต่อแล้ว", "Connected"),
  "platform.notConnected": tr("ยังไม่เชื่อมต่อ", "Not connected"),
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<I18nCtx>({ lang: "th", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("eventiq-lang") as Lang) || "th");
  useEffect(() => { localStorage.setItem("eventiq-lang", lang); document.documentElement.lang = lang; }, [lang]);
  const t = (key: string) => {
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en ?? entry.th;
  };
  return <Ctx.Provider value={{ lang, setLang: setLangState, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
