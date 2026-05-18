import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Building2,
  Calendar as CalendarIcon,
  Layers,
  Loader2,
  MapPin,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  createEvent,
  createExhibitor,
  deleteEvent,
  deleteExhibitor,
  getMyOrganizer,
  listEvents,
  listExhibitors,
  listProfiles,
  updateEvent,
} from "@/lib/data/queries";

const NAV = [
  { id: "overview", label: "My Events", icon: CalendarIcon },
  { id: "exhibitors", label: "Exhibitors", icon: Layers },
  { id: "profile", label: "Company", icon: Building2 },
];

function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function daysFromNow(iso?: string | null) {
  if (!iso) return null;
  const diff = Math.floor((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function OrganizerDashboard() {
  const [view, setView] = useState("overview");
  const qc = useQueryClient();
  const { data: organizer, isLoading } = useQuery({
    queryKey: ["my_organizer"],
    queryFn: getMyOrganizer,
  });

  return (
    <DashboardLayout
      title="Organizer Console"
      subtitle={organizer?.company_name ?? "Event organizer dashboard"}
      roleBadge="ORGANIZER"
      roleBadgeClass="bg-blue-500/15 text-blue-700 border-blue-500/30"
      nav={NAV}
      activeId={view}
      onSelect={setView}
      headerActions={
        organizer && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              qc.invalidateQueries();
              toast.success("รีเฟรชข้อมูลแล้ว");
            }}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh
          </Button>
        )
      }
    >
      {isLoading ? (
        <Card className="p-12 grid place-items-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </Card>
      ) : !organizer ? (
        <Card className="p-12 text-center max-w-lg mx-auto">
          <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
          <h2 className="font-semibold mb-2">ยังไม่ได้ link เข้ากับ organizer</h2>
          <p className="text-sm text-muted-foreground">
            กรุณาให้ admin สร้าง organizer record สำหรับ account นี้ก่อนจึงจะใช้งานได้
          </p>
        </Card>
      ) : (
        <>
          {view === "overview" && <MyEvents organizerId={organizer.id} />}
          {view === "exhibitors" && <MyExhibitors organizerId={organizer.id} />}
          {view === "profile" && <CompanyProfile organizer={organizer} />}
        </>
      )}
    </DashboardLayout>
  );
}

