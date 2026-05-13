import { useEffect, useState } from "react";
import { Activity, Search, MessageCircleQuestion, Database, RefreshCw, Send, ExternalLink, Copy, Check } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { API_BASE_URL, eventiqClient, type ApiCallResult } from "@/lib/api/eventiq-client";

export default function ApiTest() {
  const [healthStatus, setHealthStatus] = useState<"checking" | "ok" | "down">("checking");

  useEffect(() => {
    eventiqClient.health().then((r) => setHealthStatus(r.ok ? "ok" : "down"));
  }, []);

  return (
    <AppShell>
      <div className="container py-8 space-y-6 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <Badge variant="outline" className="mb-2">Root Only</Badge>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Activity className="h-7 w-7 text-primary" />
              API Playground
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              ทดสอบ endpoints ของ EventIQ API ก่อนนำ URL ไป config ใน Botnoi Console
            </p>
          </div>
          <HealthBadge status={healthStatus} />
        </div>

        <BaseUrlCard />

        <Tabs defaultValue="match" className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
            <TabsTrigger value="match"><Search className="h-4 w-4 mr-1.5" />Match</TabsTrigger>
            <TabsTrigger value="faq"><MessageCircleQuestion className="h-4 w-4 mr-1.5" />FAQ</TabsTrigger>
            <TabsTrigger value="data"><Database className="h-4 w-4 mr-1.5" />Browse Data</TabsTrigger>
            <TabsTrigger value="sync"><RefreshCw className="h-4 w-4 mr-1.5" />Sheet Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="match"><MatchTester /></TabsContent>
          <TabsContent value="faq"><FaqTester /></TabsContent>
          <TabsContent value="data"><DataBrowser /></TabsContent>
          <TabsContent value="sync"><SyncTester /></TabsContent>
        </Tabs>

        <BotnoiSnippet />
      </div>
    </AppShell>
  );
}

function HealthBadge({ status }: { status: "checking" | "ok" | "down" }) {
  if (status === "checking") return <Badge variant="outline" className="gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />Checking…</Badge>;
  if (status === "ok") return <Badge variant="outline" className="gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-500" />API Online</Badge>;
  return <Badge variant="outline" className="gap-1.5 border-rose-500/40 text-rose-600 dark:text-rose-400"><span className="h-2 w-2 rounded-full bg-rose-500" />API Offline</Badge>;
}

function BaseUrlCard() {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== "undefined" && API_BASE_URL.startsWith("/")
    ? `${window.location.origin}${API_BASE_URL}`
    : API_BASE_URL;

  const copy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="p-4 glass">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground mb-1">Base URL (ใช้ใน Botnoi Console webhook)</p>
          <code className="text-sm font-mono break-all">{fullUrl}</code>
        </div>
        <Button variant="outline" size="sm" onClick={copy}>
          {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
          Copy
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        💡 ถ้า base URL เริ่มต้นด้วย <code>/api</code> = serving same-origin. ถ้าใช้ <code>npm run dev</code> ที่ port 8080 ต้องตั้ง <code>VITE_AGENT_URL=https://...vercel.app/api</code> ใน <code>.env.local</code>
      </p>
    </Card>
  );
}

