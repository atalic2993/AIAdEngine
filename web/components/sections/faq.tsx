import Link from "next/link";
import { ButtonLink, Container, Section } from "@/components/ui";
import { DELIVERY_PROMISE } from "@/lib/business";
import { RESULTS_DISCLAIMER, SPEND_DISCLOSURE } from "@/lib/plans";

/**
 * "plain" is the same answer as flat text. The visible page can use a link or
 * any other markup; the structured data needs a plain sentence, and keeping
 * both here means they can never say two different things.
 */
const FAQS: Array<{ q: string; a: React.ReactNode; plain?: string }> = [
  {
    q: "What is AI Ad Engine?",
    a: "AI Ad Engine connects advertising with lead management. Plan, build and manage campaigns, then keep customer records in the included CRM and track enquiries through your sales pipeline.",
  },
  {
    q: "Which advertising platforms can I use?",
    a: "Facebook, Instagram, Google and TikTok.",
  },
  {
    q: "Do I need advertising experience?",
    a: "You do not need to be an advertising specialist. Guided campaign creation helps you get started, but you still review the campaign, choose your budget and manage follow-up. Dominate adds hands-on help with planning, building and launching campaigns.",
  },
  {
    q: "Who owns my advertising accounts?",
    a: "You connect your business’s advertising accounts to AI Ad Engine. Keep ownership and administrator access with your business, so you retain control of the accounts you use to advertise.",
  },
  {
    q: "Is a CRM included?",
    a: "Yes. Both plans include a CRM, which keeps customer details and enquiries together, plus a sales pipeline for tracking opportunities from enquiry towards a sale. Your team still needs to follow up with customers.",
  },
  {
    q: "What does the AI do, and what do I control?",
    a: "AI assists with campaign structure, advertising copy and creative direction. You review and edit its suggestions, approve the campaign and choose the budget. Use performance reports to decide what to adjust; AI does not replace your business judgement or customer follow-up.",
  },
  {
    q: "Is my advertising budget included?",
    a: SPEND_DISCLOSURE,
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
    plain: "Yes, subject to our Refund & Cancellation Policy.",
  },
  {
    q: "Does AI Ad Engine guarantee leads or sales?",
    a: `No. Results depend on your offer, market, budget, competition, creative and customer follow-up. ${RESULTS_DISCLAIMER}`,
  },
  {
    q: "What is the difference between Scale and Dominate?",
    a: "Scale is the self-service plan for businesses that want to run their own campaigns. Dominate includes the same platform plus done-with-you campaign setup, help building and launching campaigns, priority onboarding and priority support.",
  },
];

/** The same questions and answers as flat text, for the FAQ structured data. */
export const FAQ_ENTRIES = FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.plain ?? (typeof faq.a === "string" ? faq.a : ""),
})).filter((entry) => entry.answer.length > 0);

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
          Ready to connect your advertising and follow-up?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] text-muted">
          Choose the support level that suits your business, or book a 15-minute demo and see the platform before deciding.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/#pricing" size="lg">
            Choose your plan
          </ButtonLink>
          <ButtonLink href="/book-a-demo" size="lg" variant="ghost">
            Book a 15-minute demo
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
