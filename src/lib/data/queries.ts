import { supabase } from "@/lib/supabase/client";
import type { AppRole, Exhibitor, Json } from "@/lib/supabase/types";

/**
 * Wrap a promise with a timeout. Rejects with a friendly error if the
 * operation doesn't complete in time (typically: browser extension blocking,
 * network hung, or VPN issue).
 */
function withTimeout<T>(promise: Promise<T>, ms = 15000, opName = "Request"): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              `${opName} timeout หลัง ${ms / 1000} วินาที — อาจถูก browser extension block หรือ network มีปัญหา ลอง Incognito หรือปิด extension ดู`,
            ),
          ),
        ms,
      ),
    ),
  ]);
}

export async function listProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function listOrganizers() {
  const { data, error } = await supabase
    .from("organizers")
    .select("*, profiles!organizers_user_id_fkey(email, full_name, role)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function listEvents(organizerId?: string) {
  let q = supabase
    .from("events")
    .select("*, organizers(company_name, user_id)")
    .order("start_date", { ascending: true });
  if (organizerId) q = q.eq("organizer_id", organizerId);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function listExhibitors(eventId?: string) {
  let q = supabase
    .from("exhibitors")
    .select("*, events(name, organizer_id)")
    .order("booth_id", { ascending: true });
  if (eventId) q = q.eq("event_id", eventId);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getMyExhibitor(): Promise<Exhibitor | null> {
  const list = await listMyExhibitors();
  return list[0] ?? null;
}

export async function listMyExhibitors(): Promise<Exhibitor[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from("exhibitors")
    .select("*, events(name, start_date, end_date, location)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Exhibitor[];
}

export async function getMyOrganizer() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("organizers")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPlatformStats() {
  const { data, error } = await supabase.rpc("platform_stats");
  if (error) throw error;
  return data as Record<string, number>;
}

export async function setUserRole(userId: string, role: AppRole) {
  const { error } = await supabase.rpc("admin_update_user_role", {
    p_user_id: userId,
    p_role: role,
  });
  if (error) throw error;
}

export async function createOrganizer(input: {
  userId: string;
  companyName: string;
  pkg?: string;
  contactEmail?: string;
  contactPhone?: string;
}) {
  const { data, error } = await supabase.rpc("admin_create_organizer", {
    p_user_id: input.userId,
    p_company_name: input.companyName,
    p_package: input.pkg ?? "starter",
    p_contact_email: input.contactEmail ?? null,
    p_contact_phone: input.contactPhone ?? null,
  });
  if (error) throw error;
  return data as string;
}

export async function createEvent(input: {
  organizerId: string;
  name: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}) {
  const { data: { user } } = await withTimeout(supabase.auth.getUser(), 10000, "Get session");
  const { data, error } = await withTimeout(
    supabase
      .from("events")
      .insert({
        organizer_id: input.organizerId,
        name: input.name,
        description: input.description ?? null,
        location: input.location ?? null,
        start_date: input.startDate ?? null,
        end_date: input.endDate ?? null,
        status: input.status ?? "upcoming",
        created_by: user?.id ?? null,
      })
      .select()
      .single(),
    15000,
    "Create event",
  );
  if (error) {
    if (error.code === "42501" || error.message.toLowerCase().includes("permission")) {
      throw new Error("ไม่มีสิทธิ์สร้าง event (ต้องเป็น admin หรือ organizer)");
    }
    throw error;
  }
  return data;
}

export async function updateEvent(id: string, patch: Record<string, unknown>) {
  const { error } = await withTimeout(
    supabase.from("events").update(patch).eq("id", id),
    15000,
    "Update event",
  );
  if (error) throw error;
}

export async function deleteEvent(id: string) {
  const { error } = await withTimeout(
    supabase.from("events").delete().eq("id", id),
    15000,
    "Delete event",
  );
  if (error) throw error;
}

export async function createExhibitor(input: {
  eventId: string;
  boothId: string;
  companyName: string;
  userId?: string | null;
  description?: string;
  productInfo?: string;
  contactEmail?: string;
  website?: string;
}) {
  const { data: { user } } = await withTimeout(supabase.auth.getUser(), 10000, "Get session");
  const { data, error } = await withTimeout(
    supabase
      .from("exhibitors")
      .insert({
        event_id: input.eventId,
        booth_id: input.boothId,
        company_name: input.companyName,
        user_id: input.userId ?? null,
        description: input.description ?? null,
        product_info: input.productInfo ?? null,
        contact_email: input.contactEmail ?? null,
        website: input.website ?? null,
        created_by: user?.id ?? null,
      })
      .select()
      .single(),
    15000,
    "Create exhibitor",
  );
  if (error) {
    // Friendly message for common errors
    if (error.code === "23505") {
      throw new Error(`Booth ID "${input.boothId}" มีอยู่แล้วในงานนี้ ใช้ ID อื่นได้ไหม`);
    }
    if (error.code === "42501" || error.message.toLowerCase().includes("permission")) {
      throw new Error("ไม่มีสิทธิ์เพิ่ม exhibitor ใน event นี้ (ต้องเป็น organizer ของ event นั้น)");
    }
    throw error;
  }
  return data;
}

export async function updateExhibitor(id: string, patch: Record<string, unknown>) {
  const { error } = await withTimeout(
    supabase.from("exhibitors").update(patch).eq("id", id),
    15000,
    "Update exhibitor",
  );
  if (error) throw error;
}

export async function deleteExhibitor(id: string) {
  const { error } = await withTimeout(
    supabase.from("exhibitors").delete().eq("id", id),
    15000,
    "Delete exhibitor",
  );
  if (error) throw error;
}

export async function listAuditLogs(limit = 50) {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*, profiles!audit_logs_actor_id_fkey(email, full_name, role)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

/* ---------------- Announcements (UC-O02 / UC-E02) ---------------- */

export async function listAnnouncements(eventId: string) {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createAnnouncement(input: {
  eventId: string;
  title: string;
  body?: string;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      event_id: input.eventId,
      title: input.title,
      body: input.body ?? null,
      created_by: user?.id ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAnnouncement(id: string) {
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw error;
}

/* ---------------- Leads (UC-E02) ---------------- */

export async function listLeads(exhibitorId: string) {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("exhibitor_id", exhibitorId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createLead(input: {
  exhibitorId: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  note?: string;
  source?: string;
}) {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      exhibitor_id: input.exhibitorId,
      visitor_name: input.visitorName ?? null,
      visitor_email: input.visitorEmail ?? null,
      visitor_phone: input.visitorPhone ?? null,
      note: input.note ?? null,
      source: input.source ?? "manual",
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ---------------- Platform Settings (UC-R02) ---------------- */

export async function listPlatformSettings() {
  const { data, error } = await supabase
    .from("platform_settings")
    .select("*")
    .order("key");
  if (error) throw error;
  return data;
}

export async function getPlatformSetting(key: string) {
  const { data, error } = await supabase
    .from("platform_settings")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertPlatformSetting(key: string, value: Json) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("platform_settings")
    .upsert({ key, value, updated_by: user?.id ?? null, updated_at: new Date().toISOString() });
  if (error) throw error;
}

/* ---------------- Invite & password reset (UC-R01 / UC-A01 / UC-O01 / UC-A02) ---------------- */

export async function inviteUserByEmail(input: {
  email: string;
  fullName?: string;
  role?: AppRole;
}) {
  const { data, error } = await supabase.functions.invoke("invite-user", {
    body: {
      email: input.email,
      full_name: input.fullName,
      role: input.role ?? "visitor",
    },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data as { ok: boolean; user_id: string; email: string; role: AppRole };
}

export async function sendPasswordReset(userId: string, email: string) {
  // 1) audit log via RPC (admin-only)
  const { error: rpcErr } = await supabase.rpc("admin_send_password_reset_log", {
    p_user_id: userId,
  });
  if (rpcErr) throw rpcErr;
  // 2) trigger the reset email through Supabase Auth
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });
  if (error) throw error;
}
