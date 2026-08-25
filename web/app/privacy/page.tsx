import type { Metadata } from "next";
import { LegalPage, type LegalBlock } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AI Ad Engine collects, uses and protects personal information, in line with South African data protection law including POPIA.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | AI Ad Engine",
    description: "How AI Ad Engine collects, uses and protects personal information, in line with South African data protection law including POPIA.",
    url: "/privacy",
  },
};

const INTRO = [
  "AI Ad Engine respects the privacy of customers and website visitors and is committed to processing personal information responsibly and in accordance with applicable South African data protection legislation, including the Protection of Personal Information Act (POPIA).",
];

const BLOCKS: LegalBlock[] = [
  {
    heading: "Information we may collect",
    paragraphs: ["Depending on how a person uses AI Ad Engine, we may collect:"],
    bullets: [
      "Name and surname",
      "Business name",
      "Email address",
      "Telephone or WhatsApp number",
      "Website information",
      "Business and industry information",
      "Advertising account information",
      "Campaign information",
      "Subscription and transaction information",
      "Communications with AI Ad Engine",
      "Technical website usage information",
    ],
  },
  {
    heading: "How information may be used",
    paragraphs: ["Information may be processed to:"],
    bullets: [
      "Provide AI Ad Engine Services",
      "Create and administer customer accounts",
      "Assist with advertising campaigns",
      "Process and administer subscriptions",
      "Provide customer support",
      "Communicate important service information",
      "Improve AI Ad Engine",
      "Prevent fraud and abuse",
      "Comply with legal obligations",
      "Send marketing communications where legally permitted",
    ],
  },
  {
    heading: "Payments",
    paragraphs: [
      "Payments may be processed by third-party payment providers including PayFast.",
      "AI Ad Engine does not necessarily receive or store customers’ complete payment card information.",
      "Payment providers process payment information according to their own privacy and security requirements.",
    ],
  },
  {
    heading: "Third-party services",
    paragraphs: [
      "Providing AI Ad Engine Services may require information to be processed through third-party services and technology providers including:",
    ],
    bullets: [
      "Meta",
      "Facebook",
      "Instagram",
      "Google",
      "TikTok",
      "PayFast",
      "Other technology providers used to operate AI Ad Engine",
    ],
  },
  {
    paragraphs: [
      "These providers may process information according to their respective terms and privacy policies.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "AI Ad Engine takes reasonable technical and organisational measures to protect personal information against loss, unauthorised access, misuse, alteration or disclosure.",
      "No internet-based service can guarantee absolute security.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "Personal information will be retained only for as long as reasonably necessary for the purpose for which it was collected, to provide Services, resolve disputes and comply with applicable legal, accounting and regulatory obligations.",
    ],
  },
  {
    heading: "Marketing communications",
    paragraphs: [
      "Where legally permitted, AI Ad Engine may communicate with customers and prospective customers regarding products, services, updates and offers.",
      "Recipients may opt out of marketing communications using the unsubscribe or opt-out method provided.",
    ],
  },
  {
    heading: "Customer rights",
    paragraphs: [
      "Subject to applicable South African law, individuals may have rights relating to their personal information, including requesting access to or correction of personal information and objecting to certain processing.",
    ],
  },
  {
    heading: "Cookies & tracking",
    paragraphs: ["AI Ad Engine may use:"],
    bullets: [
      "Cookies",
      "Meta Pixel",
      "Google Analytics",
      "TikTok Pixel",
      "Other advertising and analytics technologies",
    ],
  },
  {
    paragraphs: [
      "to operate the website, understand website usage, measure advertising performance and improve the customer experience.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "This Privacy Policy may be updated periodically to reflect changes to the Services, technology or legal requirements.",
      "The latest version will be published on aiadengine.co.za.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Privacy-related enquiries may be submitted through the contact information displayed on aiadengine.co.za.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      description="How AI Ad Engine collects, uses and protects personal information, in line with South African data protection law including POPIA."
      updated="August 2026"
      intro={INTRO}
      blocks={BLOCKS}
    />
  );
}
