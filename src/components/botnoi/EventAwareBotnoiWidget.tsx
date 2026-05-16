import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEventBySlug } from "@/lib/data/queries";
import { supabaseConfigured } from "@/lib/supabase/client";
import { BotnoiWidget } from "./BotnoiWidget";

/**
 * Reads ?event=<slug> from the URL, looks up the event in Supabase,
 * and renders the Botnoi widget with that event's bot_id. Falls back
 * to the env-var default when no slug is present or DB isn't configured.
 */
export function EventAwareBotnoiWidget() {
  const [params] = useSearchParams();
  const slug = params.get("event");

  const { data: event } = useQuery({
    queryKey: ["event_by_slug", slug],
    queryFn: () => getEventBySlug(slug!),
    enabled: !!slug && supabaseConfigured,
    staleTime: 60_000,
  });

  // No event-specific bot? Use the default from env / hardcoded fallback.
  if (!event?.botnoi_bot_id) {
    return <BotnoiWidget />;
  }

  return (
    <BotnoiWidget
      botId={event.botnoi_bot_id}
      botName={event.line_oa_name ?? `${event.name} Assistant`}
    />
  );
}
