import { BUSINESS } from "@/lib/business";
import { PLAN_LIST, SPEND_DISCLOSURE } from "@/lib/plans";
import { SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * The facts about this business, written the way search engines read them.
 *
 * Everything here is generated from the same constants the visible pages use,
 * so the structured data can never drift away from what the site actually says.
 * Nothing is invented: fields that are still blank in lib/business.ts are left
 * out entirely rather than guessed at.
 */

const ORGANISATION_ID = `${SITE_URL}/#organisation`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organisationSchema() {
  const address: Record<string, string> = { "@type": "PostalAddress", addressCountry: "ZA" };
  if (BUSINESS.address) address.streetAddress = BUSINESS.address;

  return {
    "@type": "Organization",
    "@id": ORGANISATION_ID,
    name: BUSINESS.tradingName,
    ...(BUSINESS.registeredName ? { legalName: BUSINESS.registeredName } : {}),
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo-mark-128.png"),
      width: 128,
      height: 128,
    },
    image: absoluteUrl("/og.jpg"),
    description:
      "AI-powered advertising platform for South African businesses, covering Facebook, Instagram, Google and TikTok.",
    address,
    areaServed: { "@type": "Country", name: "South Africa" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: BUSINESS.email,
      ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
      areaServed: "ZA",
      availableLanguage: ["en"],
    },
    ...(BUSINESS.registrationNumber
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "CIPC registration number",
            value: BUSINESS.registrationNumber,
          },
        }
      : {}),
    ...(BUSINESS.vatNumber ? { vatID: BUSINESS.vatNumber } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: BUSINESS.tradingName,
    inLanguage: "en-ZA",
    publisher: { "@id": ORGANISATION_ID },
  };
}

/**
 * The product itself, with both plans as offers. This is what lets a price in
 * Rands appear next to the listing instead of just a page title.
 */
export function softwareSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: BUSINESS.tradingName,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Advertising management software",
    operatingSystem: "Web browser",
    url: `${SITE_URL}/`,
    description:
      "Launch and manage Facebook, Instagram, Google and TikTok advertising from one AI-powered platform, priced in Rands and billed month-to-month.",
    publisher: { "@id": ORGANISATION_ID },
    featureList: [
      "AI Ad Launcher",
      "Facebook and Instagram advertising",
      "Google advertising",
      "TikTok advertising",
      "CRM and lead management",
      "Pipeline tracking",
      "Campaign dashboard and reporting",
    ],
    offers: PLAN_LIST.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.positioning,
      price: plan.price.toFixed(2),
      priceCurrency: "ZAR",
      url: absoluteUrl("/#pricing"),
      availability: "https://schema.org/InStock",
      category: "Monthly subscription",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price.toFixed(2),
        priceCurrency: "ZAR",
        billingIncrement: 1,
        unitCode: "MON",
        billingDuration: 1,
      },
      // Stated plainly so the offer can never read as though ad spend is included.
      disambiguatingDescription: SPEND_DISCLOSURE,
    })),
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqSchema(entries: FaqEntry[], pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-ZA",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANISATION_ID },
  };
}

/** Wraps a set of schema objects into the single graph search engines prefer. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
