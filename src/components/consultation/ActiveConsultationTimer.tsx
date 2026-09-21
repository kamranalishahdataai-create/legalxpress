import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Video, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ActiveConsultation {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  is_free_consultation: boolean;
  service_type: string;
  google_meet_link: string | null;
  status: string;
}

export function ActiveConsultationTimer() {
  const { user } = useAuth();
  const [activeConsultation, setActiveConsultation] = useState<ActiveConsultation | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchActiveConsultation = async () => {
      const now = new Date();
      
      // Fetch confirmed consultations that are currently active or about to start
      const { data: consultations } = await supabase
        .from("consultations")
        .select("*")
        .eq("user_id", user.id)
        .in("status", ["confirmed", "pending"]);

      if (consultations) {
        // Find a consultation that is currently active (started but not ended)
        for (const consultation of consultations) {
          const scheduledAt = new Date(consultation.scheduled_at);
          const endTime = new Date(scheduledAt.getTime() + (consultation.duration_minutes || 30) * 60 * 1000);
          
          // Check if consultation is currently active (started and not ended)
          // or starting within the next 5 minutes
          const fiveMinutesBefore = new Date(scheduledAt.getTime() - 5 * 60 * 1000);
          
          if (now >= fiveMinutesBefore && now <= endTime) {
            setActiveConsultation(consultation);
            return;
          }
        }
      }
      
      setActiveConsultation(null);
    };

    fetchActiveConsultation();
    
    // Refresh every minute
    const interval = setInterval(fetchActiveConsultation, 60000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!activeConsultation) {
      setTimeRemaining(0);
      setIsExpired(false);
      return;
    }

    const calculateTimeRemaining = () => {
      const now = new Date();
      const scheduledAt = new Date(activeConsultation.scheduled_at);
      const endTime = new Date(scheduledAt.getTime() + (activeConsultation.duration_minutes || 30) * 60 * 1000);
      
      const remaining = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));
      setTimeRemaining(remaining);
      setIsExpired(remaining === 0 && now >= scheduledAt);
    };

    calculateTimeRemaining();
    
    // Update every second for smooth countdown
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [activeConsultation]);

  if (!activeConsultation) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const scheduledAt = new Date(activeConsultation.scheduled_at);
  const now = new Date();
  const hasStarted = now >= scheduledAt;
  const isLowTime = timeRemaining <= 300 && timeRemaining > 0; // Less than 5 minutes

  return (
    <Card className={cn(
      "border-2 transition-colors",
      isExpired ? "border-destructive bg-destructive/5" :
      isLowTime ? "border-amber-500 bg-amber-500/5" :
      "border-secondary bg-secondary/5"
    )}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              isExpired ? "bg-destructive/10" :
              isLowTime ? "bg-amber-500/10" :
              "bg-secondary/10"
            )}>
              {isExpired ? (
                <AlertCircle className="h-5 w-5 text-destructive" />
              ) : (
                <Clock className={cn(
                  "h-5 w-5",
                  isLowTime ? "text-amber-500 animate-pulse" : "text-secondary"
                )} />
              )}
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">
                {isExpired ? "Time's Up!" : hasStarted ? "Session In Progress" : "Starting Soon"}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                {activeConsultation.service_type}
              </p>
            </div>
          </div>
          
          {activeConsultation.google_meet_link && (
            <Button 
              size="sm" 
              className="bg-secondary hover:bg-secondary/90"
              asChild
            >
              <a href={activeConsultation.google_meet_link} target="_blank" rel="noopener noreferrer">
                <Video className="h-4 w-4 mr-2" />
                Join
              </a>
            </Button>
          )}
        </div>

        {/* Timer Display */}
        <div className={cn(
          "rounded-lg p-4 text-center",
          isExpired ? "bg-destructive/10" :
          isLowTime ? "bg-amber-500/10" :
          "bg-secondary/10"
        )}>
          {!hasStarted ? (
            <div>
              <div className="text-sm text-muted-foreground font-body mb-1">Starts in</div>
              <div className="text-3xl font-display font-bold text-foreground tabular-nums">
                {formatTime(Math.max(0, Math.floor((scheduledAt.getTime() - now.getTime()) / 1000)))}
              </div>
            </div>
          ) : isExpired ? (
            <div>
              <div className="text-sm text-destructive font-body mb-2">
                Your free consultation has ended
              </div>
              <Button 
                className="bg-secondary hover:bg-secondary/90"
                asChild
              >
                <Link to="/checkout?plan=consultation&duration=30">
                  Top Up for More Time
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              <div className="text-sm text-muted-foreground font-body mb-1">Time Remaining</div>
              <div className={cn(
                "text-4xl font-display font-bold tabular-nums",
                isLowTime ? "text-amber-600" : "text-foreground"
              )}>
                {formatTime(timeRemaining)}
              </div>
              {activeConsultation.is_free_consultation && (
                <div className="text-xs text-muted-foreground font-body mt-2">
                  Free 30-minute consultation
                </div>
              )}
            </div>
          )}
        </div>

        {/* Low time warning */}
        {isLowTime && !isExpired && (
          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm text-amber-700 font-body text-center">
              Less than 5 minutes remaining! Need more time?{" "}
              <Link to="/checkout?plan=consultation&duration=30" className="font-semibold underline">
                Top up now
              </Link>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
