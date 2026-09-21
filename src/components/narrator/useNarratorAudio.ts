import { useState, useCallback, useRef } from "react";

const NARRATOR_SCRIPT = `Welcome to Modern Legal Solutions, your trusted partner for comprehensive legal services across Canada. 

We specialize in corporate law, contract drafting, and litigation support, helping businesses navigate complex legal challenges with confidence.

Our innovative AI-powered case analysis provides instant legal insights, while our team of experienced attorneys delivers personalized consultations tailored to your needs.

Whether you're incorporating a new business, drafting contracts, or facing corporate disputes, we're here to help. Book your free 30-minute consultation today and discover how modern legal solutions can work for you.`;

export function useNarratorAudio() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playNarration = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            text: NARRATOR_SCRIPT,
            voiceId: "EXAVITQu4vr4xnSDxMaL" // Sarah - professional female voice
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to generate audio: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        setError("Failed to play audio");
      };

      await audio.play();
    } catch (err) {
      console.error("Narration error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate narration");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopNarration = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  }, []);

  return {
    isLoading,
    isSpeaking,
    error,
    playNarration,
    stopNarration,
  };
}
