import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { SubscriberCountdown } from "@/components/home/SubscriberCountdown";
import { DoorCrashers } from "@/components/home/DoorCrashers";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { CaseAnalysisTeaser } from "@/components/home/CaseAnalysisTeaser";
import { SubscriptionsTeaser } from "@/components/home/SubscriptionsTeaser";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { ReferralTeaser } from "@/components/home/ReferralTeaser";
import { ExploreMore } from "@/components/home/ExploreMore";
import { ReviewsTeaser } from "@/components/home/ReviewsTeaser";
import { CTA } from "@/components/home/CTA";
import { QandA } from "@/components/home/QandA";

const Index = () => {
  return (
    <Layout showSectionNav>
      <SubscriberCountdown />
      <Hero />
      <DoorCrashers />
      <ServicesTeaser />
      <CaseAnalysisTeaser />
      <SubscriptionsTeaser />
      <WhyChooseUs />
      <MembershipTeaser />
      <ReferralTeaser />
      <ExploreMore />
      <QandA />
      <ReviewsTeaser />
      <CTA />
    </Layout>
  );
};

export default Index;
