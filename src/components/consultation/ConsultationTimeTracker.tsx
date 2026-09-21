import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Video, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface ActiveConsultation {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  is_free_consultation: boolean;
  service_type: string;
}

export function ConsultationTimeTracker() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showTopUpPrompt, setShowTopUpPrompt] = useState(false);
  const [expiredConsultation, setExpiredConsultation] = useState<ActiveConsultation | null>(null);
  const [dismissedConsultations, setDismissedConsultations] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;

    // Load dismissed consultations from localStorage
    const dismissed = localStorage.getItem(`dismissed_consultations_${user.id}`);
    if (dismissed) {
      setDismissedConsultations(new Set(JSON.parse(dismissed)));
    }

    const checkActiveConsultations = async () => {
      const now = new Date();
      
      // Fetch confirmed free consultations for the user
      const { data: consultations } = await supabase
        .from("consultations")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_free_consultation", true)
        .in("status", ["confirmed", "pending"]);

      if (consultations) {
        for (const consultation of consultations) {
          const scheduledAt = new Date(consultation.scheduled_at);
          const endTime = new Date(scheduledAt.getTime() + (consultation.duration_minutes || 30) * 60 * 1000);
          
          // Check if consultation has ended (within a 5-minute window after end time)
          const fiveMinutesAfterEnd = new Date(endTime.getTime() + 5 * 60 * 1000);
          
          if (now >= endTime && now <= fiveMinutesAfterEnd) {
            // Check if this consultation was already dismissed
            const dismissed = localStorage.getItem(`dismissed_consultations_${user.id}`);
            const dismissedSet = dismissed ? new Set(JSON.parse(dismissed)) : new Set();
            
            if (!dismissedSet.has(consultation.id)) {
              setExpiredConsultation(consultation);
              setShowTopUpPrompt(true);
              break;
            }
          }
        }
      }
    };

    // Check immediately
    checkActiveConsultations();

    // Check every 30 seconds
    const interval = setInterval(checkActiveConsultations, 30000);

    return () => clearInterval(interval);
  }, [user]);

  const handleDismiss = () => {
    if (expiredConsultation && user) {
      const newDismissed = new Set(dismissedConsultations);
      newDismissed.add(expiredConsultation.id);
      setDismissedConsultations(newDismissed);
      localStorage.setItem(
        `dismissed_consultations_${user.id}`,
        JSON.stringify(Array.from(newDismissed))
      );
    }
    setShowTopUpPrompt(false);
    setExpiredConsultation(null);
  };

  const handleTopUp = () => {
    handleDismiss();
    navigate("/checkout?plan=consultation&duration=30");
  };

  const handleTopUpHour = () => {
    handleDismiss();
    navigate("/checkout?plan=consultation&duration=60");
  };

  return (
    <Dialog open={showTopUpPrompt} onOpenChange={(open) => !open && handleDismiss()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 mx-auto mb-4">
            <Clock className="h-6 w-6 text-secondary" />
          </div>
          <DialogTitle className="font-display text-xl text-center">
            Your Free Consultation Has Ended
          </DialogTitle>
          <DialogDescription className="font-body text-center">
            Need more time with your lawyer? Top up now to continue your session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Service Type */}
          {expiredConsultation && (
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <span className="text-sm text-muted-foreground font-body">Consultation: </span>
              <span className="font-medium text-foreground">{expiredConsultation.service_type}</span>
            </div>
          )}

          {/* Pricing Options */}
          <div className="space-y-3">
            <button
              onClick={handleTopUp}
              className="w-full p-4 rounded-lg border-2 border-secondary/30 hover:border-secondary transition-colors text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span className="font-display font-semibold text-foreground">30 Minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-display font-bold text-foreground">$200</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
              </div>
            </button>

            <button
              onClick={handleTopUpHour}
              className="w-full p-4 rounded-lg border-2 border-primary/30 hover:border-primary bg-primary/5 transition-colors text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-display font-semibold text-foreground">1 Hour</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Best Value</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-display font-bold text-foreground">$375</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          </div>

          {/* Google Meet reminder */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Video className="h-4 w-4" />
            <span className="font-body">Continue via Google Meet</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={handleDismiss} className="w-full">
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
