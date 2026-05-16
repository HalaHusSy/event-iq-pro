import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Building2,
  Calendar,
  Crown,
  Layers,
  ShieldCheck,
  Users,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  getPlatformStats,
  listAuditLogs,
  listProfiles,
  setUserRole,
} from "@/lib/data/queries";
import type { AppRole } from "@/lib/supabase/types";

const NAV = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "admins", label: "Manage Admins", icon: Crown },
  { id: "users", label: "All Users", icon: Users },
  { id: "audit", label: "Audit Logs", icon: ShieldCheck },
];

const ROLES: AppRole[] = ["root", "admin", "organizer", "exhibitor", "visitor", "speaker"];

export default function RootDashboard() {
  const [view, setView] = useState("overview");

  return (
    <DashboardLayout
      title="Root Console"
      subtitle="System owner — บริหาร platform ทั้งหมด"
      roleBadge="ROOT"
      roleBadgeClass="bg-purple-500/15 text-purple-700 border-purple-500/30"
      nav={NAV}
      activeId={view}
      onSelect={setView}
    >
      {view === "overview" && <Overview />}
      {view === "admins" && <ManageAdmins />}
      {view === "users" && <AllUsers />}
      {view === "audit" && <AuditLogs />}
    </DashboardLayout>
  );
}

function Overview() {
  const { data, isLoading } = useQuery({
    queryKey: ["platform_stats"],
    queryFn: getPlatformStats,
  });

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;
  const s = data ?? {};
  const cards = [
    { label: "Total Users", value: s.total_users, icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Admins", value: s.total_admins, icon: Crown, color: "from-purple-500 to-pink-500" },
    { label: "Organizers", value: s.total_organizers, icon: Building2, color: "from-indigo-500 to-violet-500" },
    { label: "Events", value: s.total_events, icon: Calendar, color: "from-rose-500 to-amber-500" },
    { label: "Exhibitors", value: s.total_exhibitors, icon: Layers, color: "from-emerald-500 to-teal-500" },
    { label: "Live Events", value: s.events_live, icon: Activity, color: "from-green-500 to-lime-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <Card className="p-5 glass">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>• Manage Admins — สร้าง / ลด สิทธิ์ admin account</p>
          <p>• Audit Logs — ตรวจสอบกิจกรรมในระบบ</p>
          <p>• ทุก organizer / event / exhibitor มองเห็นได้ทั้งหมด</p>
        </div>
      </Card>
    </div>
  );
}

function ManageAdmins() {
  const qc = useQueryClient();
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: listProfiles,
  });

  const promote = useMutation({
    mutationFn: ({ id, role }: { id: string; role: AppRole }) => setUserRole(id, role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profiles"] });
      qc.invalidateQueries({ queryKey: ["platform_stats"] });
      toast.success("อัพเดต role สำเร็จ");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const admins = profiles.filter((p) => p.role === "root" || p.role === "admin");
  const visitors = profiles.filter((p) => p.role === "visitor");

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <div className="space-y-6">
      <Card className="p-5 glass">
        <h2 className="font-semibold mb-3">Admins / Roots ปัจจุบัน ({admins.length})</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.email}</TableCell>
                <TableCell>{p.full_name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{p.role}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Select
                    value={p.role}
                    onValueChange={(v) => promote.mutate({ id: p.id, role: v as AppRole })}
                  >
                    <SelectTrigger className="w-36 ml-auto"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-5 glass">
        <h2 className="font-semibold mb-3">เลื่อนตำแหน่ง Visitor เป็น Admin</h2>
        <p className="text-sm text-muted-foreground mb-3">
          User สมัครเองเป็น visitor — Root เลื่อนตำแหน่งเป็น admin หรือ role อื่น
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Promote</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitors.slice(0, 20).map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.email}</TableCell>
                <TableCell>{p.full_name}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(p.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => promote.mutate({ id: p.id, role: "admin" })}
                  >
                    Make Admin
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {visitors.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                  ไม่มี visitor users
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function AllUsers() {
  const qc = useQueryClient();
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: listProfiles,
  });

  const promote = useMutation({
    mutationFn: ({ id, role }: { id: string; role: AppRole }) => setUserRole(id, role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profiles"] });
      toast.success("อัพเดต role สำเร็จ");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="p-5 glass">
      <h2 className="font-semibold mb-3">All Users ({profiles.length})</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Change Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-mono text-xs">{p.email}</TableCell>
              <TableCell>{p.full_name}</TableCell>
              <TableCell><Badge variant="outline">{p.role}</Badge></TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(p.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Select
                  value={p.role}
                  onValueChange={(v) => promote.mutate({ id: p.id, role: v as AppRole })}
                >
                  <SelectTrigger className="w-32 ml-auto"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function AuditLogs() {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["audit_logs"],
    queryFn: () => listAuditLogs(100),
  });

  if (isLoading) return <Loader2 className="h-6 w-6 animate-spin" />;

  return (
    <Card className="p-5 glass">
      <h2 className="font-semibold mb-3">Audit Logs (last 100)</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead>Metadata</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((l) => (
            <TableRow key={l.id}>
              <TableCell className="text-xs whitespace-nowrap">
                {new Date(l.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="text-xs">
                {(l as { profiles?: { email?: string } }).profiles?.email ?? "—"}
              </TableCell>
              <TableCell><Badge variant="outline">{l.actor_role}</Badge></TableCell>
              <TableCell className="font-mono text-xs">{l.action}</TableCell>
              <TableCell className="font-mono text-xs">{l.entity_type}</TableCell>
              <TableCell className="font-mono text-xs max-w-xs truncate">
                {JSON.stringify(l.metadata)}
              </TableCell>
            </TableRow>
          ))}
          {logs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                ยังไม่มี audit log
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
