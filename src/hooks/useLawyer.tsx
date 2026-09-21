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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLawyerProfile() {
      if (!user) {
        setLawyer(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching lawyer profile:", error);
      }
      
      setLawyer(data);
      setLoading(false);
    }

    fetchLawyerProfile();
  }, [user]);

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
