import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  MapPin,
  Users,
  Bot,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  Calendar,
  Building2,
  Crown,
  Loader2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  listEvents,
  listExhibitors,
  listOrganizers,
  listProfiles,
  createEvent,
  updateEvent,
  deleteEvent,
  getPlatformSetting,
  upsertPlatformSetting,
} from "@/lib/data/queries";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

type EventRow = Awaited<ReturnType<typeof listEvents>>[number];
type ExhibitorRow = Awaited<ReturnType<typeof listExhibitors>>[number];

const STATUS_STYLES: Record<string, string> = {
  live: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  upcoming: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  past: "border-muted-foreground/30 bg-muted text-muted-foreground",
  draft: "border-muted-foreground/30 bg-muted text-muted-foreground",
};

export default function Platform() {
  const { t } = useI18n();
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["platform", "events"],
    queryFn: () => listEvents(),
  });
  const { data: exhibitors = [] } = useQuery({
    queryKey: ["platform", "exhibitors"],
    queryFn: () => listExhibitors(),
  });
  const { data: organizers = [] } = useQuery({
    queryKey: ["platform", "organizers"],
    queryFn: listOrganizers,
  });
  const { data: profiles = [] } = useQuery({
    queryKey: ["platform", "profiles"],
    queryFn: listProfiles,
  });

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const selected = useMemo(
    () => events.find((e) => e.id === selectedEventId) ?? events[0] ?? null,
    [events, selectedEventId],
  );

  const exhibitorsByEvent = useMemo(() => {
    const m = new Map<string, number>();
    for (const ex of exhibitors) m.set(ex.event_id, (m.get(ex.event_id) ?? 0) + 1);
    return m;
  }, [exhibitors]);

  const adminCount = profiles.filter((p) =>
    ["admin", "organizer", "root"].includes(p.role),
  ).length;

  return (
    <AppShell>
      <div className="container py-8 space-y-8 max-w-7xl">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Root account
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {t("platform.title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{t("platform.sub")}</p>
          </div>
          {selected && (
            <div className="flex items-center gap-3 text-sm">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Active event</div>
                <Select
                  value={selected.id}
                  onValueChange={setSelectedEventId}
                >
                  <SelectTrigger className="w-[260px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </header>

        {/* Stats row */}
        <StatsRow
          totalEvents={events.length}
          liveEvents={events.filter((e) => e.status === "live").length}
          totalExhibitors={exhibitors.length}
          totalAdmins={adminCount}
        />

        {/* Chart */}
        <ExhibitorChart events={events} byEvent={exhibitorsByEvent} />

        {/* Tabs */}
        <Tabs defaultValue="events">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-1.5" />
              {t("platform.tab.events")}
            </TabsTrigger>
            <TabsTrigger value="admins">
              <Users className="h-4 w-4 mr-1.5" />
              {t("platform.tab.admins")}
            </TabsTrigger>
            <TabsTrigger value="exhibitors">
              <Building2 className="h-4 w-4 mr-1.5" />
              {t("platform.tab.exhibitors")}
            </TabsTrigger>
            <TabsTrigger value="bot">
              <Bot className="h-4 w-4 mr-1.5" />
              {t("platform.tab.bot")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            <EventsManager
              events={events}
              loading={eventsLoading}
              organizers={organizers}
              exhibitorsByEvent={exhibitorsByEvent}
            />
          </TabsContent>

          <TabsContent value="admins" className="mt-6">
            <AdminsManager event={selected} profiles={profiles} />
          </TabsContent>

          <TabsContent value="exhibitors" className="mt-6">
            <ExhibitorsManager
              event={selected}
              exhibitors={exhibitors.filter((e) => e.event_id === selected?.id)}
            />
          </TabsContent>

          <TabsContent value="bot" className="mt-6">
            <BotManager event={selected} />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

/* ------------------------------ Stats ------------------------------ */

function StatsRow({
  totalEvents,
  liveEvents,
  totalExhibitors,
  totalAdmins,
}: {
  totalEvents: number;
  liveEvents: number;
  totalExhibitors: number;
  totalAdmins: number;
}) {
  const { t } = useI18n();
  const items = [
    { label: t("platform.stats.events"), value: totalEvents, icon: Calendar },
    { label: t("platform.stats.live"), value: liveEvents, icon: Sparkles },
    { label: t("platform.stats.exhibitors"), value: totalExhibitors, icon: Building2 },
    { label: t("platform.stats.admins"), value: totalAdmins, icon: Users },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="p-4 border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">{label}</span>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-semibold tabular-nums">{value}</div>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------ Chart ------------------------------ */

function ExhibitorChart({
  events,
  byEvent,
}: {
  events: EventRow[];
  byEvent: Map<string, number>;
}) {
  const { t } = useI18n();
  const data = events.map((e) => ({
    name: e.name.length > 18 ? e.name.slice(0, 16) + "…" : e.name,
    count: byEvent.get(e.id) ?? 0,
  }));
  if (data.length === 0) return null;
  return (
    <Card className="p-5 border">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-medium">{t("platform.chart.title")}</h2>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

/* ------------------------------ Events Tab ------------------------------ */

function EventsManager({
  events,
  loading,
  organizers,
  exhibitorsByEvent,
}: {
  events: EventRow[];
  loading: boolean;
  organizers: Awaited<ReturnType<typeof listOrganizers>>;
  exhibitorsByEvent: Map<string, number>;
}) {
  const { t } = useI18n();
  const qc = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [deleting, setDeleting] = useState<EventRow | null>(null);

  const createMut = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "events"] });
      toast.success("Event created");
      setCreateOpen(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Record<string, unknown> }) =>
      updateEvent(id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "events"] });
      toast.success("Event updated");
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const deleteMut = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "events"] });
      toast.success("Event deleted");
      setDeleting(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Card className="border overflow-hidden">
      <div className="p-5 border-b flex items-center justify-between">
        <div>
          <h2 className="font-medium">All events</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {events.length} {events.length === 1 ? "event" : "events"} in system
          </p>
        </div>
        <EventFormDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          mode="create"
          organizers={organizers}
          onSubmit={(values) =>
            createMut.mutate({
              organizerId: values.organizer_id,
              name: values.name,
              location: values.location || undefined,
              startDate: values.start_date || undefined,
              endDate: values.end_date || undefined,
              status: values.status,
              description: values.description || undefined,
            })
          }
          submitting={createMut.isPending}
          trigger={
            <Button
              size="sm"
              disabled={organizers.length === 0}
              title={organizers.length === 0 ? "Create an organizer first" : undefined}
            >
              <Plus className="h-4 w-4 mr-1" />
              {t("platform.create")}
            </Button>
          }
        />
      </div>
      {organizers.length === 0 && (
        <div className="px-5 py-2 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs border-b border-amber-500/20">
          ⚠ No organizers in system — create one via Root Dashboard before adding events
        </div>
      )}

      {loading ? (
        <div className="p-12 flex items-center justify-center text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          Loading…
        </div>
      ) : events.length === 0 ? (
        <div className="p-12 text-center text-sm text-muted-foreground">
          {t("platform.empty.events")}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="text-center">Exhibitors</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((e) => (
              <TableRow key={e.id}>
                <TableCell>
                  <div className="font-medium">{e.name}</div>
                  {e.location && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {e.location}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={STATUS_STYLES[e.status] ?? STATUS_STYLES.draft}
                  >
                    {e.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {e.start_date && e.end_date
                    ? `${e.start_date} → ${e.end_date}`
                    : e.start_date || "—"}
                </TableCell>
                <TableCell className="text-center font-mono text-sm">
                  {exhibitorsByEvent.get(e.id) ?? 0}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditing(e)}
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleting(e)}
                    aria-label="Delete"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Edit dialog */}
      <EventFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        mode="edit"
        initial={editing}
        organizers={organizers}
        onSubmit={(values) =>
          editing &&
          updateMut.mutate({
            id: editing.id,
            patch: {
              name: values.name,
              location: values.location || null,
              start_date: values.start_date || null,
              end_date: values.end_date || null,
              status: values.status,
              description: values.description || null,
              organizer_id: values.organizer_id,
            },
          })
        }
        submitting={updateMut.isPending}
      />

      {/* Delete confirm */}
      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("platform.confirmDelete")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-medium text-foreground">{deleting?.name}</span>
              <br />
              {t("platform.deleteWarning")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("platform.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleting && deleteMut.mutate(deleting.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMut.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("platform.delete")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

/* ----------------------- Event form (create / edit) ----------------------- */

interface EventFormValues {
  organizer_id: string;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  description: string;
}

function EventFormDialog({
  open,
  onOpenChange,
  mode,
  initial,
  organizers,
  onSubmit,
  submitting,
  trigger,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  mode: "create" | "edit";
  initial?: EventRow | null;
  organizers: Awaited<ReturnType<typeof listOrganizers>>;
  onSubmit: (values: EventFormValues) => void;
  submitting: boolean;
  trigger?: React.ReactNode;
}) {
  const { t } = useI18n();
  const [values, setValues] = useState<EventFormValues>({
    organizer_id: initial?.organizer_id ?? organizers[0]?.id ?? "",
    name: initial?.name ?? "",
    location: initial?.location ?? "",
    start_date: initial?.start_date ?? "",
    end_date: initial?.end_date ?? "",
    status: initial?.status ?? "upcoming",
    description: initial?.description ?? "",
  });

  // reset form when dialog opens with a different record
  useEffect(() => {
    if (open) {
      setValues({
        organizer_id: initial?.organizer_id ?? organizers[0]?.id ?? "",
        name: initial?.name ?? "",
        location: initial?.location ?? "",
        start_date: initial?.start_date ?? "",
        end_date: initial?.end_date ?? "",
        status: initial?.status ?? "upcoming",
        description: initial?.description ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial?.id]);

  const submit = () => {
    if (!values.name.trim()) return toast.error("Name required");
    if (!values.organizer_id) return toast.error("Organizer required");
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? t("platform.create") : t("platform.edit")}
          </DialogTitle>
          <DialogDescription className="sr-only">Event form</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label className="text-xs">Organizer *</Label>
            <Select
              value={values.organizer_id}
              onValueChange={(v) => setValues({ ...values, organizer_id: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select organizer" />
              </SelectTrigger>
              <SelectContent>
                {organizers.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {organizers.length === 0 && (
              <p className="text-xs text-amber-600 mt-1">
                ⚠ ไม่มี organizer ในระบบ — สร้าง organizer ก่อน
              </p>
            )}
          </div>
          <div>
            <Label className="text-xs">Event name *</Label>
            <Input
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder="Bangkok AI Summit 2026"
            />
          </div>
          <div>
            <Label className="text-xs">Location</Label>
            <Input
              value={values.location}
              onChange={(e) => setValues({ ...values, location: e.target.value })}
              placeholder="BITEC Bangna, Hall A-D"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Start date</Label>
              <Input
                type="date"
                value={values.start_date}
                onChange={(e) => setValues({ ...values, start_date: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs">End date</Label>
              <Input
                type="date"
                value={values.end_date}
                onChange={(e) => setValues({ ...values, end_date: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Status</Label>
            <Select
              value={values.status}
              onValueChange={(v) => setValues({ ...values, status: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">draft</SelectItem>
                <SelectItem value="upcoming">upcoming</SelectItem>
                <SelectItem value="live">live</SelectItem>
                <SelectItem value="past">past</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Description</Label>
            <Textarea
              rows={2}
              value={values.description}
              onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("platform.cancel")}
          </Button>
          <Button onClick={submit} disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {submitting
              ? mode === "create"
                ? t("loading.create")
                : t("loading.save")
              : t("platform.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------ Admins Tab ------------------------------ */

function AdminsManager({
  event,
  profiles,
}: {
  event: EventRow | null;
  profiles: Awaited<ReturnType<typeof listProfiles>>;
}) {
  const admins = profiles.filter((p) =>
    ["admin", "organizer", "root"].includes(p.role),
  );

  if (!event) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground border">
        Select an event first
      </Card>
    );
  }

  return (
    <Card className="border">
      <div className="p-5 border-b">
        <h2 className="font-medium">Admins · {event.name}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Users with admin / organizer / root role can manage this event
        </p>
      </div>
      {admins.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No admins yet
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-mono text-xs">{a.email}</TableCell>
                <TableCell>{a.full_name || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {a.role}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

/* ----------------------- Exhibitors Tab ----------------------- */

function ExhibitorsManager({
  event,
  exhibitors,
}: {
  event: EventRow | null;
  exhibitors: ExhibitorRow[];
}) {
  if (!event) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground border">
        Select an event first
      </Card>
    );
  }
  return (
    <Card className="border">
      <div className="p-5 border-b">
        <h2 className="font-medium">Exhibitors · {event.name}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {exhibitors.length} {exhibitors.length === 1 ? "exhibitor" : "exhibitors"}{" "}
          registered
        </p>
      </div>
      {exhibitors.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No exhibitors registered yet
        </div>
      ) : (
        <div className="divide-y">
          {exhibitors.map((ex) => (
            <div key={ex.id} className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg border bg-muted/30 grid place-items-center text-muted-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{ex.company_name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                  <span className="font-mono">Booth {ex.booth_id}</span>
                  {ex.tags?.length ? (
                    <>
                      <span>·</span>
                      <span className="truncate">{ex.tags.slice(0, 3).join(", ")}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* ------------------------------ Bot Tab ------------------------------ */

interface BotConfig {
  connected?: boolean;
  bot_id?: string;
  line_oa_id?: string;
  line_oa_name?: string;
}

function BotManager({ event }: { event: EventRow | null }) {
  const { t } = useI18n();
  const qc = useQueryClient();
  const settingKey = event ? `bot.event.${event.id}` : null;

  const { data: setting } = useQuery({
    queryKey: ["platform", "bot-setting", event?.id],
    queryFn: () => (settingKey ? getPlatformSetting(settingKey) : null),
    enabled: !!settingKey,
  });
  const cfg = ((setting?.value as BotConfig) ?? {}) as BotConfig;

  const [botId, setBotId] = useState("");
  const [lineOaId, setLineOaId] = useState("");
  const [lineOaName, setLineOaName] = useState("");
  useEffect(() => {
    setBotId(cfg.bot_id ?? "");
    setLineOaId(cfg.line_oa_id ?? "");
    setLineOaName(cfg.line_oa_name ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.id, setting?.value]);

  const save = useMutation({
    mutationFn: (patch: BotConfig) =>
      settingKey
        ? upsertPlatformSetting(settingKey, { ...cfg, ...patch } as never)
        : Promise.resolve(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "bot-setting", event?.id] });
      toast.success("Bot settings saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!event) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground border">
        Select an event first
      </Card>
    );
  }

  const connected = !!cfg.bot_id;
  const linked = !!cfg.line_oa_id;

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Card className="p-5 border space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg border bg-muted/30 grid place-items-center">
            <Bot className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Botnoi AI</h3>
            <p className="text-xs text-muted-foreground">
              Connect Botnoi bot to this event
            </p>
          </div>
          <Badge
            variant="outline"
            className={
              connected
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-muted-foreground/30 text-muted-foreground"
            }
          >
            {connected ? t("platform.connected") : t("platform.notConnected")}
          </Badge>
        </div>
        <div>
          <Label className="text-xs">Botnoi Bot ID</Label>
          <Input
            value={botId}
            onChange={(e) => setBotId(e.target.value)}
            placeholder="6a013f62fb3079f00791473e"
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Find at{" "}
            <a
              className="underline"
              href="https://console.botnoi.ai"
              target="_blank"
              rel="noreferrer"
            >
              console.botnoi.ai
            </a>
          </p>
        </div>
        <Button
          onClick={() => save.mutate({ bot_id: botId, connected: !!botId })}
          disabled={save.isPending}
          className="w-full"
          variant={connected ? "outline" : "default"}
        >
          {save.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : connected ? (
            t("platform.save")
          ) : (
            t("platform.connectBot")
          )}
        </Button>
      </Card>

      <Card className="p-5 border space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg border bg-muted/30 grid place-items-center">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">LINE Official Account</h3>
            <p className="text-xs text-muted-foreground">
              Link bot to your LINE OA
            </p>
          </div>
          <Badge
            variant="outline"
            className={
              linked
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-muted-foreground/30 text-muted-foreground"
            }
          >
            {linked ? "Linked" : "Not linked"}
          </Badge>
        </div>
        <div>
          <Label className="text-xs">LINE OA ID</Label>
          <Input
            value={lineOaId}
            onChange={(e) => setLineOaId(e.target.value)}
            placeholder="@youroa"
            className="font-mono text-sm"
          />
        </div>
        <div>
          <Label className="text-xs">Display name</Label>
          <Input
            value={lineOaName}
            onChange={(e) => setLineOaName(e.target.value)}
            placeholder="YouWalk Assistant"
          />
        </div>
        <Button
          onClick={() =>
            save.mutate({ line_oa_id: lineOaId, line_oa_name: lineOaName })
          }
          disabled={save.isPending || !connected}
          className="w-full"
          variant="outline"
        >
          {save.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("platform.linkLine")
          )}
        </Button>
        {!connected && (
          <p className="text-xs text-amber-600">
            ⚠ Connect Bot first before linking LINE OA
          </p>
        )}
      </Card>

      <Card className="p-5 border md:col-span-2">
        <h3 className="font-medium mb-4 flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          Integration status
        </h3>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <StatusRow label="Bot connected" ok={connected} value={cfg.bot_id} />
          <StatusRow label="LINE OA" ok={linked} value={cfg.line_oa_id} />
          <StatusRow
            label="Webhook ready"
            ok={connected && linked}
            value={connected && linked ? "Active" : "Pending"}
          />
        </div>
      </Card>
    </div>
  );
}

function StatusRow({ label, ok, value }: { label: string; ok: boolean; value?: string }) {
  return (
    <div className="p-3 rounded-lg border bg-muted/20">
      <div className="flex items-center gap-2 mb-1">
        {ok ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="font-mono text-xs truncate">{value || "—"}</div>
    </div>
  );
}