function MatchTester() {
  const [message, setMessage] = useState("อยากลดต้นทุน call center ด้วย AI");
  const [lang, setLang] = useState<"th" | "en">("th");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiCallResult<any> | null>(null);

  const examples = [
    "อยากลดต้นทุน call center ด้วย AI",
    "Thai TTS for IVR system",
    "voice bot ภาษาไทยลง LINE OA",
    "compliance monitoring for call recording",
  ];

  const submit = async () => {
    setLoading(true);
    const r = await eventiqClient.match(message, lang);
    setResult(r);
    setLoading(false);
  };

  return (
    <Card className="p-5 glass space-y-4">
      <EndpointHeader method="POST" path="/api/match" />
      <div className="space-y-2">
        <Label className="text-xs">Pain point / message</Label>
        <Textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="พิมพ์ pain point..." />
        <div className="flex gap-1.5 flex-wrap">
          {examples.map((ex) => (
            <button key={ex} onClick={() => setMessage(ex)} className="text-xs px-2 py-1 rounded-full border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">{ex}</button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <Button size="sm" variant={lang === "th" ? "default" : "outline"} onClick={() => setLang("th")}>TH</Button>
          <Button size="sm" variant={lang === "en" ? "default" : "outline"} onClick={() => setLang("en")}>EN</Button>
        </div>
        <Button onClick={submit} disabled={loading || !message} className="bg-gradient-primary ml-auto">
          <Send className="h-4 w-4 mr-1.5" />{loading ? "Sending…" : "Send POST"}
        </Button>
      </div>
      {result && <ResultPanel result={result} renderData={(data) => <MatchResultView data={data} />} />}
    </Card>
  );
}

function MatchResultView({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{data.reply_text}</div>
      <div className="grid sm:grid-cols-2 gap-2">
        {(data.cards ?? []).map((card: any) => (
          <div key={card.exhibitor_id} className="rounded-lg border p-3 bg-card/60 flex gap-3">
            <div className="text-3xl">{card.logo}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{card.exhibitor_name}</span>
                <Badge variant="secondary" className="text-[10px]">{card.match_score}%</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Booth {card.booth_no} · {card.hall}</div>
              <p className="text-xs mt-1 line-clamp-2">{card.why_match_th}</p>
              {card.quoted_outcome && <p className="text-[11px] mt-1 text-primary">{card.quoted_outcome}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground italic">{data.follow_up_question}</div>
    </div>
  );
}

function FaqTester() {
  const [question, setQuestion] = useState("ที่จอดรถมีไหม?");
  const [lang, setLang] = useState<"th" | "en">("th");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiCallResult<any> | null>(null);

  const submit = async () => {
    setLoading(true);
    const r = await eventiqClient.faqSearch(question, lang);
    setResult(r);
    setLoading(false);
  };

  return (
    <Card className="p-5 glass space-y-4">
      <EndpointHeader method="POST" path="/api/faq" />
      <div className="space-y-2">
        <Label className="text-xs">Question</Label>
        <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <Button size="sm" variant={lang === "th" ? "default" : "outline"} onClick={() => setLang("th")}>TH</Button>
          <Button size="sm" variant={lang === "en" ? "default" : "outline"} onClick={() => setLang("en")}>EN</Button>
        </div>
        <Button onClick={submit} disabled={loading || !question} className="bg-gradient-primary ml-auto">
          <Send className="h-4 w-4 mr-1.5" />{loading ? "Sending…" : "Send POST"}
        </Button>
      </div>
      {result && <ResultPanel result={result} renderData={(data) => (
        <div className="space-y-2">
          <div className="rounded-lg border p-3 bg-card/60">
            <div className="text-sm">{data?.answer}</div>
            <div className="text-[11px] text-muted-foreground mt-1.5">Source: {data?.source_faq_ids?.join(", ")}</div>
          </div>
          {data?.related_questions?.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-1.5">Related:</div>
              <div className="flex gap-1.5 flex-wrap">
                {data.related_questions.map((q: any) => (
                  <Badge key={q.id} variant="outline" className="text-[11px]">{q.question_th}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )} />}
    </Card>
  );
}

function DataBrowser() {
  const [tab, setTab] = useState<"exhibitors" | "faq">("exhibitors");
  const [result, setResult] = useState<ApiCallResult<any> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async (which: "exhibitors" | "faq") => {
    setTab(which);
    setLoading(true);
    const r = which === "exhibitors" ? await eventiqClient.exhibitors() : await eventiqClient.faqList();
    setResult(r);
    setLoading(false);
  };

  useEffect(() => { load("exhibitors"); }, []);

  return (
    <Card className="p-5 glass space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <EndpointHeader method="GET" path={tab === "exhibitors" ? "/api/exhibitors" : "/api/faq"} />
        <div className="flex gap-1">
          <Button size="sm" variant={tab === "exhibitors" ? "default" : "outline"} onClick={() => load("exhibitors")}>Exhibitors</Button>
          <Button size="sm" variant={tab === "faq" ? "default" : "outline"} onClick={() => load("faq")}>FAQ</Button>
        </div>
      </div>
      {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
      {result?.data && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {result.data.count} records · {result.latency_ms}ms · HTTP {result.status}
          </div>
          <ScrollArea className="h-[420px] rounded-md border">
            <div className="p-3 space-y-2">
              {(result.data.items ?? []).map((item: any) => (
                <div key={item.id} className="rounded-md border p-2.5 bg-card/40 text-xs">
                  {tab === "exhibitors" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.logo_url}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold">{item.name} <span className="text-muted-foreground font-normal">· {item.booth_no} · {item.hall}</span></div>
                          <div className="text-muted-foreground">{item.tagline_th}</div>
                        </div>
                        <Badge variant="outline" className="text-[10px]">{item.industry}</Badge>
                      </div>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {item.solution_categories?.slice(0, 3).map((c: string) => <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold">{item.question_th}</div>
                      <div className="text-muted-foreground mt-0.5">{item.answer_th}</div>
                      <Badge variant="outline" className="text-[10px] mt-1">{item.category}</Badge>
                    </>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      {result && !result.ok && <ErrorPanel result={result} />}
    </Card>
  );
}

function SyncTester() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiCallResult<any> | null>(null);

  const run = async () => {
    setLoading(true);
    const r = await eventiqClient.sheetSync(token || undefined);
    setResult(r);
    setLoading(false);
    if (r.ok) toast.success("Sync triggered"); else toast.error(r.error ?? "Failed");
  };

  return (
    <Card className="p-5 glass space-y-4">
      <EndpointHeader method="POST" path="/api/admin/sheet-sync" />
      <div className="space-y-2">
        <Label className="text-xs">Admin token (optional — set <code>ADMIN_TOKEN</code> env var in Vercel)</Label>
        <Input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Leave blank if no ADMIN_TOKEN set yet" />
      </div>
      <Button onClick={run} disabled={loading} className="bg-gradient-primary">
        <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />{loading ? "Syncing…" : "Trigger Sync"}
      </Button>
      <div className="text-xs text-muted-foreground">
        ⏳ Chunk 3: handler ยังเป็น stub. Implementation จริงจะ pull CSV จาก Google Sheet → validate Zod → regenerate exhibitors JSON → redeploy
      </div>
      {result && <ResultPanel result={result} renderData={(data) => <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>} />}
    </Card>
  );
}

function EndpointHeader({ method, path }: { method: string; path: string }) {
  const methodTone = method === "POST" ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
  return (
    <div className="flex items-center gap-2 pb-2 border-b">
      <Badge variant="outline" className={`font-mono text-[10px] ${methodTone}`}>{method}</Badge>
      <code className="text-sm font-mono">{path}</code>
    </div>
  );
}

function ResultPanel({ result, renderData }: { result: ApiCallResult<any>; renderData: (data: any) => React.ReactNode }) {
  return (
    <div className="space-y-3 pt-2 border-t">
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <Badge variant={result.ok ? "default" : "destructive"}>HTTP {result.status || "ERR"}</Badge>
        <span className="text-muted-foreground">{result.latency_ms}ms</span>
        {!result.ok && <span className="text-rose-500">{result.error}</span>}
      </div>
      {result.ok && result.data && (
        <>
          {renderData(result.data)}
          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Raw JSON</summary>
            <pre className="mt-2 p-2 rounded-md bg-muted/40 overflow-auto max-h-80 text-[11px]">{JSON.stringify(result.data, null, 2)}</pre>
          </details>
        </>
      )}
      {!result.ok && <ErrorPanel result={result} />}
    </div>
  );
}

function ErrorPanel({ result }: { result: ApiCallResult<any> }) {
  return (
    <div className="rounded-md border border-rose-500/30 bg-rose-500/5 p-3 text-xs">
      <div className="font-semibold text-rose-600 dark:text-rose-400 mb-1">Request failed</div>
      <div>{result.error ?? "Unknown error"}</div>
      <div className="text-muted-foreground mt-2">
        ถ้าเห็น 404 หรือ network error → API ยังไม่ deploy. ดู <code>api/README.md</code> สำหรับขั้นตอน
      </div>
    </div>
  );
}

function BotnoiSnippet() {
  const baseUrl = typeof window !== "undefined" && API_BASE_URL.startsWith("/")
    ? `${window.location.origin}${API_BASE_URL}`
    : API_BASE_URL;

  return (
    <Card className="p-5 glass space-y-3">
      <h2 className="font-semibold flex items-center gap-2">
        <ExternalLink className="h-4 w-4" />
        Botnoi Console Webhook Config
      </h2>
      <p className="text-xs text-muted-foreground">Copy ค่าเหล่านี้ใส่ใน Custom Tool / Webhook ที่ console.botnoi.ai</p>

      <div className="space-y-3">
        <WebhookCard title="Bot Matching" url={`${baseUrl}/match`} body={`{\n  "message": "{{user_message}}",\n  "user_id": "{{user_id}}",\n  "lang": "th"\n}`} mapHints="reply_text → ตอบ text bubble\ncards[] → carousel\nfollow_up_question → quick reply" />
        <WebhookCard title="Bot FAQ" url={`${baseUrl}/faq`} body={`{\n  "question": "{{user_message}}",\n  "lang": "th"\n}`} mapHints="answer → text reply\nrelated_questions[] → quick reply chips" />
      </div>
    </Card>
  );
}

function WebhookCard({ title, url, body, mapHints }: { title: string; url: string; body: string; mapHints: string }) {
  return (
    <div className="rounded-lg border p-3 bg-card/40 space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="font-medium text-sm">{title}</span>
        <Badge variant="outline" className="text-[10px]">POST</Badge>
      </div>
      <div className="space-y-1.5 text-xs">
        <div>
          <span className="text-muted-foreground">URL:</span>{" "}
          <code className="font-mono break-all">{url}</code>
        </div>
        <div>
          <span className="text-muted-foreground">Body (JSON):</span>
          <pre className="mt-1 p-2 rounded bg-muted/40 text-[11px] overflow-x-auto">{body}</pre>
        </div>
        <div>
          <span className="text-muted-foreground">Response mapping:</span>
          <pre className="mt-1 text-[11px] text-muted-foreground whitespace-pre-wrap">{mapHints}</pre>
        </div>
      </div>
    </div>
  );
}
