import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink, Check, Container, Cross, Section } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { CHANNELS } from "@/lib/channels";
import { PLAN_LIST, RESULTS_DISCLAIMER, SPEND_DISCLOSURE } from "@/lib/plans";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

const PATH = "/vs-marketing-agency";

const DESCRIPTION =
  "What a marketing agency retainer actually buys, what it does not, and where a self-service advertising platform is the better fit for a South African small business.";

export const metadata: Metadata = {
  title: "Marketing Agency Alternative in South Africa",
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: "Marketing Agency Alternative in South Africa | AI Ad Engine",
    description: DESCRIPTION,
    url: PATH,
  },
};

/**
 * An honest comparison. An agency is genuinely the right answer for some
 * businesses, and saying so is what makes the rest of the page believable.
 */
const HONEST = [
  {
    heading: "Where an agency genuinely wins",
    kind: "agency" as const,
    points: [
      "Strategy work that goes well beyond advertising",
      "Big budgets that justify a dedicated team",
      "Brand, creative production and media planning together",
      "Businesses that would rather hand the whole thing over",
      "Complex accounts across many markets or many products",
    ],
  },
  {
    heading: "Where a platform wins",
    kind: "platform" as const,
    points: [
      "Monthly cost you can predict, from R599",
      "Changes you make yourself, when you want them",
      "No minimum term and no lock-in",
      "Small budgets that a retainer would swallow whole",
      "Owners who want to see what is happening, not a monthly slide deck",
    ],
  },
];

const COSTS = [
  {
    title: "The retainer is separate from the ad spend",
    body: "With an agency you are usually paying two things: the fee for their time, and the money that actually goes to Meta, Google or TikTok. On a small budget the fee can end up larger than the spend it manages.",
  },
  {
    title: "Turnaround has a cost too",
    body: "Wanting a headline changed on a Tuesday and getting it changed the following Monday is a real cost, it is just not on the invoice. Seasonal and promotional businesses feel this most.",
  },
  {
    title: "Contracts outlast enthusiasm",
    body: "Retainers are commonly signed for a fixed term. If the fit turns out to be wrong in month two, that is not always something you can act on.",
  },
  {
    title: "You may not own the account",
    body: "Worth asking before you sign, with any provider: whose ad account is it, and what leaves with you if you leave. Your advertising history has value.",
  },
];

const FAQS = [
  {
    question: "Is AI Ad Engine a marketing agency?",
    answer:
      "No. AI Ad Engine is an advertising platform. The Scale plan is primarily self-service. The Dominate plan adds Done-With-You campaign assistance, priority onboarding and support, which is help using the platform rather than an agency retainer.",
  },
  {
    question: "How much does a marketing agency cost in South Africa?",
    answer:
      "It varies widely by agency, scope and budget size, and is usually quoted per client rather than published. What is consistent is the structure: a monthly fee for the agency, plus your advertising spend on top. AI Ad Engine plans start at R599 a month, with advertising spend still separate.",
  },
  {
    question: "Should I leave my agency?",
    answer:
      "Not necessarily. If an agency is delivering and the fee is proportionate to your budget, that is a working arrangement. The case for a platform is strongest when the retainer is large relative to what you actually spend on ads, or when you want to make changes yourself.",
  },
  {
    question: "Do I still need to know how to advertise?",
    answer:
      "AI Ad Engine is designed to simplify campaign creation and management, and the Dominate plan includes help building and launching campaigns. It does not remove the need to know your own customers and your own offer.",
  },
  {
    question: "Can I cancel if it is not working?",
    answer:
      "Subscriptions operate month-to-month with no long-term contract, subject to our Refund & Cancellation Policy.",
  },
];

