import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
    <div className="container gutter-x flex min-h-[60vh] items-center justify-center py-16">
      <div className="text-center max-w-lg">
        <p className="text-sm font-medium text-forest mb-4">404</p>
        <h1 className="mb-4 font-display text-4xl font-medium">Page not found</h1>
        <Button asChild className="mt-4">
        <a href="/home">
          Return to Home
          <ArrowRight className="h-4 w-4" />
        </a>
        </Button>
      </div>
    </div>
    </Layout>
  );
};

export default NotFound;
