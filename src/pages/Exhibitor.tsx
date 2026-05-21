import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  Calendar as CalendarIcon,
  Check,
  Eye,
  Lightbulb,
  Loader2,
  LogIn,
  MapPin,
  Save,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";
import { getMyExhibitor, listMyExhibitors, listLeads, updateExhibitor } from "@/lib/data/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventRow } from "@/lib/supabase/types";

function fmtTimeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function Exhibitor() {
  const { lang } = useI18n();
  const { session, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: booths = [], isLoading: boothLoading } = useQuery({
    queryKey: ["my_exhibitors"],
    queryFn: listMyExhibitors,
    enabled: !!session?.user,
  });
  const [selectedBoothId, setSelectedBoothId] = useState<string | null>(null);
  useEffect(() => {
    if (booths.length === 0) {
      setSelectedBoothId(null);
    } else if (!selectedBoothId || !booths.some((b) => b.id === selectedBoothId)) {
      setSelectedBoothId(booths[0].id);
    }
  }, [booths, selectedBoothId]);
  const booth = booths.find((b) => b.id === selectedBoothId) ?? null;

  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"edit" | "view">("edit");
  const [form, setForm] = useState({
    company_name: "",
    website: "",
    description: "",
    product_info: "",
    promotion: "",
    tags: "",
  });

  useEffect(() => {
    if (booth) {
      setForm({
        company_name: booth.company_name ?? "",
        website: booth.website ?? "",
        description: booth.description ?? "",
        product_info: booth.product_info ?? "",
        promotion: booth.promotion ?? "",
        tags: (booth.tags ?? []).join(", "),
      });
    }
  }, [booth?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const save = useMutation({
    mutationFn: async () => {
      if (!booth) throw new Error("Booth not loaded yet — please retry");
      return updateExhibitor(booth.id, {
        company_name: form.company_name,
        website: form.website || null,
        description: form.description || null,
        product_info: form.product_info || null,
        promotion: form.promotion || null,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my_exhibitors"] });
      qc.invalidateQueries({ queryKey: ["exhibitors"] });
      toast.success(lang === "th" ? "บันทึก booth profile แล้ว" : "Saved!");
      setMode("view");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (authLoading || boothLoading) {
    return (
      <AppShell>
        <div className="container py-24 grid place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  if (!session) {
    return (
      <AppShell>
        <div className="container py-16 max-w-md text-center">
          <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-gradient-primary text-primary-foreground mb-4">
            <LogIn className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {lang === "th" ? "กรุณา login ก่อน" : "Please login first"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {lang === "th"
              ? "หน้านี้สำหรับ exhibitor ที่ได้รับการ assign booth แล้ว"
              : "This page is for exhibitors with an assigned booth."}
          </p>
          <Button asChild className="bg-gradient-primary">
            <Link to="/login">{lang === "th" ? "เข้าสู่ระบบ" : "Sign in"}</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  if (!booth) {
    return (
      <AppShell>
        <div className="container py-16 max-w-md text-center">
          <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-secondary text-muted-foreground mb-4">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {lang === "th" ? "ยังไม่ได้รับ booth" : "No booth assigned"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {lang === "th"
              ? `Account ${profile?.email ?? ""} ยังไม่ได้ link กับ booth ใดๆ — ติดต่อ organizer เพื่อสร้าง booth ให้`
              : `Your account isn't linked to a booth yet — ask the organizer to set one up.`}
          </p>
          <Badge variant="outline" className="font-mono text-xs">
            role: {profile?.role}
          </Badge>
        </div>
      </AppShell>
    );
  }

  if (mode === "view") {
    return <BoothDashboard booth={booth} onEdit={() => { setMode("edit"); setStep(0); }} />;
  }

  // ----- wizard -----
  const steps = [
    { icon: Building2, label: lang === "th" ? "ข้อมูลบริษัท" : "Company Info" },
    { icon: Lightbulb, label: lang === "th" ? "โซลูชัน" : "Solutions" },
    { icon: Target, label: lang === "th" ? "Promotion" : "Promotion" },
  ];

  const canNext =
    step === 0 ? !!form.company_name :
    step === 1 ? !!form.description :
    true;

  return (
    <AppShell>
      <div className="container py-12 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {lang === "th" ? "ตั้งค่า Booth ของคุณ" : "Booth Setup"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {lang === "th"
              ? `Booth ${booth.booth_id} — กรอก 3 ขั้นตอน ข้อมูลจะบันทึกเข้าระบบจริง`
              : `Booth ${booth.booth_id} — fill 3 steps, saved to live DB`}
          </p>
          {booths.length > 1 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground shrink-0">
                {lang === "th" ? `เลือก booth (${booths.length}):` : `Select booth (${booths.length}):`}
              </span>
              <Select value={selectedBoothId ?? ""} onValueChange={setSelectedBoothId}>
                <SelectTrigger className="h-9 max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {booths.map((b) => {
                    const ev = (b as unknown as { events?: { name?: string } }).events;
                    return (
                      <SelectItem key={b.id} value={b.id}>
                        <span className="font-mono">{b.booth_id}</span> · {b.company_name}
                        {ev?.name ? ` — ${ev.name}` : ""}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full transition-all ${
                  i <= step ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${i <= step ? "" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {i < 2 && <div className={`w-8 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        <Card className="p-6 glass space-y-4">
          {step === 0 && (
            <>
              <div>
                <label className="text-sm font-medium">
                  {lang === "th" ? "ชื่อบริษัท" : "Company Name"} *
                </label>
                <Input
                  className="mt-1.5"
                  value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                  placeholder="Acme Co."
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  {lang === "th" ? "หมายเลขบูธ" : "Booth #"}
                </label>
                <Input className="mt-1.5 bg-muted/40" value={booth.booth_id} disabled />
                <p className="text-xs text-muted-foreground mt-1">
                  {lang === "th" ? "Booth # ถูกกำหนดโดย organizer" : "Booth # is set by the organizer"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Website</label>
                <Input
                  className="mt-1.5"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://"
                />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div>
                <label className="text-sm font-medium">
                  {lang === "th" ? "อธิบายโซลูชัน" : "Describe Solutions"} *
                </label>
                <Textarea
                  rows={5}
                  className="mt-1.5"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={lang === "th" ? "เราทำอะไร / ช่วยลูกค้ายังไง..." : "What you offer..."}
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  {lang === "th" ? "Product Info" : "Product Info"}
                </label>
                <Textarea
                  rows={3}
                  className="mt-1.5"
                  value={form.product_info}
                  onChange={(e) => setForm({ ...form, product_info: e.target.value })}
                  placeholder={lang === "th" ? "Product / feature เด่นๆ" : "Key products / features"}
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  {lang === "th" ? "Tags (คั่นด้วย ,)" : "Tags (comma-separated)"}
                </label>
                <Input
                  className="mt-1.5"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="AI, Cloud, SaaS"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label className="text-sm font-medium">
                  {lang === "th" ? "โปรโมชั่นในงาน" : "Promotion at the event"}
                </label>
                <Textarea
                  rows={4}
                  className="mt-1.5"
                  value={form.promotion}
                  onChange={(e) => setForm({ ...form, promotion: e.target.value })}
                  placeholder={lang === "th" ? "เช่น ลด 20% สำหรับลูกค้าที่ลงทะเบียนในงาน" : "e.g. 20% off for event signups"}
                />
              </div>
              <div className="rounded-lg border bg-muted/20 p-4 text-sm">
                <div className="font-medium mb-1.5">
                  {lang === "th" ? "ทบทวนข้อมูล" : "Review"}
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>· {form.company_name || "—"}</li>
                  <li>· Booth {booth.booth_id}</li>
                  <li>· {form.tags || "—"}</li>
                </ul>
              </div>
            </>
          )}
        </Card>
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            {lang === "th" ? "ย้อนกลับ" : "Back"}
          </Button>
          {step < 2 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="bg-gradient-primary"
            >
              {lang === "th" ? "ถัดไป" : "Next"}
            </Button>
          ) : (
            <Button
              onClick={() => save.mutate()}
              disabled={save.isPending || !booth || !form.company_name.trim()}
              className="bg-gradient-primary"
            >
              {save.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {lang === "th" ? "บันทึก" : "Save"}
            </Button>
          )}
        </div>
      </div>
    </AppShell>
  );
}

/* ===========================================================================
 * Booth Dashboard — real stats from DB
 * =========================================================================== */
function BoothDashboard({
  booth,
  onEdit,
}: {
  booth: NonNullable<Awaited<ReturnType<typeof getMyExhibitor>>>;
  onEdit: () => void;
}) {
  const { lang } = useI18n();
  const navigate = useNavigate();

  const { data: leads = [] } = useQuery({
    queryKey: ["leads", booth.id],
    queryFn: () => listLeads(booth.id),
  });

  const { data: event } = useQuery({
    queryKey: ["event", booth.event_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", booth.event_id)
        .maybeSingle();
      if (error) throw error;
      return data as EventRow | null;
    },
  });

  const today = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return leads.filter((l) => new Date(l.created_at) >= start).length;
  }, [leads]);

  const thisWeek = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 7);
    return leads.filter((l) => new Date(l.created_at) >= start).length;
  }, [leads]);

  const withContact = useMemo(
    () => leads.filter((l) => l.visitor_email || l.visitor_phone).length,
    [leads]
  );
  const conversion = leads.length === 0 ? 0 : Math.round((withContact / leads.length) * 100);

  // Top tags from booth.tags as keywords (real data)
  const tagData = useMemo(
    () => (booth.tags ?? []).slice(0, 8).map((t: string, i: number) => ({ word: t, count: (booth.tags?.length ?? 1) - i })),
    [booth.tags]
  );

  const recentLeads = leads.slice(0, 5);

  const daysToEvent = useMemo(() => {
    if (!event?.start_date) return null;
    const diff = Math.floor((new Date(event.start_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff;
  }, [event?.start_date]);

  return (
    <AppShell>
      <div className="container py-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">
              {lang === "th" ? "Booth ของฉัน" : "My Booth"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {booth.company_name} · {event?.name ?? "—"} · Booth {booth.booth_id}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              {lang === "th" ? "แก้ไขข้อมูล" : "Edit profile"}
            </Button>
            <Button className="bg-gradient-primary" onClick={() => navigate("/dashboard/exhibitor")}>
              {lang === "th" ? "เปิดคอนโซลเต็ม" : "Open full console"}
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard
            icon={Users}
            label={lang === "th" ? "Leads วันนี้" : "Leads today"}
            value={today}
            sub={lang === "th" ? `${thisWeek} ใน 7 วัน` : `${thisWeek} this week`}
          />
          <StatCard
            icon={Eye}
            label={lang === "th" ? "Leads ทั้งหมด" : "Total leads"}
            value={leads.length}
            sub={lang === "th" ? `${withContact} มี contact` : `${withContact} with contact`}
          />
          <StatCard
            icon={TrendingUp}
            label={lang === "th" ? "Conversion" : "Conversion"}
            value={`${conversion}%`}
            sub={lang === "th" ? "leads ที่กรอก email/phone" : "leads with email/phone"}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 glass">
            <h3 className="font-semibold mb-4">
              {lang === "th" ? "Tags ของ Booth" : "Booth Tags"}
            </h3>
            {tagData.length === 0 ? (
              <div className="grid place-items-center h-[220px] text-sm text-muted-foreground">
                {lang === "th" ? "ยังไม่ได้ตั้ง tags — แก้ไขใน profile" : "No tags yet — edit profile"}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={tagData}>
                  <XAxis dataKey="word" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>

          <Card className="p-6 glass">
            <h3 className="font-semibold mb-4">
              {lang === "th" ? "ข้อมูล Event" : "Event Info"}
            </h3>
            <div className="space-y-3 text-sm">
              <Row icon={CalendarIcon} label={lang === "th" ? "วันงาน" : "Date"}>
                {fmtDate(event?.start_date)} → {fmtDate(event?.end_date)}
                {daysToEvent !== null && daysToEvent >= 0 && (
                  <Badge variant="outline" className="ml-2 font-mono text-xs">
                    {lang === "th" ? `อีก ${daysToEvent} วัน` : `in ${daysToEvent}d`}
                  </Badge>
                )}
              </Row>
              <Row icon={MapPin} label={lang === "th" ? "สถานที่" : "Location"}>
                {event?.location ?? "—"}
              </Row>
              <Row icon={Sparkles} label="Status">
                <Badge variant="outline" className="capitalize">{event?.status ?? "—"}</Badge>
              </Row>
              <div className="pt-3 border-t mt-3">
                <div className="text-xs text-muted-foreground mb-2">
                  {lang === "th" ? "ความคืบหน้า Profile" : "Profile completeness"}
                </div>
                <Progress
                  value={
                    [booth.company_name, booth.description, booth.product_info, booth.website, (booth.tags ?? []).length > 0]
                      .filter(Boolean).length * 20
                  }
                />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{lang === "th" ? "Leads ล่าสุด" : "Recent Leads"}</h3>
            <Badge variant="outline" className="font-mono text-xs">{leads.length} total</Badge>
          </div>
          {recentLeads.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              {lang === "th"
                ? "ยังไม่มี lead — ไปที่ Console เพื่อเพิ่ม"
                : "No leads yet — open Console to add"}
            </div>
          ) : (
            <div className="divide-y">
              {recentLeads.map((l) => (
                <div key={l.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm">
                      {l.visitor_name || "—"}
                      {l.visitor_email && (
                        <span className="text-muted-foreground font-normal"> · {l.visitor_email}</span>
                      )}
                    </p>
                    {l.note && (
                      <p className="text-xs text-muted-foreground truncate">"{l.note}"</p>
                    )}
                  </div>
                  {(l.visitor_email || l.visitor_phone) && (
                    <Badge className="bg-success text-white">contact</Badge>
                  )}
                  <span className="text-xs text-muted-foreground font-mono w-16 text-right">
                    {fmtTimeAgo(l.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <Card className="p-5 glass">
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="font-mono text-3xl font-bold mt-3">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </Card>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Users;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
