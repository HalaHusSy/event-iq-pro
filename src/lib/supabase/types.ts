export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole =
  | "root"
  | "admin"
  | "organizer"
  | "exhibitor"
  | "visitor"
  | "speaker";

export type Solution = { name: string; description: string };
export type UseCaseItem = { title: string; industry: string; description: string };
export type SuccessStory = {
  client: string;
  industry: string;
  outcome: string;
  description: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          role: AppRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: AppRole;
          avatar_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      organizers: {
        Row: {
          id: string;
          user_id: string;
          company_name: string;
          package: string;
          contact_email: string | null;
          contact_phone: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          company_name: string;
          package?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["organizers"]["Insert"]>;
      };
      events: {
        Row: {
          id: string;
          organizer_id: string;
          name: string;
          description: string | null;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          status: string;
          banner_url: string | null;
          botnoi_bot_id: string | null;
          line_oa_id: string | null;
          line_oa_name: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organizer_id: string;
          name: string;
          description?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          status?: string;
          banner_url?: string | null;
          botnoi_bot_id?: string | null;
          line_oa_id?: string | null;
          line_oa_name?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };
      exhibitors: {
        Row: {
          id: string;
          user_id: string | null;
          event_id: string;
          booth_id: string;
          company_name: string;
          logo_url: string | null;
          description: string | null;
          product_info: string | null;
          promotion: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          website: string | null;
          social_links: Json;
          tags: string[] | null;
          solutions: Solution[];
          use_cases: UseCaseItem[];
          success_stories: SuccessStory[];
          clients: string[];
          competitive_edge: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          event_id: string;
          booth_id: string;
          company_name: string;
          user_id?: string | null;
          logo_url?: string | null;
          description?: string | null;
          product_info?: string | null;
          promotion?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          website?: string | null;
          social_links?: Json;
          tags?: string[] | null;
          solutions?: Solution[];
          use_cases?: UseCaseItem[];
          success_stories?: SuccessStory[];
          clients?: string[];
          competitive_edge?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["exhibitors"]["Insert"]>;
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          actor_role: AppRole | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          actor_id?: string | null;
          actor_role?: AppRole | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Insert"]>;
      };
    };
    Functions: {
      admin_update_user_role: {
        Args: { p_user_id: string; p_role: AppRole };
        Returns: void;
      };
      current_role_safe: { Args: Record<string, never>; Returns: AppRole };
      current_organizer_id: { Args: Record<string, never>; Returns: string };
      is_root_or_admin: { Args: Record<string, never>; Returns: boolean };
      is_organizer_of_event: { Args: { p_event_id: string }; Returns: boolean };
    };
    Enums: { app_role: AppRole };
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Organizer = Database["public"]["Tables"]["organizers"]["Row"];
export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type Exhibitor = Database["public"]["Tables"]["exhibitors"]["Row"];
export type AuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];
