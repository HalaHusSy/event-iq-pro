import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2, Target, Lightbulb, Upload, Users, TrendingUp, Eye, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";

const painKeywords = [
  { word: "AI Chatbot", count: 42 },
  { word: "Voice Bot", count: 38 },
  { word: "Cost Reduction", count: 31 },
  { word: "Cloud Migration", count: 24 },
  { word: "RAG", count: 19 },
  { word: "PDPA", count: 14 },
];
const recent = [
  { name: "Khun Apinya S.", company: "Thai Bank", pain: "Reduce IVR cost 40%", score: 94, time: "2m ago" },
  { name: "Mr. James K.", company: "Manufacturing", pain: "Voice assistant for warehouse", score: 88, time: "8m ago" },
  { name: "Khun Wirot P.", company: "E-commerce", pain: "Customer support chatbot", score: 86, time: "15m ago" },
  { name: "Ms. Nina T.", company: "Hospital", pain: "Automate patient FAQ", score: 81, time: "32m ago" },
];

export default function Exhibitor() {
  const { lang } = useI18n();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (!done) {
    const steps = [
      { icon: Building2, label: lang === "th" ? "ข้อมูลบริษัท" : "Company Info" },
      { icon: Lightbulb, label: lang === "th" ? "โซลูชัน" : "Solutions" },
      { icon: Target, label: lang === "th" ? "Use Cases" : "Use Cases" },
    ];
    return (
      <AppShell>
        <div className="container py-12 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{lang === "th" ? "ลงทะเบียนผู้ออกบูธ" : "Exhibitor Onboarding"}</h1>
            <p className="text-muted-foreground mt-2">{lang === "th" ? "3 ขั้นตอน หรือ อัปโหลด CSV" : "3 quick steps, or upload CSV"}</p>
          </div>
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`grid h-10 w-10 place-items-center rounded-full transition-all ${i <= step ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${i <= step ? "" : "text-muted-foreground"}`}>{s.label}</span>
                {i < 2 && <div className={`w-8 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
          <Card className="p-6 glass space-y-4">
            {step === 0 && (<>
              <div><label className="text-sm font-medium">{lang === "th" ? "ชื่อบริษัท" : "Company Name"}</label><Input className="mt-1.5" placeholder="Acme Co." /></div>
              <div><label className="text-sm font-medium">{lang === "th" ? "หมายเลขบูธ" : "Booth #"}</label><Input className="mt-1.5" placeholder="A-12" /></div>
              <div><label className="text-sm font-medium">Website</label><Input className="mt-1.5" placeholder="https://" /></div>
            </>)}
            {step === 1 && (<>
              <div><label className="text-sm font-medium">{lang === "th" ? "อธิบายโซลูชัน" : "Describe Solutions"}</label><Textarea rows={5} className="mt-1.5" placeholder="What you offer..." /></div>
              <div><label className="text-sm font-medium">{lang === "th" ? "Tags (คั่นด้วย comma)" : "Tags (comma-separated)"}</label><Input className="mt-1.5" placeholder="AI, Cloud, SaaS" /></div>
            </>)}
            {step === 2 && (<>
              <div><label className="text-sm font-medium">Use Case 1</label><Input className="mt-1.5" placeholder="e.g. Reduce call center cost" /></div>
              <div><label className="text-sm font-medium">Use Case 2</label><Input className="mt-1.5" placeholder="e.g. Multi-language chatbot" /></div>
              <div><label className="text-sm font-medium">Use Case 3</label><Input className="mt-1.5" placeholder="e.g. Voice authentication" /></div>
              <Button variant="outline" className="w-full"><Upload className="h-4 w-4 mr-2" /> {lang === "th" ? "หรืออัปโหลด CSV" : "Or upload CSV"}</Button>
            </>)}
          </Card>
          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={() => setStep(s => Math.max(0, s-1))} disabled={step === 0}>{lang === "th" ? "ย้อนกลับ" : "Back"}</Button>
            {step < 2 ? (
              <Button onClick={() => setStep(s => s+1)} className="bg-gradient-primary">{lang === "th" ? "ถัดไป" : "Next"}</Button>
            ) : (
              <Button onClick={() => { setDone(true); toast.success("Onboarded!"); }} className="bg-gradient-primary">{lang === "th" ? "เสร็จสิ้น" : "Finish"}</Button>
            )}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{lang === "th" ? "แดชบอร์ดผู้ออกบูธ" : "Exhibitor Dashboard"}</h1>
          <p className="text-muted-foreground mt-1">Botnoi Group · Hall A — Booth 12</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Users, label: lang === "th" ? "Match วันนี้" : "Matches today", v: "127", trend: "+18%" },
            { icon: Eye, label: lang === "th" ? "เยี่ยมบูธ" : "Booth visits", v: "84", trend: "+12%" },
            { icon: TrendingUp, label: lang === "th" ? "Conversion" : "Conversion", v: "66%", trend: "+4%" },
          ].map(s => (
            <Card key={s.label} className="p-5 glass">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><s.icon className="h-5 w-5" /></div>
                <Badge variant="secondary" className="text-success">{s.trend}</Badge>
              </div>
              <div className="font-mono text-3xl font-bold mt-3">{s.v}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 glass">
            <h3 className="font-semibold mb-4">{lang === "th" ? "Top Pain Keywords" : "Top Pain Keywords"}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={painKeywords}>
                <XAxis dataKey="word" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-6 glass">
            <h3 className="font-semibold mb-4">{lang === "th" ? "Funnel" : "Conversion Funnel"}</h3>
            <div className="space-y-4">
              {[
                { label: "Matched", v: 127, p: 100 },
                { label: "Visited Booth", v: 84, p: 66 },
                { label: "Engaged 5min+", v: 52, p: 41 },
                { label: "Lead Captured", v: 28, p: 22 },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex justify-between text-sm mb-1.5"><span>{f.label}</span><span className="font-mono">{f.v} · {f.p}%</span></div>
                  <Progress value={f.p} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 glass">
          <h3 className="font-semibold mb-4">{lang === "th" ? "Match ล่าสุด" : "Recent Matches"}</h3>
          <div className="divide-y">
            {recent.map((r, i) => (
              <div key={i} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">{r.name} <span className="text-muted-foreground font-normal">· {r.company}</span></p>
                  <p className="text-xs text-muted-foreground truncate">"{r.pain}"</p>
                </div>
                <Badge className="bg-success text-white font-mono">{r.score}%</Badge>
                <span className="text-xs text-muted-foreground font-mono w-16 text-right">{r.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
