import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui";
import { LogoLockup } from "@/components/brand";
import { PLANS, isPlanId } from "@/lib/plans";
import { PurchaseTracking } from "./purchase-tracking";

export const metadata: Metadata = {
  title: "Welcome to AI Ad Engine",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    title: "Check your inbox",
    body: "Your login details and payment confirmation are on their way to the email address you used at checkout. If it is not there in a few minutes, check spam.",
  },
  {
    title: "Connect your advertising accounts",
    body: "Facebook and Instagram, Google, TikTok. Connect the ones you already use. You only do this once.",
  },
  {
    title: "Tell us about your business",
    body: "Your offer, your area, who you want to reach. This is what the AI uses to build campaigns that sound like you.",
  },
  {
    title: "Launch your first campaign",
    body: "Set a daily budget in Rands, approve the ad, go live. Then watch leads and spend from your dashboard.",
  },
];

export default async function WelcomePage({ searchParams }: PageProps<"/welcome">) {
  const query = await searchParams;
  const planParam = typeof query.plan === "string" ? query.plan : "";
  const reference = typeof query.ref === "string" ? query.ref : undefined;
  const plan = isPlanId(planParam) ? PLANS[planParam] : undefined;

  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-16 items-center">
          <LogoLockup size={34} priority />
        </Container>
      </header>

      <main id="main" className="bg-engine">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow">Payment received</p>
          <h1 className="display mt-4 max-w-3xl text-[clamp(2rem,6vw,3.4rem)] uppercase">
            Welcome to AI Ad Engine.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] text-muted">
            You are in. Let us get your advertising engine running.
          </p>

          {plan ? (
            <div className="mt-8 inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-card border border-brand/40 bg-brand-soft px-5 py-4">
              <span>
                <span className="eyebrow block">Plan</span>
                <span className="display text-lg uppercase">{plan.name}</span>
              </span>
              <span>
                <span className="eyebrow block">Subscription</span>
                <span className="tnum text-[15px]">{plan.priceLabel} per month</span>
              </span>
              {reference ? (
                <span>
                  <span className="eyebrow block">Reference</span>
                  <span className="font-mono text-[13px]" translate="no">
                    {reference}
                  </span>
                </span>
              ) : null}
            </div>
          ) : null}

          <h2 className="display mt-14 text-xl uppercase tracking-[0.04em]">What happens next</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-card border border-line bg-navy-2/70 p-6"
              >
                <span className="display tnum text-3xl text-brand/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[16px] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-card border border-line bg-navy-2/70 p-6">
            <h2 className="text-[16px] font-semibold">Need a hand right now?</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Reply to your welcome email or use the{" "}
              <Link href="/contact" className="text-brand-2 underline underline-offset-4">
                contact page
              </Link>
              . Your subscription renews monthly until you cancel, and you can cancel any time under
              our{" "}
              <Link
                href="/refund-cancellation-policy"
                className="text-brand-2 underline underline-offset-4"
              >
                Refund &amp; Cancellation Policy
              </Link>
              .
            </p>
          </div>
        </Container>
      </main>

      {plan ? (
        <PurchaseTracking value={plan.price} contentName={plan.itemName} eventId={reference} />
      ) : null}

      <SiteFooter />
    </>
  );
}
