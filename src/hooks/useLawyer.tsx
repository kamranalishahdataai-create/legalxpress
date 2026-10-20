import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Lawyer {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  lso_number: string;
  practice_areas: string[];
  bio: string | null;
  avatar_url: string | null;
  google_calendar_id: string | null;
  is_active: boolean;
}

interface LawyerContextType {
  lawyer: Lawyer | null;
  isLawyer: boolean;
  loading: boolean;
}

const LawyerContext = createContext<LawyerContextType | undefined>(undefined);

export function LawyerProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [resolvedFor, setResolvedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLawyer(null);
      setResolvedFor(null);
      return;
    }

    let active = true;

    async function fetchLawyerProfile() {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .eq("user_id", user!.id)
        .eq("is_active", true)
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error("Error fetching lawyer profile:", error);
      }

      setLawyer(data);
      setResolvedFor(user!.id);
    }

    fetchLawyerProfile();

    return () => {
      active = false;
    };
  }, [user]);

  // Derived during render, so it is already true in the commit where a signed-in
  // user first appears. A flag set inside the effect would let this page's own
  // redirect run first, because child effects run before their parent's.
  const loading = !!user && resolvedFor !== user.id;

  return (
    <LawyerContext.Provider value={{ lawyer, isLawyer: !!lawyer, loading }}>
      {children}
    </LawyerContext.Provider>
  );
}

export function useLawyer() {
  const context = useContext(LawyerContext);
  if (context === undefined) {
    throw new Error("useLawyer must be used within a LawyerProvider");
  }
  return context;
}
