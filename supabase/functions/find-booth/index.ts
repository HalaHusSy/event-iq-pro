import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-bot-id",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Solution = { name?: string; description?: string };
type UseCase = { title?: string; industry?: string; description?: string };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const pain = typeof body.pain === "string" ? body.pain : "";
    const event_slug = typeof body.event_slug === "string" ? body.event_slug : null;
    const botId = req.headers.get("x-bot-id") || (body.bot_id as string | undefined) || null;

    if (!pain.trim()) {
      return jsonResponse({ error: "Missing 'pain' field" }, 400);
    }

    // Resolve event from bot_id (preferred) or event_slug. Both optional.
    let event: { id: string; name: string } | null = null;
    if (botId) {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, botnoi_bot_id")
        .eq("botnoi_bot_id", botId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return jsonResponse({ error: "Unknown bot_id" }, 401);
      event = { id: data.id, name: data.name };
    } else if (event_slug) {
      const { data: all, error } = await supabase.from("events").select("id, name");
      if (error) throw error;
      const match = (all ?? []).find((e) => slugify(e.name) === event_slug);
      if (match) event = { id: match.id, name: match.name };
    }

    // Query exhibitors (filtered by event when known)
    let q = supabase
      .from("exhibitors")
      .select(
        "id, booth_id, company_name, description, website, contact_email, tags, solutions, use_cases, success_stories, competitive_edge, logo_url"
      );
    if (event) q = q.eq("event_id", event.id);
    const { data: exhibitors, error: exErr } = await q;
    if (exErr) throw exErr;

    const painLower = pain.toLowerCase();
    const painWords = painLower.split(/\s+/).filter((w) => w.length > 2);

    const scored = (exhibitors ?? []).map((ex) => {
      let score = 0;
      const reasons: string[] = [];

      for (const tag of (ex.tags as string[] | null) ?? []) {
        const t = tag.toLowerCase();
        if (painLower.includes(t) || painWords.some((w) => t.includes(w))) {
          score += 25;
          reasons.push(`#${tag}`);
        }
      }
      for (const sol of ((ex.solutions as Solution[] | null) ?? [])) {
        const n = (sol.name ?? "").toLowerCase();
        if (n && (painLower.includes(n) || painWords.some((w) => n.includes(w)))) {
          score += 20;
          reasons.push(`solution: ${sol.name}`);
        }
      }
      for (const uc of ((ex.use_cases as UseCase[] | null) ?? [])) {
        const txt = `${uc.title ?? ""} ${uc.description ?? ""}`.toLowerCase();
        if (txt.trim() && painWords.some((w) => txt.includes(w))) {
          score += 15;
          reasons.push(`usecase: ${uc.title}`);
        }
      }
      const desc = (ex.description ?? "").toLowerCase();
      if (desc && painWords.some((w) => desc.includes(w))) score += 5;

      return { ex, score, reasons };
    });

    const withScore = scored.filter((s) => s.score > 0);
    const result = (withScore.length ? withScore : scored)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return jsonResponse({
      event,
      pain,
      total_candidates: exhibitors?.length ?? 0,
      matches: result.map(({ ex, score, reasons }) => ({
        booth_id: ex.booth_id,
        company: ex.company_name,
        description: ex.description,
        website: ex.website,
        contact_email: ex.contact_email,
        logo_url: ex.logo_url,
        tags: ex.tags,
        competitive_edge: ex.competitive_edge,
        score: Math.min(99, Math.max(50, score || 50)),
        reasons,
      })),
    });
  } catch (e) {
    return jsonResponse({ error: (e as Error).message ?? String(e) }, 500);
  }
});
