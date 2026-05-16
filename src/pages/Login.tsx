import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/lib/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";
import { Crown, Loader2, ShieldCheck } from "lucide-react";

type LocationState = { from?: string };

const ROLE_HOME: Record<string, string> = {
  root: "/root",
  admin: "/dashboard/admin",
  organizer: "/organizer",
  exhibitor: "/dashboard/exhibitor",
  visitor: "/visitor",
  speaker: "/speaker",
};

export default function Login() {
  const { session, profile, signIn, signUp, bootstrapRoot, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from;

  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasRoot, setHasRoot] = useState<boolean | null>(null);

  // login form
  const [liEmail, setLiEmail] = useState("");
  const [liPass, setLiPass] = useState("");

  // signup form
  const [suEmail, setSuEmail] = useState("");
  const [suPass, setSuPass] = useState("");
  const [suName, setSuName] = useState("");

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "root")
      .then(({ count }) => setHasRoot((count ?? 0) > 0));
  }, [session]);

  if (!loading && session && profile) {
    const dest = from || ROLE_HOME[profile.role] || "/";
    return <Navigate to={dest} replace />;
  }

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const res = await signIn(liEmail, liPass);
    setSubmitting(false);
    if (res.error) setError(res.error);
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    const res = await signUp(suEmail, suPass, suName);
    setSubmitting(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.needsConfirm) {
      setInfo(
        "บัญชีถูกสร้างแล้ว — Supabase อาจส่งอีเมลยืนยัน ถ้าทดสอบในเครื่อง สามารถปิด email confirmation ที่ Supabase Dashboard → Auth → Providers → Email"
      );
    } else {
      setInfo("สมัครสำเร็จ! ระบบกำลังเข้าสู่ระบบ...");
    }
  };

  const onBootstrap = async () => {
    setError(null);
    setSubmitting(true);
    const res = await bootstrapRoot();
    setSubmitting(false);
    if (res.error) setError(res.error);
    else navigate("/root", { replace: true });
  };

  return (
    <AppShell>
      <section className="container py-16 max-w-md">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3 glass">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Event IQ Admin
          </Badge>
          <h1 className="text-3xl font-bold">เข้าสู่ระบบจัดการ</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            สำหรับ Root / Admin / Organizer / Exhibitor
          </p>
        </div>

        <Card className="p-6 glass">
          <Tabs defaultValue="signin">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="signin">เข้าสู่ระบบ</TabsTrigger>
              <TabsTrigger value="signup">สมัครสมาชิก</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={onSignIn} className="space-y-3">
                <div>
                  <Label htmlFor="li-email">อีเมล</Label>
                  <Input
                    id="li-email"
                    type="email"
                    required
                    value={liEmail}
                    onChange={(e) => setLiEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="li-pass">รหัสผ่าน</Label>
                  <Input
                    id="li-pass"
                    type="password"
                    required
                    minLength={6}
                    value={liPass}
                    onChange={(e) => setLiPass(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary">
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  เข้าสู่ระบบ
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={onSignUp} className="space-y-3">
                <div>
                  <Label htmlFor="su-name">ชื่อ-นามสกุล</Label>
                  <Input
                    id="su-name"
                    required
                    value={suName}
                    onChange={(e) => setSuName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="su-email">อีเมล</Label>
                  <Input
                    id="su-email"
                    type="email"
                    required
                    value={suEmail}
                    onChange={(e) => setSuEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="su-pass">รหัสผ่าน (อย่างน้อย 6 ตัว)</Label>
                  <Input
                    id="su-pass"
                    type="password"
                    required
                    minLength={6}
                    value={suPass}
                    onChange={(e) => setSuPass(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  สมัครสมาชิก (Visitor)
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  สมัครเป็น visitor โดยอัตโนมัติ • Root/Admin เลื่อนตำแหน่งให้ภายหลัง
                </p>
              </form>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {info && (
            <Alert className="mt-4">
              <AlertDescription>{info}</AlertDescription>
            </Alert>
          )}
        </Card>

        {hasRoot === false && session && (
          <Card className="p-5 mt-4 border-amber-300 bg-amber-50 dark:bg-amber-950/20">
            <div className="flex items-start gap-3">
              <Crown className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold">ยังไม่มี Root user ในระบบ</div>
                <p className="text-sm text-muted-foreground mb-3">
                  คุณคือผู้ใช้คนแรกที่ login — สามารถ claim role <code>root</code> ได้
                </p>
                <Button onClick={onBootstrap} disabled={submitting} size="sm">
                  ตั้งฉันเป็น Root
                </Button>
              </div>
            </div>
          </Card>
        )}

        <p className="text-center mt-6 text-sm text-muted-foreground">
          กลับไป <Link to="/" className="text-primary hover:underline">หน้าหลัก</Link>
        </p>
      </section>
    </AppShell>
  );
}
