import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageCircle, X, Sparkles, Send, Target, HelpCircle, Mic, Minimize2, Code2, Copy, Check } from "lucide-react";
import { faqs, sampleMatches } from "@/lib/mock";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Msg = { role: "bot" | "user"; text: string; ts: number };

export default function Widget() {
  const [params] = useSearchParams();
  const eventId = params.get("event") || "abc123";
  const primary = params.get("primary"); // hex e.g. "4F46E5"
  const accent = params.get("accent");
  const position = (params.get("position") || "br") as "br" | "bl";
  const initialOpen = params.get("open") === "1";

  // Apply theme overrides scoped to widget root
  const themeStyle = useMemo(() => {
    const s: Record<string, string> = {};
    if (primary) s["--widget-primary"] = hexToHsl(primary);
    if (accent) s["--widget-accent"] = hexToHsl(accent);
    return s as React.CSSProperties;
  }, [primary, accent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <DemoHost />
      <FloatingWidget eventId={eventId} themeStyle={themeStyle} position={position} initialOpen={initialOpen} />
    </div>
  );
}

function hexToHsl(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hh = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hh = (g - b) / d + (g < b ? 6 : 0); break;
      case g: hh = (b - r) / d + 2; break;
      case b: hh = (r - g) / d + 4; break;
    }
    hh /= 6;
  }
  return `${Math.round(hh * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function DemoHost() {
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="https://eventiq.app/widget.js" data-event-id="abc123" data-primary="#4F46E5" data-accent="#F59E0B" data-position="bottom-right" data-locale="en"></script>`;
  const copy = () => { navigator.clipboard.writeText(snippet); setCopied(true); toast.success("Snippet copied"); setTimeout(() => setCopied(false), 1800); };
  return (
    <div className="container py-12 max-w-4xl">
      <Badge variant="outline" className="mb-3 gap-1.5"><Sparkles className="h-3 w-3 text-accent" />EventIQ Widget · v1.0</Badge>
      <h1 className="text-4xl font-bold mb-3">Embeddable Chat Widget</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Drop a single line of script onto any exhibitor microsite, partner landing page, or event portal. Your visitors get instant access to booth matching and event FAQ — powered by Botnoi AI.
      </p>

      <Card className="glass p-0 overflow-hidden mb-8">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b bg-secondary/40">
          <div className="flex items-center gap-2 text-sm font-medium"><Code2 className="h-4 w-4 text-primary" />Embed snippet</div>
          <Button size="sm" variant="ghost" onClick={copy} className="h-8">
            {copied ? <Check className="h-3.5 w-3.5 mr-1 text-success" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed bg-card/50">
<span className="text-muted-foreground">{`<!-- Paste before </body> -->`}</span>
{`\n`}<span className="text-foreground">{`<script `}</span>
<span className="text-primary">{`src=`}</span><span className="text-accent">{`"https://eventiq.app/widget.js"`}</span>{`\n        `}
<span className="text-primary">{`data-event-id=`}</span><span className="text-accent">{`"abc123"`}</span>{`\n        `}
<span className="text-primary">{`data-primary=`}</span><span className="text-accent">{`"#4F46E5"`}</span>{`\n        `}
<span className="text-primary">{`data-accent=`}</span><span className="text-accent">{`"#F59E0B"`}</span>{`\n        `}
<span className="text-primary">{`data-position=`}</span><span className="text-accent">{`"bottom-right"`}</span>{`\n        `}
<span className="text-primary">{`data-locale=`}</span><span className="text-accent">{`"en"`}</span>
<span className="text-foreground">{`></script>`}</span>
        </pre>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { t: "1-line install", d: "Async, non-blocking. Zero impact on page load." },
          { t: "Brand-aware", d: "Customize colors, position, and locale via data-* attributes." },
          { t: "Full feature parity", d: "Booth match and event FAQ — same as the visitor portal." },
        ].map(f => (
          <Card key={f.t} className="p-4 glass">
            <div className="font-semibold text-sm mb-1">{f.t}</div>
            <div className="text-xs text-muted-foreground">{f.d}</div>
          </Card>
        ))}
      </div>

      <Card className="glass p-5">
        <h3 className="font-semibold mb-3">Live preview ↘</h3>
        <p className="text-sm text-muted-foreground mb-4">The floating bubble in the corner is exactly what visitors see. Click to open.</p>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border bg-secondary/30"><code className="text-primary">data-event-id</code> · {"abc123"}</div>
          <div className="p-3 rounded-lg border bg-secondary/30"><code className="text-primary">data-primary</code> · #4F46E5</div>
          <div className="p-3 rounded-lg border bg-secondary/30"><code className="text-primary">data-accent</code> · #F59E0B</div>
          <div className="p-3 rounded-lg border bg-secondary/30"><code className="text-primary">data-position</code> · bottom-right</div>
        </div>
      </Card>
    </div>
  );
}

