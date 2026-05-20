import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Crown,
  Loader2,
  ShieldCheck,
  Sparkles,
  Target,
  MessageSquare,
  Zap,
} from "lucide-react";

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
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from;

  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasRoot, setHasRoot] = useState<boolean | null>(null);

  const [liEmail, setLiEmail] = useState("");
  const [liPass, setLiPass] = useState("");
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
        "บัญชีถูกสร้างแล้ว — Supabase อาจส่งอีเมลยืนยัน หากทดสอบในเครื่อง สามารถปิด email confirmation ที่ Supabase Dashboard"
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

  const features = [
    { icon: Target, title: "AI Booth Matching", desc: "เจอบูธที่ใช่ใน 15 วินาที" },
    { icon: MessageSquare, title: "Event FAQ Bot", desc: "ตอบทุกคำถามเกี่ยวกับงาน 24/7" },
    { icon: Zap, title: "Real-time Analytics", desc: "Insight สำหรับ organizer และ exhibitor" },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Branding panel — hidden on mobile */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-primary text-primary-foreground flex-col p-12">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-2.5 font-bold text-xl">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          EventIQ
        </Link>

        <div className="relative flex-1 flex flex-col justify-center max-w-md">
          <Badge variant="outline" className="self-start mb-6 bg-white/10 text-white border-white/30">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Admin Console
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            จัดการงานแสดงสินค้า<br />ด้วย AI ในที่เดียว
          </h1>
          <p className="mt-4 text-white/80 leading-relaxed">
            แพลตฟอร์มสำหรับ organizer / exhibitor / admin
            พร้อม insight แบบ real-time และ chatbot AI ในตัว
          </p>

          <div className="mt-10 space-y-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/15 backdrop-blur">
                  <f.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{f.title}</div>
                  <div className="text-xs text-white/70">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-white/60 font-mono">
          Powered by Botnoi AI · v2026.5
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col bg-background">
        {/* Mobile back link */}
        <div className="lg:hidden p-4">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> กลับหน้าหลัก
          </Link>
        </div>

        <div className="flex-1 grid place-items-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow mb-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">EventIQ</h2>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">เข้าสู่ระบบ</h2>
              <p className="text-sm text-muted-foreground mt-1.5">
                Root / Admin / Organizer / Exhibitor
              </p>
            </div>

            <Card className="p-6 border-2">
              <Tabs defaultValue="signin">
                <TabsList className="grid grid-cols-2 w-full mb-5">
                  <TabsTrigger value="signin">เข้าสู่ระบบ</TabsTrigger>
                  <TabsTrigger value="signup">สมัครสมาชิก</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={onSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="li-email" className="text-xs uppercase tracking-wider font-semibold">อีเมล</Label>
                      <Input
                        id="li-email"
                        type="email"
                        required
                        value={liEmail}
                        onChange={(e) => setLiEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="li-pass" className="text-xs uppercase tracking-wider font-semibold">รหัสผ่าน</Label>
                        <button type="button" className="text-xs text-primary hover:underline">
                          ลืมรหัสผ่าน?
                        </button>
                      </div>
                      <Input
                        id="li-pass"
                        type="password"
                        required
                        minLength={6}
                        value={liPass}
                        onChange={(e) => setLiPass(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1.5"
                      />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary shadow-md mt-2">
                      {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      {submitting ? t("loading.signin") : t("nav.signin")}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={onSignUp} className="space-y-4">
                    <div>
                      <Label htmlFor="su-name" className="text-xs uppercase tracking-wider font-semibold">ชื่อ-นามสกุล</Label>
                      <Input
                        id="su-name"
                        required
                        value={suName}
                        onChange={(e) => setSuName(e.target.value)}
                        placeholder="สมชาย ใจดี"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="su-email" className="text-xs uppercase tracking-wider font-semibold">อีเมล</Label>
                      <Input
                        id="su-email"
                        type="email"
                        required
                        value={suEmail}
                        onChange={(e) => setSuEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="su-pass" className="text-xs uppercase tracking-wider font-semibold">
                        รหัสผ่าน <span className="text-muted-foreground font-normal normal-case">(อย่างน้อย 6 ตัว)</span>
                      </Label>
                      <Input
                        id="su-pass"
                        type="password"
                        required
                        minLength={6}
                        value={suPass}
                        onChange={(e) => setSuPass(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1.5"
                      />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary shadow-md mt-2">
                      {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      สมัครสมาชิก
                    </Button>
                    <p className="text-xs text-muted-foreground text-center pt-1">
                      สมัครเป็น <Badge variant="secondary" className="font-mono text-[10px]">visitor</Badge> โดยอัตโนมัติ — admin จะเลื่อนตำแหน่งให้ภายหลัง
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
                <Alert className="mt-4 border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-100">
                  <AlertDescription>{info}</AlertDescription>
                </Alert>
              )}
            </Card>

            {hasRoot === false && session && (
              <Card className="p-5 mt-4 border-amber-300 bg-amber-50 dark:bg-amber-950/20">
                <div className="flex items-start gap-3">
                  <Crown className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">ยังไม่มี Root user ในระบบ</div>
                    <p className="text-sm text-muted-foreground mb-3">
                      คุณคือผู้ใช้คนแรกที่ login — สามารถ claim role <code className="font-mono bg-amber-100 dark:bg-amber-900/30 px-1 rounded">root</code> ได้
                    </p>
                    <Button onClick={onBootstrap} disabled={submitting} size="sm">
                      ตั้งฉันเป็น Root
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <p className="text-center mt-6 text-xs text-muted-foreground">
              By signing in, you agree to our <span className="text-primary hover:underline cursor-pointer">Terms</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
