import { Layout } from "@/components/layout/Layout";
import { ProfileHistory } from "@/components/home/ProfileHistory";

const About = () => {
  return (
    <Layout>
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            About LegalXpress
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-body">
            A Canadian corporate law practice serving clients since 2016 — legal
            services provided in-house by our licensed legal team, offered through a
            simple membership.
          </p>
        </div>
      </section>
      <ProfileHistory />
    </Layout>
  );
};

export default About;
