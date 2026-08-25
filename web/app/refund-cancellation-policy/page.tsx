import type { Metadata } from "next";
import { LegalPage, type LegalBlock } from "@/components/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "How AI Ad Engine subscriptions are cancelled, when refunds apply and what happens to advertising spend paid to third-party platforms.",
  alternates: { canonical: "/refund-cancellation-policy" },
  openGraph: {
    title: "Refund & Cancellation Policy | AI Ad Engine",
    description: "How AI Ad Engine subscriptions are cancelled, when refunds apply and what happens to advertising spend paid to third-party platforms.",
    url: "/refund-cancellation-policy",
  },
};

const BLOCKS: LegalBlock[] = [
  {
    heading: "Month-to-month subscriptions",
    paragraphs: [
      "AI Ad Engine subscriptions operate on a month-to-month basis.",
      "There are no long-term contracts.",
    ],
  },
  {
    heading: "Cancellation",
    paragraphs: [
      "Customers may cancel their subscription at any time.",
      "To avoid the next monthly renewal charge, customers should cancel before their next scheduled billing date.",
      "Cancellation stops future subscription renewals.",
      "Where applicable, customers may continue using the Services until the end of the subscription period already paid for.",
    ],
  },
  {
    heading: "Subscription refunds",
    paragraphs: [
      "AI Ad Engine provides access to digital software, advertising technology and related digital services.",
      "Except where otherwise required by applicable South African law, payments are not refundable once the applicable subscription period has commenced and access to the Services has been activated or made available.",
      "A customer choosing not to use the platform after access has been provided does not automatically create an entitlement to a refund.",
      "The following circumstances do not automatically qualify a customer for a refund:",
    ],
    bullets: [
      "Failure to launch an advertising campaign",
      "Failure to connect an advertising account",
      "Failure to provide requested information",
      "Failure to use available features",
      "Changing their mind after access has been provided",
      "Not achieving the advertising performance they expected",
    ],
  },
  {
    heading: "Advertising performance",
    paragraphs: ["Refunds are not ordinarily provided solely because advertising:"],
    bullets: [
      "Generates fewer leads than expected",
      "Generates no leads during a particular period",
      "Produces a higher cost per lead than expected",
      "Does not generate sales",
      "Does not achieve a particular ROI or ROAS",
      "Is rejected by an advertising platform",
      "Is restricted or suspended by an advertising platform",
      "Performs differently from previous campaigns or customer case studies",
    ],
  },
  {
    paragraphs: ["Advertising performance cannot be guaranteed."],
  },
  {
    heading: "Advertising spend",
    paragraphs: ["Advertising spend paid directly to:"],
    bullets: ["Meta", "Facebook", "Instagram", "Google", "TikTok"],
  },
  {
    paragraphs: [
      "is separate from AI Ad Engine subscription fees.",
      "AI Ad Engine cannot refund advertising spend paid directly to third-party advertising platforms.",
    ],
  },
  {
    heading: "Renewal payments",
    paragraphs: [
      "Subscriptions automatically renew monthly until cancelled.",
      "Customers are responsible for cancelling before their next scheduled billing date if they do not wish to renew.",
      "Failure to cancel before a scheduled renewal does not automatically create an entitlement to a refund after the renewal has been processed.",
    ],
  },
  {
    heading: "Duplicate or incorrect charges",
    paragraphs: [
      "If a customer believes they have been charged twice or charged an incorrect amount, they should contact AI Ad Engine as soon as reasonably possible.",
      "Verified duplicate or incorrect charges will be investigated and corrected or refunded where appropriate.",
    ],
  },
  {
    heading: "Statutory rights",
    paragraphs: [
      "Nothing in this Refund & Cancellation Policy is intended to exclude, restrict or override any right that a customer may have under applicable South African law.",
      "Where applicable legislation requires AI Ad Engine to provide a refund or another remedy notwithstanding this Policy, AI Ad Engine will comply with that requirement.",
    ],
  },
  {
    heading: "How to cancel",
    paragraphs: [
      "Customers may request cancellation using the cancellation method provided by AI Ad Engine or through the contact information published on aiadengine.co.za.",
      "Cancellation applies to future renewals and does not ordinarily retrospectively cancel a subscription period that has already commenced.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      path="/refund-cancellation-policy"
      description="How AI Ad Engine subscriptions are cancelled, when refunds apply and what happens to advertising spend paid to third-party platforms."
      updated="August 2026"
      blocks={BLOCKS}
    />
  );
}
