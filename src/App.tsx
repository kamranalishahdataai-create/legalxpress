import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { LawyerProvider } from "@/hooks/useLawyer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Book from "./pages/Book";
import CaseAnalysisPage from "./pages/CaseAnalysis";
import CaseAnalysisPreviewPage from "./pages/CaseAnalysisPreview";
import CaseAnalysisCheckout from "./pages/CaseAnalysisCheckout";
import ContractsPage from "./pages/Contracts";
import BlogPage from "./pages/Blog";
import FAQPage from "./pages/FAQ";
import ContactPage from "./pages/Contact";
import AffiliatesPage from "./pages/Affiliates";
import PriceMatchPage from "./pages/PriceMatch";
import AboutPage from "./pages/About";
import SubscriptionsPage from "./pages/Subscriptions";
import PortalDashboard from "./pages/portal/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LawyerPortal from "./pages/lawyer/LawyerPortal";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Checkout from "./pages/Checkout";
import CommunityPage from "./pages/Community";
import FounderMembers from "./pages/FounderMembers";
import PromoDeals from "./pages/PromoDeals";
import AffiliateRequest from "./pages/AffiliateRequest";
import Landing from "./pages/Landing";
import { RouteSeo } from "@/components/seo/RouteSeo";

const queryClient = new QueryClient();

function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RouteTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="animate-fade-in motion-reduce:animate-none">
      {children}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LawyerProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTopOnNav />
            <RouteSeo />
            <RouteTransition>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Index />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />


              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<Book />} />
              <Route path="/case-analysis" element={<CaseAnalysisPage />} />
              <Route path="/case-analysis/preview" element={<CaseAnalysisPreviewPage />} />
              <Route path="/checkout/case-analysis" element={<CaseAnalysisCheckout />} />
              <Route path="/contracts" element={<ContractsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/affiliates/request" element={<AffiliateRequest />} />
              <Route path="/price-match" element={<PriceMatchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route path="/subscriptions/:planType" element={<SubscriptionsPage />} />
              <Route path="/portal" element={<PortalDashboard />} />
              <Route path="/portal/*" element={<PortalDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/lawyer-portal" element={<LawyerPortal />} />
              <Route path="/lawyer-portal/*" element={<LawyerPortal />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/founder-members" element={<FounderMembers />} />
              <Route path="/promo-deals" element={<PromoDeals />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </RouteTransition>
          </BrowserRouter>
        </TooltipProvider>
      </LawyerProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
