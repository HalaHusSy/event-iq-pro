import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-bot-id",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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
    const question = typeof body.question === "string" ? body.question : "";
    const event_slug = typeof body.event_slug === "string" ? body.event_slug : null;
    const botId = req.headers.get("x-bot-id") || (body.bot_id as string | undefined) || null;

    if (!question.trim()) {
      return jsonResponse({ error: "Missing 'question' field" }, 400);
    }

    let event: {
      id: string;
      name: string;
      location: string | null;
      start_date: string | null;
      end_date: string | null;
    } | null = null;
    if (botId) {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, location, start_date, end_date, botnoi_bot_id")
        .eq("botnoi_bot_id", botId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return jsonResponse({ error: "Unknown bot_id" }, 401);
      event = data;
    } else if (event_slug) {
      const { data: all, error } = await supabase
        .from("events")
        .select("id, name, location, start_date, end_date");
      if (error) throw error;
      const match = (all ?? []).find((e) => slugify(e.name) === event_slug);
      if (match) event = match;
    }

    const qLower = question.toLowerCase();
    const qWords = qLower.split(/\s+/).filter((w) => w.length > 2);

    const builtIn: { q: string[]; answer: string }[] = event
      ? [
          {
            q: ["venue", "location", "where", "ที่ไหน", "สถานที่"],
            answer: `งาน "${event.name}" จัดที่ ${event.location ?? "(ยังไม่ระบุสถานที่)"}`,
          },
          {
            q: ["when", "date", "วันไหน", "วันที่", "เริ่ม"],
            answer:
              event.start_date && event.end_date
                ? `งาน "${event.name}" จัดวันที่ ${event.start_date} ถึง ${event.end_date}`
                : "ยังไม่ได้กำหนดวันที่จัดงาน",
          },
        ]
      : [];
    const builtInHit = builtIn.find((f) => f.q.some((kw) => qLower.includes(kw)));

    let q = supabase
      .from("exhibitors")
      .select("booth_id, company_name, description, tags, solutions, contact_email, website");
    if (event) q = q.eq("event_id", event.id);
    const { data: exhibitors, error: exErr } = await q;
    if (exErr) throw exErr;

    const exhibitorMatches = (exhibitors ?? [])
      .filter((ex) => {
        const blob = `${ex.company_name} ${ex.description ?? ""} ${(ex.tags ?? []).join(" ")}`.toLowerCase();
        return qWords.some((w) => blob.includes(w));
      })
      .slice(0, 5)
      .map((ex) => ({
        booth_id: ex.booth_id,
        company: ex.company_name,
        description: ex.description,
        website: ex.website,
        contact_email: ex.contact_email,
      }));

    let answer: string;
    if (builtInHit) {
      answer = builtInHit.answer;
    } else if (exhibitorMatches.length > 0) {
      answer = `พบ ${exhibitorMatches.length} บูธที่อาจตรงกับคำถาม: ${exhibitorMatches
        .map((m) => `${m.company} (Booth ${m.booth_id})`)
        .join(", ")}`;
    } else {
      answer = "ขออภัย ฉันยังไม่มีข้อมูลในระบบสำหรับคำถามนี้";
    }

    return jsonResponse({ event, question, answer, exhibitor_matches: exhibitorMatches });
  } catch (e) {
    return jsonResponse({ error: (e as Error).message ?? String(e) }, 500);
  }
});
