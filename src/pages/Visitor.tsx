import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Target, MessageSquare, Mic, NotebookPen, Send, Sparkles, Mic2, Bookmark, MapPin, Square, Play, Share2, Check, FileText, ChevronDown, Brain, X, GitCompare, Filter, Info, Mic as MicIcon, Cpu, FileText as FileIcon, Shield, Clock, Globe, RotateCcw, Database } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "@/lib/i18n";
import { Match, sampleMatches, faqs, sessions } from "@/lib/mock";
import { toast } from "sonner";

const tabs = [
  { id: "find", icon: Target, key: "tab.find" },
  { id: "ask", icon: MessageSquare, key: "tab.ask" },
  { id: "memory", icon: Mic, key: "tab.memory" },
  { id: "sessions", icon: NotebookPen, key: "tab.sessions" },
];

export default function VisitorPortal() {
  const [params, setParams] = useSearchParams();
  const active = params.get("tab") || "find";
  const { t } = useI18n();

  return (
    <AppShell>
      <div className="container py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <Card className="p-2 glass">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setParams({ tab: tab.id })}
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
            {active === "memory" && <EventMemory />}
            {active === "sessions" && <SessionsList />}
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
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{lang === "th" ? "เกี่ยวกับบริษัท" : "About"}</h4>
                      <p className="text-sm">{m.exhibitor.description}</p>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Use cases</h4>
                      <ul className="space-y-1 text-sm list-disc pl-5">
                        {m.exhibitor.usecases.map(u => <li key={u}>{u}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{lang === "th" ? "ตำแหน่งบูธ" : "Booth location"}</h4>
                      <FloorMap hall={m.exhibitor.hall} booth={m.exhibitor.booth} />
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

function EventMemory() {
  const { lang, t } = useI18n();
  const [showConsent, setShowConsent] = useState(false);
  const [c1, setC1] = useState(false); const [c2, setC2] = useState(false); const [c3, setC3] = useState(false);
  const [signed, setSigned] = useState(false);
  const [phase, setPhase] = useState<"idle"|"recording"|"processing"|"done">("idle");
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    if (phase !== "recording") return;
    const i = setInterval(() => setSeconds(s => s+1), 1000);
    return () => clearInterval(i);
  }, [phase]);

  useEffect(() => {
    if (phase !== "processing") return;
    setProgress(0);
    const i = setInterval(() => setProgress(p => {
      if (p >= 100) { clearInterval(i); setPhase("done"); return 100; }
      return p + 8;
    }), 300);
    return () => clearInterval(i);
  }, [phase]);

  const startSign = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true; const ctx = canvasRef.current!.getContext("2d")!;
    const r = canvasRef.current!.getBoundingClientRect();
    ctx.beginPath(); ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
  };
  const moveSign = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const r = canvasRef.current!.getBoundingClientRect();
    ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "hsl(var(--foreground))";
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top); ctx.stroke(); setSigned(true);
  };
  const clearSign = () => { const ctx = canvasRef.current!.getContext("2d")!; ctx.clearRect(0,0,500,150); setSigned(false); };

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const canStart = c1 && c3 && signed;

  if (phase === "recording") {
    return (
      <div className="animate-fade-up text-center py-12">
        <div className="font-mono text-5xl font-bold gradient-text mb-8">{fmt(seconds)}</div>
        <div className="flex items-end justify-center gap-1 h-24 mb-8">
          {Array.from({length: 30}).map((_, i) => (
            <div key={i} className="w-1.5 bg-gradient-primary rounded-full waveform-bar" style={{height: "60%", animationDelay: `${i * 60}ms`}} />
          ))}
        </div>
        <div className="mx-auto w-fit relative mb-6">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-destructive text-destructive-foreground animate-pulse-ring">
            <Mic className="h-10 w-10" />
          </div>
        </div>
        <Button size="lg" variant="destructive" onClick={() => setPhase("processing")}>
          <Square className="h-4 w-4 mr-2 fill-current" /> {lang === "th" ? "หยุดบันทึก" : "Stop Recording"}
        </Button>
      </div>
    );
  }

  if (phase === "processing") {
    const steps = [
      { label: lang === "th" ? "แปลงเสียงเป็นข้อความ" : "Transcribing", at: 33 },
      { label: lang === "th" ? "แยกเสียงผู้พูด" : "Diarizing", at: 66 },
      { label: lang === "th" ? "สร้างบทความ" : "Generating article", at: 100 },
    ];
    return (
      <div className="animate-fade-up max-w-md mx-auto py-16 text-center">
        <h2 className="text-xl font-bold mb-6">{lang === "th" ? "กำลังประมวลผล..." : "Processing..."}</h2>
        <Progress value={progress} className="mb-6" />
        <div className="space-y-2 text-sm">
          {steps.map(s => (
            <div key={s.label} className="flex items-center justify-between">
              <span className={progress >= s.at - 33 ? "text-foreground" : "text-muted-foreground"}>{s.label}</span>
              {progress >= s.at ? <Check className="h-4 w-4 text-success" /> : <span className="h-4 w-4 rounded-full border-2 border-muted animate-spin border-t-primary" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="animate-fade-up space-y-5">
        <Card className="p-6 glass">
          <Badge className="bg-gradient-accent text-accent-foreground mb-3">PUBLIC ARTICLE</Badge>
          <h1 className="text-2xl font-bold">{lang === "th" ? "Voice AI ลดต้นทุน Call Center 40% — บทเรียนจาก Botnoi" : "Voice AI cuts call center cost 40% — Lessons from Botnoi"}</h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">Botnoi Group · Hall A — Booth 12 · {fmt(seconds)} recording</p>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2 uppercase tracking-wider text-muted-foreground">Summary</h3>
              <ul className="space-y-1.5 text-sm list-disc pl-5">
                <li>{lang === "th" ? "Voice Bot ภาษาไทยลด cost call center ได้ถึง 40%" : "Thai Voice Bot reduces call center cost by 40%"}</li>
                <li>{lang === "th" ? "Deploy บน on-prem หรือ cloud ได้" : "Can deploy on-prem or cloud"}</li>
                <li>{lang === "th" ? "รองรับ 12+ ภาษา ใช้เวลา onboarding 2-4 สัปดาห์" : "Supports 12+ languages, 2–4 week onboarding"}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2 uppercase tracking-wider text-muted-foreground">Highlights</h3>
              <blockquote className="border-l-2 border-primary pl-4 italic text-sm">"{lang === "th" ? "ลูกค้าเรารายหนึ่งลดพนักงาน level 1 ลง 60% ภายใน 6 เดือน" : "One client reduced L1 agents by 60% in 6 months."}"</blockquote>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="t"><AccordionTrigger>{lang === "th" ? "ดู Transcript ฉบับเต็ม" : "View full transcript"}</AccordionTrigger>
                <AccordionContent className="font-mono text-xs space-y-2">
                  <p><b>[Visitor]</b> สวัสดีครับ อยากทราบเรื่อง voice bot ภาษาไทย</p>
                  <p><b>[Botnoi]</b> ของเรารองรับภาษาไทยเต็มรูปแบบครับ มี TTS และ STT...</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex gap-2 mt-6 pt-6 border-t">
            <Button className="bg-gradient-primary"><Share2 className="h-4 w-4 mr-1.5" />{lang === "th" ? "แชร์" : "Share"}</Button>
            <Button variant="outline">{lang === "th" ? "ดูบทความของฉัน" : "View my memories"}</Button>
            <Button variant="ghost" onClick={() => { setPhase("idle"); setSeconds(0); }}>{lang === "th" ? "บันทึกใหม่" : "Record new"}</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">{t("f3.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("f3.desc")}</p>
      </div>
      <Card className="mt-6 p-12 glass text-center">
        <button onClick={() => setShowConsent(true)} className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-destructive text-destructive-foreground animate-pulse-ring shadow-glow hover:scale-105 transition-transform">
          <Mic className="h-14 w-14" />
        </button>
        <p className="mt-6 font-semibold text-lg">{lang === "th" ? "เริ่มบันทึก" : "Start Recording"}</p>
        <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">{lang === "th" ? "AI จะถอดเสียง สรุป และสร้างบทความให้อัตโนมัติ" : "AI transcribes, summarizes, and generates an article automatically."}</p>
      </Card>

      <Dialog open={showConsent} onOpenChange={setShowConsent}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {lang === "th" ? "ยินยอมการบันทึกตาม PDPA" : "PDPA-Compliant Recording Consent"}
            </DialogTitle>
            <DialogDescription>{lang === "th" ? "โปร่งใสและตรวจสอบได้ — โปรดอ่านก่อนยินยอม" : "Transparent and auditable — please review before consenting."}</DialogDescription>
          </DialogHeader>

          <TooltipProvider delayDuration={150}>
            <div className="space-y-5">
              {/* Data flow visualization */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{lang === "th" ? "ขั้นตอนการประมวลผลข้อมูล" : "Data Flow"}</p>
                <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border">
                  {[
                    { icon: MicIcon, label: lang === "th" ? "บันทึกเสียง" : "Audio recorded", sub: "WAV · 16kHz" },
                    { icon: Cpu, label: lang === "th" ? "AI ประมวลผล" : "AI processed", sub: "STT · LLM" },
                    { icon: FileIcon, label: lang === "th" ? "สร้างบทความ" : "Article generated", sub: "Markdown" },
                  ].map((s, i, arr) => (
                    <div key={s.label} className="flex items-center gap-2 flex-1">
                      <div className="flex flex-col items-center gap-1 text-center flex-1">
                        <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shadow-md">
                          <s.icon className="h-4 w-4" />
                        </div>
                        <div className="text-[11px] font-medium leading-tight">{s.label}</div>
                        <div className="text-[10px] font-mono text-muted-foreground">{s.sub}</div>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-accent/40 relative">
                          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 -rotate-90 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* What we collect & retention */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-secondary/40">
                  <div className="flex items-center gap-1.5 text-xs font-semibold mb-2"><Database className="h-3.5 w-3.5 text-primary" />{lang === "th" ? "ข้อมูลที่เก็บ" : "Data collected"}</div>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• {lang === "th" ? "ไฟล์เสียงและ transcript" : "Audio file & transcript"}</li>
                    <li>• {lang === "th" ? "ชื่อบูธและเวลาที่บันทึก" : "Booth name & timestamp"}</li>
                    <li>• {lang === "th" ? "User ID (ถ้าเข้าสู่ระบบ)" : "User ID (if signed in)"}</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border bg-secondary/40">
                  <div className="flex items-center gap-1.5 text-xs font-semibold mb-2"><Clock className="h-3.5 w-3.5 text-primary" />{lang === "th" ? "ระยะเวลาเก็บ" : "Retention"}</div>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• {lang === "th" ? "เสียงดิบ: 30 วัน" : "Raw audio: 30 days"}</li>
                    <li>• {lang === "th" ? "Transcript: 12 เดือน" : "Transcript: 12 months"}</li>
                    <li>• {lang === "th" ? "บทความ: ตามที่คุณกำหนด" : "Article: until you delete"}</li>
                  </ul>
                </div>
              </div>

              {/* Required consent */}
              <label className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${c1 ? "border-primary/60 bg-primary/5" : "border-border hover:bg-secondary"}`}>
                <Checkbox checked={c1} onCheckedChange={v => setC1(!!v)} className="mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium">{lang === "th" ? "ฉันยินยอมให้บันทึกการสนทนานี้" : "I consent to record this conversation"}</span>
                  <span className="text-destructive font-bold ml-1">*</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{lang === "th" ? "ผู้พูดคนอื่นต้องได้รับแจ้งด้วย" : "Other speakers must also be informed."}</p>
                </div>
              </label>

              {/* Optional public sharing with tooltip */}
              <label className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${c2 ? "border-accent bg-accent-soft" : "border-accent/40 bg-accent-soft/40 hover:bg-accent-soft"}`}>
                <Checkbox checked={c2} onCheckedChange={v => setC2(!!v)} className="mt-0.5" />
                <div className="text-sm flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{lang === "th" ? "เผยแพร่บทความสาธารณะ — รับส่วนลด 50%" : "Make article public — get 50% discount"}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-foreground">
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="font-semibold mb-1">{lang === "th" ? "ทำไมถึงได้ส่วนลด?" : "Why the discount?"}</p>
                        <p className="text-xs">{lang === "th" ? "บทความสาธารณะช่วยให้ผู้เข้าชมท่านอื่นค้นพบบูธนี้ และสร้างคุณค่าให้ชุมชน เราจึงคืนส่วนลด 50% เป็นการขอบคุณ" : "Public articles help other visitors discover this booth and add value to the community. We give back 50% as thanks."}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="font-mono text-xs mt-1 text-muted-foreground">
                    Standard: <span className="line-through">฿500</span> → Public: <span className="text-accent font-bold">฿250 (-50%)</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{lang === "th" ? "(ไม่บังคับ — เลือกได้)" : "(Optional)"}</p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${c3 ? "border-primary/60 bg-primary/5" : "border-border hover:bg-secondary"}`}>
                <Checkbox checked={c3} onCheckedChange={v => setC3(!!v)} className="mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium">{lang === "th" ? "ฉันยอมรับข้อตกลง PDPA" : "I accept the PDPA terms"}</span>
                  <span className="text-destructive font-bold ml-1">*</span>
                </div>
              </label>

              {/* PDPA full terms */}
              <Accordion type="single" collapsible>
                <AccordionItem value="pdpa" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm hover:no-underline">
                    <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />{lang === "th" ? "อ่านข้อตกลง PDPA ฉบับเต็ม" : "Read full PDPA terms"}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScrollArea className="h-48 pr-3">
                      <div className="text-xs space-y-2 leading-relaxed text-muted-foreground">
                        <p><b className="text-foreground">1. {lang === "th" ? "ผู้ควบคุมข้อมูล" : "Data Controller"}.</b> EventIQ Co., Ltd. ("Company") collects and processes personal data under PDPA B.E. 2562 (2019).</p>
                        <p><b className="text-foreground">2. {lang === "th" ? "วัตถุประสงค์" : "Purpose"}.</b> Audio is recorded solely to generate a written summary article for your personal reference, with optional public sharing.</p>
                        <p><b className="text-foreground">3. {lang === "th" ? "ฐานทางกฎหมาย" : "Lawful Basis"}.</b> Explicit consent under Section 19 of PDPA. You may withdraw consent at any time.</p>
                        <p><b className="text-foreground">4. {lang === "th" ? "การเปิดเผย" : "Disclosure"}.</b> Audio is processed by Botnoi AI (subcontractor under DPA). No third-party marketing use.</p>
                        <p><b className="text-foreground">5. {lang === "th" ? "การเก็บรักษา" : "Retention"}.</b> Raw audio: 30 days. Transcript: 12 months. Generated article: until deleted by you.</p>
                        <p><b className="text-foreground">6. {lang === "th" ? "สิทธิของเจ้าของข้อมูล" : "Your Rights"}.</b> Access, rectification, erasure, restriction, portability, objection, and withdrawal of consent — contact dpo@eventiq.example.</p>
                        <p><b className="text-foreground">7. {lang === "th" ? "ความปลอดภัย" : "Security"}.</b> AES-256 at rest, TLS 1.3 in transit, role-based access, audit logs.</p>
                        <p><b className="text-foreground">8. {lang === "th" ? "การโอนข้ามประเทศ" : "Cross-border Transfer"}.</b> Data is processed in Thailand and Singapore (AWS ap-southeast-1) under SCCs.</p>
                      </div>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Signature */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium">{lang === "th" ? "ลงลายมือชื่อ" : "Signature"} <span className="text-destructive font-bold">*</span></p>
                  <button onClick={clearSign} type="button" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                    <RotateCcw className="h-3 w-3" /> {lang === "th" ? "ทำใหม่" : "Redo"}
                  </button>
                </div>
                <canvas ref={canvasRef} width={500} height={150} className="w-full bg-secondary rounded-lg cursor-crosshair touch-none border-2 border-dashed"
                  onPointerDown={startSign} onPointerMove={moveSign} onPointerUp={() => drawing.current = false} onPointerLeave={() => drawing.current = false} />
                <p className="text-[10px] text-muted-foreground mt-1 text-center">{lang === "th" ? "เซ็นชื่อด้วยนิ้วหรือเมาส์" : "Sign with your finger or mouse"}</p>
              </div>

              {/* Audit notice */}
              <div className="flex items-start gap-2 p-2.5 rounded-md bg-muted/50 border text-[11px] font-mono text-muted-foreground">
                <Globe className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <div>
                  {lang === "th" ? "การยินยอมจะถูกบันทึกพร้อม timestamp และ IP address (203.0.113.x) เพื่อการตรวจสอบ" : "Consent will be logged with timestamp and IP address (203.0.113.x) for audit purposes."}
                  <div>UTC: {new Date().toISOString()}</div>
                </div>
              </div>
            </div>
          </TooltipProvider>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConsent(false)}>{lang === "th" ? "ยกเลิก" : "Cancel"}</Button>
            <Button disabled={!canStart} onClick={() => { setShowConsent(false); setPhase("recording"); setSeconds(0); }} className="bg-gradient-primary">
              <Play className="h-4 w-4 mr-1.5" /> {lang === "th" ? "ยินยอมและเริ่มบันทึก" : "Consent & Start"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SessionsList() {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="animate-fade-up space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{t("f4.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("f4.desc")}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {sessions.map(s => (
          <Card key={s.id} className="p-5 glass hover:shadow-elegant transition-all">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className="font-mono text-xs">{s.time}</Badge>
              <div className="flex gap-1">{s.langs.map(l => <Badge key={l} variant="secondary" className="text-xs font-mono">{l}</Badge>)}</div>
            </div>
            <h3 className="font-semibold leading-tight">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.speaker} · {s.room}</p>
            <Button size="sm" variant="outline" className="mt-4 w-full" onClick={() => setOpen(s.id)}>
              <FileText className="h-3.5 w-3.5 mr-1.5" /> {lang === "th" ? "ดูสรุป" : "View Summary"}
            </Button>
          </Card>
        ))}
      </div>
      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {open && (() => { const s = sessions.find(x => x.id === open)!; return (
            <>
              <DialogHeader>
                <DialogTitle>{s.title}</DialogTitle>
                <DialogDescription>{s.speaker} · {s.time} · {s.room}</DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{lang === "th" ? "สรุปหลัก" : "Main Summary"}</h4>
                  <ul className="space-y-1.5 text-sm list-disc pl-5">
                    <li>Foundation models are commoditizing fast — value is in workflow integration</li>
                    <li>Thai-language fine-tuning still requires curated datasets</li>
                    <li>RAG outperforms fine-tuning for most enterprise use cases</li>
                    <li>Latency is the next frontier; sub-second response is becoming standard</li>
                    <li>Governance and PDPA compliance are no longer optional</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Q&A</h4>
                  <Accordion type="single" collapsible>
                    {[{q:"How do you handle hallucination?",a:"Strong retrieval + citation + temperature 0."},{q:"On-prem cost?",a:"Starts ~฿2M for inference rig + licensing."},{q:"Best Thai LLM?",a:"OpenThaiGPT and Typhoon are leading options."}].map((qa,i) => (
                      <AccordionItem key={i} value={`q${i}`}><AccordionTrigger className="text-sm">{qa.q}</AccordionTrigger><AccordionContent className="text-sm">{qa.a}</AccordionContent></AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex flex-wrap gap-1.5">
                    {["#GenAI","#RAG","#Thai","#Enterprise"].map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                  <Badge className="bg-success text-white">😊 Positive</Badge>
                </div>
              </div>
            </>
          ); })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
