import { cn } from "@/lib/utils";

interface AnimatedAvatarProps {
  isSpeaking: boolean;
  className?: string;
}

export function AnimatedAvatar({ isSpeaking, className }: AnimatedAvatarProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer pulsing rings when speaking */}
      {isSpeaking && (
        <>
          <div className="absolute inset-0 rounded-full bg-secondary/20 animate-ping" style={{ animationDuration: "1.5s" }} />
          <div className="absolute inset-2 rounded-full bg-secondary/30 animate-ping" style={{ animationDuration: "1.2s", animationDelay: "0.2s" }} />
        </>
      )}
      
      {/* Main avatar container */}
      <div className={cn(
        "relative w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-300",
        isSpeaking 
          ? "border-secondary shadow-lg shadow-secondary/30 scale-105" 
          : "border-border"
      )}>
        {/* Avatar background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary" />
        
        {/* Avatar face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex gap-6 mb-3">
            <div className={cn(
              "w-4 h-4 rounded-full bg-white transition-all duration-200",
              isSpeaking && "animate-pulse"
            )}>
              <div className="w-2 h-2 rounded-full bg-foreground mt-1 ml-1" />
            </div>
            <div className={cn(
              "w-4 h-4 rounded-full bg-white transition-all duration-200",
              isSpeaking && "animate-pulse"
            )}>
              <div className="w-2 h-2 rounded-full bg-foreground mt-1 ml-1" />
            </div>
          </div>
          
          {/* Mouth - animated when speaking */}
          <div className={cn(
            "bg-white rounded-full transition-all duration-150",
            isSpeaking 
              ? "w-6 h-4 animate-bounce" 
              : "w-8 h-2"
          )} style={{ animationDuration: "0.3s" }} />
        </div>
        
        {/* Headphones */}
        <div className="absolute top-2 left-0 w-3 h-8 bg-secondary rounded-r-full" />
        <div className="absolute top-2 right-0 w-3 h-8 bg-secondary rounded-l-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 border-4 border-secondary border-b-0 rounded-t-full" />
      </div>
      
      {/* Sound waves when speaking */}
      {isSpeaking && (
        <div className="absolute -right-8 flex gap-1 items-end h-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 bg-secondary rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 16 + 8}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.4s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
