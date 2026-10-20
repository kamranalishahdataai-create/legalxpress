import bellImage from "@/assets/bell-partnership.jpg";
import telusImage from "@/assets/telus-partnership.jpg";
import rogersImage from "@/assets/rogers-partnership.jpg";

export type TelecomPartner = "bell" | "telus" | "rogers";

export const telecomPartnerships = {
  rogers: {
    name: "Rogers", account: "MyRogers", business: "Rogers for Business", image: rogersImage,
    headline: "Your Rogers plan. Your legal team.",
    intro: "A proposed partnership bringing LegalXpress personal memberships and corporate packages into eligible Rogers plans — real help with life's legal moments, as part of the plan.",
    personalPlan: "Eligible Rogers Infinite+ mobile or home Internet plan",
    businessPlan: "Eligible Rogers for Business account · mobile lines and fibre",
    personalServices: "mobile, home Internet or Ignite TV", businessServices: "business mobile lines, fibre Internet, cloud and security services",
    storyName: "Maya", businessName: "Raj", storyRole: "Personal member · renting her first condo", businessRole: "Corporate member · opening his second restaurant",
  },
  bell: {
    name: "Bell", account: "MyBell", business: "Bell Business", image: bellImage,
    headline: "Connected to more than your network.",
    intro: "A proposed partnership bringing LegalXpress personal memberships and corporate packages into eligible Bell plans — everyday connection, with access to legal services.",
    personalPlan: "Eligible Bell Mobility or Fibe Internet plan",
    businessPlan: "Eligible Bell Business Mobility or Business Fibe Internet plan",
    personalServices: "mobile or home Internet", businessServices: "business mobile lines or Business Fibe Internet",
    storyName: "Maya", businessName: "Raj", storyRole: "Personal member · planning her next chapter", businessRole: "Corporate member · growing a neighbourhood café",
  },
  telus: {
    name: "TELUS", account: "My TELUS", business: "TELUS Business", image: telusImage,
    headline: "More connection. More peace of mind.",
    intro: "A proposed partnership bringing LegalXpress into eligible TELUS personal and business plans — practical legal support for the people and businesses behind every connection.",
    personalPlan: "Eligible TELUS Mobility or home Internet plan",
    businessPlan: "Eligible TELUS Business Mobility or PureFibre plan",
    personalServices: "mobile or home Internet", businessServices: "business mobility, PureFibre or Business Connect",
    storyName: "Amira", businessName: "Daniel", storyRole: "Personal member · settling into a new home", businessRole: "Corporate member · launching a consulting business",
  },
} as const;