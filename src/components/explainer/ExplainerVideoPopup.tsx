import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
const explainerVideo = "/videos/legal-explainer.mp4";
import { Link } from "react-router-dom";
import { useFooterInView } from "@/hooks/useFooterInView";

// Royalty-free ambient corporate music URL
const BACKGROUND_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3";

export function ExplainerVideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isFooterInView = useFooterInView();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [isOpen]);

  // Initialize audio on first open
  useEffect(() => {
    if (isOpen && !audioRef.current) {
      const audio = new Audio(BACKGROUND_MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch(console.error);
        }
      }
    }, 300);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsOpen(false);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      audioRef.current?.pause();
    } else {
      videoRef.current.play();
      if (audioRef.current && !isMuted) {
        audioRef.current.play().catch(console.error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        if (isPlaying) audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
    setIsMuted(!isMuted);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(100);
    audioRef.current?.pause();
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={handleOpen}
        className={cn(
          "fixed right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full",
          isFooterInView ? "bottom-40" : "bottom-24",
          "bg-gradient-to-r from-secondary via-secondary to-gold text-secondary-foreground",
          "shadow-xl hover:shadow-2xl transition-all duration-300",
          "hover:scale-105 active:scale-95 group",
          "border border-secondary/20",
          isOpen && "hidden"
        )}
      >
        <div className="relative">
          <Play className="h-5 w-5 fill-current" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
        <span className="font-semibold text-sm">Watch Our Story</span>
      </button>

      {/* Video popup overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div 
            className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Video container */}
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={explainerVideo}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                onEnded={handleVideoEnd}
                onClick={togglePlay}
              />
              
              {/* Play overlay when paused */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-primary fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-secondary transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls and CTA */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-muted/50 to-muted/30">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlay}
                  className="h-11 w-11 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="h-11 w-11 rounded-full"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">Discover Modern Legal Solutions</p>
                  <p className="text-xs text-muted-foreground">Trusted legal services and lawyers since 2016</p>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 shadow-lg"
                asChild
                onClick={handleClose}
              >
                <Link to="/book">
                  <Sparkles className="h-4 w-4" />
                  Book Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
