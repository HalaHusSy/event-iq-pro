import { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, BookOpen, KeyRound, Copy, Check, ExternalLink, Heart, Building2, Search, MessageCircleQuestion, Target, RefreshCw, PenLine, Sparkles } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api/eventiq-client";

type Method = "GET" | "POST";

interface Endpoint {
  emoji: typeof Target;
  name: string;
  description: string;
  method: Method;
  path: string;
  headers: Record<string, string>;
  body?: string; // JSON string for POST
  response: string; // JSON string
  notes?: string;
  audience: "bot" | "web" | "admin";
}

const ENDPOINTS: Endpoint[] = [
  {
    emoji: Heart,
    name: "Health Check",
    description: "ตรวจสอบสถานะ service + รายการ endpoints ที่เปิดให้ใช้",
    method: "GET",
    path: "/api/health",
    headers: {},
    response: JSON.stringify({
      ok: true,
      service: "eventiq-api",
      version: "0.1.0-pitch",
      timestamp: "2026-05-13T10:00:00.000Z",
      endpoints: ["GET  /api/health", "GET  /api/exhibitors", "..."],
    }, null, 2),
    audience: "web",
  },
  {
    emoji: Building2,
    name: "List Exhibitors",
    description: "ดึงรายการบูธทั้งหมด ใช้ query param กรองตาม industry / solution / hall",
    method: "GET",
    path: "/api/exhibitors?industry=Banking&solution=Voice+AI&hall=Hall+A",
    headers: { "Content-Type": "application/json" },
    response: JSON.stringify({
      count: 2,
      items: [
        {
          id: "ex01",
          name: "Botnoi Group",
          logo_url: "🤖",
          booth_no: "A-12",
          hall: "Hall A",
          industry: "AI/SaaS",
          tagline_th: "ผู้นำ Voice AI และ Chatbot ภาษาไทยอันดับ 1",
          solution_categories: ["Conversational AI", "Voice AI"],
          notable_clients: ["AIS", "SCG", "Krungsri"],
        },
      ],
    }, null, 2),
    notes: "Embedding fields ถูกตัดออกเพื่อลด payload",
    audience: "web",
  },
  {
    emoji: Search,
    name: "Get Exhibitor Detail",
    description: "ดึงข้อมูลละเอียดของบูธ 1 ตัว — use cases, services, pricing, integrations",
    method: "GET",
    path: "/api/exhibitors/:id",
    headers: { "Content-Type": "application/json" },
    response: JSON.stringify({
      id: "ex01",
      name: "Botnoi Group",
      tagline_th: "ผู้นำ Voice AI และ Chatbot ภาษาไทยอันดับ 1",
      long_pitch_en: "Botnoi Group is Thailand's leading Voice AI...",
      use_cases: [
        {
          title: "Bank IVR Replacement",
          industry: "Banking",
          problem_th: "ลูกค้ารอสายนานเฉลี่ย 8 นาที",
          outcome_metric: "ลด AHT 35% ใน 4 เดือน",
          customer_anonymized: "Top-3 Thai retail bank",
        },
      ],
      pricing_tier: "enterprise",
      pricing_starts_at_thb: 50000,
      notable_clients: ["AIS", "SCG", "Krungsri"],
    }, null, 2),
    audience: "web",
  },
  {
    emoji: MessageCircleQuestion,
    name: "List FAQ",
    description: "ดึง FAQ ทั้งหมด — สำหรับ knowledge base ของบอท",
    method: "GET",
    path: "/api/faq",
    headers: { "Content-Type": "application/json" },
    response: JSON.stringify({
      count: 6,
      items: [
        {
          id: "faq01",
          question_th: "งานจัดวันที่เท่าไหร่?",
          answer_th: "งาน Tech Summit 2026 จัดวันที่ 15-17 มิถุนายน 2026",
          category: "schedule",
        },
      ],
    }, null, 2),
    audience: "web",
  },
  {
    emoji: Target,
    name: "Booth Matching",
    description: "🎯 **สำหรับบอท Matching** — รับ pain point ของ visitor → คืน 3-5 บูธที่ตอบโจทย์ พร้อมเหตุผล",
    method: "POST",
    path: "/api/match",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "อยากลดต้นทุน call center ด้วย AI",
      user_id: "line:U1234abcd",
      lang: "th",
    }, null, 2),
    response: JSON.stringify({
      reply_text: "ลองดู 2 บูธที่เหมาะกับโจทย์ค่ะ",
      reply_text_th: "ลองดู 2 บูธที่เหมาะกับโจทย์ค่ะ",
      reply_text_en: "Here are 2 booths that look like a fit:",
      cards: [
        {
          rank: 1,
          exhibitor_id: "ex01",
          exhibitor_name: "Botnoi Group",
          booth_no: "A-12",
          hall: "Hall A",
          logo: "🤖",
          match_score: 88,
          why_match_th: "ตรงกับคำสำคัญ call, center, ai — ผู้นำ Voice AI ภาษาไทย",
          why_match_en: "Matches keywords call, center, ai — Thai Voice AI leader",
          top_use_case: "Bank IVR Replacement",
          quoted_outcome: "ลด AHT 35% ใน 4 เดือน ประหยัด 12 ลบ./ปี",
          cta_url: "/visitor?booth=ex01",
        },
      ],
      follow_up_question: "อยากเปรียบเทียบ 2 บูธไหนคะ? หรือเล่า pain เพิ่มก็ได้ค่ะ",
      meta: { matched_count: 2, used_mock_llm: true, latency_ms: 45 },
    }, null, 2),
    notes: "ใน Botnoi Console map `reply_text` → text bubble, `cards[]` → carousel, `follow_up_question` → quick reply",
    audience: "bot",
  },
  {
    emoji: MessageCircleQuestion,
    name: "FAQ Search",
    description: "💬 **สำหรับบอท FAQ** — รับคำถามทั่วไป → คืนคำตอบจาก knowledge base",
    method: "POST",
    path: "/api/faq",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: "ที่จอดรถมีไหม?",
      lang: "th",
    }, null, 2),
    response: JSON.stringify({
      answer: "มีที่จอดรถสำหรับ 3,500 คัน ฟรีตลอดงาน เข้าทางประตู 1 และ 3",
      answer_th: "มีที่จอดรถสำหรับ 3,500 คัน ฟรีตลอดงาน เข้าทางประตู 1 และ 3",
      answer_en: "3,500 free parking spots available throughout the event via Gates 1 and 3.",
      source_faq_ids: ["faq02"],
      related_questions: [
        { id: "faq04", question_th: "มี wifi ฟรีไหม?", question_en: "Is free wifi available?" },
      ],
    }, null, 2),
    notes: "Map `answer` → text reply, `related_questions[]` → quick reply chips",
    audience: "bot",
  },
  {
    emoji: RefreshCw,
    name: "Sheet Sync",
    description: "Trigger pull จาก Google Sheet → regenerate JSON → redeploy. ใช้ตอน DS อัพเดท Sheet",
    method: "POST",
    path: "/api/admin/sheet-sync",
    headers: { "Content-Type": "application/json", "X-Eventiq-Token": "<ADMIN_TOKEN>" },
    body: "",
    response: JSON.stringify({
      ok: true,
      synced_at: "2026-05-13T10:00:00.000Z",
      counts: { exhibitors: 30, personas: 8, pain_queries: 30 },
      validation_errors: [],
    }, null, 2),
    notes: "🔒 ต้องการ header `X-Eventiq-Token` ตรงกับ env var `ADMIN_TOKEN`",
    audience: "admin",
  },
  {
    emoji: PenLine,
    name: "Write Exhibitor",
    description: "Proxy สำหรับ admin form — forward ไป Apps Script เพื่อเขียนลง Sheet",
    method: "POST",
    path: "/api/admin/exhibitor",
    headers: { "Content-Type": "application/json", "X-Eventiq-Token": "<ADMIN_TOKEN>" },
    body: JSON.stringify({
      id: "ex05",
      name: "FinTechX",
      booth_no: "C-02",
      hall: "Hall C",
      industry: "Finance",
      tagline_th: "Payment infrastructure for digital businesses",
    }, null, 2),
    response: JSON.stringify({
      ok: true,
      stub: true,
      note: "Set APPS_SCRIPT_WEBAPP_URL env var to enable Sheet write",
    }, null, 2),
    notes: "🔒 ต้องการ header `X-Eventiq-Token`",
    audience: "admin",
  },
];

