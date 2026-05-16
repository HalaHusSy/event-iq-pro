import { Link } from "react-router-dom";
import { Target, MessageSquare, ArrowRight, Sparkles, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppShell from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

const features = [
  { icon: Target, key: "f1", to: "/visitor?tab=find", color: "from-indigo-500 to-violet-500" },
  { icon: MessageSquare, key: "f2", to: "/visitor?tab=ask", color: "from-blue-500 to-cyan-500" },
];

const Index = () => {
  const { t } = useI18n();
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden hero-bg">
        <div className="container py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <Badge variant="outline" className="mb-6 gap-1.5 py-1.5 px-3 glass">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="font-mono text-xs">{t("trust")}</span>
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              <span className="gradient-text">{t("hero.title")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("hero.sub")}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-shadow">
                <Link to="/visitor">{t("hero.cta.visitor")} <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/exhibitor">{t("hero.cta.exhibitor")}</Link>
              </Button>
            </div>
          </div>
          {/* floating decoration */}
          <div className="absolute top-20 -right-10 w-72 h-72 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-float" />
          <div className="absolute bottom-10 -left-10 w-72 h-72 bg-gradient-accent opacity-20 blur-3xl rounded-full animate-float" style={{animationDelay: "2s"}} />
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {features.map((f) => (
            <Link to={f.to} key={f.key} className="group">
              <Card className="p-6 h-full glass hover:shadow-elegant transition-all hover:-translate-y-1 duration-300">
                <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md`}>
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
      <section className="container py-20 mesh-bg rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">{t("how.title")}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: MessageSquare, key: "how.1", n: "01" },
            { icon: Zap, key: "how.2", n: "02" },
            { icon: MapPin, key: "how.3", n: "03" },
          ].map((s) => (
            <div key={s.key} className="text-center">
              <div className="font-mono text-xs text-accent mb-3">STEP {s.n}</div>
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <s.icon className="h-7 w-7" />
              </div>
              <p className="font-medium text-lg">{t(s.key)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-20">
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { v: "15s", l: "Avg. match time" },
            { v: "92%", l: "Match precision" },
            { v: "20+", l: "Exhibitors" },
          ].map(s => (
            <div key={s.l} className="text-center p-6 rounded-2xl glass">
              <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
};

export default Index;
