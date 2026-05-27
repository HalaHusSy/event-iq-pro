import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, X, Send, Calendar, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { listEvents } from "@/lib/data/queries";
import { useI18n } from "@/lib/i18n";
import {
  answerEventQuestion,
  statusLabel,
  type AssistantEvent,
} from "@/lib/assistant/eventQa";

// หน้าหลังบ้าน / login ไม่ต้องโชว์ผู้ช่วยสำหรับผู้เยี่ยมชม
const EXCLUDED_PATHS = [
  "/login",
  "/platform",
  "/admin",
  "/root",
  "/dashboard",
  "/organizer",
];

interface Msg {
  role: "user" | "bot";
  text: string;
  events?: AssistantEvent[];
}

const SUGGESTIONS_TH = [
  "ตอนนี้มีงานอะไรกำลังจัด?",
  "งานเกี่ยวกับ AI / เทคโนโลยี?",
  "เดือนหน้ามีงานอะไรบ้าง?",
  "ที่ BITEC ตอนนี้มีงานไหม?",
];
const SUGGESTIONS_EN = [
  "What events are happening now?",
  "Any events about AI / technology?",
  "What events are next month?",
  "Any events at BITEC right now?",
];

function greetingText(lang: string): string {
  return lang === "th"
    ? "สวัสดีค่ะ! ฉันคือ YouWalk Assistant 👋\n\nถามฉันเรื่องงานในระบบได้เลยค่ะ ฉันดึงข้อมูลงานจริงมาตอบให้"
    : "Hi! I'm YouWalk Assistant 👋\n\nAsk me about events on the platform — I answer from the live event data.";
}

function statusColor(status: AssistantEvent["status"]): string {
  return status === "live"
    ? "bg-emerald-500"
    : status === "upcoming"
    ? "bg-amber-500"
    : "bg-muted-foreground";
}

function EventCard({ e, onNavigate }: { e: AssistantEvent; onNavigate: () => void }) {
  const { lang } = useI18n();
  const fmt = (iso: string) =>
    iso
      ? new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : "en-US", {
          day: "numeric",
          month: "short",
        })
      : "—";
  return (
    <Link
      to={`/visitor?event=${e.id}`}
      onClick={onNavigate}
      className="block rounded-lg border bg-background/60 p-2.5 hover:border-primary/50 hover:bg-secondary/60 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold leading-tight line-clamp-2">{e.name}</span>
        <Badge className={`${statusColor(e.status)} text-white border-0 shrink-0 text-[10px]`}>
          {statusLabel(e.status, lang === "th" ? "th" : "en")}
        </Badge>
      </div>
      <div className="mt-1.5 space-y-0.5 text-[11px] text-muted-foreground">
        {(e.startDate || e.endDate) && (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 shrink-0" />
            <span className="font-mono">
              {fmt(e.startDate)}
              {e.endDate && e.endDate !== e.startDate ? ` – ${fmt(e.endDate)}` : ""}
            </span>
          </div>
        )}
        {e.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{e.location}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

/**
 * YouWalk Assistant — floating widget ที่ตอบคำถามระดับเว็บเกี่ยวกับ "งาน/อีเวนต์"
 * โดยดึงข้อมูล event จริงผ่าน listEvents() แล้วตอบด้วย local intent engine
 * (ดู src/lib/assistant/eventQa.ts) — ต่างจาก agent ถาม-ตอบเฉพาะ event ในหน้า Visitor
 */
export function SiteAssistant() {
  const location = useLocation();
  const { lang } = useI18n();
  const isExcluded = EXCLUDED_PATHS.some((p) => location.pathname.startsWith(p));

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => listEvents(),
    enabled: open,
  });

  // greeting แสดงครั้งแรกที่เปิด และรีเซ็ตเมื่อสลับภาษา
  useEffect(() => {
    setMsgs([{ role: "bot", text: greetingText(lang) }]);
  }, [lang]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  if (isExcluded) return null;

  const suggestions = lang === "th" ? SUGGESTIONS_TH : SUGGESTIONS_EN;

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setInput("");
    if (isLoading) {
      setMsgs((m) => [
        ...m,
        { role: "user", text: q },
        {
          role: "bot",
          text: lang === "th" ? "กำลังโหลดข้อมูลงาน สักครู่นะคะ…" : "Loading event data, one moment…",
        },
      ]);
      return;
    }
    const answer = answerEventQuestion(q, events, lang);
    setMsgs((m) => [
      ...m,
      { role: "user", text: q },
      { role: "bot", text: answer.text, events: answer.events },
    ]);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-elegant grid place-items-center hover:shadow-glow transition-shadow"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-8rem))] flex flex-col rounded-2xl border bg-background shadow-elegant overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-primary text-primary-foreground">
            <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold leading-tight">YouWalk Assistant</div>
              <div className="text-[11px] opacity-80">
                {lang === "th" ? "ถามข้อมูลงานในระบบ" : "Ask about platform events"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[88%] space-y-2">
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap ${
                      m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.events && m.events.length > 0 && (
                    <div className="space-y-1.5">
                      {m.events.slice(0, 6).map((e) => (
                        <EventCard key={e.id} e={e} onNavigate={() => setOpen(false)} />
                      ))}
                      {m.events.length > 6 && (
                        <Link
                          to="/events"
                          onClick={() => setOpen(false)}
                          className="block text-center text-xs text-primary hover:underline py-1"
                        >
                          {lang === "th"
                            ? `ดูทั้งหมด (${m.events.length} งาน) →`
                            : `See all (${m.events.length} events) →`}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="px-3 pt-2 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-secondary hover:bg-accent-soft transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={lang === "th" ? "พิมพ์คำถามเรื่องงาน…" : "Ask about events…"}
              className="h-10"
            />
            <Button onClick={() => send(input)} className="bg-gradient-primary h-10 px-3 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