/* ---------------- My Events ---------------- */
function MyEvents({ organizerId }: { organizerId: string }) {
  const qc = useQueryClient();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", organizerId],
    queryFn: () => listEvents(organizerId),
  });
  const { data: allExhibitors = [] } = useQuery({
    queryKey: ["exhibitors"],
    queryFn: () => listExhibitors(),
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState("upcoming");

  const exhibitorCountByEvent = useMemo(() => {
    const map = new Map<string, number>();
    for (const x of allExhibitors) map.set(x.event_id, (map.get(x.event_id) ?? 0) + 1);
    return map;
  }, [allExhibitors]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        (e.location ?? "").toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q)
    );
  }, [events, search]);

  const create = useMutation({
    mutationFn: () =>
      createEvent({
        organizerId,
        name,
        description,
        location,
        startDate: start || undefined,
        endDate: end || undefined,
        status,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["events", organizerId] });
      qc.invalidateQueries({ queryKey: ["platform_stats"] });
      toast.success("สร้าง event สำเร็จ");
      setOpen(false);
      setName(""); setDescription(""); setLocation(""); setStart(""); setEnd("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["events", organizerId] });
      toast.success("ลบ event แล้ว");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Record<string, unknown> }) => updateEvent(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading)
    return (
      <Card className="p-12 grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );

  const live = events.filter((e) => e.status === "live").length;
  const upcoming = events.filter((e) => e.status === "upcoming").length;
  const totalExhibitors = events.reduce((sum, e) => sum + (exhibitorCountByEvent.get(e.id) ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total Events" value={events.length} icon={CalendarIcon} gradient="from-rose-500 to-amber-500" hint={`${live} live · ${upcoming} upcoming`} />
        <StatCard label="Live Now" value={live} icon={Users} gradient="from-emerald-500 to-teal-500" hint="events in progress" />
        <StatCard label="Total Exhibitors" value={totalExhibitors} icon={Layers} gradient="from-indigo-500 to-violet-500" hint="across all your events" />
      </div>

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-lg">My Events</h2>
          <p className="text-xs text-muted-foreground">{filtered.length} of {events.length} events</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหา event..."
              className="pl-8 h-9 w-56"
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-1" /> Create Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>สร้าง Event ใหม่</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Event Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Money Expo Thailand 2026" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="IMPACT Muang Thong Thani" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="past">Past</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
                <Button
                  className="bg-gradient-primary"
                  onClick={() => create.mutate()}
                  disabled={!name || create.isPending}
                >
                  {create.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  สร้าง
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Event grid */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            {search ? "ไม่พบ event ตามคำค้นหา" : "ยังไม่มี event — กด Create Event เพื่อเริ่ม"}
          </p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((e) => {
            const days = daysFromNow(e.start_date);
            const exCount = exhibitorCountByEvent.get(e.id) ?? 0;
            const timeHint =
              e.status === "live"
                ? "🟢 กำลังจัด"
                : e.status === "past"
                ? "จบแล้ว"
                : days !== null && days >= 0
                ? `อีก ${days} วัน`
                : "—";
            return (
              <Card key={e.id} className="glass hover:shadow-elegant transition-all hover:-translate-y-1 duration-300 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <StatusBadge status={e.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-7 w-7 -mr-2 -mt-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => update.mutate({ id: e.id, patch: { status: "live" } })}
                        >
                          Set Live
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => update.mutate({ id: e.id, patch: { status: "upcoming" } })}
                        >
                          Set Upcoming
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => update.mutate({ id: e.id, patch: { status: "past" } })}
                        >
                          Set Past
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            if (confirm("ลบ event นี้?")) del.mutate(e.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-2" />
                          Delete event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
                    {e.name}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-mono">
                        {fmtDate(e.start_date)} → {fmtDate(e.end_date)}
                      </span>
                    </div>
                    {e.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{e.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-5 py-3 bg-muted/40 border-t flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{timeHint}</span>
                  <Badge variant="outline" className="font-mono">
                    <Layers className="h-3 w-3 mr-1" />
                    {exCount} exhibitors
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- My Exhibitors ---------------- */
function MyExhibitors({ organizerId }: { organizerId: string }) {
  const qc = useQueryClient();
  const { data: events = [] } = useQuery({
    queryKey: ["events", organizerId],
    queryFn: () => listEvents(organizerId),
  });
  const eventIds = useMemo(() => events.map((e) => e.id), [events]);

  const { data: allExhibitors = [], isLoading } = useQuery({
    queryKey: ["exhibitors", organizerId],
    queryFn: () => listExhibitors(),
    enabled: events.length > 0,
  });
  const exhibitors = useMemo(
    () => allExhibitors.filter((x) => eventIds.includes(x.event_id)),
    [allExhibitors, eventIds]
  );

  const { data: profiles = [] } = useQuery({ queryKey: ["profiles"], queryFn: listProfiles });
  const linkable = profiles.filter((p) => p.role === "exhibitor" || p.role === "visitor");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [eventId, setEventId] = useState("");
  const [boothId, setBoothId] = useState("");
  const [company, setCompany] = useState("");
  const [userId, setUserId] = useState<string>("none");
  const [description, setDescription] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return exhibitors.filter((x) => {
      if (eventFilter !== "all" && x.event_id !== eventFilter) return false;
      if (!q) return true;
      return (
        x.company_name?.toLowerCase().includes(q) ||
        x.booth_id?.toLowerCase().includes(q) ||
        x.contact_email?.toLowerCase().includes(q)
      );
    });
  }, [exhibitors, search, eventFilter]);

  const create = useMutation({
    mutationFn: () =>
      createExhibitor({
        eventId,
        boothId,
        companyName: company,
        userId: userId === "none" ? null : userId,
        description: description || undefined,
        productInfo: productInfo || undefined,
        contactEmail: contactEmail || undefined,
        website: website || undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exhibitors"] });
      qc.invalidateQueries({ queryKey: ["exhibitors", organizerId] });
      qc.invalidateQueries({ queryKey: ["platform_stats"] });
      toast.success("เพิ่ม exhibitor สำเร็จ");
      setOpen(false);
      setEventId(""); setBoothId(""); setCompany(""); setUserId("none");
      setDescription(""); setProductInfo(""); setContactEmail(""); setWebsite("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: deleteExhibitor,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exhibitors"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading)
    return (
      <Card className="p-12 grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );

  return (
    <Card className="glass">
      <div className="p-5 border-b flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">My Exhibitors</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} of {exhibitors.length} booths
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-40 h-9">
              <SelectValue placeholder="All events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All events</SelectItem>
              {events.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหา..."
              className="pl-8 h-9 w-48"
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary" disabled={events.length === 0}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>เพิ่ม Exhibitor ใหม่</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Event</Label>
                  <Select value={eventId} onValueChange={setEventId}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก event" />
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
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Booth ID</Label>
                    <Input value={boothId} onChange={(e) => setBoothId(e.target.value)} placeholder="A-101" />
                  </div>
                  <div>
                    <Label>Company Name</Label>
                    <Input value={company} onChange={(e) => setCompany(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Link User (optional)</Label>
                  <Select value={userId} onValueChange={setUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="ไม่ link" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— ไม่ link —</SelectItem>
                      {linkable.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Link user เพื่อให้ exhibitor login มาแก้ booth ของตัวเองได้
                  </p>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
                </div>
                <div>
                  <Label>Product Info</Label>
                  <Textarea value={productInfo} onChange={(e) => setProductInfo(e.target.value)} rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Contact Email</Label>
                    <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                  </div>
                  <div>
                    <Label>Website</Label>
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
                <Button
                  className="bg-gradient-primary"
                  onClick={() => create.mutate()}
                  disabled={!eventId || !boothId || !company || create.isPending}
                >
                  {create.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  สร้าง
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Booth</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((x) => {
            const ev = events.find((e) => e.id === x.event_id);
            return (
              <TableRow key={x.id} className="hover:bg-muted/40">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl shrink-0 leading-none">{x.logo_url || "🏢"}</div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{x.company_name}</div>
                      <div className="text-xs text-muted-foreground truncate">{x.contact_email ?? ""}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono">
                    {x.booth_id}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{ev?.name ?? "—"}</TableCell>
                <TableCell>
                  <StatusBadge status={x.user_id ? "linked" : "unlinked"} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(x.id) && toast("Copied exhibitor ID")}
                      >
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          if (confirm("ลบ exhibitor นี้?")) del.mutate(x.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                <Layers className="h-8 w-8 mx-auto mb-2 opacity-30" />
                {events.length === 0
                  ? "สร้าง event ก่อนเพิ่ม exhibitor"
                  : search || eventFilter !== "all"
                  ? "ไม่พบ exhibitor ตามตัวกรอง"
                  : "ยังไม่มี exhibitor"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

/* ---------------- Company Profile ---------------- */
function CompanyProfile({
  organizer,
}: {
  organizer: {
    id: string;
    company_name: string;
    package: string;
    contact_email: string | null;
    contact_phone: string | null;
  };
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <Card className="glass overflow-hidden">
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur text-2xl font-bold">
              {organizer.company_name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-bold leading-tight truncate">{organizer.company_name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-white/20 text-white border-white/30 capitalize">
                  {organizer.package} plan
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Contact Email</div>
              <div className="font-mono text-sm">{organizer.contact_email ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Contact Phone</div>
              <div className="font-mono text-sm">{organizer.contact_phone ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Organizer ID</div>
              <div className="font-mono text-xs truncate">{organizer.id}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Package</div>
              <Badge variant="outline" className="capitalize">{organizer.package}</Badge>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground">
              ติดต่อ admin เพื่ออัพเกรด package หรือแก้ไขข้อมูลบริษัท
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
