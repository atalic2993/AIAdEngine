import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { Check, Container } from "@/components/ui";
import { LogoLockup } from "@/components/brand";
import { PLANS, SPEND_DISCLOSURE, isPlanId } from "@/lib/plans";
import { DELIVERY_PROMISE } from "@/lib/business";
import { Suspense } from "react";
import { CheckoutAlert } from "./checkout-alert";
import { CheckoutForm } from "./checkout-form";

export function generateStaticParams() {
  return [{ plan: "scale" }, { plan: "dominate" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/checkout/[plan]">): Promise<Metadata> {
  const { plan } = await params;
  if (!isPlanId(plan)) return { title: "Checkout" };
  return {
    title: `Start ${PLANS[plan].name} — ${PLANS[plan].priceLabel}/month`,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({ params }: PageProps<"/checkout/[plan]">) {
  const { plan: planParam } = await params;
  if (!isPlanId(planParam)) notFound();
  const plan = PLANS[planParam];
  const other = planParam === "scale" ? PLANS.dominate : PLANS.scale;

  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-16 items-center justify-between">
          <LogoLockup size={34} priority />
          <Link href="/#pricing" className="text-sm text-muted hover:text-ink">
            Back to pricing
          </Link>
        </Container>
      </header>

      {/* Sized to the screen, so the whole form and the plan summary are in
          view the moment the page loads. */}
      <main
        id="main"
        className="bg-engine flex min-h-[calc(100svh-65px)] items-center py-8"
      >
        <Container className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-12 xl:gap-16">
          <div>
            <p className="eyebrow">Step 1 of 2 — Your details</p>
            <h1 className="display mt-2 text-[clamp(1.6rem,3.8vw,2.3rem)] uppercase">
              Start {plan.name}
            </h1>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted">
              Fill in your details, agree to the terms, then pay securely on PayFast. Your
              subscription renews monthly until you cancel.
            </p>

            <div className="mt-6">
              <Suspense fallback={null}>
                <CheckoutAlert />
              </Suspense>
              <CheckoutForm plan={plan} />
            </div>
          </div>

          <aside>
            <div className="rounded-card border border-brand/40 bg-brand-soft p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="display text-xl uppercase tracking-[0.04em]">{plan.name}</h2>
                <span className="eyebrow">{plan.tagline}</span>
              </div>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="display tnum text-[2rem] leading-none text-brand-2">
                  {plan.priceLabel}
                </span>
                <span className="text-sm whitespace-nowrap text-muted">per month</span>
              </p>
              <p className="mt-1.5 text-xs text-muted-2">
                Billed monthly in advance. Month-to-month. Cancel anytime.
              </p>

              <ul className="mt-4 grid gap-1.5 border-t border-line pt-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[13.5px] leading-snug">
                    <Check className="mt-0.5 size-3.5 text-brand" />
                    <span className="text-ink/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 rounded-xl border border-line bg-navy-2/70 p-3.5 text-[13px] leading-relaxed text-muted">
              <strong className="font-semibold text-ink">After payment:</strong> {DELIVERY_PROMISE}
            </p>

            <p className="mt-2.5 rounded-xl border border-line bg-navy-2/70 p-3.5 text-[13px] leading-relaxed text-muted">
              <strong className="font-semibold text-ink">Important:</strong> {SPEND_DISCLOSURE}
            </p>

            <p className="mt-3 text-[13px] text-muted-2">
              Wanted the other plan?{" "}
              <Link
                href={`/checkout/${other.id}`}
                className="text-brand-2 underline underline-offset-4"
              >
                Switch to {other.name} — {other.priceLabel}/mo
              </Link>
            </p>
          </aside>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
