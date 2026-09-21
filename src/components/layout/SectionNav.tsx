import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Home, Briefcase, CreditCard, Star, Mail, Scale, Compass, Brain, Heart, HelpCircle } from "lucide-react";

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "deals", label: "Specials", icon: Scale },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "case-analysis", label: "Case AI", icon: Brain },
  { id: "subscriptions", label: "Plans", icon: CreditCard },
  { id: "membership", label: "Members", icon: Star },
  { id: "referral", label: "Refer", icon: Heart },
  { id: "explore", label: "More", icon: Compass },
  { id: "q-and-a", label: "Q & A", icon: HelpCircle },
  { id: "contact", label: "Contact", icon: Mail },
];

export function SectionNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);

      const sectionElements = sections
        .map((s) => ({
          id: s.id,
          element: document.getElementById(s.id),
        }))
        .filter((s) => s.element);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll tabs to keep active tab visible
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const activeTab = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      const scrollLeft = tabRect.left - containerRect.left - (containerRect.width / 2) + (tabRect.width / 2);
      container.scrollBy({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for floating tab bar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      )}
    >
      <div className="bg-primary/95 backdrop-blur-md border-b border-secondary/30 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div
            ref={tabsRef}
            className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const addSpacerAfter = section.id === "subscriptions";

              return (
                <>
                  <button
                    key={section.id}
                    ref={isActive ? activeTabRef : null}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 flex-1 justify-center min-w-0",
                      isActive
                        ? "bg-secondary text-secondary-foreground shadow-md"
                        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-body hidden sm:inline">{section.label}</span>
                  </button>
                  {addSpacerAfter && (
                    <div key={`spacer-${index}`} className="w-px h-6 bg-secondary/30 mx-1 flex-shrink-0" />
                  )}
                </>
              );
            })}
            <div className="ml-1 flex-shrink-0">
              <LanguageSwitcher compact />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
