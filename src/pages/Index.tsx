import { Link } from "react-router-dom";
import {
  Target,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  MapPin,
  Calendar,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppShell from "@/components/AppShell";
import ParticleBackground from "@/components/ParticleBackground";
import { useI18n } from "@/lib/i18n";

const features = [
  {
    icon: Target,
    key: "f1",
    to: "/events",
    color: "from-indigo-500 to-violet-500",
    accent: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
  {
    icon: MessageSquare,
    key: "f2",
    to: "/events",
    color: "from-blue-500 to-cyan-500",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  },
];

const Index = () => {
  const { t } = useI18n();
  return (
    <AppShell>
      {/* Hero with particle background */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        <ParticleBackground density={140} />
        <div className="container py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <Badge variant="outline" className="mb-6 gap-1.5 py-1.5 px-3 backdrop-blur-sm bg-background/40 border-border/60">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="font-mono text-xs">{t("trust")}</span>
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <span className="gradient-text">{t("hero.title")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("hero.sub")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-shadow"
              >
                <Link to="/events">
                  {t("hero.cta.visitor")} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="backdrop-blur-sm bg-background/60">
                <Link to="/exhibitor">{t("hero.cta.exhibitor")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center mb-10 max-w-xl mx-auto">
          <Badge variant="outline" className="mb-3 font-mono text-xs">CORE FEATURES</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("features.title")}</h2>
          <p className="text-muted-foreground mt-2 text-sm">{t("features.sub")}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {features.map((f) => (
            <Link to={f.to} key={f.key} className="group">
              <Card className="p-6 h-full glass hover:shadow-elegant transition-all hover:-translate-y-1 duration-300">
                <div
                  className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1.5">{t(`${f.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`${f.key}.desc`)}</p>
                <div className="mt-4 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  {t("nav.visitor")} <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20">
        <div className="text-center mb-14 max-w-xl mx-auto">
          <Badge variant="outline" className="mb-3 font-mono text-xs">HOW IT WORKS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("how.title")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40" />

          {[
            { icon: MessageSquare, key: "how.1", n: "01" },
            { icon: Zap, key: "how.2", n: "02" },
            { icon: MapPin, key: "how.3", n: "03" },
          ].map((s) => (
            <div key={s.key} className="text-center relative">
              <div className="font-mono text-xs text-accent mb-3 font-bold tracking-wider">STEP {s.n}</div>
              <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow relative z-10 ring-8 ring-background">
                <s.icon className="h-8 w-8" />
              </div>
              <p className="font-semibold text-lg">{t(s.key)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "15s", k: "stats.matchTime", icon: Zap, gradient: "from-indigo-500 to-violet-500" },
            { v: "92%", k: "stats.precision", icon: Target, gradient: "from-rose-500 to-amber-500" },
            { v: "20+", k: "stats.exhibitors", icon: Calendar, gradient: "from-emerald-500 to-teal-500" },
            { v: "8", k: "stats.liveSessions", icon: TrendingUp, gradient: "from-blue-500 to-cyan-500" },
          ].map((s) => (
            <Card
              key={s.k}
              className="p-6 glass hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`mb-3 grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${s.gradient} text-white shadow-md`}
              >
                <s.icon className="h-4 w-4" />
              </div>
              <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-medium">
                {t(s.k)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <Card className="relative overflow-hidden p-10 md:p-16 text-center bg-gradient-primary text-primary-foreground border-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <div className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-white/20 backdrop-blur mb-5">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
              {t("cta.headline")}
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              {t("cta.sub")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link to="/events">
                  {t("nav.events")} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                <Link to="/exhibitor">{t("cta.register")}</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </AppShell>
  );
};

export default Index;
