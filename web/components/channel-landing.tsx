import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink, Check, Container, Section } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { CHANNELS, type Channel } from "@/lib/channels";
import { PLAN_LIST, RESULTS_DISCLAIMER, SPEND_DISCLOSURE } from "@/lib/plans";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

/** Title, description and canonical, built from the one channel definition. */
export function channelMetadata(channel: Channel): Metadata {
  const path = `/${channel.slug}`;
  return {
    title: channel.title,
    description: channel.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${channel.title} | AI Ad Engine`,
      description: channel.metaDescription,
      url: path,
    },
  };
}

/** What the platform does with this channel, in the site's existing terms. */
const HANDLING = [
  {
    title: "One login instead of three",
    body: "Facebook, Instagram, Google and TikTok are launched and watched from the same dashboard, so you are not learning four different ad managers.",
  },
  {
    title: "The AI writes the first draft",
    body: "The AI Ad Launcher builds the campaign and drafts the ads, so the blank page is already filled in before you start editing.",
  },
  {
    title: "Leads land somewhere",
    body: "A CRM, pipeline tracking and lead management are included, so an enquiry from an ad becomes a record you can follow up rather than a notification you miss.",
  },
  {
    title: "You can see what happened",
    body: "Campaign reporting in one dashboard, in Rands, so spend and results sit next to each other.",
  },
];

export function ChannelLanding({ channel }: { channel: Channel }) {
  const path = `/${channel.slug}`;
  const others = CHANNELS.filter((other) => other.slug !== channel.slug);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path,
            name: channel.title,
            description: channel.metaDescription,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: channel.label, path },
          ]),
          faqSchema(channel.faqs, absoluteUrl(path)),
        )}
      />

      <SiteHeader />

      <main id="main">
        {/* Hero */}
        <section className="bg-engine relative overflow-hidden border-b border-line">
          <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <Container className="relative py-16 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">{channel.eyebrow}</p>
              <h1 className="display mt-4 text-[clamp(2rem,5.2vw,3.4rem)] uppercase">
                {channel.h1}
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-muted">{channel.standfirst}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/#pricing" size="lg">
                  See pricing
                </ButtonLink>
                <ButtonLink href="/book-a-demo" size="lg" variant="ghost">
                  Book a demo
                </ButtonLink>
              </div>

              <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5 text-sm text-muted">
                <span className="eyebrow">From</span>
                <span className="display tnum text-2xl text-ink">R599</span>
                <span>per month · priced in Rands · cancel anytime</span>
              </p>
            </div>
          </Container>
        </section>

        {/* What the channel is actually for */}
        <Section className="border-b border-line">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <h2 className="display text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                  What this channel is good at.
                </h2>
                <p className="mt-5 text-[16px] leading-relaxed text-muted">{channel.intent}</p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {channel.placements.map((placement) => (
                  <li
                    key={placement.name}
                    className="rounded-card border border-line bg-navy-2/70 p-5"
                  >
                    <p className="text-[15px] font-semibold">{placement.name}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{placement.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Why doing it yourself is hard */}
        <Section className="border-b border-line bg-navy-2/55">
          <Container>
            <h2 className="display max-w-3xl text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
              And why it is harder than it looks.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {channel.reality.map((item) => (
                <div key={item.title} className="rounded-card border border-line bg-navy/45 p-6">
                  <h3 className="text-[16px] font-semibold">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Who it suits */}
        <Section className="border-b border-line">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="eyebrow">Fit</p>
                <h2 className="display mt-4 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                  Who this usually suits.
                </h2>
                <ul className="mt-6 space-y-3">
                  {channel.suits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-muted">
                      <Check className="mt-0.5 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow">In the platform</p>
                <h2 className="display mt-4 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                  How AI Ad Engine handles it.
                </h2>
                <div className="mt-6 divide-y divide-white/[0.07] border-y border-line">
                  {HANDLING.map((item) => (
                    <div key={item.title} className="py-4">
                      <p className="text-[15px] font-semibold">{item.title}</p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Plans */}
        <Section className="border-b border-line bg-navy-2/55">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Plans</p>
              <h2 className="display mt-3 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                Two ways to run it.
              </h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
              {PLAN_LIST.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-card border p-6 ${
                    plan.featured ? "border-brand/45 bg-brand-soft" : "border-line bg-navy/45"
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

        {/* Channel FAQ */}
        <Section className="border-b border-line">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="eyebrow">Questions</p>
                <h2 className="display mt-4 text-[clamp(1.7rem,4vw,2.6rem)] uppercase">
                  {channel.eyebrow}, answered.
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
                {channel.faqs.map((faq) => (
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

        {/* Where else to go */}
        <Section>
          <Container>
            <h2 className="display text-[clamp(1.5rem,3.4vw,2.1rem)] uppercase">
              The other channels.
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/${other.slug}`}
                    className="block h-full rounded-card border border-line bg-navy-2/70 p-6 transition-colors hover:border-line-strong"
                  >
                    <p className="text-[15px] font-semibold">{other.label}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{other.standfirst}</p>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/vs-marketing-agency"
                  className="block h-full rounded-card border border-brand/35 bg-brand-soft p-6 transition-colors hover:border-brand/60"
                >
                  <p className="text-[15px] font-semibold">Versus a marketing agency</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    What you give up and what you get back when the retainer goes away.
                  </p>
                </Link>
              </li>
            </ul>

            <p className="mt-10 text-xs text-muted-2">{RESULTS_DISCLAIMER}</p>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
