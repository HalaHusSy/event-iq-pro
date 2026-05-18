import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import {
  createOrganizer,
  deleteEvent,
  getPlatformStats,
  listEvents,
  listExhibitors,
  listOrganizers,
  listProfiles,
} from "@/lib/data/queries";

const NAV = [
  { id: "overview", label: "Overview", icon: ShieldCheck },
  { id: "organizers", label: "Organizers", icon: Building2 },
  { id: "events", label: "All Events", icon: CalendarIcon },
  { id: "exhibitors", label: "All Exhibitors", icon: Layers },
];

function fmtDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function initials(name?: string | null) {
  const src = name?.trim() || "?";
  const parts = src.split(/[\s@.]+/).filter(Boolean);
  return (parts[0]?.[0] ?? "?").toUpperCase() + (parts[1]?.[0]?.toUpperCase() ?? "");
}

export default function AdminDashboard() {
  const [view, setView] = useState("overview");
  const qc = useQueryClient();
  return (
    <DashboardLayout
      title="Admin Console"
      subtitle="Platform administrator — จัดการ organizer / event / exhibitor"
      roleBadge="ADMIN"
      roleBadgeClass="bg-red-500/15 text-red-700 border-red-500/30"
      nav={NAV}
      activeId={view}
      onSelect={setView}
      headerActions={
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
      }
    >
      {view === "overview" && <Overview />}
      {view === "organizers" && <Organizers />}
      {view === "events" && <AllEvents />}
      {view === "exhibitors" && <AllExhibitors />}
    </DashboardLayout>
  );
}

