import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink, Check, Container, Section } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { CHANNELS } from "@/lib/channels";
import { PLAN_LIST, RESULTS_DISCLAIMER, SPEND_DISCLOSURE } from "@/lib/plans";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

const PATH = "/vs-marketing-agency";

const DESCRIPTION =
  "Compare advertising software, guided support and a full marketing agency for your South African business. Consider scope, control, turnaround, ownership and total cost.";

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
    heading: "When an agency fits",
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
    heading: "When the platform fits",
    kind: "platform" as const,
    points: [
      "A monthly subscription from R599, with advertising spend separate",
      "Changes you make yourself, when you want them",
      "Month-to-month plans, subject to the cancellation policy",
      "Owners who want to manage campaigns and lead follow-up in one place",
      "A choice of self-service or done-with-you campaign help",
    ],
  },
];

const COSTS = [
  {
    title: "Scope: what work is included?",
    body: "Scale gives you the platform to manage your own advertising. Dominate adds help to plan, build and launch campaigns. For broader brand strategy, creative production or ongoing management, compare the services in an agency proposal.",
  },
  {
    title: "Control: who makes campaign decisions?",
    body: "With AI Ad Engine, you stay involved in your offer, budget and campaign approvals. With an agency, agree who can change campaigns and what needs your approval before work starts.",
  },
  {
    title: "Turnaround: who makes the changes?",
    body: "Self-service lets you edit campaigns yourself. If you need hands-on help, agree how requests and approvals will work. Advertising platforms still control their own ad review times.",
  },
  {
    title: "Ownership: what stays with your business?",
    body: "Before choosing any provider, confirm who owns the advertising accounts, who has access and what happens to your data and campaign history when you leave.",
  },
  {
    title: "Total cost: what sits outside the fee?",
    body: "Compare the subscription or service fee, advertising budget and any separately quoted work. AI Ad Engine starts at R599 per month, with advertising spend separate. Check each provider’s cancellation terms too.",
  },
];

const FAQS = [
  {
    question: "Is AI Ad Engine a marketing agency?",
    answer:
      "AI Ad Engine is an advertising and lead-management platform. Scale is self-service. Dominate adds done-with-you campaign setup, help building and launching campaigns, priority onboarding and priority support. You stay involved in campaign decisions; it is not a full agency retainer.",
  },
  {
    question: "How much does a marketing agency cost in South Africa?",
    answer:
      "Ask for a quote based on the work you need, then check whether advertising spend, creative production and other services are included. AI Ad Engine plans start at R599 a month, with advertising spend separate.",
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
              <p className="eyebrow">Compare your options</p>
              <h1 className="display mt-4 text-[clamp(2rem,5.2vw,3.4rem)] uppercase">
                Software, guided support or a full agency?
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-muted">
                The right choice depends on your budget, the work you want to keep in-house and
                how much specialist help you need.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/#pricing" size="lg">
                  See pricing
                </ButtonLink>
                <ButtonLink href="/book-a-demo" size="lg" variant="ghost">
                  Book a free 15-minute demo
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <Section className="border-b border-line">
          <Container>
            <h2 className="display max-w-3xl text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
              Choose the level of help your business needs.
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
                <p className="eyebrow">What to compare</p>
                <h2 className="display mt-4 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                  Five things to check before you choose.
                </h2>
                <p className="mt-5 text-[16px] leading-relaxed text-muted">
                  Compare the work, responsibilities and full cost of each option before you
                  commit.
                </p>
              </div>

              <div className="divide-y divide-white/[0.07] border-y border-line">
                {COSTS.map((cost) => (
                  <div key={cost.title} className="py-5">
                    <h3 className="flex items-start gap-3 text-[16px] font-semibold">
                      <Check className="mt-1 text-brand" />
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
                Choose self-service or guided support.
              </h2>
              <p className="mt-4 text-[15px] text-muted">
                Both plans include the platform on a month-to-month subscription. Choose Scale
                to run campaigns yourself or Dominate for hands-on help to plan, build and launch.
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
