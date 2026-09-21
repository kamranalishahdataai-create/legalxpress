import { useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Json } from "@/integrations/supabase/types";

interface TrackEventOptions {
  eventType: string;
  eventData?: Record<string, string | number | boolean | null>;
}

export function useAnalytics() {
  const location = useLocation();
  const { user } = useAuth();
  const sessionId = useRef<string>(getOrCreateSessionId());

  // Track page views automatically
  useEffect(() => {
    trackEvent({
      eventType: "page_view",
      eventData: {
        path: location.pathname,
        search: location.search,
      },
    });
  }, [location.pathname]);

  const trackEvent = useCallback(
    async ({ eventType, eventData }: TrackEventOptions) => {
      try {
        await supabase.from("analytics_events").insert([{
          event_type: eventType,
          event_data: (eventData || {}) as Json,
          user_id: user?.id || null,
          session_id: sessionId.current,
          page_url: window.location.href,
          referrer: document.referrer || null,
        }]);
      } catch (error) {
        // Silently fail - analytics shouldn't break the app
        console.debug("Analytics tracking error:", error);
      }
    },
    [user?.id]
  );

  return { trackEvent };
}

function getOrCreateSessionId(): string {
  const key = "analytics_session_id";
  let sessionId = sessionStorage.getItem(key);
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  
  return sessionId;
}

// Helper hook for tracking specific events
export function useTrackEvent() {
  const { trackEvent } = useAnalytics();
  return trackEvent;
}
