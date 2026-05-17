import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Target, MessageSquare, Send, Sparkles, Mic2, Bookmark, MapPin, ChevronDown, Brain, X, GitCompare, Filter, Calendar } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import { Match, sampleMatches, faqs } from "@/lib/mock";
import { PLATFORM_EVENTS } from "@/lib/mock/events";
import { toast } from "sonner";

const tabs = [
  { id: "find", icon: Target, key: "tab.find" },
  { id: "ask", icon: MessageSquare, key: "tab.ask" },
];

function EventBanner({ slug }: { slug: string }) {
  const { t, lang } = useI18n();
  const event = PLATFORM_EVENTS.find((e) => e.slug === slug);
  if (!event) return null;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : lang, { day: "numeric", month: "short", year: "numeric" });
  const statusColor =
    event.status === "live" ? "bg-emerald-500" : event.status === "upcoming" ? "bg-amber-500" : "bg-muted-foreground";
  const statusLabel =
    event.status === "live" ? t("events.live") : event.status === "upcoming" ? t("events.upcoming") : t("events.past");

  return (
    <Card className="p-4 glass mb-6 flex items-center gap-4 border-primary/30">
      <div className="text-4xl shrink-0">{event.cover}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">{t("visitor.currentEvent")}</Badge>
          <Badge className={`${statusColor} text-white border-0 gap-1`}>
            {event.status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
            {statusLabel}
          </Badge>
        </div>
        <h2 className="font-semibold text-lg leading-tight">{event.name}</h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1.5">
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmt(event.startDate)} – {fmt(event.endDate)}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.venue}</span>
        </div>
      </div>
    </Card>
  );
}

export default function VisitorPortal() {
  const [params, setParams] = useSearchParams();
  const active = params.get("tab") || "find";
  const eventSlug = params.get("event");
  const { t } = useI18n();

  const setTab = (id: string) => {
    const next: Record<string, string> = { tab: id };
    if (eventSlug) next.event = eventSlug;
    setParams(next);
  };

  return (
    <AppShell>
      <div className="container py-8">
        {eventSlug && <EventBanner slug={eventSlug} />}
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <Card className="p-2 glass">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                      active === tab.id ? "bg-gradient-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {t(tab.key)}
                  </button>
                ))}
              </nav>
            </Card>
          </aside>
          <section className="min-w-0">
            {active === "find" && <FindBooth />}
            {active === "ask" && <AskEvent />}
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function FindBooth() {
  const { lang, t } = useI18n();
  const [pain, setPain] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Match[] | null>(null);
  const [recording, setRecording] = useState(false);

  const examples = lang === "th"
    ? ["ลด cost call center ด้วย AI", "อยากทำ chatbot ภาษาไทย", "หา cloud ที่ราคาถูกลง", "ต้องการระบบ HR อัตโนมัติ"]
    : ["Reduce call center cost with AI", "Build a Thai chatbot", "Cheaper cloud provider", "HR automation"];

  const submit = () => {
    if (!pain.trim()) return toast.error(lang === "th" ? "กรุณาเล่า pain ของคุณ" : "Please describe your pain");
    setLoading(true); setResults(null);
    setTimeout(() => { setResults(sampleMatches(pain)); setLoading(false); }, 1100);
  };

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("f1.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("f1.desc")}</p>
      </div>
      <Card className="p-5 glass">
        <Textarea
          value={pain} onChange={(e) => setPain(e.target.value)}
          placeholder={lang === "th" ? "เล่า pain หรือสิ่งที่คุณกำลังหา เช่น 'อยากลดต้นทุน call center 30% ด้วย AI'..." : "Describe your business pain point, e.g. 'cut call center cost 30% with AI'..."}
          rows={4} className="resize-none border-0 bg-transparent focus-visible:ring-0 text-base p-0"
        />
        <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t">
          <Button
            variant={recording ? "destructive" : "outline"} size="sm"
            onClick={() => { setRecording(!recording); toast(recording ? "Stopped" : "Listening..."); }}
            className={recording ? "animate-pulse-ring" : ""}
          >
            <Mic2 className="h-4 w-4 mr-1.5" />
            {recording ? (lang === "th" ? "หยุด" : "Stop") : (lang === "th" ? "พูด" : "Voice")}
          </Button>
          <Button onClick={submit} disabled={loading} className="bg-gradient-primary">
            <Sparkles className="h-4 w-4 mr-1.5" />
            {loading ? (lang === "th" ? "กำลังหา..." : "Matching...") : (lang === "th" ? "หาบูธ" : "Find Match")}
          </Button>
        </div>
      </Card>

      {!results && !loading && (
        <Card className="p-6 border-dashed">
          <p className="text-sm font-medium mb-3">{lang === "th" ? "ลองตัวอย่าง:" : "Try examples:"}</p>
          <div className="flex flex-wrap gap-2">
            {examples.map(ex => (
              <button key={ex} onClick={() => setPain(ex)} className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-accent-soft transition-colors">
                {ex}
              </button>
            ))}
          </div>
        </Card>
      )}

      {loading && (
        <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full" />)}</div>
      )}

      {results && <ResultsView results={results} />}
    </div>
  );
}

