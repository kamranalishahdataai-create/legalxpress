import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Users, Flame, Clock, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

const STARTING_SPOTS = 100000;

export function SubscriberCountdown() {
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);
  const [displaySpots, setDisplaySpots] = useState<number | null>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [flash, setFlash] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      const { data, error } = await supabase
        .from("subscriber_counter")
        .select("spots_remaining")
        .limit(1)
        .maybeSingle();

      const spots = error ? STARTING_SPOTS : (data?.spots_remaining ?? STARTING_SPOTS);
      setSpotsLeft(spots);
      setDisplaySpots(spots);
    };

    fetchSpots();

    const channel = supabase
      .channel("subscriber_counter_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "subscriber_counter" },
        (payload) => {
          if (payload.new && "spots_remaining" in payload.new) {
            setSpotsLeft(payload.new.spots_remaining as number);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Animate count when spotsLeft changes
  useEffect(() => {
    if (spotsLeft === null || displaySpots === null) return;
    if (spotsLeft === displaySpots) return;

    setFlash(true);
    const timeout = setTimeout(() => setFlash(false), 1500);

    const diff = displaySpots - spotsLeft;
    const steps = Math.min(Math.abs(diff), 20);
    const stepSize = diff / steps;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      if (current >= steps) {
        setDisplaySpots(spotsLeft);
        clearInterval(interval);
      } else {
        setDisplaySpots(Math.round(displaySpots - stepSize * current));
      }
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [spotsLeft]);

  // Track scroll position to show floating ticker
  useEffect(() => {
    const handleScroll = () => {
      // Show floating ticker after scrolling past ~200px (past the inline banner)
      setIsFloating(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (spotsLeft === null || displaySpots === null) return null;

  const percentage = (displaySpots / STARTING_SPOTS) * 100;
  const isUrgent = displaySpots < 1000;

  const floatingTicker = !isDismissed && isFloating ? createPortal(
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] animate-fade-in">
      <div className="relative">
        <Link
          to="/founder-members"
          className="block relative overflow-hidden rounded-2xl border border-border/30 bg-primary/40 backdrop-blur-md shadow-elevated hover:shadow-xl transition-shadow w-16"
        >
          <div className="relative z-10 py-4 px-2 flex flex-col items-center gap-3">
            <div className={cn(
              "flex items-center justify-center rounded-full bg-secondary/20 w-10 h-10",
              isUrgent && "animate-pulse"
            )}>
              {isUrgent ? (
                <Flame className="h-5 w-5 text-secondary" />
              ) : (
                <Users className="h-5 w-5 text-secondary" />
              )}
            </div>

            {/* Vertical progress bar */}
            <div className="h-24 w-2 bg-primary-foreground/20 rounded-full overflow-hidden relative">
              <div
                className="w-full bg-gradient-to-t from-secondary to-secondary/80 rounded-full transition-all duration-1000 ease-out absolute bottom-0"
                style={{ height: `${Math.max(0, Math.min(100, percentage))}%` }}
              />
            </div>

            {/* Count displayed vertically */}
            <div className="flex flex-col items-center gap-1">
              <span className={cn(
                "text-lg font-display font-bold tabular-nums transition-all duration-300 leading-tight",
                flash ? "text-secondary scale-110" : "text-secondary"
              )}>
                {displaySpots >= 1000 ? `${Math.floor(displaySpots / 1000)}K` : displaySpots}
              </span>
              <span className="text-[8px] text-primary-foreground/70 font-body uppercase tracking-wider leading-tight text-center">
                spots left
              </span>
            </div>
          </div>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute -top-2 -right-2 z-10 p-1 rounded-full bg-muted border border-border shadow-sm hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss ticker"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Original inline banner */}
      <div ref={bannerRef}>
        <Link
          to="/founder-members"
          className="block relative overflow-hidden border-y border-border/40 bg-gradient-to-r from-primary via-primary/95 to-primary shadow-elevated hover:shadow-xl transition-shadow"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-10 left-1/4 w-32 h-32 bg-secondary rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-12 right-1/4 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <div className="relative z-10 px-5 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full bg-secondary/20",
                  isUrgent && "animate-pulse"
                )}>
                  {isUrgent ? <Flame className="h-5 w-5 text-secondary" /> : <Users className="h-5 w-5 text-secondary" />}
                </div>
                <p className="text-xs font-medium text-primary-foreground/80 uppercase tracking-wider">Member Spots</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-4xl md:text-5xl font-display font-bold tabular-nums transition-all duration-300",
                  flash ? "text-secondary scale-110" : "text-secondary"
                )}>
                  {displaySpots.toLocaleString()}
                </span>
                <span className="text-sm md:text-base text-primary-foreground/80 font-body">/ {STARTING_SPOTS.toLocaleString()}</span>
                <span className="text-primary-foreground font-body text-sm md:text-base whitespace-nowrap">spots remaining</span>
              </div>
              <div className="w-full md:w-56 flex flex-col gap-1">
                <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-secondary/80 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
                  />
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-primary-foreground/70">
                  <Clock className="h-3 w-3" />
                  <span>{Math.max(0, 100 - percentage).toFixed(1)}% claimed</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Floating ticker portaled to body */}
      {floatingTicker}
    </>
  );
}
