import type { Metadata } from "next";
import { LegalPage, type LegalBlock } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern use of the AI Ad Engine website, platform, advertising tools and related services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Conditions | AI Ad Engine",
    description: "The terms that govern use of the AI Ad Engine website, platform, advertising tools and related services.",
    url: "/terms",
  },
};

const BLOCKS: LegalBlock[] = [
  {
    heading: "1. Introduction",
    paragraphs: [
      "These Terms and Conditions govern the use of the AI Ad Engine website, platform, advertising tools and related services (“Services”).",
      "By accessing AI Ad Engine, subscribing to a plan or using the Services, the customer agrees to these Terms and Conditions.",
      "AI Ad Engine provides technology, tools and related services designed to assist businesses with the creation, launch, management and optimisation of digital advertising campaigns across supported platforms including Meta, Facebook, Instagram, Google and TikTok.",
    ],
  },
  {
    heading: "2. Subscription plans",
    paragraphs: ["AI Ad Engine currently offers:"],
    bullets: ["Scale — R599 per month", "Dominate — R1,599 per month"],
  },
  {
    paragraphs: [
      "Subscriptions are billed monthly in advance.",
      "Subscriptions operate on a month-to-month basis unless otherwise expressly agreed in writing.",
      "There is no long-term contract or minimum subscription term.",
    ],
  },
  {
    heading: "3. Automatic renewal",
    paragraphs: [
      "Subscriptions automatically renew monthly until cancelled.",
      "By subscribing, the customer authorises the recurring monthly payment associated with the selected plan.",
      "Customers are responsible for cancelling before their next renewal date if they do not wish to continue.",
    ],
  },
  {
    heading: "4. Advertising spend",
    paragraphs: [
      "AI Ad Engine subscription fees do not include advertising or media spend.",
      "Advertising budgets paid to Meta, Facebook, Instagram, Google, TikTok or another advertising platform are separate from the AI Ad Engine subscription.",
      "The customer remains responsible for these charges.",
    ],
  },
  {
    heading: "5. Third-party platforms",
    paragraphs: [
      "AI Ad Engine uses and/or connects with third-party services and advertising platforms.",
      "These may include Meta, Facebook, Instagram, Google, TikTok and other software and technology providers.",
      "Customers remain subject to the respective terms and policies of those third-party providers.",
      "AI Ad Engine cannot be held responsible for circumstances outside its reasonable control, including:",
    ],
    bullets: [
      "Third-party outages",
      "Advertising account restrictions",
      "Advertising account suspensions",
      "Advertisement rejections",
      "Platform policy changes",
      "Algorithm changes",
      "Third-party technical failures",
    ],
  },
  {
    heading: "6. No guarantee of results",
    paragraphs: [
      "AI Ad Engine provides advertising software, technology and related assistance.",
      "AI Ad Engine does not guarantee any specific number of:",
    ],
    bullets: [
      "Leads",
      "Customers",
      "Sales",
      "Revenue",
      "Appointments",
      "Clicks",
      "Impressions",
      "Return on advertising spend",
    ],
  },
  {
    paragraphs: ["Advertising results depend on numerous factors including:"],
    bullets: [
      "Industry",
      "Market",
      "Location",
      "Competition",
      "Advertising budget",
      "Offer",
      "Pricing",
      "Creative",
      "Website or landing page",
      "Sales process",
      "Customer follow-up",
      "Consumer demand",
      "Third-party advertising platform algorithms",
    ],
  },
  {
    paragraphs: [
      "Case studies, testimonials and previous customer results are provided as examples and do not guarantee that another customer will achieve the same or similar results.",
    ],
  },
  {
    heading: "7. Customer responsibilities",
    paragraphs: ["Customers remain responsible for:"],
    bullets: [
      "Products and services they advertise",
      "Accuracy of advertising claims",
      "Offers and promotions",
      "Advertising budgets",
      "Customer communications",
      "Advertising account access",
      "Third-party advertising accounts",
      "Legal and regulatory compliance",
      "Sales and fulfilment",
    ],
  },
  {
    paragraphs: [
      "Customers may not use AI Ad Engine to advertise unlawful, fraudulent, misleading or prohibited products or services.",
    ],
  },
  {
    heading: "8. Scale plan",
    paragraphs: [
      "Scale is primarily a self-service subscription.",
      "The customer remains responsible for using the platform and supplying the required business and advertising information.",
    ],
  },
  {
    heading: "9. Dominate plan",
    paragraphs: [
      "Dominate includes additional Done-With-You assistance.",
      "Done-With-You assistance does not constitute unlimited advertising agency services, unlimited campaign creation or unlimited campaign management.",
      "Customers remain responsible for supplying requested information, account access, approvals and advertising budgets.",
    ],
  },
  {
    heading: "10. Payments",
    paragraphs: [
      "Payments are processed using PayFast or another payment provider selected by AI Ad Engine.",
      "By subscribing, the customer authorises recurring monthly subscription payments until the subscription is cancelled.",
    ],
  },
  {
    heading: "11. Cancellation",
    paragraphs: [
      "Customers may cancel their subscription at any time.",
      "Cancellation prevents future renewal charges.",
      "Except where otherwise required under applicable South African law, cancellation does not ordinarily result in a refund for a billing period that has already commenced.",
      "Where applicable, access to the Services may continue until the end of the period already paid for.",
    ],
  },
  {
    heading: "12. Refunds",
    paragraphs: [
      "Refunds are governed by the AI Ad Engine Refund & Cancellation Policy.",
      "Except where applicable law requires otherwise, subscription fees for a billing period that has already commenced and for which Services have been activated or made available are non-refundable.",
    ],
  },
  {
    heading: "13. Account suspension or termination",
    paragraphs: ["AI Ad Engine may suspend or terminate access where a customer:"],
    bullets: [
      "Fails to pay subscription fees",
      "Uses the Service unlawfully",
      "Violates third-party platform policies",
      "Engages in fraudulent activity",
      "Attempts to abuse the platform",
      "Materially breaches these Terms",
    ],
  },
  {
    heading: "14. Intellectual property",
    paragraphs: [
      "AI Ad Engine branding, website content, documentation, graphics, processes and proprietary materials may not be copied, reproduced, resold or distributed without permission.",
      "Third-party software, trademarks and platforms remain the property of their respective owners.",
    ],
  },
  {
    heading: "15. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted under applicable law, AI Ad Engine shall not be liable for indirect, consequential or special losses arising from the use of the Services, including lost profits, missed opportunities or losses resulting from decisions made by third-party advertising platforms.",
      "Nothing in these Terms excludes any liability or statutory consumer right that may not lawfully be excluded.",
    ],
  },
  {
    heading: "16. Changes to the service",
    paragraphs: [
      "AI Ad Engine may modify, improve, replace or discontinue platform features where reasonably necessary.",
    ],
  },
  {
    heading: "17. Privacy",
    paragraphs: [
      "Personal information is processed in accordance with the AI Ad Engine Privacy Policy and applicable South African data protection legislation, including POPIA.",
    ],
  },
  {
    heading: "18. South African law",
    paragraphs: [
      "These Terms are governed by the laws of the Republic of South Africa.",
      "Nothing contained in these Terms is intended to exclude, restrict or override any statutory consumer right that cannot lawfully be excluded under applicable South African law.",
    ],
  },
  {
    heading: "19. Contact",
    paragraphs: [
      "Questions relating to these Terms may be submitted through the contact information displayed on aiadengine.co.za.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      description="The terms that govern use of the AI Ad Engine website, platform, advertising tools and related services."
      updated="August 2026"
      blocks={BLOCKS}
    />
  );
}
