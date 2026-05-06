import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { sessions } from "@/lib/mock";
import { useI18n } from "@/lib/i18n";
import { Check, X, Eye, Edit3, Send } from "lucide-react";
import { toast } from "sonner";

export default function Speaker() {
  const { lang } = useI18n();
  const [active, setActive] = useState(sessions[0].id);
  const cur = sessions.find(s => s.id === active)!;
  const [summary, setSummary] = useState(`Key takeaways:\n• Foundation models commoditizing fast\n• Workflow integration is where value lives\n• Thai LLM fine-tuning needs curated data\n• RAG > fine-tuning for most enterprise cases\n• Sub-second latency is the new standard`);

  return (
    <AppShell>
      <div className="container py-8">
        <h1 className="text-3xl font-bold">{lang === "th" ? "พอร์ทัลผู้บรรยาย" : "Speaker Portal"}</h1>
        <p className="text-muted-foreground mt-1">{lang === "th" ? "ตรวจและอนุมัติสรุป Q&A ของเซสชั่นคุณ" : "Review and approve Q&A summaries for your sessions"}</p>
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 mt-8">
          <Card className="p-2 glass h-fit">
            {sessions.slice(0,5).map(s => (
              <button key={s.id} onClick={() => setActive(s.id)} className={`w-full text-left p-3 rounded-md transition-colors ${active === s.id ? "bg-secondary" : "hover:bg-secondary/50"}`}>
                <div className="font-medium text-sm">{s.title}</div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">{s.time}</div>
              </button>
            ))}
          </Card>
          <Card className="p-6 glass space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{cur.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{cur.speaker} · {cur.time} · {cur.room}</p>
              </div>
              <Badge variant="outline" className="font-mono">DRAFT</Badge>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{lang === "th" ? "สรุปหลัก" : "Main Summary"}</label>
                <span className="text-xs text-muted-foreground"><Edit3 className="h-3 w-3 inline mr-1" />Editable</span>
              </div>
              <Textarea value={summary} onChange={e => setSummary(e.target.value)} rows={8} className="font-mono text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Q&A Pairs (3)</label>
              <div className="space-y-2">
                {[
                  { q: "How do you handle hallucination?", a: "Strong retrieval + citation + temp 0." },
                  { q: "On-prem cost?", a: "~฿2M starting." },
                  { q: "Best Thai LLM?", a: "OpenThaiGPT, Typhoon." },
                ].map((qa, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary text-sm">
                    <p className="font-medium">Q: {qa.q}</p>
                    <p className="text-muted-foreground mt-1">A: {qa.a}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="ghost" className="h-7 text-xs"><Check className="h-3 w-3 mr-1" />Approve</Button>
                      <Button size="sm" variant="ghost" className="h-7 text-xs"><X className="h-3 w-3 mr-1" />Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t">
              <Button className="bg-gradient-primary" onClick={() => toast.success(lang === "th" ? "เผยแพร่แล้ว" : "Published")}>
                <Send className="h-4 w-4 mr-1.5" /> {lang === "th" ? "เผยแพร่" : "Publish"}
              </Button>
              <Button variant="outline"><Eye className="h-4 w-4 mr-1.5" /> {lang === "th" ? "พรีวิว" : "Preview"}</Button>
              <Button variant="ghost">{lang === "th" ? "บันทึกแบบร่าง" : "Save draft"}</Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
