export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      jobs: {
        Row: {
          city: string | null
          closing_date: string | null
          company: string
          created_at: string
          description: string
          employment_type: string | null
          experience_level: string | null
          id: string
          industry: string | null
          intensity: string | null
          job_url: string
          location: string
          location_category: string | null
          min_experience: number | null
          min_salary: number | null
          other_key_experience: string | null
          perks: string | null
          posted_date: string | null
          pqe: string | null
          qualification: string | null
          reasoning: string | null
          responsibilities: string | null
          routine: string | null
          salary_max: number | null
          salary_min: number | null
          salary_range: string | null
          stress_reasoning: string | null
          title: string
        }
        Insert: {
          city?: string | null
          closing_date?: string | null
          company: string
          created_at?: string
          description: string
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          industry?: string | null
          intensity?: string | null
          job_url: string
          location: string
          location_category?: string | null
          min_experience?: number | null
          min_salary?: number | null
          other_key_experience?: string | null
          perks?: string | null
          posted_date?: string | null
          pqe?: string | null
          qualification?: string | null
          reasoning?: string | null
          responsibilities?: string | null
          routine?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_range?: string | null
          stress_reasoning?: string | null
          title: string
        }
        Update: {
          city?: string | null
          closing_date?: string | null
          company?: string
          created_at?: string
          description?: string
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          industry?: string | null
          intensity?: string | null
          job_url?: string
          location?: string
          location_category?: string | null
          min_experience?: number | null
          min_salary?: number | null
          other_key_experience?: string | null
          perks?: string | null
          posted_date?: string | null
          pqe?: string | null
          qualification?: string | null
          reasoning?: string | null
          responsibilities?: string | null
          routine?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_range?: string | null
          stress_reasoning?: string | null
          title?: string
        }
        Relationships: []
      }
      saved_jobs: {
        Row: {
          created_at: string
          id: string
          job_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_profiles: {
        Row: {
          additional_locations: string | null
          created_at: string
          current_location: string
          email: string
          full_name: string
          id: string
          linkedin_url: string | null
          portfolio_url: string | null
          resume_url: string | null
          salary_expectation: string | null
          user_id: string
        }
        Insert: {
          additional_locations?: string | null
          created_at?: string
          current_location: string
          email: string
          full_name: string
          id?: string
          linkedin_url?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          salary_expectation?: string | null
          user_id: string
        }
        Update: {
          additional_locations?: string | null
          created_at?: string
          current_location?: string
          email?: string
          full_name?: string
          id?: string
          linkedin_url?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          salary_expectation?: string | null
          user_id?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
