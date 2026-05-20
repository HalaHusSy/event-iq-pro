import { Link, Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth, hasAnyRole } from "./AuthProvider";
import type { AppRole } from "@/lib/supabase/types";
import { Loader2, ShieldOff, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppShell from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

type Props = {
  allow: AppRole[];
  children: ReactNode;
  fallback?: ReactNode;
};

const ROLE_HOME: Record<string, string> = {
  root: "/root",
  admin: "/dashboard/admin",
  organizer: "/organizer",
  exhibitor: "/dashboard/exhibitor",
  visitor: "/visitor",
  speaker: "/speaker",
};

export function RoleGate({ allow, children, fallback }: Props) {
  const { loading, session, profile, configured } = useAuth();
  const { t } = useI18n();
  const location = useLocation();

  if (!configured) {
    return (
      <AppShell>
        <div className="container py-20 max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-2">Supabase ยังไม่ได้ตั้งค่า</h2>
          <p className="text-muted-foreground">
            กรุณาเพิ่ม <code>VITE_SUPABASE_URL</code> และ{" "}
            <code>VITE_SUPABASE_ANON_KEY</code> ใน <code>.env</code>
          </p>
        </div>
      </AppShell>
    );
  }

  if (loading) {
    return (
      <AppShell>
        <div className="grid place-items-center min-h-[40vh]">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!hasAnyRole(profile?.role, allow)) {
    if (fallback) return <>{fallback}</>;
    const role = profile?.role ?? "—";
    const dashboardPath = profile?.role ? ROLE_HOME[profile.role] : null;
    const body = t("guard.forbidden.body").replace("{role}", role);
    return (
      <AppShell>
        <div className="container py-20 max-w-xl text-center">
          <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-destructive/10 text-destructive mb-4">
            <ShieldOff className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t("guard.forbidden.title")}</h2>
          <p className="text-muted-foreground mb-2">
            {body.split("{role}")[0]}
            <Badge variant="outline" className="font-mono mx-1">{role}</Badge>
            {body.split("{role}")[1]}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="h-4 w-4 mr-1.5" />
                {t("guard.goHome")}
              </Link>
            </Button>
            {dashboardPath && (
              <Button asChild>
                <Link to={dashboardPath}>
                  <LayoutDashboard className="h-4 w-4 mr-1.5" />
                  {t("guard.goDashboard")}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </AppShell>
    );
  }

  return <>{children}</>;
}
