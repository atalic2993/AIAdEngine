export type PlanId = "scale" | "dominate";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  positioning: string;
  cta: string;
  features: string[];
  featured: boolean;
  badge?: string;
  itemName: string;
  itemDescription: string;
};

export const PLANS: Record<PlanId, Plan> = {
  scale: {
    id: "scale",
    name: "Scale",
    price: 599,
    priceLabel: "R599",
    tagline: "Self-service",
    positioning:
      "For business owners who want a simple, affordable way to launch and manage powerful advertising themselves.",
    cta: "Start Scale — R599/mo",
    features: [
      "AI Ad Launcher",
      "Facebook Ads",
      "Instagram Ads",
      "Google Ads",
      "TikTok Ads",
      "CRM",
      "Pipeline tracking",
      "Lead management",
      "Campaign dashboard and reporting",
    ],
    featured: false,
    itemName: "AI Ad Engine Scale plan",
    itemDescription: "AI Ad Engine Scale plan. Monthly subscription. Advertising spend not included.",
  },
  dominate: {
    id: "dominate",
    name: "Dominate",
    price: 1599,
    priceLabel: "R1,599",
    tagline: "Done-with-you",
    positioning:
      "For businesses that want the technology plus hands-on help getting their advertising built, launched and moving in the right direction.",
    cta: "Start Dominate — R1,599/mo",
    features: [
      "Everything in Scale",
      "Done-With-You campaign setup",
      "Help building campaigns",
      "Help launching campaigns",
      "Priority onboarding",
      "Priority support",
      "Campaign strategy assistance",
      "Additional marketing guidance",
    ],
    featured: true,
    badge: "Most popular",
    itemName: "AI Ad Engine Dominate plan",
    itemDescription:
      "AI Ad Engine Dominate plan. Monthly subscription. Advertising spend not included.",
  },
};

export const PLAN_LIST: Plan[] = [PLANS.scale, PLANS.dominate];

export function isPlanId(value: string): value is PlanId {
  return value === "scale" || value === "dominate";
}

export const SPEND_DISCLOSURE =
  "Advertising spend is separate. Your AI Ad Engine subscription does not include the actual advertising budget paid to Meta, Google or TikTok.";

export const RESULTS_DISCLAIMER =
  "Individual results vary. Past performance and customer case studies do not guarantee future results.";