function ResultsView({ results }: { results: Match[] }) {
  const { lang } = useI18n();
  const allTags = Array.from(new Set(results.flatMap(r => r.exhibitor.tags)));
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const toggleTag = (t: string) =>
    setActiveTags(a => a.includes(t) ? a.filter(x => x !== t) : [...a, t]);
  const toggleCompare = (id: string) => {
    setCompareIds(c => {
      if (c.includes(id)) return c.filter(x => x !== id);
      if (c.length >= 3) { toast.error(lang === "th" ? "เปรียบเทียบได้สูงสุด 3 บูธ" : "Max 3 booths to compare"); return c; }
      return [...c, id];
    });
  };

  const filtered = activeTags.length === 0
    ? results
    : results.filter(r => activeTags.every(t => r.exhibitor.tags.includes(t)));

  const compareList = results.filter(r => compareIds.includes(r.exhibitor.id));

  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-5">
      <aside className="md:sticky md:top-24 md:self-start space-y-3">
        <Card className="p-4 glass">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">{lang === "th" ? "กรองตามแท็ก" : "Filter by tags"}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map(tag => {
              const on = activeTags.includes(tag);
              return (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${on ? "bg-gradient-primary text-primary-foreground border-transparent" : "bg-secondary border-transparent hover:border-primary/40"}`}>
                  {tag}
                </button>
              );
            })}
          </div>
          {activeTags.length > 0 && (
            <button onClick={() => setActiveTags([])} className="text-xs text-muted-foreground hover:text-foreground mt-3 underline">
              {lang === "th" ? "ล้างตัวกรอง" : "Clear filters"}
            </button>
          )}
        </Card>
        {compareIds.length > 0 && (
          <Card className="p-4 glass border-primary/40">
            <div className="flex items-center gap-2 mb-2">
              <GitCompare className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">{lang === "th" ? "เปรียบเทียบ" : "Compare"} ({compareIds.length}/3)</h3>
            </div>
            <div className="space-y-1.5 mb-3">
              {compareList.map(c => (
                <div key={c.exhibitor.id} className="flex items-center justify-between text-xs bg-secondary rounded px-2 py-1">
                  <span className="truncate">{c.exhibitor.logo} {c.exhibitor.name}</span>
                  <button onClick={() => toggleCompare(c.exhibitor.id)} className="text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
            <Button size="sm" className="w-full bg-gradient-primary" disabled={compareIds.length < 2} onClick={() => setCompareOpen(true)}>
              {lang === "th" ? "เปรียบเทียบเลย" : "Compare now"}
            </Button>
          </Card>
        )}
      </aside>

      <div className="space-y-3 min-w-0">
        <p className="text-sm text-muted-foreground font-mono">{filtered.length} {lang === "th" ? "ผลลัพธ์" : "matches"}</p>
        {filtered.map((m, idx) => {
          const isExpanded = expanded === m.exhibitor.id;
          const isSelected = compareIds.includes(m.exhibitor.id);
          return (
            <Card key={m.exhibitor.id} className={`p-5 glass transition-all animate-fade-up ${isSelected ? "ring-2 ring-primary" : "hover:shadow-elegant"}`} style={{animationDelay: `${idx * 80}ms`}}>
              <div className="flex items-start gap-4 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : m.exhibitor.id)}>
                <div className="text-4xl shrink-0">{m.exhibitor.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-lg">{m.exhibitor.name}</h3>
                    <Badge className={`font-mono ${m.score > 85 ? "bg-success text-white" : m.score > 75 ? "bg-accent text-accent-foreground" : ""}`}>{m.score}% match</Badge>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{m.exhibitor.hall} — Booth {m.exhibitor.booth}</p>
                  <p className="mt-2 text-sm font-medium">{m.usecase}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {m.exhibitor.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Checkbox checked={isSelected} onCheckedChange={() => toggleCompare(m.exhibitor.id)} onClick={(e) => e.stopPropagation()} aria-label="compare" />
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              </div>

              {isExpanded && (
                <div className="mt-5 pt-5 border-t space-y-5 animate-fade-up">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{lang === "th" ? "เกี่ยวกับบริษัท" : "About"}</h4>
                        {m.exhibitor.tagline && <p className="text-sm font-medium">{m.exhibitor.tagline}</p>}
                        <p className="text-sm text-muted-foreground mt-1">{m.exhibitor.description}</p>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                          <div className="p-2 rounded bg-secondary/50"><div className="text-muted-foreground">{lang === "th" ? "ก่อตั้ง" : "Founded"}</div><div className="font-mono font-semibold">{m.exhibitor.founded}</div></div>
                          <div className="p-2 rounded bg-secondary/50"><div className="text-muted-foreground">{lang === "th" ? "พนักงาน" : "Employees"}</div><div className="font-mono font-semibold">{m.exhibitor.employees}</div></div>
                          <div className="p-2 rounded bg-secondary/50 col-span-2"><div className="text-muted-foreground">HQ · Web</div><div className="font-mono font-semibold truncate">{m.exhibitor.headquarters} · {m.exhibitor.website}</div></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{lang === "th" ? "บริการ" : "Services"}</h4>
                        <div className="space-y-1.5">
                          {m.exhibitor.services?.map(s => (
                            <div key={s.name} className="p-2 rounded border bg-background/40">
                              <div className="text-sm font-medium">{s.name}</div>
                              <div className="text-xs text-muted-foreground">{s.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{lang === "th" ? "ตำแหน่งบูธ" : "Booth location"}</h4>
                        <FloorMap hall={m.exhibitor.hall} booth={m.exhibitor.booth} />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{lang === "th" ? "Use Cases เด่น" : "Featured Use Cases"}</h4>
                        <div className="space-y-1.5">
                          {m.exhibitor.useCaseDetails?.map(u => (
                            <div key={u.title} className="p-2 rounded border bg-background/40">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium truncate">{u.title}</span>
                                <Badge variant="outline" className="text-[10px] shrink-0">{u.industry}</Badge>
                              </div>
                              <div className="text-xs text-success mt-0.5">→ {u.outcome}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="p-2 rounded bg-secondary/50 text-xs">
                          <div className="text-muted-foreground mb-1">{lang === "th" ? "ลูกค้าที่ใช้งาน" : "Notable clients"}</div>
                          <div className="flex flex-wrap gap-1">{m.exhibitor.clients?.map(c => <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>)}</div>
                        </div>
                        <div className="p-2 rounded bg-accent-soft text-xs">
                          <div className="text-muted-foreground mb-0.5">{lang === "th" ? "ราคาเริ่มต้น" : "Pricing"}</div>
                          <div className="font-medium">{m.exhibitor.pricing}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="ai" className="border rounded-lg px-4 bg-gradient-to-br from-primary/5 to-accent/5">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <Brain className="h-4 w-4 text-primary" />
                          {lang === "th" ? "เหตุผลของ AI" : "AI Reasoning"}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed">{m.reason[lang]}</p>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                          <div className="p-2 rounded bg-background/60"><div className="text-muted-foreground">Pain alignment</div><div className="font-mono font-semibold">{Math.min(99, m.score + 4)}%</div></div>
                          <div className="p-2 rounded bg-background/60"><div className="text-muted-foreground">Tag overlap</div><div className="font-mono font-semibold">{Math.max(40, m.score - 12)}%</div></div>
                          <div className="p-2 rounded bg-background/60"><div className="text-muted-foreground">Past success</div><div className="font-mono font-semibold">{Math.max(50, m.score - 6)}%</div></div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="bg-gradient-primary"><MapPin className="h-3.5 w-3.5 mr-1" />{lang === "th" ? "นำทาง" : "Navigate"}</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success(lang === "th" ? "บันทึกแล้ว" : "Saved")}><Bookmark className="h-3.5 w-3.5 mr-1" />{lang === "th" ? "บันทึก" : "Save"}</Button>
                    <Button size="sm" variant="ghost"><MessageSquare className="h-3.5 w-3.5 mr-1" />{lang === "th" ? "ถามต่อ" : "Chat more"}</Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card className="p-8 text-center text-sm text-muted-foreground border-dashed">
            {lang === "th" ? "ไม่พบบูธที่ตรงกับตัวกรอง" : "No booths match your filters"}
          </Card>
        )}
      </div>

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{lang === "th" ? "เปรียบเทียบบูธ" : "Compare booths"}</DialogTitle>
            <DialogDescription>{lang === "th" ? "ดูข้อมูลแบบเทียบกันได้" : "Side-by-side comparison"}</DialogDescription>
          </DialogHeader>
          <div className={`grid gap-3 ${compareList.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {compareList.map(c => (
              <Card key={c.exhibitor.id} className="p-4">
                <div className="text-3xl mb-2">{c.exhibitor.logo}</div>
                <h4 className="font-semibold">{c.exhibitor.name}</h4>
                <Badge className="font-mono mt-1">{c.score}%</Badge>
                <dl className="mt-3 space-y-2 text-xs">
                  <div><dt className="text-muted-foreground">Booth</dt><dd className="font-mono">{c.exhibitor.hall} · {c.exhibitor.booth}</dd></div>
                  <div><dt className="text-muted-foreground">Tags</dt><dd className="flex flex-wrap gap-1 mt-1">{c.exhibitor.tags.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}</dd></div>
                  <div><dt className="text-muted-foreground">Top use case</dt><dd>{c.usecase}</dd></div>
                  <div><dt className="text-muted-foreground">About</dt><dd>{c.exhibitor.description}</dd></div>
                </dl>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FloorMap({ hall, booth }: { hall: string; booth: string }) {
  const halls = ["Hall A", "Hall B", "Hall C", "Hall D"];
  const seed = booth.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const x = 15 + (seed % 60);
  const y = 20 + ((seed * 7) % 55);
  return (
    <div className="relative rounded-lg border bg-secondary/40 overflow-hidden aspect-[4/3]">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
        {halls.map(h => (
          <div key={h} className={`rounded border text-[10px] font-mono flex items-center justify-center ${h === hall ? "bg-primary/15 border-primary text-primary font-semibold" : "bg-background/40 text-muted-foreground"}`}>
            {h}
          </div>
        ))}
      </div>
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 h-6 w-6 rounded-full bg-accent/40 animate-ping" />
          <div className="relative h-6 w-6 rounded-full bg-gradient-primary grid place-items-center shadow-elegant">
            <MapPin className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-background/90 border rounded px-1.5 py-0.5">
            {booth}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Msg { role: "user" | "bot"; text: string; }
function AskEvent() {
  const { lang, t } = useI18n();
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: lang === "th" ? "สวัสดีค่ะ ฉันช่วยตอบคำถามเกี่ยวกับงานนี้ได้ ลองถามดูสิคะ" : "Hi! I can answer anything about this event. Try asking!" }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }]); setInput(""); setThinking(true);
    setTimeout(() => {
      const match = faqs.find(f => f.q[lang].includes(text.slice(0,5)) || text.toLowerCase().includes(f.q.en.toLowerCase().slice(0,5)));
      const reply = match ? match.a[lang] : (lang === "th" ? "ขออภัย ฉันยังไม่มีข้อมูลนั้นค่ะ ลองคลิก 'ถามทีมงาน' ได้เลย" : "I don't have that info yet. Try 'Ask staff'.");
      setMsgs(m => [...m, { role: "bot", text: reply }]); setThinking(false);
    }, 800);
  };

  return (
    <div className="animate-fade-up flex flex-col h-[calc(100vh-180px)]">
      <div>
        <h1 className="text-2xl font-bold">{t("f2.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("f2.desc")}</p>
      </div>
      <Card className="flex-1 mt-4 flex flex-col glass overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary"}`}>
                {m.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex gap-1 px-3 py-2"><span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" /><span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{animationDelay:"150ms"}} /><span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{animationDelay:"300ms"}} /></div>
          )}
          <div ref={endRef} />
        </div>
        <div className="border-t p-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {faqs.map(f => (
              <button key={f.q.en} onClick={() => send(f.q[lang])} className="text-xs px-2.5 py-1 rounded-full bg-secondary hover:bg-accent-soft transition-colors">
                {f.q[lang]}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)} placeholder={lang === "th" ? "ถามอะไรก็ได้..." : "Ask anything..."} />
            <Button onClick={() => send(input)} className="bg-gradient-primary"><Send className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" onClick={() => toast(lang === "th" ? "ติดต่อทีมงานแล้ว" : "Staff notified")}>{lang === "th" ? "ถามทีมงาน" : "Ask staff"}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
