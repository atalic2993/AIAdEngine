import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Channels } from "@/components/sections/channels";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Product } from "@/components/sections/product";
import { VideoSlot } from "@/components/sections/demo-video";
import { Features } from "@/components/sections/features";
import { Comparison } from "@/components/sections/comparison";
import { CaseStudy } from "@/components/sections/case-study";
import { Pricing } from "@/components/sections/pricing";
import { ClosingCta, Faq, FAQ_ENTRIES } from "@/components/sections/faq";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, graph, softwareSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* The product and its two prices in Rands, plus the questions already
          answered further down the page, in the form search engines read. */}
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: "Advertising and Lead Management for South African Businesses",
            description:
              "Plan and manage advertising across four major platforms, then track every enquiry in one connected CRM and sales pipeline. Priced in Rands, month-to-month.",
          }),
          softwareSchema(),
          faqSchema(FAQ_ENTRIES, `${SITE_URL}/`),
        )}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Channels />
        <Problem />
        <HowItWorks />
        <Product />
        <VideoSlot />
        <Features />
        <Comparison />
        <CaseStudy />
        <Pricing />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
