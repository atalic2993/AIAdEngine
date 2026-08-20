import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { Check, Container } from "@/components/ui";
import { LogoLockup } from "@/components/brand";
import { PLANS, SPEND_DISCLOSURE, isPlanId } from "@/lib/plans";
import { DELIVERY_PROMISE } from "@/lib/business";
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

      <main id="main" className="bg-engine">
        <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-16">
          <div>
            <p className="eyebrow">Step 1 of 2 — Your details</p>
            <h1 className="display mt-3 text-[clamp(1.8rem,4.5vw,2.6rem)] uppercase">
              Start {plan.name}
            </h1>
            <p className="mt-3 max-w-md text-[15px] text-muted">
              Fill in your details, agree to the terms, then pay securely on PayFast. Your
              subscription renews monthly until you cancel.
            </p>

            <div className="mt-8">
              <CheckoutForm plan={plan} />
            </div>
          </div>

          <aside className="lg:pt-10">
            <div className="rounded-card border border-brand/40 bg-brand-soft p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="display text-xl uppercase tracking-[0.04em]">{plan.name}</h2>
                <span className="eyebrow">{plan.tagline}</span>
              </div>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="display tnum text-4xl text-brand-2">{plan.priceLabel}</span>
                <span className="text-sm text-muted">per month</span>
              </p>
              <p className="mt-1 text-xs text-muted-2">
                Billed monthly in advance. Month-to-month. Cancel anytime.
              </p>

              <ul className="mt-6 grid gap-2.5 border-t border-line pt-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 text-brand" />
                    <span className="text-ink/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 rounded-xl border border-line bg-navy-2/70 p-4 text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-ink">After payment:</strong> {DELIVERY_PROMISE}
            </p>

            <p className="mt-3 rounded-xl border border-line bg-navy-2/70 p-4 text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-ink">Important:</strong> {SPEND_DISCLOSURE}
            </p>

            <p className="mt-5 text-sm text-muted-2">
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
