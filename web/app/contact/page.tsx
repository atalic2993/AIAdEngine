import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink, Container } from "@/components/ui";
import { BUSINESS, DELIVERY_PROMISE } from "@/lib/business";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";

const DESCRIPTION =
  "Contact AI Ad Engine about plans, billing or your account. Email support, or book a free walkthrough if you would rather talk it through.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AI Ad Engine",
    description: DESCRIPTION,
    url: "/contact",
  },
};

const EMAIL = BUSINESS.email;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              path: "/contact",
              name: "Contact AI Ad Engine",
              description: DESCRIPTION,
            }),
            "@type": "ContactPage",
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />
      <SiteHeader />
      <main id="main">
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-4 text-[clamp(1.9rem,5.5vw,3rem)] uppercase">
              Talk to a human.
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-muted">
              You do not need a demo call to sign up, but if something is unclear, ask first or
              book a walkthrough. We would rather answer a question than have you subscribe to the
              wrong plan.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link
                href="/book-a-demo"
                className="flex min-h-[110px] flex-col justify-between rounded-card border border-brand/40 bg-brand-soft p-5 transition-colors hover:border-brand/60 sm:col-span-2"
              >
                <span className="eyebrow">Book a demo</span>
                <span className="text-[15px]">
                  Pick a time and we will walk you through the platform on a call. Free, and you do
                  not have to be a customer.
                </span>
              </Link>

              <a
                href={`mailto:${EMAIL}`}
                className="flex min-h-[110px] flex-col justify-between rounded-card border border-line bg-navy-2/70 p-5 transition-colors hover:border-line-strong hover:bg-white/[0.04]"
              >
                <span className="eyebrow">Email</span>
                <span className="text-[15px] break-words" translate="no">
                  {EMAIL}
                </span>
              </a>
              <div className="flex min-h-[110px] flex-col justify-between rounded-card border border-line bg-navy-2/70 p-5">
                <span className="eyebrow">Support hours</span>
                <span className="text-[15px] text-muted">
                  Monday to Friday, South African time.
                </span>
              </div>

              {BUSINESS.phone ? (
                <a
                  href={`tel:${BUSINESS.phone.replace(/s/g, "")}`}
                  className="flex min-h-[110px] flex-col justify-between rounded-card border border-line bg-navy-2/70 p-5 transition-colors hover:border-line-strong hover:bg-white/[0.04]"
                >
                  <span className="eyebrow">Phone / WhatsApp</span>
                  <span className="text-[15px]" translate="no">
                    {BUSINESS.phone}
                  </span>
                </a>
              ) : null}

              {BUSINESS.address ? (
                <div className="flex min-h-[110px] flex-col justify-between rounded-card border border-line bg-navy-2/70 p-5">
                  <span className="eyebrow">Business address</span>
                  <span className="text-[15px] text-muted">{BUSINESS.address}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-6 rounded-card border border-line bg-navy-2/70 p-6">
              <h2 className="text-[16px] font-semibold">What happens after you pay</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{DELIVERY_PROMISE}</p>
            </div>

            {BUSINESS.registeredName ? (
              <p className="mt-6 text-xs leading-relaxed text-muted-2">
                {BUSINESS.registeredName}
                {BUSINESS.registrationNumber ? ` · Registration ${BUSINESS.registrationNumber}` : null}
                {BUSINESS.vatNumber ? ` · VAT ${BUSINESS.vatNumber}` : null}
                {` · ${BUSINESS.country}`}
              </p>
            ) : null}

            <div className="mt-10 rounded-card border border-line bg-navy-2/70 p-6">
              <h2 className="text-[16px] font-semibold">Already know what you want?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Both plans are month-to-month and you can cancel any time under our{" "}
                <Link
                  href="/refund-cancellation-policy"
                  className="text-brand-2 underline underline-offset-4"
                >
                  Refund &amp; Cancellation Policy
                </Link>
                .
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/checkout/scale" variant="ghost">
                  Start Scale — R599/mo
                </ButtonLink>
                <ButtonLink href="/checkout/dominate">Start Dominate — R1,599/mo</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
