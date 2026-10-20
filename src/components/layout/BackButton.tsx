import { Link, useLocation, useNavigate } from "react-router-dom";
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
    <nav aria-label="Page navigation" className="page-navigation border-b border-border bg-background">
      <div className="container gutter-x flex items-center gap-1 py-3">
      <Link to="/home" className="mr-4 hidden md:block font-display text-xl text-foreground" aria-label="LegalXpress home">LegalXpress<span className="text-forest">.</span></Link>
      <Button
        onClick={handleBack}
        size="sm"
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground"
        aria-label="Go back"
        title="Go back"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>
      <Button
        onClick={() => navigate("/home")}
        size="sm"
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground"
        aria-label="Go to home"
        title="Go to home"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Button>
      <Button
        onClick={() => navigate("/")}
        size="sm"
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground"
        aria-label="Back to landing page"
        title="Back to landing page"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">Landing</span>
      </Button>
      <div className="ml-auto"><LanguageSwitcher compact /></div>
      </div>
    </nav>
  );
}
