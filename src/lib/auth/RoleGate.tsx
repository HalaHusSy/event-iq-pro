import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth, hasAnyRole } from "./AuthProvider";
import type { AppRole } from "@/lib/supabase/types";
import { Loader2 } from "lucide-react";

type Props = {
  allow: AppRole[];
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGate({ allow, children, fallback }: Props) {
  const { loading, session, profile, configured } = useAuth();
  const location = useLocation();

  if (!configured) {
    return (
      <div className="container py-20 max-w-xl text-center">
        <h2 className="text-2xl font-bold mb-2">Supabase ยังไม่ได้ตั้งค่า</h2>
        <p className="text-muted-foreground">
          กรุณาเพิ่ม <code>VITE_SUPABASE_URL</code> และ <code>VITE_SUPABASE_ANON_KEY</code>{" "}
          ใน <code>.env</code>
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[40vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!hasAnyRole(profile?.role, allow)) {
    return (
      fallback ?? (
        <div className="container py-20 max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-2">ไม่ได้รับอนุญาต</h2>
          <p className="text-muted-foreground">
            บทบาทของคุณคือ <span className="font-mono">{profile?.role ?? "—"}</span> ซึ่งไม่สามารถเข้าหน้านี้ได้
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
}
