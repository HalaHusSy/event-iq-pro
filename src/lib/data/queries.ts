import { supabase } from "@/lib/supabase/client";
import type { AppRole, Exhibitor } from "@/lib/supabase/types";

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

export async function getEventBySlug(slug: string) {
  // No slug column in events yet — derive slug from name (lowercase + spaces → '-')
  // and match on a server-rendered expression. Simpler: pull all and match client-side.
  const { data, error } = await supabase.from("events").select("*");
  if (error) throw error;
  return (
    data.find(
      (e) => e.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug
    ) ?? null
  );
}

export async function getEventByBotId(botId: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("botnoi_bot_id", botId)
    .maybeSingle();
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
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("exhibitors")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data;
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
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
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
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, patch: Record<string, unknown>) {
  const { error } = await supabase.from("events").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from("events").delete().eq("id", id);
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
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
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
    .single();
  if (error) throw error;
  return data;
}

export async function updateExhibitor(id: string, patch: Record<string, unknown>) {
  const { error } = await supabase.from("exhibitors").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteExhibitor(id: string) {
  const { error } = await supabase.from("exhibitors").delete().eq("id", id);
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
