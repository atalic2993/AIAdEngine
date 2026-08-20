import Link from "next/link";
import { ButtonLink, Container, Section } from "@/components/ui";
import { DELIVERY_PROMISE } from "@/lib/business";

const FAQS: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: "What is AI Ad Engine?",
    a: "AI Ad Engine is an AI-powered advertising platform designed to help businesses create, launch and manage digital advertising more easily.",
  },
  {
    q: "Which advertising platforms can I use?",
    a: "Facebook, Instagram, Google and TikTok.",
  },
  {
    q: "Do I need advertising experience?",
    a: "No. AI Ad Engine is designed to simplify the campaign creation and management process.",
  },
  {
    q: "Is my advertising budget included?",
    a: "No. Your AI Ad Engine subscription and your advertising spend are separate. The money paid to Meta, Google or TikTok for the ads themselves is billed by those platforms.",
  },
  {
    q: "How do I get access after I pay?",
    a: DELIVERY_PROMISE,
  },
  {
    q: "Is there a contract?",
    a: "No long-term contract. Subscriptions operate month-to-month.",
  },
  {
    q: "Can I cancel anytime?",
    a: (
      <>
        Yes, subject to our{" "}
        <Link href="/refund-cancellation-policy" className="text-brand-2 underline underline-offset-4">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "Does AI Ad Engine guarantee leads or sales?",
    a: "No. Advertising results depend on factors including industry, market, advertising budget, offer, competition, creative and customer follow-up.",
  },
  {
    q: "What is the difference between Scale and Dominate?",
    a: "Scale is primarily our self-service option. Dominate includes additional Done-With-You campaign assistance, onboarding and support.",
  },
];

export function Faq() {
  return (
    <Section id="faq" className="border-b border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-4 text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
              Straight answers.
            </h2>
            <p className="mt-4 text-[15px] text-muted">
              Something still unclear? Ask us before you subscribe.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact" variant="ghost">
                Contact us
              </ButtonLink>
            </div>
          </div>

          <div className="divide-y divide-white/[0.07] border-y border-line">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-medium marker:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="grid size-6 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="size-3" fill="none">
                      <path
                        d="M8 3.2v9.6M3.2 8h9.6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 pr-10 text-[15px] leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ClosingCta() {
  return (
    <Section className="bg-engine relative overflow-hidden">
      <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative text-center">
        <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,5.5vw,3.4rem)] uppercase">
          Your competitors are already advertising. Better.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] text-muted">
          Pick a plan, connect your accounts and launch your first campaign. No demo call, no
          contract, no waiting on an agency.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/checkout/scale" size="lg" variant="ghost">
            Start Scale — R599/mo
          </ButtonLink>
          <ButtonLink href="/checkout/dominate" size="lg">
            Start Dominate — R1,599/mo
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
