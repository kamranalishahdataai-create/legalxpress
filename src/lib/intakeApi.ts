import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { ConflictDetails, IdentityDetails, IntakeStatus } from "./intake";

export interface IntakeRecord {
  id: string;
  user_id: string;
  status: IntakeStatus;
  details: ConflictDetails;
  identity: IdentityDetails | null;
  client_message: string;
  version: string;
  created_at: string;
  updated_at: string;
}
export interface IntakeReview {
  intake_id: string;
  notes: string;
  conflict_checked: boolean;
  identification_checked: boolean;
  verification: string;
  verification_record: string;
  organization_checked: boolean;
  third_party_checked: boolean;
  funds_checked: boolean;
  monitoring_record: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
}
type Table<Row> = { Row: { [K in keyof Row]: Row[K] }; Insert: { [K in keyof Row]?: Row[K] }; Update: { [K in keyof Row]?: Row[K] }; Relationships: [] };
type IntakeDatabase = { public: { Tables: { client_intakes: Table<IntakeRecord>; intake_reviews: Table<IntakeReview>; intake_events: Table<{ id: string; intake_id: string; actor_id: string; action: string; created_at: string }> }; Views: Record<string, never>; Functions: Record<string, never>; Enums: Record<string, never>; CompositeTypes: Record<string, never> } };
// Local types isolate additive intake tables until managed schema types refresh.
export const intakeClient = supabase as unknown as SupabaseClient<IntakeDatabase>;