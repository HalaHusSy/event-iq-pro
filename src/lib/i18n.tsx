import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "th" | "en";
type Dict = Record<string, { th: string; en: string }>;

export const dict: Dict = {
  // nav
  "nav.visitor": { th: "ผู้เยี่ยมชม", en: "Visitor" },
  "nav.exhibitor": { th: "ผู้ออกบูธ", en: "Exhibitor" },
  "nav.speaker": { th: "ผู้บรรยาย", en: "Speaker" },
  "nav.admin": { th: "ผู้ดูแล", en: "Admin" },
  "nav.home": { th: "หน้าแรก", en: "Home" },

  // hero
  "hero.title": { th: "หาบูธที่ใช่ใน 15 วินาที ไม่ใช่ 3 ชั่วโมง", en: "Find the right booth in 15 seconds, not 3 hours" },
  "hero.sub": { th: "แพลตฟอร์ม AI สำหรับงานนิทรรศการสด ขับเคลื่อนโดย Botnoi AI Agent + Voice Bot ครบ 4 ฟีเจอร์ในที่เดียว", en: "AI platform for live exhibition events, powered by Botnoi AI Agent + Voice Bot. 4 powerful features in one place." },
  "hero.cta.visitor": { th: "เริ่มต้นเป็นผู้เยี่ยมชม", en: "Start as Visitor" },
  "hero.cta.exhibitor": { th: "ลงทะเบียนเป็นผู้ออกบูธ", en: "Register as Exhibitor" },

  // features
  "f1.title": { th: "จับคู่บูธอัจฉริยะ", en: "Booth Matching" },
  "f1.desc": { th: "เล่า pain ของคุณ AI หาบูธที่ตรงที่สุดให้ทันที", en: "Describe your pain, get the perfect booth match instantly." },
  "f2.title": { th: "ถามอะไรก็ได้เกี่ยวกับงาน", en: "Event FAQ" },
  "f2.desc": { th: "ตารางเซสชั่น แผนที่ ร้านอาหาร ตอบครบจบในแชท", en: "Schedules, maps, food courts — answered in chat." },
  "f3.title": { th: "บันทึกความทรงจำงาน", en: "Event Memory" },
  "f3.desc": { th: "อัดเสียงคุยกับบูธ AI สรุปเป็นบทความให้คุณ", en: "Record booth conversations. AI summarizes into articles." },
  "f4.title": { th: "สรุป Q&A เซสชั่น", en: "Q&A Summary" },
  "f4.desc": { th: "อ่านสรุปทุกเซสชั่นที่คุณพลาด พร้อม Q&A ที่น่าสนใจ", en: "Read summaries of any session you missed, with key Q&A." },

  "how.title": { th: "ใช้งานอย่างไร", en: "How it works" },
  "how.1": { th: "เล่า pain หรือความสนใจของคุณ", en: "Describe your pain or interest" },
  "how.2": { th: "AI วิเคราะห์และจับคู่ทันที", en: "AI analyzes and matches instantly" },
  "how.3": { th: "เดินตรงไปยังบูธที่ใช่", en: "Walk directly to the right booth" },

  "trust": { th: "ขับเคลื่อนโดย Botnoi AI", en: "Powered by Botnoi AI" },

  // visitor tabs
  "tab.find": { th: "หาบูธ", en: "Find Booth" },
  "tab.ask": { th: "ถามเรื่องงาน", en: "Ask Event" },
  "tab.memory": { th: "บันทึกความทรงจำ", en: "Event Memory" },
  "tab.sessions": { th: "สรุปเซสชั่น", en: "Sessions" },
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
  const t = (key: string) => dict[key]?.[lang] ?? key;
  return <Ctx.Provider value={{ lang, setLang: setLangState, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