function FloatingWidget({ eventId, themeStyle, position, initialOpen }:
  { eventId: string; themeStyle: React.CSSProperties; position: "br" | "bl"; initialOpen: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [tab, setTab] = useState("match");
  const posClass = position === "bl" ? "left-5" : "right-5";

  return (
    <TooltipProvider delayDuration={200}>
      <div style={themeStyle} className={cn("fixed bottom-5 z-50", posClass)}>
        {open ? (
          <Card className="w-[380px] max-w-[calc(100vw-2.5rem)] h-[600px] max-h-[calc(100vh-3rem)] shadow-glow border-primary/20 flex flex-col overflow-hidden animate-fade-up">
            {/* Botnoi-style header */}
            <div className="bg-gradient-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl">🤖</div>
                <div>
                  <div className="font-semibold text-sm flex items-center gap-1.5">EventIQ Assistant <Sparkles className="h-3 w-3 text-accent-foreground/90" /></div>
                  <div className="text-[11px] opacity-90 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    Online · Powered by Botnoi
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-white/20" onClick={() => setOpen(false)}>
                  <Minimize2 className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-white/20" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick action tabs */}
            <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col min-h-0">
              <TabsList className="grid grid-cols-2 m-2 h-auto p-1 shrink-0">
                {[
                  { v: "match", icon: Target, label: "Match" },
                  { v: "faq", icon: HelpCircle, label: "FAQ" },
                ].map(t => (
                  <TabsTrigger key={t.v} value={t.v} className="flex-col h-auto py-1.5 gap-0.5 text-[10px] data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                    <t.icon className="h-3.5 w-3.5" />
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="match" className="flex-1 m-0 min-h-0"><MatchPanel /></TabsContent>
              <TabsContent value="faq" className="flex-1 m-0 min-h-0"><FAQPanel /></TabsContent>
            </Tabs>

            <div className="px-3 py-2 border-t bg-secondary/40 text-[10px] text-muted-foreground flex items-center justify-between font-mono">
              <span>event:{eventId}</span>
              <span className="flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" />eventiq.app</span>
            </div>
          </Card>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setOpen(true)}
                className="group relative h-14 w-14 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform animate-fade-up"
                aria-label="Open EventIQ assistant"
              >
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-60" />
                <MessageCircle className="h-6 w-6 relative" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[9px] font-bold text-accent-foreground flex items-center justify-center shadow">AI</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">Ask EventIQ — powered by Botnoi</TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}

/* ---------------- Panels (compact) ---------------- */

function ChatShell({ children, input, onSend, placeholder }: { children: React.ReactNode; input?: { value: string; onChange: (v: string) => void }; onSend?: () => void; placeholder?: string }) {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-3"><div className="py-2 space-y-2.5">{children}</div></ScrollArea>
      {input && (
        <div className="p-2 border-t flex gap-1.5 shrink-0">
          <Input value={input.value} onChange={e => input.onChange(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSend?.()}
            placeholder={placeholder} className="h-9 text-sm" />
          <Button size="icon" className="h-9 w-9 bg-gradient-primary shrink-0" onClick={onSend}><Send className="h-4 w-4" /></Button>
          <Button size="icon" variant="outline" className="h-9 w-9 shrink-0"><Mic className="h-4 w-4" /></Button>
        </div>
      )}
    </div>
  );
}

function Bubble({ role, children }: { role: "bot" | "user"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
        role === "bot" ? "bg-secondary text-foreground rounded-bl-sm" : "bg-gradient-primary text-primary-foreground rounded-br-sm")}>
        {children}
      </div>
    </div>
  );
}

function MatchPanel() {
  const [pain, setPain] = useState("");
  const [results, setResults] = useState<ReturnType<typeof sampleMatches> | null>(null);
  const send = () => { if (!pain.trim()) return; setResults(sampleMatches(pain)); };
  return (
    <ChatShell input={{ value: pain, onChange: setPain }} onSend={send} placeholder="Describe your business pain…">
      <Bubble role="bot">👋 Hi! Tell me what challenge you're facing — I'll match you to the best 3 booths.</Bubble>
      {!results && (
        <div className="flex flex-wrap gap-1.5 px-1">
          {["Reduce call center cost", "RAG on internal docs", "Smart factory roadmap"].map(s => (
            <button key={s} onClick={() => { setPain(s); setResults(sampleMatches(s)); }}
              className="text-[11px] px-2.5 py-1 rounded-full border hover:bg-secondary transition-colors">{s}</button>
          ))}
        </div>
      )}
      {results && <Bubble role="user">{pain}</Bubble>}
      {results?.slice(0, 3).map(m => (
        <div key={m.exhibitor.id} className="bg-card border rounded-xl p-2.5 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">{m.exhibitor.logo}</span>
              <div>
                <div className="text-xs font-semibold leading-tight">{m.exhibitor.name}</div>
                <div className="text-[10px] text-muted-foreground font-mono">{m.exhibitor.hall} · {m.exhibitor.booth}</div>
              </div>
            </div>
            <Badge className="bg-gradient-primary text-[10px] h-5">{m.score}%</Badge>
          </div>
          <p className="text-[11px] text-muted-foreground leading-snug">{m.reason.en}</p>
          <div className="flex gap-1 mt-1.5 flex-wrap">{m.exhibitor.tags.slice(0, 2).map(t => <Badge key={t} variant="secondary" className="text-[9px] h-4 px-1.5">{t}</Badge>)}</div>
        </div>
      ))}
    </ChatShell>
  );
}

function FAQPanel() {
  const [q, setQ] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "Ask me anything about the event — venue, schedule, wifi…", ts: Date.now() }]);
  const send = () => {
    if (!q.trim()) return;
    const found = faqs.find(f => f.q.en.toLowerCase().includes(q.toLowerCase().split(" ")[0]) || q.toLowerCase().includes(f.q.en.toLowerCase().split(" ")[0]));
    setMsgs(m => [...m, { role: "user", text: q, ts: Date.now() }, { role: "bot", text: found?.a.en ?? "I couldn't find an exact answer. Try asking about the venue, schedule, or food.", ts: Date.now() + 1 }]);
    setQ("");
  };
  return (
    <ChatShell input={{ value: q, onChange: setQ }} onSend={send} placeholder="Ask a question…">
      {msgs.map((m, i) => <Bubble key={i} role={m.role}>{m.text}</Bubble>)}
      <div className="flex flex-wrap gap-1.5 px-1 pt-1">
        {faqs.slice(0, 3).map((f, i) => (
          <button key={i} onClick={() => { setQ(f.q.en); }}
            className="text-[11px] px-2.5 py-1 rounded-full border hover:bg-secondary transition-colors text-left">{f.q.en}</button>
        ))}
      </div>
    </ChatShell>
  );
}

