import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, MessageCircle, Mic, BarChart3, ShieldCheck, FileText, Settings, Plug, Search, Plus, Check, X } from "lucide-react";
import { exhibitors, faqs, memories } from "@/lib/mock";
import { useI18n } from "@/lib/i18n";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";

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

const trendData = Array.from({length: 7}).map((_, i) => ({ day: `D${i+1}`, matches: 80+Math.round(Math.random()*60), articles: 5+Math.round(Math.random()*15), precision: 78+Math.round(Math.random()*15) }));
function Analytics() {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid sm:grid-cols-4 gap-4">
        {[{l:"Total Matches",v:"1,284"},{l:"Memory Articles",v:"89"},{l:"Top FAQ Hits",v:"3,420"},{l:"Match Precision",v:"87%"}].map(s => (
          <Card key={s.l} className="p-4 glass">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
            <div className="font-mono text-2xl font-bold mt-1 gradient-text">{s.v}</div>
          </Card>
        ))}
      </div>
      <Card className="p-5 glass">
        <h3 className="font-semibold mb-4">Matches & Articles (last 7 days)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Line type="monotone" dataKey="matches" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="articles" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5 glass">
          <h3 className="font-semibold mb-4">Top FAQ Questions</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[{q:"AI Session",c:124},{q:"Food Court",c:98},{q:"Wifi",c:76},{q:"Parking",c:62},{q:"Speaker",c:54}]}>
              <XAxis dataKey="q" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="c" fill="hsl(var(--accent))" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5 glass">
          <h3 className="font-semibold mb-4">Pain Trending Heatmap</h3>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({length: 49}).map((_, i) => {
              const v = Math.random();
              return <div key={i} className="aspect-square rounded" style={{background: `hsl(var(--primary) / ${0.1 + v * 0.8})`}} title={`${Math.round(v*100)}`} />;
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-3 font-mono"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        </Card>
      </div>
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
