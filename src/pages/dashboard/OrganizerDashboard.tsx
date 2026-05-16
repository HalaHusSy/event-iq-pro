import { useMemo, useState } from "react";
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
import { Building2, Calendar as CalendarIcon, Layers, Loader2, Plus, Trash2 } from "lucide-react";
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
import { EditBoothDialog } from "@/components/booth/EditBoothDialog";

const NAV = [
  { id: "overview", label: "My Events", icon: CalendarIcon },
  { id: "exhibitors", label: "Exhibitors", icon: Layers },
  { id: "profile", label: "Company", icon: Building2 },
];

export default function OrganizerDashboard() {
  const [view, setView] = useState("overview");
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
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : !organizer ? (
        <Card className="p-6 glass">
          <h2 className="font-semibold mb-2">ยังไม่ได้ link เข้ากับ organizer</h2>
          <p className="text-sm text-muted-foreground">
            กรุณาให้ admin สร้าง organizer record สำหรับ account นี้
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

function MyEvents({ organizerId }: { organizerId: string }) {
  const qc = useQueryClient();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", organizerId],
    queryFn: () => listEvents(organizerId),
  });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState("upcoming");

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
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Record<string, unknown> }) => updateEvent(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="p-5 glass">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">My Events ({events.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-1" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>สร้าง Event ใหม่</DialogTitle></DialogHeader>
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
                  <SelectTrigger><SelectValue /></SelectTrigger>
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
              <Button onClick={() => create.mutate()} disabled={!name || create.isPending}>
                {create.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                สร้าง
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell className="text-xs">{e.location}</TableCell>
              <TableCell className="text-xs">{e.start_date} → {e.end_date}</TableCell>
              <TableCell>
                <Select
                  value={e.status}
                  onValueChange={(v) => update.mutate({ id: e.id, patch: { status: v } })}
                >
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">upcoming</SelectItem>
                    <SelectItem value="live">live</SelectItem>
                    <SelectItem value="past">past</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm" variant="ghost"
                  onClick={() => { if (confirm("ลบ event นี้?")) del.mutate(e.id); }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {events.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                ยังไม่มี event — กดปุ่ม "Create Event" เพื่อเริ่ม
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

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
  const [eventId, setEventId] = useState("");
  const [boothId, setBoothId] = useState("");
  const [company, setCompany] = useState("");
  const [userId, setUserId] = useState<string>("none");
  const [description, setDescription] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState("");

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

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="p-5 glass">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">My Exhibitors ({exhibitors.length})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-primary" disabled={events.length === 0}>
              <Plus className="h-4 w-4 mr-1" /> Add Exhibitor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>เพิ่ม Exhibitor ใหม่</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Event</Label>
                <Select value={eventId} onValueChange={setEventId}>
                  <SelectTrigger><SelectValue placeholder="เลือก event" /></SelectTrigger>
                  <SelectContent>
                    {events.map((e) => (
                      <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
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
                  <SelectTrigger><SelectValue placeholder="ไม่ link" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— ไม่ link —</SelectItem>
                    {linkable.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.email}</SelectItem>
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booth</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Linked</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exhibitors.map((x) => {
            const ev = events.find((e) => e.id === x.event_id);
            return (
              <TableRow key={x.id}>
                <TableCell className="font-mono">{x.booth_id}</TableCell>
                <TableCell className="font-medium">{x.company_name}</TableCell>
                <TableCell className="text-xs">{ev?.name ?? "—"}</TableCell>
                <TableCell>
                  {x.user_id ? <Badge variant="outline">linked</Badge> : <Badge variant="secondary">no user</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <EditBoothDialog booth={x} />
                    <Button
                      size="sm" variant="ghost"
                      onClick={() => { if (confirm("ลบ exhibitor นี้?")) del.mutate(x.id); }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {exhibitors.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                {events.length === 0 ? "สร้าง event ก่อนเพิ่ม exhibitor" : "ยังไม่มี exhibitor"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

function CompanyProfile({ organizer }: { organizer: { id: string; company_name: string; package: string; contact_email: string | null; contact_phone: string | null } }) {
  return (
    <Card className="p-5 glass max-w-xl">
      <h2 className="font-semibold mb-3">Company Profile</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between border-b pb-2">
          <dt className="text-muted-foreground">Company</dt>
          <dd className="font-medium">{organizer.company_name}</dd>
        </div>
        <div className="flex justify-between border-b pb-2">
          <dt className="text-muted-foreground">Package</dt>
          <dd><Badge>{organizer.package}</Badge></dd>
        </div>
        <div className="flex justify-between border-b pb-2">
          <dt className="text-muted-foreground">Contact Email</dt>
          <dd>{organizer.contact_email ?? "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Contact Phone</dt>
          <dd>{organizer.contact_phone ?? "—"}</dd>
        </div>
      </dl>
      <p className="text-xs text-muted-foreground mt-4">
        ติดต่อ admin เพื่ออัพเกรด package หรือแก้ไขข้อมูลบริษัท
      </p>
    </Card>
  );
}
