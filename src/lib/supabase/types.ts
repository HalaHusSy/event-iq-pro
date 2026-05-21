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
        Relationships: [];
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
        Relationships: [];
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
          floor_plan_url: string | null;
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
          floor_plan_url?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      announcements: {
        Row: {
          id: string;
          event_id: string;
          title: string;
          body: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          event_id: string;
          title: string;
          body?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["announcements"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          exhibitor_id: string;
          visitor_name: string | null;
          visitor_email: string | null;
          visitor_phone: string | null;
          note: string | null;
          source: string | null;
          created_at: string;
        };
        Insert: {
          exhibitor_id: string;
          visitor_name?: string | null;
          visitor_email?: string | null;
          visitor_phone?: string | null;
          note?: string | null;
          source?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      platform_settings: {
        Row: {
          key: string;
          value: Json;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["platform_settings"]["Insert"]>;
        Relationships: [];
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
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["exhibitors"]["Insert"]>;
        Relationships: [];
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
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      admin_update_user_role: {
        Args: { p_user_id: string; p_role: AppRole };
        Returns: void;
      };
      admin_send_password_reset_log: {
        Args: { p_user_id: string };
        Returns: void;
      };
      admin_create_organizer: {
        Args: {
          p_user_id: string;
          p_company_name: string;
          p_package: string;
          p_contact_email: string | null;
          p_contact_phone: string | null;
        };
        Returns: string;
      };
      bootstrap_first_root: { Args: Record<string, never>; Returns: void };
      can_access_exhibitor_leads: {
        Args: { p_exhibitor_id: string };
        Returns: boolean;
      };
      current_role_safe: { Args: Record<string, never>; Returns: AppRole };
      current_organizer_id: { Args: Record<string, never>; Returns: string };
      is_root_or_admin: { Args: Record<string, never>; Returns: boolean };
      is_organizer_of_event: { Args: { p_event_id: string }; Returns: boolean };
      platform_stats: { Args: Record<string, never>; Returns: Record<string, number> };
    };
    Enums: { app_role: AppRole };
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Organizer = Database["public"]["Tables"]["organizers"]["Row"];
export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type Exhibitor = Database["public"]["Tables"]["exhibitors"]["Row"];
export type AuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];
export type Announcement = Database["public"]["Tables"]["announcements"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type PlatformSetting = Database["public"]["Tables"]["platform_settings"]["Row"];
