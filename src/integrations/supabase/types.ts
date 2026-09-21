export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_analyses: {
        Row: {
          case_description: string
          case_type: string
          created_at: string
          full_result: Json | null
          id: string
          is_paid: boolean | null
          jurisdiction: string
          preview_result: Json | null
          user_id: string | null
        }
        Insert: {
          case_description: string
          case_type: string
          created_at?: string
          full_result?: Json | null
          id?: string
          is_paid?: boolean | null
          jurisdiction: string
          preview_result?: Json | null
          user_id?: string | null
        }
        Update: {
          case_description?: string
          case_type?: string
          created_at?: string
          full_result?: Json | null
          id?: string
          is_paid?: boolean | null
          jurisdiction?: string
          preview_result?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          is_from_user: boolean | null
          message: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_from_user?: boolean | null
          message: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_from_user?: boolean | null
          message?: string
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
      community_referrals: {
        Row: {
          case_type: string
          created_at: string
          draw_month: string | null
          draw_status: string
          id: string
          is_successful: boolean | null
          is_winner: boolean | null
          notes: string | null
          referred_email: string
          referred_name: string
          referred_phone: string | null
          referrer_email: string
          referrer_name: string
          referrer_phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          case_type: string
          created_at?: string
          draw_month?: string | null
          draw_status?: string
          id?: string
          is_successful?: boolean | null
          is_winner?: boolean | null
          notes?: string | null
          referred_email: string
          referred_name: string
          referred_phone?: string | null
          referrer_email: string
          referrer_name: string
          referrer_phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          case_type?: string
          created_at?: string
          draw_month?: string | null
          draw_status?: string
          id?: string
          is_successful?: boolean | null
          is_winner?: boolean | null
          notes?: string | null
          referred_email?: string
          referred_name?: string
          referred_phone?: string | null
          referrer_email?: string
          referrer_name?: string
          referrer_phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      consultations: {
        Row: {
          case_details: string | null
          created_at: string
          duration_minutes: number | null
          google_calendar_event_id: string | null
          google_meet_link: string | null
          id: string
          is_free_consultation: boolean | null
          lawyer_id: string | null
          scheduled_at: string
          service_type: string
          status: Database["public"]["Enums"]["consultation_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          case_details?: string | null
          created_at?: string
          duration_minutes?: number | null
          google_calendar_event_id?: string | null
          google_meet_link?: string | null
          id?: string
          is_free_consultation?: boolean | null
          lawyer_id?: string | null
          scheduled_at: string
          service_type: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          case_details?: string | null
          created_at?: string
          duration_minutes?: number | null
          google_calendar_event_id?: string | null
          google_meet_link?: string | null
          id?: string
          is_free_consultation?: boolean | null
          lawyer_id?: string | null
          scheduled_at?: string
          service_type?: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers_public"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          is_active: boolean | null
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_active?: boolean | null
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_active?: boolean | null
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contract_templates: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_count: number | null
          file_url: string
          id: string
          is_active: boolean | null
          jurisdiction: string
          name: string
          preview_url: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_url: string
          id?: string
          is_active?: boolean | null
          jurisdiction: string
          name: string
          preview_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_url?: string
          id?: string
          is_active?: boolean | null
          jurisdiction?: string
          name?: string
          preview_url?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          question: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question?: string
        }
        Relationships: []
      }
      lawyer_case_assignments: {
        Row: {
          case_analysis_id: string | null
          consultation_id: string | null
          created_at: string
          email_sent_at: string | null
          id: string
          lawyer_id: string
          notes: string | null
          referral_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          case_analysis_id?: string | null
          consultation_id?: string | null
          created_at?: string
          email_sent_at?: string | null
          id?: string
          lawyer_id: string
          notes?: string | null
          referral_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          case_analysis_id?: string | null
          consultation_id?: string | null
          created_at?: string
          email_sent_at?: string | null
          id?: string
          lawyer_id?: string
          notes?: string | null
          referral_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lawyer_case_assignments_case_analysis_id_fkey"
            columns: ["case_analysis_id"]
            isOneToOne: false
            referencedRelation: "case_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_case_assignments_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_case_assignments_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_case_assignments_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lawyer_case_assignments_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "community_referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyer_referral_requests: {
        Row: {
          ai_recommendations: Json | null
          case_description: string
          created_at: string
          email: string
          full_name: string
          id: string
          location: string
          matched_lawyer_id: string | null
          phone: string | null
          practice_area: string
          preferred_contact: string | null
          status: string | null
          updated_at: string
          urgency: string | null
        }
        Insert: {
          ai_recommendations?: Json | null
          case_description: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          location: string
          matched_lawyer_id?: string | null
          phone?: string | null
          practice_area: string
          preferred_contact?: string | null
          status?: string | null
          updated_at?: string
          urgency?: string | null
        }
        Update: {
          ai_recommendations?: Json | null
          case_description?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          location?: string
          matched_lawyer_id?: string | null
          phone?: string | null
          practice_area?: string
          preferred_contact?: string | null
          status?: string | null
          updated_at?: string
          urgency?: string | null
        }
        Relationships: []
      }
      lawyers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string
          google_calendar_id: string | null
          id: string
          is_active: boolean
          lso_number: string
          phone: string | null
          practice_areas: string[]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          google_calendar_id?: string | null
          id?: string
          is_active?: boolean
          lso_number: string
          phone?: string | null
          practice_areas?: string[]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          google_calendar_id?: string | null
          id?: string
          is_active?: boolean
          lso_number?: string
          phone?: string | null
          practice_areas?: string[]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      monthly_reports: {
        Row: {
          created_at: string
          generated_by: string | null
          id: string
          report_data: Json
          report_month: string
          report_type: string
        }
        Insert: {
          created_at?: string
          generated_by?: string | null
          id?: string
          report_data: Json
          report_month: string
          report_type: string
        }
        Update: {
          created_at?: string
          generated_by?: string | null
          id?: string
          report_data?: Json
          report_month?: string
          report_type?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          consultation_id: string | null
          created_at: string
          currency: string | null
          id: string
          payment_type: string
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          consultation_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          payment_type: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          consultation_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          payment_type?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      price_match_requests: {
        Row: {
          budget_range: string
          case_description: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          practice_area: string
          quote_reference: string | null
          quoted_amount: string | null
          quoted_law_firm: string | null
          quoted_lawyer_name: string | null
          scope_details: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget_range: string
          case_description: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          practice_area: string
          quote_reference?: string | null
          quoted_amount?: string | null
          quoted_law_firm?: string | null
          quoted_lawyer_name?: string | null
          scope_details?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          budget_range?: string
          case_description?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          practice_area?: string
          quote_reference?: string | null
          quoted_amount?: string | null
          quoted_law_firm?: string | null
          quoted_lawyer_name?: string | null
          scope_details?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_spots_counter: {
        Row: {
          id: string
          spots_remaining: number
          total_spots: number
          updated_at: string
        }
        Insert: {
          id?: string
          spots_remaining?: number
          total_spots?: number
          updated_at?: string
        }
        Update: {
          id?: string
          spots_remaining?: number
          total_spots?: number
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          client_company: string | null
          client_name: string
          created_at: string
          id: string
          is_approved: boolean | null
          rating: number
          review_text: string
          user_id: string
        }
        Insert: {
          client_company?: string | null
          client_name: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          rating: number
          review_text: string
          user_id: string
        }
        Update: {
          client_company?: string | null
          client_name?: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          rating?: number
          review_text?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriber_counter: {
        Row: {
          ai_spots_claimed: number
          id: string
          last_ai_decrement_at: string
          next_ai_decrement_at: string
          real_spots_claimed: number
          spots_remaining: number
          updated_at: string
        }
        Insert: {
          ai_spots_claimed?: number
          id?: string
          last_ai_decrement_at?: string
          next_ai_decrement_at?: string
          real_spots_claimed?: number
          spots_remaining?: number
          updated_at?: string
        }
        Update: {
          ai_spots_claimed?: number
          id?: string
          last_ai_decrement_at?: string
          next_ai_decrement_at?: string
          real_spots_claimed?: number
          spots_remaining?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      lawyers_public: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
          is_active: boolean | null
          lso_number: string | null
          practice_areas: string[] | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          is_active?: boolean | null
          lso_number?: string | null
          practice_areas?: string[] | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          is_active?: boolean | null
          lso_number?: string | null
          practice_areas?: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      tick_ai_subscriber_spot: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "client" | "lawyer"
      consultation_status: "pending" | "confirmed" | "completed" | "cancelled"
      payment_status: "pending" | "paid" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client", "lawyer"],
      consultation_status: ["pending", "confirmed", "completed", "cancelled"],
      payment_status: ["pending", "paid", "failed", "refunded"],
    },
  },
} as const
