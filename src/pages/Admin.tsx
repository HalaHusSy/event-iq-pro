import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, MessageCircle, Mic, BarChart3, ShieldCheck, FileText, Settings, Plug, Search, Plus, Check, X, Calendar as CalendarIcon, Download, FileDown, Trophy, Activity, Zap, TrendingUp, Users } from "lucide-react";
import { exhibitors, faqs, memories } from "@/lib/mock";
import { useI18n } from "@/lib/i18n";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, Area, AreaChart } from "recharts";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const navItems = [
  { id: "exhibitors", label: "Exhibitors", icon: Building2 },
  { id: "faq", label: "FAQ KB", icon: MessageCircle },
  { id: "memory", label: "Memory Moderation", icon: Mic },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "consent", label: "Consent Logs", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "integration", label: "Botnoi Integration", icon: Plug },
];

export default function Admin() {
  const [view, setView] = useState("exhibitors");
  return (
    <AppShell>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">Event organizer control center</p>
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <Card className="p-2 glass h-fit lg:sticky lg:top-20">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto">
              {navItems.map(n => (
                <button key={n.id} onClick={() => setView(n.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                    view === n.id ? "bg-gradient-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}>
                  <n.icon className="h-4 w-4" /> {n.label}
                </button>
              ))}
            </nav>
          </Card>
          <div className="min-w-0">
            {view === "exhibitors" && <ExhibitorsView />}
            {view === "faq" && <FAQView />}
            {view === "memory" && <MemoryModeration />}
            {view === "analytics" && <Analytics />}
            {view === "consent" && <ConsentLogs />}
            {view === "settings" && <SettingsView />}
            {view === "integration" && <IntegrationView />}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ExhibitorsView() {
  const [q, setQ] = useState("");
  const filtered = exhibitors.filter(e => e.name.toLowerCase().includes(q.toLowerCase()) || e.tags.some(t => t.toLowerCase().includes(q.toLowerCase())));
  return (
    <Card className="glass animate-fade-up">
      <div className="p-5 border-b flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-semibold text-lg">Exhibitors ({filtered.length})</h2>
        <div className="flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="pl-9" />
          </div>
          <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" />Add</Button>
        </div>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Booth</TableHead><TableHead>Tags</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {filtered.map(e => (
            <TableRow key={e.id}>
              <TableCell><div className="flex items-center gap-2"><span className="text-2xl">{e.logo}</span><span className="font-medium">{e.name}</span></div></TableCell>
              <TableCell className="font-mono text-xs">{e.hall} / {e.booth}</TableCell>
              <TableCell><div className="flex gap-1 flex-wrap">{e.tags.slice(0,2).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}</div></TableCell>
              <TableCell className="text-right"><Button size="sm" variant="ghost">Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function FAQView() {
  return (
    <Card className="glass p-5 animate-fade-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">FAQ Knowledge Base</h2>
        <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" />Add FAQ</Button>
      </div>
      <div className="space-y-2">
        {[...faqs, ...faqs, ...faqs].slice(0,15).map((f, i) => (
          <div key={i} className="p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-sm">{f.q.en}</p>
                <p className="text-sm text-muted-foreground mt-1">{f.a.en}</p>
                <Badge variant="secondary" className="mt-2 text-xs">{["schedule","venue","speaker","food","wifi"][i%5]}</Badge>
              </div>
              <Button size="sm" variant="ghost">Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MemoryModeration() {
  return (
    <Card className="glass p-5 animate-fade-up">
      <h2 className="font-semibold text-lg mb-4">Pending Public Memories</h2>
      <div className="space-y-3">
        {memories.filter(m => m.status === "pending" || m.status === "public").map(m => (
          <div key={m.id} className="p-4 rounded-lg border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{m.title}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{m.booth} · {m.date}</p>
              </div>
              <Badge variant={m.status === "public" ? "default" : "outline"}>{m.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{m.excerpt}</p>
            {m.status === "pending" && (
              <div className="flex gap-2">
                <Button size="sm" className="bg-success" onClick={() => toast.success("Approved")}><Check className="h-3.5 w-3.5 mr-1" />Approve</Button>
                <Button size="sm" variant="outline" onClick={() => toast.error("Rejected")}><X className="h-3.5 w-3.5 mr-1" />Reject</Button>
                <Input placeholder="Reason (optional)" className="flex-1 h-9" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

const RANGE_DAYS: Record<string, number> = { today: 1, "7d": 7, "30d": 30 };
const seedRand = (n: number) => Math.abs((Math.sin(n * 9301 + 49297) * 233280) % 1);
const buildTrend = (days: number) => Array.from({ length: days }).map((_, i) => ({
  day: days <= 1 ? `${i}:00` : `D${i + 1}`,
  matches: 60 + Math.round(seedRand(i + days) * 80),
  articles: 4 + Math.round(seedRand(i + days * 2) * 18),
  precision: 75 + Math.round(seedRand(i + days * 3) * 20),
}));
const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(217 91% 60%)", "hsl(280 70% 60%)", "hsl(340 75% 55%)"];
const painCategoryData = [
  { name: "Manufacturing", value: 32 },
  { name: "Retail / E-commerce", value: 24 },
  { name: "Healthcare", value: 18 },
  { name: "Finance", value: 14 },
  { name: "Logistics", value: 8 },
  { name: "Other", value: 4 },
];

function downloadCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${filename}`);
}
function downloadPDF(title: string) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<html><head><title>${title}</title></head><body style="font-family:Inter,sans-serif;padding:40px"><h1>${title}</h1><p>Generated ${new Date().toLocaleString()}</p><p style="color:#666">Chart snapshot — print to PDF from browser dialog.</p></body></html>`);
  w.print();
  toast.success(`PDF prepared: ${title}`);
}

function ChartActions({ title, rows }: { title: string; rows: Record<string, any>[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="h-8"><Download className="h-3.5 w-3.5 mr-1" />Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => downloadCSV(`${title.replace(/\s+/g, "-").toLowerCase()}.csv`, rows)}>
          <FileText className="h-4 w-4 mr-2" />CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadPDF(title)}>
          <FileDown className="h-4 w-4 mr-2" />PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Analytics() {
  const [range, setRange] = useState<"today" | "7d" | "30d" | "custom">("7d");
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const days = range === "custom" && customRange?.from && customRange?.to
    ? Math.max(1, Math.ceil((+customRange.to - +customRange.from) / 86400000) + 1)
    : RANGE_DAYS[range] ?? 7;
  const trendData = useMemo(() => buildTrend(days), [days]);
  const precisionData = useMemo(() => trendData.map(d => ({ day: d.day, precision: d.precision })), [trendData]);

  const [active, setActive] = useState(42);
  useEffect(() => {
    const t = setInterval(() => setActive(a => Math.max(8, Math.min(120, a + Math.round((Math.random() - 0.45) * 6)))), 2000);
    return () => clearInterval(t);
  }, []);

  const leaderboard = useMemo(() => exhibitors.slice(0, 8).map((e, i) => ({
    ...e,
    matches: 240 - i * 18 - Math.round(seedRand(i) * 12),
    conv: (28 - i * 1.6).toFixed(1),
    rating: (4.9 - i * 0.08).toFixed(2),
  })), []);

  const apiHealth = [
    { name: "/tools/match_booth", p50: 180, p95: 420, status: "healthy", calls: "12.4k" },
    { name: "/tools/answer_faq", p50: 95, p95: 240, status: "healthy", calls: "28.1k" },
    { name: "/tools/start_recording", p50: 60, p95: 140, status: "healthy", calls: "1.2k" },
    { name: "/tools/generate_article", p50: 1850, p95: 3200, status: "degraded", calls: "0.9k" },
    { name: "/tools/get_schedule", p50: 45, p95: 110, status: "healthy", calls: "9.7k" },
    { name: "/tools/save_memory", p50: 220, p95: 540, status: "healthy", calls: "0.8k" },
  ];
  const latencyMax = Math.max(...apiHealth.map(a => a.p95));

  return (
    <div className="space-y-5 animate-fade-up">
      <Card className="p-4 glass flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          {([["today","Today"],["7d","7 days"],["30d","30 days"]] as const).map(([k, label]) => (
            <Button key={k} size="sm" variant={range === k ? "default" : "outline"}
              className={cn("h-8", range === k && "bg-gradient-primary")}
              onClick={() => setRange(k)}>{label}</Button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant={range === "custom" ? "default" : "outline"}
                className={cn("h-8", range === "custom" && "bg-gradient-primary")}>
                {range === "custom" && customRange?.from
                  ? `${customRange.from.toLocaleDateString()} → ${customRange.to?.toLocaleDateString() ?? "…"}`
                  : "Custom"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" selected={customRange} onSelect={(r) => { setCustomRange(r); setRange("custom"); }} numberOfMonths={2} className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border bg-success/10 border-success/30">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span className="text-xs font-medium"><Users className="inline h-3.5 w-3.5 mr-1" />{active} active visitors using bot</span>
        </div>
      </Card>

      <div className="grid sm:grid-cols-4 gap-4">
        {[{l:"Total Matches",v:"1,284"},{l:"Memory Articles",v:"89"},{l:"Top FAQ Hits",v:"3,420"},{l:"Match Precision",v:"87%"}].map(s => (
          <Card key={s.l} className="p-4 glass">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
            <div className="font-mono text-2xl font-bold mt-1 gradient-text">{s.v}</div>
          </Card>
        ))}
      </div>

      <Card className="p-5 glass">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Matches & Articles ({range === "today" ? "today" : `${days} days`})</h3>
          <ChartActions title="Matches and Articles" rows={trendData} />
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Line type="monotone" dataKey="matches" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="articles" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5 glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" />Match Quality (Precision)</h3>
            <ChartActions title="Match Precision" rows={precisionData} />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={precisionData}>
              <defs>
                <linearGradient id="precGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis domain={[60, 100]} stroke="hsl(var(--muted-foreground))" fontSize={11} unit="%" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="precision" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#precGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Pain Categories by Industry</h3>
            <ChartActions title="Pain Categories" rows={painCategoryData} />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={painCategoryData} dataKey="value" nameKey="name" cx="40%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2}>
                {painCategoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="glass">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2"><Trophy className="h-4 w-4 text-accent" />Top Performing Exhibitors</h3>
          <ChartActions title="Top Exhibitors" rows={leaderboard.map(l => ({ name: l.name, booth: `${l.hall}/${l.booth}`, matches: l.matches, conv: l.conv, rating: l.rating }))} />
        </div>
        <Table>
          <TableHeader><TableRow><TableHead className="w-12">#</TableHead><TableHead>Company</TableHead><TableHead>Booth</TableHead><TableHead className="text-right">Matches</TableHead><TableHead className="text-right">Conv. %</TableHead><TableHead className="text-right">Rating</TableHead></TableRow></TableHeader>
          <TableBody>
            {leaderboard.map((l, i) => (
              <TableRow key={l.id}>
                <TableCell><Badge variant={i < 3 ? "default" : "secondary"} className={cn("font-mono", i === 0 && "bg-gradient-primary")}>{i + 1}</Badge></TableCell>
                <TableCell><div className="flex items-center gap-2"><span className="text-xl">{l.logo}</span><span className="font-medium text-sm">{l.name}</span></div></TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{l.hall} / {l.booth}</TableCell>
                <TableCell className="text-right font-mono">{l.matches}</TableCell>
                <TableCell className="text-right font-mono text-success">{l.conv}%</TableCell>
                <TableCell className="text-right font-mono">⭐ {l.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-5 glass">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-accent" />Botnoi Tool API Health</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time latency per /tools endpoint · auto-refresh 5s</p>
          </div>
          <Badge variant="outline" className="gap-1.5"><Activity className="h-3 w-3 text-success animate-pulse" />Live</Badge>
        </div>
        <div className="space-y-2.5">
          {apiHealth.map(a => (
            <div key={a.name} className="p-3 rounded-lg border space-y-2">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", a.status === "healthy" ? "bg-success animate-pulse" : "bg-accent")} />
                  <code className="font-mono text-xs">{a.name}</code>
                  <Badge variant="secondary" className="text-[10px] h-5">{a.calls} calls</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-muted-foreground">p50 <span className="text-foreground">{a.p50}ms</span></span>
                  <span className="text-muted-foreground">p95 <span className={cn(a.p95 > 1000 ? "text-accent" : "text-foreground")}>{a.p95}ms</span></span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className={cn("h-full rounded-full", a.p95 > 1000 ? "bg-accent" : "bg-gradient-primary")} style={{ width: `${(a.p95 / latencyMax) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ConsentLogs() {
  const logs = Array.from({length: 8}).map((_, i) => ({
    id: `LOG-${1000+i}`, user: ["Apinya S.","James K.","Wirot P.","Nina T."][i%4],
    action: ["RECORD_CONSENT","PUBLIC_OPT_IN","PDPA_ACCEPT","DELETE_REQUEST"][i%4],
    time: `2026-05-0${1+(i%6)} 14:${20+i}:00`, ip: `203.0.113.${10+i}`,
  }));
  return (
    <Card className="glass animate-fade-up">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Consent Audit Log</h2>
        <Input placeholder="Search by user / action..." className="max-w-sm" />
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Timestamp</TableHead><TableHead>IP</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {logs.map(l => (
            <TableRow key={l.id}>
              <TableCell className="font-mono text-xs">{l.id}</TableCell>
              <TableCell className="text-sm">{l.user}</TableCell>
              <TableCell><Badge variant="secondary" className="font-mono text-xs">{l.action}</Badge></TableCell>
              <TableCell className="font-mono text-xs">{l.time}</TableCell>
              <TableCell className="font-mono text-xs">{l.ip}</TableCell>
              <TableCell className="text-right"><Button size="sm" variant="ghost" className="text-destructive">Right to Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function SettingsView() {
  const [w, setW] = useState({ cosine: 50, keyword: 25, llm: 25 });
  return (
    <Card className="p-6 glass space-y-6 animate-fade-up">
      <div>
        <h2 className="font-semibold text-lg">Matching Algorithm Weights</h2>
        <p className="text-sm text-muted-foreground mt-1">Tune how AI scores booth matches.</p>
      </div>
      {Object.entries(w).map(([k, v]) => (
        <div key={k}>
          <div className="flex justify-between mb-2"><label className="text-sm font-medium capitalize">{k}</label><span className="font-mono text-sm">{v}%</span></div>
          <Slider value={[v]} onValueChange={([nv]) => setW(prev => ({...prev, [k]: nv}))} max={100} step={1} />
        </div>
      ))}
      <div className="pt-4 border-t space-y-4">
        <div className="flex items-center justify-between">
          <div><p className="font-medium text-sm">Auto-publish memory articles</p><p className="text-xs text-muted-foreground">Skip moderation queue</p></div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div><p className="font-medium text-sm">Voice transcription (Thai)</p><p className="text-xs text-muted-foreground">Botnoi STT engine</p></div>
          <Switch defaultChecked />
        </div>
      </div>
    </Card>
  );
}

function IntegrationView() {
  const endpoints = [
    { name: "Botnoi Voice STT", url: "/api/v2/stt", status: "healthy", latency: "120ms" },
    { name: "Botnoi LLM Agent", url: "/api/v2/agent/chat", status: "healthy", latency: "850ms" },
    { name: "Botnoi TTS", url: "/api/v2/tts", status: "healthy", latency: "200ms" },
    { name: "Match Engine (RAG)", url: "/internal/match", status: "healthy", latency: "320ms" },
    { name: "Memory Pipeline", url: "/internal/memory", status: "degraded", latency: "1.8s" },
  ];
  return (
    <Card className="glass p-5 animate-fade-up">
      <h2 className="font-semibold text-lg mb-1">Botnoi AI Integration</h2>
      <p className="text-sm text-muted-foreground mb-5">Real-time tool API endpoint health</p>
      <div className="space-y-2">
        {endpoints.map(e => (
          <div key={e.name} className="p-4 rounded-lg border flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{e.name}</p>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">{e.url}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">{e.latency}</span>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${e.status === "healthy" ? "bg-success animate-pulse" : "bg-accent"}`} />
                <span className="text-xs font-mono uppercase">{e.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
