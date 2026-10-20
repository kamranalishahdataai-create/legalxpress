import { ReactNode } from "react";
import { Footer } from "./Footer";
import { LiveChat } from "@/components/chat/LiveChat";
import { ScrollToTop } from "./ScrollToTop";
import { SectionNav } from "./SectionNav";
import { ExplainerVideoPopup } from "@/components/explainer/ExplainerVideoPopup";
import { ConsultationTimeTracker } from "@/components/consultation/ConsultationTimeTracker";
import { BackButton } from "./BackButton";
import { useLocation } from "react-router-dom";


interface LayoutProps {
  children: ReactNode;
  showSectionNav?: boolean;
}

export function Layout({ children, showSectionNav = false }: LayoutProps) {
  const { pathname } = useLocation();
  const pageKind = pathname === "/home" ? "site-home" : "site-subpage";
  const contentKind = ["/privacy", "/terms"].includes(pathname) ? "site-policy" : "";
  const experienceKind = /^\/(portal|admin|lawyer-portal)(\/|$)/.test(pathname) ? "site-workspace" : ["/login", "/register"].includes(pathname) ? "site-account" : "";
  return (
    <div className={`site-shell ${pageKind} ${contentKind} ${experienceKind} min-h-screen flex flex-col bg-background`}>
      <BackButton />
      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <LiveChat />
      <ScrollToTop />
      <ExplainerVideoPopup />
      <ConsultationTimeTracker />
      {showSectionNav && <SectionNav />}
    </div>
  );
}
