import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export interface Membership {
  plan: string;
  is_active: boolean;
}

/**
 * Reads the signed-in user's membership record. Memberships are recorded by
 * the practice after payment arrangements are confirmed (checkout is not
 * self-serve), so this is the source of truth for member-only features.
 */
export function useMembership() {
  const { user, loading: authLoading } = useAuth();
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchMembership() {
      if (!user) {
        setMembership(null);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("memberships")
        .select("plan, is_active")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();
      if (!active) return;
      setMembership(data ?? null);
      setLoading(false);
    }
    if (!authLoading) fetchMembership();
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  return { membership, isMember: !!membership?.is_active, loading: authLoading || loading, user };
}
