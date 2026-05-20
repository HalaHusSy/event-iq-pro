import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "@/lib/supabase/client";
import type { AppRole, Profile } from "@/lib/supabase/types";

type AuthState = {
  loading: boolean;
  session: Session | null;
  profile: Profile | null;
  configured: boolean;
};

type AuthContextValue = AuthState & {
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error?: string; needsConfirm?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  bootstrapRoot: () => Promise<{ error?: string }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    loading: true,
    session: null,
    profile: null,
    configured: supabaseConfigured,
  });

  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      console.error("[auth] fetchProfile error", error);
      return null;
    }
    return data;
  }, []);

  const refreshProfile = useCallback(async () => {
    const userId = state.session?.user?.id;
    if (!userId) return;
    const profile = await fetchProfile(userId);
    setState((s) => ({ ...s, profile }));
  }, [state.session?.user?.id, fetchProfile]);

  useEffect(() => {
    if (!supabaseConfigured) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const profile = session?.user ? await fetchProfile(session.user.id) : null;
      setState({ loading: false, session, profile, configured: true });
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const profile = session?.user ? await fetchProfile(session.user.id) : null;
      setState({ loading: false, session, profile, configured: true });
    });

    return () => sub.subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn: AuthContextValue["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: error.message } : {};
  };

  const signUp: AuthContextValue["signUp"] = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin + "/login",
      },
    });
    if (error) return { error: error.message };
    const needsConfirm = !data.session;
    return { needsConfirm };
  };

  const signOut: AuthContextValue["signOut"] = async () => {
    await supabase.auth.signOut();
  };

  const bootstrapRoot: AuthContextValue["bootstrapRoot"] = async () => {
    const { error } = await supabase.rpc("bootstrap_first_root");
    if (error) return { error: error.message };
    await refreshProfile();
    return {};
  };

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signUp, signOut, refreshProfile, bootstrapRoot }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function useRole(): AppRole | null {
  const { profile } = useAuth();
  return profile?.role ?? null;
}

export function hasAnyRole(role: AppRole | null | undefined, allowed: AppRole[]): boolean {
  if (!role) return false;
  return allowed.includes(role);
}
