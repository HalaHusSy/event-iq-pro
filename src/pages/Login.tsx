import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Settings, User, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { Role, getRole, setRole, getDefaultRouteForRole, getRoleEmail } from '@/lib/auth';

const OPTIONS: { role: Role; icon: typeof ShieldCheck; descTh: string; descEn: string; tone: string }[] = [
  {
    role: 'root',
    icon: ShieldCheck,
    descTh: 'จัดการ event, admin และ bot ของทั้งแพลตฟอร์ม',
    descEn: 'Manage events, admins, and bots across the platform',
    tone: 'from-fuchsia-500 to-violet-600',
  },
  {
    role: 'admin',
    icon: Settings,
    descTh: 'ดูแล exhibitor, FAQ, analytics และ Botnoi integration ของ event ที่รับผิดชอบ',
    descEn: 'Manage exhibitors, FAQ, analytics, and Botnoi integration for assigned events',
    tone: 'from-sky-500 to-indigo-600',
  },
  {
    role: 'visitor',
    icon: User,
    descTh: 'หา booth ที่ตอบโจทย์ ด้วยแชทบอท EventIQ',
    descEn: 'Find the right booth via the EventIQ chat assistant',
    tone: 'from-emerald-500 to-teal-600',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  useEffect(() => {
    const existing = getRole();
    if (existing) {
      navigate(getDefaultRouteForRole(existing), { replace: true });
    }
  }, [navigate]);

  const handleLogin = (role: Role) => {
    setRole(role);
    navigate(getDefaultRouteForRole(role), { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold">EventIQ</span>
        </div>

        <Card className="p-8 glass">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3">{lang === 'th' ? 'Demo · Pitch Preview' : 'Demo · Pitch Preview'}</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {lang === 'th' ? 'เข้าสู่ระบบเพื่อชม demo' : 'Sign in to preview the demo'}
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {lang === 'th'
                ? 'เลือก role เพื่อดูประสบการณ์ที่ตรงกับผู้ใช้แต่ละกลุ่ม ระบบจริงจะเชื่อม email/password และ SSO ในเฟสถัดไป'
                : 'Pick a role to preview the matching user experience. Production auth (email/password, SSO) is on the roadmap.'}
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.role}
                  onClick={() => handleLogin(opt.role)}
                  className="group flex items-start gap-4 rounded-xl border bg-card p-4 sm:p-5 text-left transition-all hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br ${opt.tone} text-white shadow-md flex-shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold capitalize">{opt.role}</span>
                      <Badge variant="secondary" className="text-[10px] font-mono">{getRoleEmail(opt.role)}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {lang === 'th' ? opt.descTh : opt.descEn}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground self-center transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            {lang === 'th'
              ? '💡 Mock auth — role ถูกเก็บใน localStorage เท่านั้น ไม่มีการเชื่อม backend จริง'
              : '💡 Mock auth — role is stored in localStorage only, no real backend yet.'}
          </p>
        </Card>
      </div>
    </div>
  );
}
