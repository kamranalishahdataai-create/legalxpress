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
            An Ontario law practice led by Shiv Kumar Passi, Lawyer, LSO No. 70089L — membership-based legal services with a written scope and published prices.
          </p>
        </div>
      </section>
      <ProfileHistory />
    </Layout>
  );
};

export default About;
