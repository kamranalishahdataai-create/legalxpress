import { ReactNode } from "react";
import { Footer } from "./Footer";
import { LiveChat } from "@/components/chat/LiveChat";
import { ScrollToTop } from "./ScrollToTop";
import { SectionNav } from "./SectionNav";
import { ExplainerVideoPopup } from "@/components/explainer/ExplainerVideoPopup";
import { ConsultationTimeTracker } from "@/components/consultation/ConsultationTimeTracker";
import { BackButton } from "./BackButton";


interface LayoutProps {
  children: ReactNode;
  showSectionNav?: boolean;
}

export function Layout({ children, showSectionNav = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
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
