import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on landing and on /home (the hero brand bar has its own Landing link)
  const hiddenRoutes = ["/", "/landing", "/home"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const handleBack = () => {
    // react-router tracks its position in the history stack on history.state.idx
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;

    if (idx > 0) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };


  return (
    <div className="fixed top-4 left-4 z-40 flex gap-2">
      <Button
        onClick={handleBack}
        size="sm"
        className="shadow-md bg-primary text-primary-foreground hover:bg-primary/90 border border-secondary/40 gap-2"
        aria-label="Go back"
      >
        <ArrowLeft className="h-4 w-4 text-secondary" />
        <span className="hidden sm:inline">Back</span>
      </Button>
      <Button
        onClick={() => navigate("/home")}
        size="sm"
        className="shadow-md bg-primary text-primary-foreground hover:bg-primary/90 border border-secondary/40 gap-2"
        aria-label="Go to home"
      >
        <Home className="h-4 w-4 text-secondary" />
        <span className="hidden sm:inline">Home</span>
      </Button>
      <Button
        onClick={() => navigate("/")}
        size="sm"
        className="shadow-md bg-primary text-primary-foreground hover:bg-primary/90 border border-secondary/40 gap-2"
        aria-label="Back to landing page"
      >
        <Sparkles className="h-4 w-4 text-secondary" />
        <span className="hidden sm:inline">Landing</span>
      </Button>
      <LanguageSwitcher compact />
    </div>
  );
}
