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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string | null
          id: string
          publication_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          publication_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          publication_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      paper_tags: {
        Row: {
          evidence_level: string | null
          id: string
          organism: string | null
          outcome_direction: string | null
          platform: string | null
          pub_id: string
          stressor: string | null
          study_type: string | null
          system: string | null
          year: number | null
        }
        Insert: {
          evidence_level?: string | null
          id?: string
          organism?: string | null
          outcome_direction?: string | null
          platform?: string | null
          pub_id: string
          stressor?: string | null
          study_type?: string | null
          system?: string | null
          year?: number | null
        }
        Update: {
          evidence_level?: string | null
          id?: string
          organism?: string | null
          outcome_direction?: string | null
          platform?: string | null
          pub_id?: string
          stressor?: string | null
          study_type?: string | null
          system?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "paper_tags_pub_id_fkey"
            columns: ["pub_id"]
            isOneToOne: true
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          id: string
          ingested_at: string | null
          source: string | null
          title: string
          url_main: string
        }
        Insert: {
          id?: string
          ingested_at?: string | null
          source?: string | null
          title: string
          url_main: string
        }
        Update: {
          id?: string
          ingested_at?: string | null
          source?: string | null
          title?: string
          url_main?: string
        }
        Relationships: []
      }
      summaries: {
        Row: {
          confidence: string | null
          context: string | null
          id: string
          limitations: string | null
          methods: string | null
          mission_relevance: string | null
          provenance_json: Json | null
          pub_id: string
          results: string | null
          updated_at: string | null
        }
        Insert: {
          confidence?: string | null
          context?: string | null
          id?: string
          limitations?: string | null
          methods?: string | null
          mission_relevance?: string | null
          provenance_json?: Json | null
          pub_id: string
          results?: string | null
          updated_at?: string | null
        }
        Update: {
          confidence?: string | null
          context?: string | null
          id?: string
          limitations?: string | null
          methods?: string | null
          mission_relevance?: string | null
          provenance_json?: Json | null
          pub_id?: string
          results?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "summaries_pub_id_fkey"
            columns: ["pub_id"]
            isOneToOne: true
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
