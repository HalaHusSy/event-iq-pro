import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  Building2,
  Calendar as CalendarIcon,
  Loader2,
  MapPin,
  Plus,
  Save,
  Sparkles,
  Users as UsersIcon,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import {
  createLead,
  listAnnouncements,
  listLeads,
  listMyExhibitors,
  updateExhibitor,
} from "@/lib/data/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventRow } from "@/lib/supabase/types";

const NAV = [
  { id: "booth", label: "My Booth", icon: Building2 },
  { id: "preview", label: "Preview", icon: Sparkles },
  { id: "event", label: "Event Info", icon: CalendarIcon },
  { id: "leads", label: "Leads", icon: UsersIcon },
];

function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}
function fmtDateTime(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function ExhibitorDashboard() {
  const [view, setView] = useState("booth");
  const qc = useQueryClient();
  const { data: booths = [], isLoading } = useQuery({
    queryKey: ["my_exhibitors"],
    queryFn: listMyExhibitors,
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

  const [form, setForm] = useState({
    company_name: "",
    description: "",
    product_info: "",
    promotion: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    logo_url: "",
    tags: "",
  });

  useEffect(() => {
    if (booth) {
      setForm({
        company_name: booth.company_name ?? "",
        description: booth.description ?? "",
        product_info: booth.product_info ?? "",
        promotion: booth.promotion ?? "",
        contact_email: booth.contact_email ?? "",
        contact_phone: booth.contact_phone ?? "",
        website: booth.website ?? "",
        logo_url: booth.logo_url ?? "",
        tags: (booth.tags ?? []).join(", "),
      });
    }
  }, [booth]);

  const save = useMutation({
    mutationFn: () =>
      updateExhibitor(booth!.id, {
        company_name: form.company_name,
        description: form.description || null,
        product_info: form.product_info || null,
        promotion: form.promotion || null,
        contact_email: form.contact_email || null,
        contact_phone: form.contact_phone || null,
        website: form.website || null,
        logo_url: form.logo_url || null,
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my_exhibitors"] });
      qc.invalidateQueries({ queryKey: ["exhibitors"] });
      toast.success("บันทึก booth profile แล้ว");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <DashboardLayout
      title="My Booth"
      subtitle={
        booth
          ? `Booth ${booth.booth_id} • ${booth.company_name}${booths.length > 1 ? ` (${booths.length} booths)` : ""}`
          : "Booth profile"
      }
      roleBadge="EXHIBITOR"
      roleBadgeClass="bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
      nav={NAV}
      activeId={view}
      onSelect={setView}
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : !booth ? (
        <Card className="p-6 glass">
          <h2 className="font-semibold mb-2">ยังไม่ได้ link เข้ากับ booth</h2>
          <p className="text-sm text-muted-foreground">
            กรุณาให้ organizer สร้าง booth และ link มาที่ account นี้ก่อน
          </p>
        </Card>
      ) : (
        <>
          {booths.length > 1 && (
            <Card className="p-3 glass mb-4 flex items-center gap-3">
              <Label className="text-xs text-muted-foreground shrink-0">เลือก booth ({booths.length}):</Label>
              <Select value={selectedBoothId ?? ""} onValueChange={setSelectedBoothId}>
                <SelectTrigger className="h-9">
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
            </Card>
          )}
          {view === "event" ? (
        <EventInfo eventId={booth.event_id} />
      ) : view === "leads" ? (
        <Leads exhibitorId={booth.id} />
      ) : view === "booth" ? (
        <Card className="p-5 glass max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Booth Profile</h2>
            <Badge variant="outline" className="font-mono">{booth.booth_id}</Badge>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate();
            }}
            className="space-y-3"
          >
            <div>
              <Label>Company Name *</Label>
              <Input
                required
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input
                value={form.logo_url}
                onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Product Info</Label>
              <Textarea
                rows={3}
                value={form.product_info}
                onChange={(e) => setForm({ ...form, product_info: e.target.value })}
              />
            </div>
            <div>
              <Label>Promotion / โปรโมชั่นในงาน</Label>
              <Textarea
                rows={2}
                value={form.promotion}
                onChange={(e) => setForm({ ...form, promotion: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={form.contact_email}
                  onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={form.contact_phone}
                  onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Tags (คั่นด้วย ,)</Label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="ai, banking, fintech"
              />
            </div>
            <Button type="submit" disabled={save.isPending} className="w-full bg-gradient-primary">
              {save.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Save className="h-4 w-4 mr-2" /> บันทึก
            </Button>
          </form>
        </Card>
      ) : (
        <BoothPreview booth={booth} form={form} />
      )}
        </>
      )}
    </DashboardLayout>
  );
}

function BoothPreview({
  booth,
  form,
}: {
  booth: { booth_id: string };
  form: {
    company_name: string;
    description: string;
    product_info: string;
    promotion: string;
    contact_email: string;
    contact_phone: string;
    website: string;
    logo_url: string;
    tags: string;
  };
}) {
  const tags = form.tags.split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <Card className="p-6 glass max-w-2xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="grid h-16 w-16 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md text-2xl font-bold">
          {form.logo_url ? (
            <img src={form.logo_url} alt="logo" className="h-full w-full object-cover rounded-xl" />
          ) : (
            form.company_name?.charAt(0) ?? "?"
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{form.company_name || "ไม่ได้ตั้งชื่อบริษัท"}</h2>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className="font-mono">{booth.booth_id}</Badge>
            {tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
        </div>
      </div>
      {form.description && <p className="text-sm mb-3">{form.description}</p>}
      {form.product_info && (
        <div className="mb-3">
          <h3 className="font-semibold text-sm mb-1">Products</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{form.product_info}</p>
        </div>
      )}
      {form.promotion && (
        <div className="mb-3 p-3 rounded-lg bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-950/40 dark:to-rose-950/40">
          <h3 className="font-semibold text-sm mb-1">🎉 Promotion</h3>
          <p className="text-sm whitespace-pre-line">{form.promotion}</p>
        </div>
      )}
      <div className="text-xs text-muted-foreground space-y-1 mt-4 pt-3 border-t">
        {form.contact_email && <div>✉ {form.contact_email}</div>}
        {form.contact_phone && <div>☎ {form.contact_phone}</div>}
        {form.website && (
          <div>
            🌐 <a href={form.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              {form.website}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ---------------- Event Info (UC-E02: floor plan + announcements) ---------------- */
function EventInfo({ eventId }: { eventId: string }) {
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .maybeSingle();
      if (error) throw error;
      return data as EventRow | null;
    },
  });
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements", eventId],
    queryFn: () => listAnnouncements(eventId),
  });

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;
  if (!event) return <Card className="p-6 glass">ไม่พบ event</Card>;

  return (
    <div className="space-y-4 max-w-3xl">
      <Card className="p-5 glass">
        <h2 className="font-semibold mb-3">{event.name}</h2>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <CalendarIcon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Schedule</div>
              <div className="font-medium">{fmtDate(event.start_date)} → {fmtDate(event.end_date)}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="font-medium">{event.location ?? "—"}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Status</div>
              <Badge variant="outline" className="capitalize">{event.status}</Badge>
            </div>
          </div>
        </div>
        {event.description && (
          <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">{event.description}</p>
        )}
      </Card>

      <Card className="p-5 glass">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> Floor Plan</h3>
          {!event.floor_plan_url && <Badge variant="outline">ยังไม่อัปโหลด</Badge>}
        </div>
        {event.floor_plan_url ? (
          <a href={event.floor_plan_url} target="_blank" rel="noreferrer">
            <img
              src={event.floor_plan_url}
              alt="floor plan"
              className="w-full rounded-lg border max-h-[480px] object-contain bg-muted/30"
            />
          </a>
        ) : (
          <div className="p-8 text-center text-sm text-muted-foreground bg-muted/20 rounded-lg">
            Organizer ยังไม่ได้อัปโหลด floor plan
          </div>
        )}
      </Card>

      <Card className="p-5 glass">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2"><Bell className="h-4 w-4" /> Announcements</h3>
          <Badge variant="outline">{announcements.length} ข้อความ</Badge>
        </div>
        <div className="space-y-2">
          {announcements.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground bg-muted/20 rounded-lg">
              ยังไม่มี announcement จาก organizer
            </div>
          )}
          {announcements.map((a) => (
            <div key={a.id} className="p-3 rounded-lg border bg-card/50">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground font-mono shrink-0">
                  {fmtDateTime(a.created_at)}
                </div>
              </div>
              {a.body && <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{a.body}</p>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Leads (UC-E02: attendee leads) ---------------- */
function Leads({ exhibitorId }: { exhibitorId: string }) {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads", exhibitorId],
    queryFn: () => listLeads(exhibitorId),
  });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const add = useMutation({
    mutationFn: () =>
      createLead({
        exhibitorId,
        visitorName: name || undefined,
        visitorEmail: email || undefined,
        visitorPhone: phone || undefined,
        note: note || undefined,
        source: "manual",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads", exhibitorId] });
      toast.success("เพิ่ม lead แล้ว");
      setOpen(false);
      setName(""); setEmail(""); setPhone(""); setNote("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const summary = useMemo(() => ({
    total: leads.length,
    withEmail: leads.filter((l) => l.visitor_email).length,
    withPhone: leads.filter((l) => l.visitor_phone).length,
  }), [leads]);

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="glass max-w-3xl">
      <div className="p-5 border-b flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Attendee Leads</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {summary.total} leads · {summary.withEmail} email · {summary.withPhone} phone
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-1" /> Add lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เพิ่ม Lead ใหม่</DialogTitle>
              <DialogDescription className="sr-only">
                บันทึก lead ที่เก็บมาจากผู้เยี่ยมชม booth
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>ชื่อ</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Note</Label>
                <Textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="สนใจ product..., ติดตาม follow-up..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
              <Button
                className="bg-gradient-primary"
                onClick={() => add.mutate()}
                disabled={(!name && !email && !phone) || add.isPending}
              >
                {add.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                บันทึก
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="divide-y">
        {leads.length === 0 && (
          <div className="p-12 text-center text-sm text-muted-foreground">
            <UsersIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
            ยังไม่มี lead — กด Add lead เพื่อบันทึก
          </div>
        )}
        {leads.map((l) => (
          <div key={l.id} className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium">{l.visitor_name || "—"}</div>
                <div className="text-xs text-muted-foreground mt-0.5 space-x-2">
                  {l.visitor_email && <span>✉ {l.visitor_email}</span>}
                  {l.visitor_phone && <span>☎ {l.visitor_phone}</span>}
                </div>
                {l.note && <p className="text-sm mt-1.5 text-muted-foreground">{l.note}</p>}
              </div>
              <div className="text-xs text-muted-foreground font-mono shrink-0">
                {fmtDateTime(l.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
