import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Mic, Loader2, Volume2, VolumeX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useFooterInView } from "@/hooks/useFooterInView";
import { AnimatedAvatar } from "./AnimatedAvatar";
import { useNarratorAudio } from "./useNarratorAudio";

export function NarratorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const isFooterInView = useFooterInView();
  
  const { isLoading, isSpeaking, error, playNarration, stopNarration } = useNarratorAudio();

  // Auto-play when popup opens
  useEffect(() => {
    if (isOpen && !hasAutoPlayed && !isLoading && !isSpeaking) {
      setHasAutoPlayed(true);
      playNarration();
    }
  }, [isOpen, hasAutoPlayed, isLoading, isSpeaking, playNarration]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasAutoPlayed(false); // Reset so it auto-plays on open
  };

  const handleClose = () => {
    stopNarration();
    setIsOpen(false);
  };

  const toggleNarration = () => {
    if (isSpeaking) {
      stopNarration();
    } else {
      playNarration();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={handleOpen}
        className={cn(
          "fixed right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full",
          isFooterInView ? "bottom-40" : "bottom-24",
          "bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground",
          "shadow-xl hover:shadow-2xl transition-all duration-300",
          "hover:scale-105 active:scale-95 group",
          "border border-secondary/30",
          isOpen && "hidden"
        )}
      >
        <div className="relative">
          <Mic className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
        </div>
        <span className="font-semibold text-sm">Meet Our AI Guide</span>
      </button>

      {/* Narrator popup overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div 
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-muted/50 hover:bg-muted text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Avatar section */}
            <div className="relative bg-gradient-to-b from-primary/20 via-muted/30 to-transparent pt-10 pb-6 flex flex-col items-center">
              <AnimatedAvatar isSpeaking={isSpeaking} />
              
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {isLoading ? "Preparing..." : isSpeaking ? "Speaking..." : "AI Legal Guide"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your virtual legal assistant
                </p>
              </div>

              {/* Loading indicator */}
              {isLoading && (
                <div className="mt-4 flex items-center gap-2 text-secondary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm">Generating narration...</span>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="mt-4 px-4 py-2 bg-destructive/10 text-destructive text-sm rounded-lg max-w-xs text-center">
                  {error}
                </div>
              )}
            </div>

            {/* Transcript preview */}
            <div className="px-6 py-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                "Welcome to Modern Legal Solutions, your trusted partner for comprehensive 
                legal services across Canada..."
              </p>
            </div>

            {/* Controls and CTA */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-muted/50 to-muted/30 border-t border-border/50">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleNarration}
                  disabled={isLoading}
                  className="h-11 w-11 rounded-full"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isSpeaking ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {isSpeaking ? "Stop" : "Play"} narration
                </span>
              </div>
              
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 shadow-lg"
                asChild
                onClick={handleClose}
              >
                <Link to="/book">
                  <Sparkles className="h-4 w-4" />
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
