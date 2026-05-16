import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Plus,
  ShieldCheck,
  Trash2,
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
import { EditBoothDialog } from "@/components/booth/EditBoothDialog";

const NAV = [
  { id: "overview", label: "Overview", icon: ShieldCheck },
  { id: "organizers", label: "Organizers", icon: Building2 },
  { id: "events", label: "All Events", icon: CalendarIcon },
  { id: "exhibitors", label: "All Exhibitors", icon: Layers },
];

export default function AdminDashboard() {
  const [view, setView] = useState("overview");
  return (
    <DashboardLayout
      title="Admin Console"
      subtitle="Platform administrator — จัดการ organizer / event / support"
      roleBadge="ADMIN"
      roleBadgeClass="bg-red-500/15 text-red-700 border-red-500/30"
      nav={NAV}
      activeId={view}
      onSelect={setView}
    >
      {view === "overview" && <Overview />}
      {view === "organizers" && <Organizers />}
      {view === "events" && <AllEvents />}
      {view === "exhibitors" && <AllExhibitors />}
    </DashboardLayout>
  );
}

function Overview() {
  const { data } = useQuery({ queryKey: ["platform_stats"], queryFn: getPlatformStats });
  const s = data ?? {};
  const cards = [
    { label: "Organizers", value: s.total_organizers, icon: Building2, color: "from-indigo-500 to-violet-500" },
    { label: "Events", value: s.total_events, icon: CalendarIcon, color: "from-rose-500 to-amber-500" },
    { label: "Exhibitors", value: s.total_exhibitors, icon: Layers, color: "from-emerald-500 to-teal-500" },
    { label: "Live Events", value: s.events_live, icon: ShieldCheck, color: "from-green-500 to-lime-500" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card key={c.label} className="p-5 glass">
          <div className={`mb-3 grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${c.color} text-white shadow-md`}>
            <c.icon className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold font-mono">{c.value ?? 0}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{c.label}</div>
        </Card>
      ))}
    </div>
  );
}

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
  const [userId, setUserId] = useState("");
  const [company, setCompany] = useState("");
  const [pkg, setPkg] = useState("starter");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

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

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="p-5 glass">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Organizers ({organizers.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-1" /> Create Organizer
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
                  <SelectTrigger><SelectValue placeholder="เลือก user" /></SelectTrigger>
                  <SelectContent>
                    {eligible.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.email} — {p.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  User ต้อง sign up เป็น visitor ก่อน
                </p>
              </div>
              <div>
                <Label>ชื่อบริษัท</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div>
                <Label>Package</Label>
                <Select value={pkg} onValueChange={setPkg}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
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
              <Button variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
              <Button
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizers.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-medium">{o.company_name}</TableCell>
              <TableCell className="text-xs">
                {o.contact_email ?? "—"}
                <br />
                <span className="text-muted-foreground">{o.contact_phone ?? ""}</span>
              </TableCell>
              <TableCell><Badge>{o.package}</Badge></TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(o.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {organizers.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                ยังไม่มี organizer
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

function AllEvents() {
  const qc = useQueryClient();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => listEvents(),
  });
  const del = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      toast.success("ลบ event แล้ว");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="p-5 glass">
      <h2 className="font-semibold mb-3">Events ทั้งหมด ({events.length})</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((e) => {
            const org = (e as { organizers?: { company_name?: string } }).organizers;
            return (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell>{org?.company_name ?? "—"}</TableCell>
                <TableCell className="text-xs">
                  {e.start_date} → {e.end_date}
                </TableCell>
                <TableCell><Badge variant="outline">{e.status}</Badge></TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`ลบ event "${e.name}"?`)) del.mutate(e.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

function AllExhibitors() {
  const { data: exhibitors = [], isLoading } = useQuery({
    queryKey: ["exhibitors"],
    queryFn: () => listExhibitors(),
  });

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="p-5 glass">
      <h2 className="font-semibold mb-3">Exhibitors ทั้งหมด ({exhibitors.length})</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booth</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Linked User</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exhibitors.map((x) => {
            const ev = (x as { events?: { name?: string } }).events;
            return (
              <TableRow key={x.id}>
                <TableCell className="font-mono">{x.booth_id}</TableCell>
                <TableCell className="font-medium">{x.company_name}</TableCell>
                <TableCell className="text-xs">{ev?.name ?? "—"}</TableCell>
                <TableCell className="text-xs">{x.contact_email ?? "—"}</TableCell>
                <TableCell>
                  {x.user_id ? <Badge variant="outline">linked</Badge> : <Badge variant="secondary">unlinked</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <EditBoothDialog booth={x} />
                </TableCell>
              </TableRow>
            );
          })}
          {exhibitors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                ยังไม่มี exhibitor
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