/* ---------------- Overview ---------------- */
function Overview() {
  const { data: stats } = useQuery({ queryKey: ["platform_stats"], queryFn: getPlatformStats });
  const { data: events = [] } = useQuery({ queryKey: ["events"], queryFn: () => listEvents() });
  const { data: organizers = [] } = useQuery({ queryKey: ["organizers"], queryFn: listOrganizers });

  const s = stats ?? {};
  const live = events.filter((e) => e.status === "live").length;
  const upcoming = events.filter((e) => e.status === "upcoming").length;
  const past = events.filter((e) => e.status === "past").length;

  const recentEvents = events.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Organizers"
          value={s.total_organizers ?? organizers.length}
          icon={Building2}
          gradient="from-indigo-500 to-violet-500"
          hint="active companies"
        />
        <StatCard
          label="Events"
          value={s.total_events ?? events.length}
          icon={CalendarIcon}
          gradient="from-rose-500 to-amber-500"
          hint={`${live} live · ${upcoming} upcoming · ${past} past`}
        />
        <StatCard
          label="Exhibitors"
          value={s.total_exhibitors}
          icon={Layers}
          gradient="from-emerald-500 to-teal-500"
          hint="total booths"
        />
        <StatCard
          label="Live Now"
          value={s.events_live ?? live}
          icon={Activity}
          gradient="from-green-500 to-lime-500"
          hint="events in progress"
        />
      </div>

      {/* Recent events */}
      <Card className="glass">
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Recent Events</h2>
            <p className="text-xs text-muted-foreground mt-0.5">งานล่าสุดในระบบ</p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {recentEvents.length} of {events.length}
          </Badge>
        </div>
        <div className="divide-y">
          {recentEvents.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">ยังไม่มี event</div>
          )}
          {recentEvents.map((e) => {
            const org = (e as { organizers?: { company_name?: string } }).organizers;
            return (
              <div key={e.id} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shrink-0">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{e.name}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-0.5">
                    {fmtDate(e.start_date)} → {fmtDate(e.end_date)} · {org?.company_name ?? "—"}
                  </div>
                </div>
                <StatusBadge status={e.status} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Organizers ---------------- */
function Organizers() {
  const qc = useQueryClient();
  const { data: organizers = [], isLoading } = useQuery({
    queryKey: ["organizers"],
    queryFn: listOrganizers,
  });
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: listProfiles,
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [company, setCompany] = useState("");
  const [pkg, setPkg] = useState("starter");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return organizers;
    return organizers.filter(
      (o) =>
        o.company_name?.toLowerCase().includes(q) ||
        o.contact_email?.toLowerCase().includes(q) ||
        o.package?.toLowerCase().includes(q)
    );
  }, [organizers, search]);

  const mut = useMutation({
    mutationFn: () =>
      createOrganizer({
        userId,
        companyName: company,
        pkg,
        contactEmail: contactEmail || undefined,
        contactPhone: contactPhone || undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["organizers"] });
      qc.invalidateQueries({ queryKey: ["profiles"] });
      qc.invalidateQueries({ queryKey: ["platform_stats"] });
      toast.success("สร้าง organizer สำเร็จ");
      setOpen(false);
      setUserId("");
      setCompany("");
      setContactEmail("");
      setContactPhone("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const eligible = profiles.filter((p) => p.role === "visitor");

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
          <h2 className="font-semibold">Organizers</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{organizers.length} companies registered</p>
        </div>
        <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหา company..."
              className="pl-8 h-9"
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary shrink-0">
                <Plus className="h-4 w-4 mr-1" /> Create
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>สร้าง Organizer ใหม่</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>เลือก User (visitor)</Label>
                  <Select value={userId} onValueChange={setUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก user" />
                    </SelectTrigger>
                    <SelectContent>
                      {eligible.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.email} — {p.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">User ต้อง sign up เป็น visitor ก่อน</p>
                </div>
                <div>
                  <Label>ชื่อบริษัท</Label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div>
                  <Label>Package</Label>
                  <Select value={pkg} onValueChange={setPkg}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Contact Email</Label>
                    <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                  </div>
                  <div>
                    <Label>Contact Phone</Label>
                    <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  ยกเลิก
                </Button>
                <Button
                  className="bg-gradient-primary"
                  onClick={() => mut.mutate()}
                  disabled={!userId || !company || mut.isPending}
                >
                  {mut.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
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
            <TableHead>Contact</TableHead>
            <TableHead>Package</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((o) => (
            <TableRow key={o.id} className="hover:bg-muted/40">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-semibold">
                      {initials(o.company_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{o.company_name}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {(o as { profiles?: { email?: string } }).profiles?.email ?? ""}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs">{o.contact_email ?? "—"}</div>
                <div className="text-xs text-muted-foreground">{o.contact_phone ?? ""}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {o.package}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-xs text-muted-foreground font-mono">
                {fmtDate(o.created_at)}
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                <Building2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                {search ? "ไม่พบ organizer ตามคำค้นหา" : "ยังไม่มี organizer — กด Create เพื่อเริ่ม"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

/* ---------------- All Events ---------------- */
function AllEvents() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => listEvents(),
  });
  const del = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["platform_stats"] });
      toast.success("ลบ event แล้ว");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((e) => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (!q) return true;
      const org = (e as { organizers?: { company_name?: string } }).organizers?.company_name ?? "";
      return e.name.toLowerCase().includes(q) || org.toLowerCase().includes(q) || (e.location ?? "").toLowerCase().includes(q);
    });
  }, [events, search, statusFilter]);

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
          <h2 className="font-semibold">All Events</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} of {events.length} events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหา event..."
              className="pl-8 h-9 w-56"
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((e) => {
            const org = (e as { organizers?: { company_name?: string } }).organizers;
            return (
              <TableRow key={e.id} className="hover:bg-muted/40">
                <TableCell>
                  <div className="font-medium">{e.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
                    {e.location ?? ""}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{org?.company_name ?? "—"}</TableCell>
                <TableCell className="text-xs font-mono">
                  {fmtDate(e.start_date)}
                  <div className="text-muted-foreground">→ {fmtDate(e.end_date)}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={e.status} />
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
                        onClick={() => navigator.clipboard.writeText(e.id) && toast("Copied event ID")}
                      >
                        Copy event ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          if (confirm(`ลบ event "${e.name}"?`)) del.mutate(e.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
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
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
                {search || statusFilter !== "all" ? "ไม่พบ event ตามตัวกรอง" : "ยังไม่มี event"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

/* ---------------- All Exhibitors ---------------- */
function AllExhibitors() {
  const [search, setSearch] = useState("");
  const { data: exhibitors = [], isLoading } = useQuery({
    queryKey: ["exhibitors"],
    queryFn: () => listExhibitors(),
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return exhibitors;
    return exhibitors.filter(
      (x) =>
        x.company_name?.toLowerCase().includes(q) ||
        x.booth_id?.toLowerCase().includes(q) ||
        x.contact_email?.toLowerCase().includes(q) ||
        (x as { events?: { name?: string } }).events?.name?.toLowerCase().includes(q)
    );
  }, [exhibitors, search]);

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
          <h2 className="font-semibold">All Exhibitors</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} of {exhibitors.length} booths
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหา company / booth..."
            className="pl-8 h-9 w-72"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Booth</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((x) => {
            const ev = (x as { events?: { name?: string } }).events;
            return (
              <TableRow key={x.id} className="hover:bg-muted/40">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl shrink-0 leading-none">{x.logo_url || "🏢"}</div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{x.company_name}</div>
                      {x.tags && x.tags.length > 0 && (
                        <div className="text-xs text-muted-foreground truncate">
                          {x.tags.slice(0, 3).join(" · ")}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono">
                    {x.booth_id}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{ev?.name ?? "—"}</TableCell>
                <TableCell className="text-xs">{x.contact_email ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={x.user_id ? "linked" : "unlinked"} />
                </TableCell>
              </TableRow>
            );
          })}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                <Layers className="h-8 w-8 mx-auto mb-2 opacity-30" />
                {search ? "ไม่พบ exhibitor ตามคำค้นหา" : "ยังไม่มี exhibitor"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
