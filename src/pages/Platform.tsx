import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calendar, MapPin, Users, Bot, MessageSquare, CheckCircle2, XCircle, Pencil, Crown, Building2, Sparkles } from "lucide-react";
import { PLATFORM_EVENTS, type PlatformEvent } from "@/lib/mock/events";
import { EXHIBITORS } from "@/lib/mock/exhibitors";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

const fmtDate = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : lang, { day: "numeric", month: "short", year: "numeric" });

export default function Platform() {
  const { t, lang } = useI18n();
  const [params, setParams] = useSearchParams();
  const [events, setEvents] = useState<PlatformEvent[]>(PLATFORM_EVENTS);

  const eventSlug = params.get("event");
  const initialId = (eventSlug && events.find((e) => e.slug === eventSlug)?.id) || events[0].id;
  const [selectedEventId, setSelectedEventId] = useState(initialId);

  // Keep URL ?event=<slug> in sync when the user switches via the dropdown
  useEffect(() => {
    const current = events.find((e) => e.id === selectedEventId);
    if (current && params.get("event") !== current.slug) {
      const next = new URLSearchParams(params);
      next.set("event", current.slug);
      setParams(next, { replace: true });
    }
  }, [selectedEventId, events, params, setParams]);

  // React to URL changes (e.g. navigating back from Events with a different slug)
  useEffect(() => {
    if (!eventSlug) return;
    const match = events.find((e) => e.slug === eventSlug);
    if (match && match.id !== selectedEventId) setSelectedEventId(match.id);
  }, [eventSlug, events, selectedEventId]);

  const selected = events.find((e) => e.id === selectedEventId)!;
  const statusColor =
    selected.status === "live" ? "bg-emerald-500" : selected.status === "upcoming" ? "bg-amber-500" : "bg-muted-foreground";

  const updateSelected = (patch: Partial<PlatformEvent>) =>
    setEvents((prev) => prev.map((e) => (e.id === selectedEventId ? { ...e, ...patch } : e)));

  return (
    <AppShell>
      <div className="container py-8 space-y-6">
        {/* Active event banner */}
        <Card className="glass overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-5 p-5">
            <div className="shrink-0 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-primary text-5xl shadow-glow">
              {selected.cover}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge className={`${statusColor} text-white border-0 gap-1.5`}>
                  {selected.status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
                  {selected.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="font-mono text-[10px]">EVENT</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text leading-tight">{selected.name}</h1>
              {selected.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{selected.description}</p>
              )}
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{selected.venue}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmtDate(selected.startDate, lang)} – {fmtDate(selected.endDate, lang)}</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{selected.exhibitorCount} exhibitors</span>
                <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5" />Bot {selected.bot.connected ? "connected" : "off"}</span>
              </div>
            </div>
            <div className="md:text-right text-sm shrink-0">
              <div className="flex items-center gap-2 md:justify-end mb-1">
                <Crown className="h-4 w-4 text-amber-500" />
                <Badge variant="outline" className="font-mono text-xs">ROOT ACCOUNT</Badge>
              </div>
              <div className="text-muted-foreground text-xs">Logged in as</div>
              <div className="font-semibold text-sm">root@eventiq.app</div>
            </div>
          </div>
        </Card>

        {/* Event switcher */}
        <Card className="p-4 glass flex items-center gap-3 flex-wrap">
          <Label className="text-xs text-muted-foreground">Switch event:</Label>
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger className="w-[280px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {events.map((e) => (
                <SelectItem key={e.id} value={e.id}>{e.cover} {e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground md:ml-auto">{t("platform.sub")}</p>
        </Card>

        <Tabs defaultValue="events">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="events"><Calendar className="h-4 w-4 mr-1.5" />{t("platform.tab.events")}</TabsTrigger>
            <TabsTrigger value="admins"><Users className="h-4 w-4 mr-1.5" />{t("platform.tab.admins")}</TabsTrigger>
            <TabsTrigger value="exhibitors"><Building2 className="h-4 w-4 mr-1.5" />{t("platform.tab.exhibitors")}</TabsTrigger>
            <TabsTrigger value="bot"><Bot className="h-4 w-4 mr-1.5" />{t("platform.tab.bot")}</TabsTrigger>
          </TabsList>

          {/* EVENTS */}
          <TabsContent value="events" className="mt-6">
            <EventsManager events={events} setEvents={setEvents} />
          </TabsContent>

          {/* ADMINS */}
          <TabsContent value="admins" className="mt-6">
            <AdminsManager event={selected} update={updateSelected} />
          </TabsContent>

          {/* EXHIBITORS */}
          <TabsContent value="exhibitors" className="mt-6">
            <ExhibitorsManager event={selected} />
          </TabsContent>

          {/* BOT */}
          <TabsContent value="bot" className="mt-6">
            <BotManager event={selected} update={updateSelected} />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

function EventsManager({ events, setEvents }: { events: PlatformEvent[]; setEvents: (e: PlatformEvent[]) => void }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", venue: "", startDate: "", endDate: "", description: "", cover: "🎉" });

  const create = () => {
    if (!form.name) return toast.error("Name required");
    const newEvent: PlatformEvent = {
      id: `evt-${Date.now()}`,
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, "-"),
      cover: form.cover,
      venue: form.venue || "TBA",
      startDate: form.startDate || new Date().toISOString().slice(0, 10),
      endDate: form.endDate || new Date().toISOString().slice(0, 10),
      status: "upcoming",
      exhibitorCount: 0,
      sessionCount: 0,
      admins: [],
      bot: { connected: false },
      description: form.description,
    };
    setEvents([newEvent, ...events]);
    setOpen(false);
    setForm({ name: "", venue: "", startDate: "", endDate: "", description: "", cover: "🎉" });
    toast.success(`Event "${newEvent.name}" created`);
  };

  return (
    <Card className="glass">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">All Events ({events.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" />{t("platform.create")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{t("platform.create")}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-[80px_1fr] gap-3 items-end">
                <div><Label className="text-xs">Cover emoji</Label><Input value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} className="text-center text-2xl" /></div>
                <div><Label className="text-xs">Event name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Bangkok AI Summit 2026" /></div>
              </div>
              <div><Label className="text-xs">Venue</Label><Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="BITEC Bangna" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Start date</Label><Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
                <div><Label className="text-xs">End date</Label><Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
              </div>
              <div><Label className="text-xs">Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={create} className="bg-gradient-primary">Create event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead className="text-center">Exhibitors</TableHead>
            <TableHead className="text-center">Admins</TableHead>
            <TableHead className="text-center">Bot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((e) => (
            <TableRow key={e.id}>
              <TableCell><div className="flex items-center gap-2"><span className="text-xl">{e.cover}</span><div><div className="font-medium">{e.name}</div><div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</div></div></div></TableCell>
              <TableCell><Badge variant={e.status === "live" ? "default" : "outline"} className={e.status === "live" ? "bg-emerald-500" : ""}>{e.status}</Badge></TableCell>
              <TableCell className="text-sm text-muted-foreground">{e.startDate} → {e.endDate}</TableCell>
              <TableCell className="text-center font-mono">{e.exhibitorCount}</TableCell>
              <TableCell className="text-center font-mono">{e.admins.length}</TableCell>
              <TableCell className="text-center">{e.bot.connected ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /> : <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function AdminsManager({ event, update }: { event: PlatformEvent; update: (p: Partial<PlatformEvent>) => void }) {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "" });

  const add = () => {
    if (!form.name || !form.email) return toast.error("Name & email required");
    const newAdmin = { id: `a-${Date.now()}`, name: form.name, email: form.email, avatar: "👤" };
    update({ admins: [...event.admins, newAdmin] });
    setForm({ name: "", email: "" });
    toast.success(`${newAdmin.name} assigned as admin`);
  };
  const remove = (id: string) => {
    update({ admins: event.admins.filter((a) => a.id !== id) });
    toast.success("Admin removed");
  };

  return (
    <Card className="glass p-6 space-y-5">
      <div>
        <h2 className="font-semibold text-lg">Event Admins for {event.cover} {event.name}</h2>
        <p className="text-sm text-muted-foreground">Admins สามารถจัดการ exhibitors, FAQ, sessions ของ event นี้</p>
      </div>
      <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 p-4 rounded-lg border bg-muted/30">
        <Input placeholder="Admin name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="email@example.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Button onClick={add} className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" />{t("platform.assignAdmin")}</Button>
      </div>
      <div className="space-y-2">
        {event.admins.map((a) => (
          <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <div className="text-2xl">{a.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium">{a.name}</div>
              <div className="text-xs text-muted-foreground">{a.email}</div>
            </div>
            <Badge variant="outline" className="gap-1"><Crown className="h-3 w-3" />Event Admin</Badge>
            <Button size="sm" variant="ghost" onClick={() => remove(a.id)}><XCircle className="h-4 w-4 text-destructive" /></Button>
          </div>
        ))}
        {event.admins.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No admins yet — assign one above</div>}
      </div>
    </Card>
  );
}

function ExhibitorsManager({ event }: { event: PlatformEvent }) {
  const [list, setList] = useState(EXHIBITORS.slice(0, Math.min(event.exhibitorCount, EXHIBITORS.length)));
  const [editing, setEditing] = useState<typeof EXHIBITORS[0] | null>(null);

  const save = () => {
    if (!editing) return;
    setList(list.map((x) => (x.id === editing.id ? editing : x)));
    toast.success(`Updated ${editing.name}`);
    setEditing(null);
  };

  return (
    <Card className="glass">
      <div className="p-5 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">Exhibitors · {event.name}</h2>
          <p className="text-xs text-muted-foreground">Admin สามารถเพิ่มและแก้ไขข้อมูลของแต่ละบูธ</p>
        </div>
        <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" />Add exhibitor</Button>
      </div>
      <div className="divide-y">
        {list.map((ex) => (
          <div key={ex.id} className="p-4 flex items-center gap-3 hover:bg-muted/30">
            <div className="text-3xl">{ex.logo_url}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium">{ex.name}</div>
              <div className="text-xs text-muted-foreground">Booth {ex.booth_no} · {ex.hall} · {ex.industry_tags.join(", ")}</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => setEditing(ex)}><Pencil className="h-3.5 w-3.5 mr-1" />Edit</Button>
          </div>
        ))}
      </div>
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit {editing?.name}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3 py-2">
              <div><Label className="text-xs">Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Booth no.</Label><Input value={editing.booth_no} onChange={(e) => setEditing({ ...editing, booth_no: e.target.value })} /></div>
                <div><Label className="text-xs">Hall</Label><Input value={editing.hall} onChange={(e) => setEditing({ ...editing, hall: e.target.value })} /></div>
              </div>
              <div><Label className="text-xs">Description (TH)</Label><Textarea rows={2} value={editing.description_th} onChange={(e) => setEditing({ ...editing, description_th: e.target.value })} /></div>
              <div><Label className="text-xs">Description (EN)</Label><Textarea rows={2} value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} /></div>
              <div><Label className="text-xs">Tags (comma)</Label><Input value={editing.industry_tags.join(", ")} onChange={(e) => setEditing({ ...editing, industry_tags: e.target.value.split(",").map((s) => s.trim()) })} /></div>
              <div><Label className="text-xs">Website</Label><Input value={editing.website} onChange={(e) => setEditing({ ...editing, website: e.target.value })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save} className="bg-gradient-primary">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function BotManager({ event, update }: { event: PlatformEvent; update: (p: Partial<PlatformEvent>) => void }) {
  const { t } = useI18n();
  const [botId, setBotId] = useState(event.bot.botId || "");
  const [lineOaId, setLineOaId] = useState(event.bot.lineOaId || "");
  const [lineOaName, setLineOaName] = useState(event.bot.lineOaName || "");

  const connectBot = () => {
    if (!botId) return toast.error("Bot ID required");
    update({ bot: { ...event.bot, connected: true, botId } });
    toast.success("Bot connected to event");
  };
  const linkLine = () => {
    if (!lineOaId) return toast.error("LINE OA ID required");
    update({ bot: { ...event.bot, lineOaId, lineOaName } });
    toast.success(`LINE OA ${lineOaId} linked`);
  };
  const disconnect = () => {
    update({ bot: { connected: false } });
    setBotId(""); setLineOaId(""); setLineOaName("");
    toast.success("Bot disconnected");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Bot connection */}
      <Card className="glass p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Bot className="h-6 w-6" /></div>
          <div>
            <h3 className="font-semibold">Botnoi AI Bot</h3>
            <p className="text-xs text-muted-foreground">เชื่อมต่อ Botnoi bot เข้ากับ event นี้</p>
          </div>
          <Badge className={`ml-auto ${event.bot.connected ? "bg-emerald-500" : "bg-muted"}`}>
            {event.bot.connected ? t("platform.connected") : t("platform.notConnected")}
          </Badge>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Botnoi Bot ID</Label>
          <Input value={botId} onChange={(e) => setBotId(e.target.value)} placeholder="6a013f62fb3079f00791473e" className="font-mono text-sm" />
          <p className="text-xs text-muted-foreground">หาได้จาก <a className="text-primary underline" href="https://console.botnoi.ai" target="_blank" rel="noreferrer">console.botnoi.ai</a></p>
        </div>
        <Button onClick={connectBot} className="w-full bg-gradient-primary"><Sparkles className="h-4 w-4 mr-1.5" />{t("platform.connectBot")}</Button>
      </Card>

      {/* LINE OA */}
      <Card className="glass p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500 text-white"><MessageSquare className="h-6 w-6" /></div>
          <div>
            <h3 className="font-semibold">LINE Official Account</h3>
            <p className="text-xs text-muted-foreground">Link bot เข้ากับ LINE OA ของงาน</p>
          </div>
          <Badge className={`ml-auto ${event.bot.lineOaId ? "bg-emerald-500" : "bg-muted"}`}>
            {event.bot.lineOaId ? "Linked" : "Not linked"}
          </Badge>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">LINE OA ID</Label>
          <Input value={lineOaId} onChange={(e) => setLineOaId(e.target.value)} placeholder="@youroa" className="font-mono text-sm" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Display name</Label>
          <Input value={lineOaName} onChange={(e) => setLineOaName(e.target.value)} placeholder="EventIQ Assistant" />
        </div>
        <Button onClick={linkLine} disabled={!event.bot.connected} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
          <MessageSquare className="h-4 w-4 mr-1.5" />{t("platform.linkLine")}
        </Button>
        {!event.bot.connected && <p className="text-xs text-amber-600">⚠️ ต้องเชื่อมต่อ Bot ก่อนถึงจะ link LINE OA ได้</p>}
      </Card>

      {/* Status summary */}
      <Card className="glass p-5 md:col-span-2">
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Integration status</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <Status label="Bot connected" ok={event.bot.connected} value={event.bot.botId} />
          <Status label="LINE OA" ok={!!event.bot.lineOaId} value={event.bot.lineOaId} />
          <Status label="Webhook ready" ok={event.bot.connected && !!event.bot.lineOaId} value={event.bot.connected && event.bot.lineOaId ? "Active" : "Pending"} />
        </div>
        {event.bot.connected && (
          <div className="mt-4 pt-4 border-t flex justify-end">
            <Button variant="outline" size="sm" onClick={disconnect}>Disconnect all</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function Status({ label, ok, value }: { label: string; ok: boolean; value?: string }) {
  return (
    <div className="p-3 rounded-lg border bg-card">
      <div className="flex items-center gap-2 mb-1">
        {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="font-mono text-xs truncate">{value || "—"}</div>
    </div>
  );
}
