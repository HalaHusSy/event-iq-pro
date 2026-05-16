import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Users, Mic } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PLATFORM_EVENTS, type PlatformEvent } from "@/lib/mock/events";
import { useI18n } from "@/lib/i18n";

const fmt = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : lang, { day: "numeric", month: "short", year: "numeric" });

function EventCard({ e }: { e: PlatformEvent }) {
  const { t, lang } = useI18n();
  const statusColor =
    e.status === "live" ? "bg-emerald-500" : e.status === "upcoming" ? "bg-amber-500" : "bg-muted-foreground";
  const statusLabel = e.status === "live" ? t("events.live") : e.status === "upcoming" ? t("events.upcoming") : t("events.past");
  return (
    <Card className="glass overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 duration-300 group">
      <div className="aspect-[16/7] bg-gradient-primary grid place-items-center text-7xl relative">
        <span>{e.cover}</span>
        <Badge className={`absolute top-3 right-3 ${statusColor} text-white border-0 gap-1.5`}>
          {e.status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
          {statusLabel}
        </Badge>
      </div>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight">{e.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{e.description}</p>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />{fmt(e.startDate, lang)} – {fmt(e.endDate, lang)}</div>
          <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{e.venue}</div>
        </div>
        <div className="flex items-center gap-3 text-xs pt-2 border-t">
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-primary" />{e.exhibitorCount} {t("events.exhibitors")}</span>
          <span className="flex items-center gap-1"><Mic className="h-3.5 w-3.5 text-accent" />{e.sessionCount} {t("events.sessions")}</span>
        </div>
        <Button asChild className="w-full bg-gradient-primary group-hover:shadow-glow transition-shadow">
          <Link to={`/platform?event=${e.slug}`}>{t("events.enter")} <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
    </Card>
  );
}

export default function Events() {
  const { t } = useI18n();
  const filterBy = (s: PlatformEvent["status"] | "all") =>
    s === "all" ? PLATFORM_EVENTS : PLATFORM_EVENTS.filter((e) => e.status === s);

  const renderGrid = (list: PlatformEvent[]) =>
    list.length === 0 ? (
      <div className="text-center py-16 text-muted-foreground">No events</div>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((e) => <EventCard key={e.id} e={e} />)}
      </div>
    );

  return (
    <AppShell>
      <section className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">{t("events.title")}</h1>
          <p className="text-muted-foreground mt-2">{t("events.sub")}</p>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({PLATFORM_EVENTS.length})</TabsTrigger>
            <TabsTrigger value="live">{t("events.live")} ({filterBy("live").length})</TabsTrigger>
            <TabsTrigger value="upcoming">{t("events.upcoming")} ({filterBy("upcoming").length})</TabsTrigger>
            <TabsTrigger value="past">{t("events.past")} ({filterBy("past").length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all">{renderGrid(filterBy("all"))}</TabsContent>
          <TabsContent value="live">{renderGrid(filterBy("live"))}</TabsContent>
          <TabsContent value="upcoming">{renderGrid(filterBy("upcoming"))}</TabsContent>
          <TabsContent value="past">{renderGrid(filterBy("past"))}</TabsContent>
        </Tabs>
      </section>
    </AppShell>
  );
}