export default function ApiDocs() {
  return (
    <AppShell>
      <div className="container py-12 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3 text-amber-500">
            <div className="h-px w-12 bg-amber-500/40" />
            <span className="text-xs font-mono tracking-[0.3em]">A · P · I</span>
            <div className="h-px w-12 bg-amber-500/40" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-muted-foreground">เอกสารการใช้งาน API ของ <span className="italic">EventIQ</span></p>
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <Link to="/platform/api-test">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Try in Playground
              </Button>
            </Link>
            <a href="https://console.botnoi.ai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" /> Botnoi Console
              </Button>
            </a>
          </div>
        </div>

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="endpoints"><Globe className="h-4 w-4 mr-1.5" />Endpoints</TabsTrigger>
            <TabsTrigger value="schema"><BookOpen className="h-4 w-4 mr-1.5" />Database Schema</TabsTrigger>
            <TabsTrigger value="auth"><KeyRound className="h-4 w-4 mr-1.5" />Authentication</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <BaseUrlCard />
            <div className="space-y-5">
              {ENDPOINTS.map((e) => (
                <EndpointCard key={`${e.method}-${e.path}`} endpoint={e} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schema">
            <SchemaTab />
          </TabsContent>

          <TabsContent value="auth">
            <AuthTab />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

function BaseUrlCard() {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== "undefined" && API_BASE_URL.startsWith("/")
    ? `${window.location.origin}${API_BASE_URL}`
    : API_BASE_URL;
  const apiBase = baseUrl.replace(/\/api$/, "");

  const copy = () => {
    navigator.clipboard.writeText(apiBase);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-500/5">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-amber-500 mb-3">Base URL</h2>
        <div className="rounded-lg border border-amber-500/30 bg-black/40 p-3 sm:p-4 flex items-center justify-between gap-3 flex-wrap">
          <code className="font-mono text-sm break-all">{apiBase}</code>
          <Button size="sm" variant="outline" onClick={copy} className="border-amber-500/40">
            {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
            Copy
          </Button>
        </div>
      </div>
    </Card>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const Icon = endpoint.emoji;
  const baseUrl = typeof window !== "undefined" && API_BASE_URL.startsWith("/")
    ? `${window.location.origin}${API_BASE_URL}`.replace(/\/api$/, "")
    : API_BASE_URL.replace(/\/api$/, "");
  const fullPath = endpoint.path.split("?")[0];
  const curl = buildCurl(endpoint, baseUrl);

  return (
    <Card className="border-amber-500/20 bg-black/20">
      <div className="p-5 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-amber-500">{endpoint.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{endpoint.description}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <MethodBadge method={endpoint.method} />
              <code className="text-sm font-mono break-all">{fullPath}</code>
              {endpoint.audience === "bot" && <Badge variant="outline" className="border-fuchsia-500/40 text-fuchsia-500 text-[10px]">For Bot</Badge>}
              {endpoint.audience === "admin" && <Badge variant="outline" className="border-rose-500/40 text-rose-500 text-[10px]">Admin Only</Badge>}
            </div>
          </div>
        </div>

        {/* Headers */}
        {Object.keys(endpoint.headers).length > 0 && (
          <Section title="Headers">
            <CodeBlock>
              {Object.entries(endpoint.headers).map(([k, v]) => `${k}: ${v}`).join("\n")}
            </CodeBlock>
          </Section>
        )}

        {/* Request Body */}
        {endpoint.body && (
          <Section title="Request Body">
            <CodeBlock>{endpoint.body}</CodeBlock>
          </Section>
        )}

        {/* Response */}
        <Section title="Response">
          <CodeBlock>{endpoint.response}</CodeBlock>
        </Section>

        {/* cURL */}
        <Section title="cURL Example">
          <CodeBlock copyable copyText={curl}>{curl}</CodeBlock>
        </Section>

        {/* Notes */}
        {endpoint.notes && (
          <div className="text-xs text-muted-foreground border-l-2 border-amber-500/40 pl-3 italic">
            💡 {endpoint.notes}
          </div>
        )}
      </div>
    </Card>
  );
}

function MethodBadge({ method }: { method: Method }) {
  const tone = method === "GET"
    ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/40"
    : "bg-amber-500/15 text-amber-500 border-amber-500/40";
  return <Badge variant="outline" className={`font-mono text-[10px] ${tone}`}>{method}</Badge>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-semibold text-amber-500/90 mb-1.5">{title}</div>
      {children}
    </div>
  );
}

function CodeBlock({ children, copyable, copyText }: { children: React.ReactNode; copyable?: boolean; copyText?: string }) {
  const [copied, setCopied] = useState(false);
  const text = copyText ?? (typeof children === "string" ? children : "");

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group">
      <pre className="rounded-lg border border-amber-500/20 bg-black/60 p-3 sm:p-4 text-xs sm:text-[13px] font-mono text-amber-50 overflow-x-auto leading-relaxed">
        {children}
      </pre>
      {copyable && text && (
        <button
          onClick={copy}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-md border border-amber-500/30 bg-black/60 px-2 py-1 text-xs text-amber-500 hover:bg-amber-500/10"
        >
          {copied ? <Check className="h-3 w-3 inline mr-1" /> : <Copy className="h-3 w-3 inline mr-1" />}
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

function buildCurl(e: Endpoint, baseUrl: string): string {
  const url = `${baseUrl}${e.path}`;
  const lines = [`curl -X ${e.method} \\`, `  "${url}"`];
  for (const [k, v] of Object.entries(e.headers)) {
    lines[lines.length - 1] += " \\";
    lines.push(`  -H "${k}: ${v}"`);
  }
  if (e.body) {
    lines[lines.length - 1] += " \\";
    const compact = JSON.stringify(JSON.parse(e.body));
    lines.push(`  -d '${compact}'`);
  }
  return lines.join("\n");
}

function SchemaTab() {
  return (
    <Card className="border-amber-500/20 bg-black/20 p-5 sm:p-6 space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-amber-500 mb-2">Exhibitor</h2>
        <p className="text-sm text-muted-foreground mb-3">บันทึก 1 บูธในระบบ — 44 fields ตาม canonical schema</p>
        <CodeBlock>{`interface Exhibitor {
  id: string;                    // 'ex01' (regex: /^ex\\d{2}$/)
  name: string;
  logo_url: string;
  booth_no: string;              // 'A-12' (regex: /^[A-Z]-\\d{2}$/)
  hall: string;

  // Classification
  industry: Industry;            // 21 enum values
  sub_industries: string[];
  solution_categories: SolutionCategory[];  // 20 enum values

  // Descriptions (bilingual)
  tagline_th: string;
  tagline_en: string;
  description_th: string;
  description_en: string;
  long_pitch_en: string;         // ~150 words — main retrieval corpus
  problem_statements_en: string[];
  unique_value_props: string[];

  // Target customer
  target_company_sizes: CompanySize[];
  target_industries: Industry[];
  target_roles: string[];
  geographic_focus: string[];

  // Tech & commercial
  tech_stack: string[];
  integrations: string[];
  deployment_options: ('cloud'|'on-prem'|'hybrid'|'edge')[];
  pricing_tier: 'startup'|'mid-market'|'enterprise';
  pricing_model: 'subscription'|'usage'|'license'|'project';
  pricing_starts_at_thb: number;

  // Trust
  founded_year: number;
  employee_count: '1-10'|'11-50'|'51-200'|'201-500'|'500+';
  headquarters: string;
  notable_clients: string[];
  certifications: string[];

  // Use cases (3 per booth)
  use_cases: UseCase[];

  // Contact
  website: string;
  contact_email: string;
}`}</CodeBlock>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-amber-500 mb-2">MatchCard</h2>
        <p className="text-sm text-muted-foreground mb-3">Card 1 ใบใน response ของ <code>POST /api/match</code> — บอทแสดงเป็น carousel bubble</p>
        <CodeBlock>{`interface MatchCard {
  rank: number;              // 1-5
  exhibitor_id: string;
  exhibitor_name: string;
  booth_no: string;
  hall: string;
  logo: string;
  match_score: number;       // 40-100 (percent)
  why_match_th: string;      // เหตุผลภาษาไทย 1 ประโยค
  why_match_en: string;
  top_use_case: string;
  quoted_outcome?: string;   // 'ลด AHT 35% ใน 4 เดือน'
  cta_url: string;           // ลิงก์ไปหน้าบูธ
}`}</CodeBlock>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-amber-500 mb-2">FaqEntry</h2>
        <CodeBlock>{`interface FaqEntry {
  id: string;
  question_th: string;
  question_en: string;
  answer_th: string;
  answer_en: string;
  category: 'schedule' | 'logistics' | 'registration' | 'sessions';
}`}</CodeBlock>
      </div>
    </Card>
  );
}

function AuthTab() {
  return (
    <Card className="border-amber-500/20 bg-black/20 p-5 sm:p-6 space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-amber-500 mb-2">Public Endpoints</h2>
        <p className="text-sm text-muted-foreground mb-3">
          <code>/api/health</code>, <code>/api/exhibitors</code>, <code>/api/faq</code>, <code>/api/match</code> ไม่ต้องการ auth
        </p>
        <p className="text-sm">CORS เปิด <code>Access-Control-Allow-Origin: *</code> เพื่อให้ Botnoi (origin ต่างกัน) เรียกได้</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-amber-500 mb-2">Admin Endpoints</h2>
        <p className="text-sm text-muted-foreground mb-3">
          <code>/api/admin/*</code> ต้องการ header <code>X-Eventiq-Token</code> ตรงกับ env var <code>ADMIN_TOKEN</code>
        </p>
        <CodeBlock>{`curl -X POST \\
  "https://event-iq-pro.vercel.app/api/admin/sheet-sync" \\
  -H "X-Eventiq-Token: <ADMIN_TOKEN>" \\
  -H "Content-Type: application/json"`}</CodeBlock>
        <p className="text-xs text-muted-foreground mt-3">
          สร้าง token ด้วย <code>openssl rand -hex 32</code> แล้วใส่ใน Vercel Dashboard → Settings → Environment Variables
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-amber-500 mb-2">Botnoi Console Setup</h2>
        <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
          <li>เข้า <a href="https://console.botnoi.ai" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">console.botnoi.ai</a></li>
          <li>เลือก bot ของคุณ → Custom Tool / Webhook</li>
          <li>สำหรับ intent <strong>"matching"</strong>: ตั้ง URL = <code>/api/match</code></li>
          <li>สำหรับ intent <strong>"faq"</strong>: ตั้ง URL = <code>/api/faq</code></li>
          <li>Map response fields ตามที่ระบุในแต่ละ endpoint</li>
        </ol>
      </div>
    </Card>
  );
}
