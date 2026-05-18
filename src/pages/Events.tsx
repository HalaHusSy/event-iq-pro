import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Loader2, MapPin, Users, Search, Sparkles } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { listEvents, listExhibitors } from "@/lib/data/queries";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

type DisplayEvent = {
  id: string;
  name: string;
  cover: string;
  venue: string;
  startDate: string;
  endDate: string;
  status: "live" | "upcoming" | "past";
  exhibitorCount: number;
  description: string;
};

// Pick an emoji cover based on keywords in the event name (deterministic, no DB column needed)
function pickCover(name: string): string {
  const n = name.toLowerCase();
  if (/(tech|ai|software|saas|cloud|data)/.test(n)) return "🚀";
  if (/(food|cook|coffee|restaurant|culinary)/.test(n)) return "🍜";
  if (/(money|finance|bank|fintech|invest)/.test(n)) return "💰";
  if (/(health|medical|hospital|wellness|pharma)/.test(n)) return "🏥";
  if (/(green|eco|sustain|energy|environment)/.test(n)) return "🌱";
  if (/(education|edu|school|learn|train)/.test(n)) return "🎓";
  if (/(beauty|fashion|cosmet|lifestyle)/.test(n)) return "💄";
  if (/(auto|car|mobility|vehicle)/.test(n)) return "🚗";
  return "🎪";
}

const fmt = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang === "th" ? "th-TH" : lang, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function daysFromNow(iso: string): number {
  return Math.floor((new Date(iso).getTime() - Date.now()) / 86400000);
}

function EventCard({ e }: { e: DisplayEvent }) {
  const { t, lang } = useI18n();
  const statusColor =
    e.status === "live"
      ? "bg-emerald-500"
      : e.status === "upcoming"
      ? "bg-amber-500"
      : "bg-muted-foreground";
  const statusLabel =
    e.status === "live" ? t("events.live") : e.status === "upcoming" ? t("events.upcoming") : t("events.past");
  const days = daysFromNow(e.startDate);
  const countdownLabel =
    e.status === "live"
      ? "🟢 กำลังจัด"
      : e.status === "past"
      ? "จบแล้ว"
      : days > 0
      ? `อีก ${days} วัน`
      : "เริ่มวันนี้";

  return (
    <Card className="glass overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 duration-300 group">
      <div className="aspect-[16/7] bg-gradient-primary grid place-items-center text-7xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <span className="relative z-10">{e.cover}</span>
        <Badge className={`absolute top-3 right-3 ${statusColor} text-white border-0 gap-1.5`}>
          {e.status === "live" && (
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          )}
          {statusLabel}
        </Badge>
      </div>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">{e.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{e.description}</p>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span className="font-mono">
              {fmt(e.startDate, lang)} – {fmt(e.endDate, lang)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{e.venue || "—"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs pt-2 border-t">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono font-semibold">{e.exhibitorCount}</span>
            <span className="text-muted-foreground">{t("events.exhibitors")}</span>
          </span>
          <span className="ml-auto text-muted-foreground">{countdownLabel}</span>
        </div>
        <Button asChild className="w-full bg-gradient-primary group-hover:shadow-glow transition-shadow">
          <Link to={`/visitor?event=${e.id}`}>
            {t("events.enter")} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export default function Events() {
  const { t, lang } = useI18n();
  const location = useLocation();
  const [search, setSearch] = useState("");

  // Toast เมื่อโดน redirect มาจาก /visitor โดยไม่ได้เลือก event
  useEffect(() => {
    if ((location.state as { requireEvent?: boolean } | null)?.requireEvent) {
      toast.info(
        lang === "th"
          ? "กรุณาเลือก event ก่อนใช้งาน Visitor portal"
          : "Please select an event before using the Visitor portal",
        { duration: 4000 }
      );
      window.history.replaceState({}, "");
    }
  }, [location.state, lang]);

  const { data: rawEvents = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => listEvents(),
  });
  const { data: allExhibitors = [] } = useQuery({
    queryKey: ["exhibitors"],
    queryFn: () => listExhibitors(),
  });

  const exhibitorCountByEvent = useMemo(() => {
    const map = new Map<string, number>();
    for (const x of allExhibitors) map.set(x.event_id, (map.get(x.event_id) ?? 0) + 1);
    return map;
  }, [allExhibitors]);

  const events: DisplayEvent[] = useMemo(
    () =>
      rawEvents.map((e) => ({
        id: e.id,
        name: e.name,
        cover: pickCover(e.name),
        venue: e.location ?? "",
        startDate: e.start_date ?? "",
        endDate: e.end_date ?? "",
        status: (e.status as DisplayEvent["status"]) ?? "upcoming",
        exhibitorCount: exhibitorCountByEvent.get(e.id) ?? 0,
        description: e.description ?? "",
      })),
    [rawEvents, exhibitorCountByEvent]
  );

  const filterBy = (s: DisplayEvent["status"] | "all") => {
    const list = s === "all" ? events : events.filter((e) => e.status === s);
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  };

  const stats = useMemo(() => {
    const live = events.filter((e) => e.status === "live").length;
    const upcoming = events.filter((e) => e.status === "upcoming").length;
    const totalExhibitors = events.reduce((sum, e) => sum + e.exhibitorCount, 0);
    return { live, upcoming, totalExhibitors };
  }, [events]);

  const renderGrid = (list: DisplayEvent[]) =>
    isLoading ? (
      <Card className="p-12 grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    ) : list.length === 0 ? (
      <Card className="p-12 text-center">
        <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          {search
            ? lang === "th"
              ? `ไม่พบงานที่ตรงกับ "${search}"`
              : `No events matching "${search}"`
            : lang === "th"
            ? "ยังไม่มี event"
            : "No events yet"}
        </p>
      </Card>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((e) => (
          <EventCard key={e.id} e={e} />
        ))}
      </div>
    );

  return (
    <AppShell>
      <section className="relative overflow-hidden hero-bg">
        <div className="container py-12 md:py-16 relative">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 glass gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="font-mono text-xs">{events.length} events available</span>
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              <span className="gradient-text">{t("events.title")}</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base md:text-lg">{t("events.sub")}</p>

            {/* Quick stats */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono font-bold">{stats.live}</span>
                <span className="text-muted-foreground">Live</span>
              </div>
              <div className="text-muted-foreground">•</div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="font-mono font-bold">{stats.upcoming}</span>
                <span className="text-muted-foreground">Upcoming</span>
              </div>
              <div className="text-muted-foreground">•</div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono font-bold">{stats.totalExhibitors}</span>
                <span className="text-muted-foreground">Total exhibitors</span>
              </div>
            </div>
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-10 -right-10 w-72 h-72 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-float" />
        </div>
      </section>

      <section className="container py-8">
        {/* Search bar */}
        <div className="mb-6 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "th" ? "ค้นหา event ตามชื่อ / สถานที่..." : "Search events by name / venue..."}
            className="pl-10 h-11"
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({filterBy("all").length})</TabsTrigger>
            <TabsTrigger value="live">
              {t("events.live")} ({filterBy("live").length})
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              {t("events.upcoming")} ({filterBy("upcoming").length})
            </TabsTrigger>
            <TabsTrigger value="past">
              {t("events.past")} ({filterBy("past").length})
            </TabsTrigger>
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
