import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink, Check, Container } from "@/components/ui";
import { LogoLockup } from "@/components/brand";
import { PLANS, isPlanId } from "@/lib/plans";
import { DELIVERY_PROMISE } from "@/lib/business";
import { PurchaseTracking } from "./purchase-tracking";
import { hasDurableStore, wasRemembered } from "@/lib/idempotency";
import { confirmationKey } from "@/lib/payfast";

export const metadata: Metadata = {
  title: "Welcome to AI Ad Engine",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    title: "Payment confirmation",
    body: "Your confirmation email is your receipt. Check the email address you used at checkout, including the spam folder. Payment confirmation is separate from your account login.",
  },
  {
    title: "We prepare your account",
    body: "After payment, our team uses your checkout details to prepare your AI Ad Engine account for the plan you selected.",
  },
  {
    title: "Receive your login details",
    body: DELIVERY_PROMISE,
  },
  {
    title: "Connect your advertising accounts",
    body: "Once you can log in, connect the relevant Meta, Google or TikTok advertising accounts for the channels you want to use.",
  },
  {
    title: "Build and launch your first campaign",
    body: "Use the support included in your selected plan: Scale is self-service; Dominate adds hands-on help to plan, build and launch. Choose your budget, review the ads and submit your campaign for the advertising platform’s review.",
  },
];

export default async function WelcomePage({ searchParams }: PageProps<"/welcome">) {
  const query = await searchParams;
  const planParam = typeof query.plan === "string" ? query.plan : "";
  const reference = typeof query.ref === "string" ? query.ref : undefined;
  const plan = isPlanId(planParam) ? PLANS[planParam] : undefined;

  // Ask our own records whether PayFast confirmed this payment, rather than
  // believing the plan and reference sitting in the address bar.
  const verifiable = hasDurableStore();
  const confirmed =
    verifiable && reference ? await wasRemembered(confirmationKey(reference)) : false;

  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-16 items-center">
          <LogoLockup size={34} priority />
        </Container>
      </header>

      <main id="main">
        {/* Confirmation hero, sized to the screen so the whole receipt is in
            view the moment PayFast sends the customer back. */}
        <section className="bg-engine flex min-h-[calc(100svh-65px)] items-center border-b border-line py-10">
          <Container className="text-center">
            <span
              aria-hidden="true"
              className="mx-auto grid size-16 place-items-center rounded-full border border-brand/50 bg-brand-soft"
            >
              <Check className="size-8 text-brand-2" />
            </span>

            <p className="eyebrow mt-7">{confirmed ? "Payment received" : "After checkout"}</p>
            <h1 className="display mx-auto mt-4 max-w-4xl text-[clamp(2rem,6vw,3.6rem)] uppercase">
              Welcome to AI Ad Engine.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-muted">
              {confirmed
                ? "Your payment has been received. Our team will prepare your AI Ad Engine account."
                : "Once your payment is confirmed, our team will prepare your AI Ad Engine account. Your confirmation email is your receipt."}{" "}
              {DELIVERY_PROMISE}
            </p>

            {plan ? (
              <dl className="mx-auto mt-9 inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-card border border-brand/40 bg-brand-soft px-6 py-4 text-left">
                <div>
                  <dt className="eyebrow">Plan</dt>
                  <dd className="display mt-0.5 text-lg uppercase">{plan.name}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Subscription</dt>
                  <dd className="tnum mt-0.5 text-[15px]">{plan.priceLabel} per month</dd>
                </div>
                {reference ? (
                  <div>
                    <dt className="eyebrow">Reference</dt>
                    <dd className="mt-0.5 font-mono text-[13px]" translate="no">
                      {reference}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/book-a-demo" size="lg">
                Book a free 15-minute demo
              </ButtonLink>
              <ButtonLink href="#next" variant="ghost" size="lg">
                What happens next
              </ButtonLink>
            </div>

            {plan ? (
              <PurchaseTracking
                value={plan.price}
                contentName={plan.itemName}
                eventId={reference}
                confirmed={confirmed}
                verifiable={verifiable}
              />
            ) : (
              <p className="mt-6 text-sm text-muted-2">
                Check the email address you used at checkout for your payment confirmation.
              </p>
            )}
          </Container>
        </section>

        <Container className="py-16 sm:py-20">
          <h2 id="next" className="display scroll-mt-24 text-xl uppercase tracking-[0.04em]">
            What happens next
          </h2>
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
            <h2 className="text-[16px] font-semibold">Need help with your account?</h2>
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



      <SiteFooter />
    </>
  );
}
