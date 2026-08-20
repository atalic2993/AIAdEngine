import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Channels } from "@/components/sections/channels";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Product, VideoSlot } from "@/components/sections/product";
import { Features } from "@/components/sections/features";
import { Comparison } from "@/components/sections/comparison";
import { CaseStudy } from "@/components/sections/case-study";
import { Pricing } from "@/components/sections/pricing";
import { ClosingCta, Faq } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <>
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
