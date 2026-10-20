import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { DoorCrashers } from "@/components/home/DoorCrashers";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { CaseAnalysisTeaser } from "@/components/home/CaseAnalysisTeaser";
import { SubscriptionsTeaser } from "@/components/home/SubscriptionsTeaser";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { ExploreMore } from "@/components/home/ExploreMore";
import { CTA } from "@/components/home/CTA";
import { QandA } from "@/components/home/QandA";

const Index = () => {
  return (
    <Layout showSectionNav>
      <Hero />
      <DoorCrashers />
      <ServicesTeaser />
      <CaseAnalysisTeaser />
      <SubscriptionsTeaser />
      <WhyChooseUs />
      <MembershipTeaser />
      <ExploreMore />
      <QandA />
      <CTA />
    </Layout>
  );
};

export default Index;