export default function VsMarketingAgencyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Marketing Agency Alternative in South Africa",
            description: DESCRIPTION,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Versus a marketing agency", path: PATH },
          ]),
          faqSchema(FAQS, absoluteUrl(PATH)),
        )}
      />

      <SiteHeader />

      <main id="main">
        <section className="bg-engine relative overflow-hidden border-b border-line">
          <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <Container className="relative py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">Platform or agency</p>
              <h1 className="display mt-4 text-[clamp(2rem,5.2vw,3.4rem)] uppercase">
                What a retainer buys, and what it does not.
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-muted">
                Hiring an agency is a reasonable decision. So is not hiring one. The question is
                not which is better in the abstract, it is which one fits the size of your
                advertising budget and how involved you actually want to be.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/#pricing" size="lg">
                  See pricing
                </ButtonLink>
                <ButtonLink href="/book-a-demo" size="lg" variant="ghost">
                  Book a demo
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <Section className="border-b border-line">
          <Container>
            <h2 className="display max-w-3xl text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
              Neither one wins every time.
            </h2>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {HONEST.map((column) => {
                const platform = column.kind === "platform";
                return (
                  <div
                    key={column.heading}
                    className={`rounded-card border p-6 sm:p-8 ${
                      platform
                        ? "border-brand/45 bg-brand-soft"
                        : "border-line bg-navy-2/70"
                    }`}
                  >
                    <h3
                      className={`display text-lg uppercase tracking-[0.04em] ${
                        platform ? "text-brand-2" : "text-muted"
                      }`}
                    >
                      {column.heading}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {column.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-[15px]">
                          {platform ? (
                            <Check className="mt-0.5 text-brand" />
                          ) : (
                            <Check className="mt-0.5 text-muted-2" />
                          )}
                          <span className={platform ? "text-ink" : "text-muted"}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section className="border-b border-line bg-navy-2/55">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="eyebrow">The maths</p>
                <h2 className="display mt-4 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                  Four things worth checking before you sign.
                </h2>
                <p className="mt-5 text-[16px] leading-relaxed text-muted">
                  None of these make an agency the wrong choice. They are simply the parts that
                  tend to surface after the contract, rather than before it.
                </p>
              </div>

              <div className="divide-y divide-white/[0.07] border-y border-line">
                {COSTS.map((cost) => (
                  <div key={cost.title} className="py-5">
                    <h3 className="flex items-start gap-3 text-[16px] font-semibold">
                      <Cross className="mt-1 text-warn/80" />
                      {cost.title}
                    </h3>
                    <p className="mt-2 pl-7 text-[15px] leading-relaxed text-muted">{cost.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-b border-line">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Plans</p>
              <h2 className="display mt-3 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                Priced per month, not per contract.
              </h2>
              <p className="mt-4 text-[15px] text-muted">
                Both plans are month-to-month. Dominate is the closer comparison to agency help,
                because it adds hands-on assistance getting campaigns built and launched.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
              {PLAN_LIST.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-card border p-6 ${
                    plan.featured ? "border-brand/45 bg-brand-soft" : "border-line bg-navy-2/70"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display text-lg uppercase tracking-[0.04em]">{plan.name}</h3>
                    <p className="display tnum text-xl">{plan.priceLabel}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted">{plan.tagline} · per month</p>
                  <p className="mt-4 text-[14px] leading-relaxed text-muted">{plan.positioning}</p>
                  <div className="mt-6">
                    <ButtonLink
                      href={`/checkout/${plan.id}`}
                      variant={plan.featured ? "primary" : "ghost"}
                      className="w-full"
                    >
                      {plan.cta}
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-2">
              {SPEND_DISCLOSURE}
            </p>
          </Container>
        </Section>

        <Section className="border-b border-line">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="eyebrow">Questions</p>
                <h2 className="display mt-4 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                  Straight answers.
                </h2>
                <div className="mt-6">
                  <ButtonLink href="/contact" variant="ghost">
                    Contact us
                  </ButtonLink>
                </div>
              </div>

              <div className="divide-y divide-white/[0.07] border-y border-line">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-medium marker:hidden">
                      {faq.question}
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
                    <p className="pb-5 pr-10 text-[15px] leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <h2 className="display text-[clamp(1.5rem,3.4vw,2.1rem)] uppercase">
              Or start with one channel.
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {CHANNELS.map((channel) => (
                <li key={channel.slug}>
                  <Link
                    href={`/${channel.slug}`}
                    className="block h-full rounded-card border border-line bg-navy-2/70 p-6 transition-colors hover:border-line-strong"
                  >
                    <p className="text-[15px] font-semibold">{channel.label}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                      {channel.standfirst}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-xs text-muted-2">{RESULTS_DISCLAIMER}</p>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
