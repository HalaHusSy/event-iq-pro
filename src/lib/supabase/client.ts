import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Production project (anon key is public by design — RLS enforces access).
// Override with VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env to point elsewhere.
const FALLBACK_URL = "https://mjmmnojflrzeoqrvkumi.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qbW1ub2pmbHJ6ZW9xcnZrdW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDM3MjUsImV4cCI6MjA5NDUxOTcyNX0.903MO934Q9J9wRfSMGPwO-5ImmtuvY88cPW9vGM5-Mo";

const url = (import.meta.env.VITE_SUPABASE_URL as string) || FALLBACK_URL;
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || FALLBACK_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
