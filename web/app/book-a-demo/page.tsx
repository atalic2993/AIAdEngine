import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink, Check, Container, Section } from "@/components/ui";
import { BUSINESS } from "@/lib/business";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a free 15-minute demo of AI Ad Engine. See campaign creation, launch, reporting and lead follow-up, then ask your questions. No payment needed.",
  alternates: { canonical: "/book-a-demo" },
  openGraph: {
    title: "Book a demo of AI Ad Engine",
    description:
      "See the full workflow in a free 15-minute screen share. No payment needed and no pressure to subscribe.",
    url: "/book-a-demo",
  },
};

/** GoHighLevel booking widget. The calendar itself controls available times. */
const CALENDAR_ID = "O1KPRvwQk4LHi59vYQUT";
const CALENDAR_URL = `https://api.leadconnectorhq.com/widget/booking/${CALENDAR_ID}`;

const POINTS = [
  "Free 15-minute screen share.",
  "No payment needed.",
  "No pressure to subscribe.",
  "Already subscribed? Use the same 15-minute calendar slot as your setup call.",
];

const AGENDA = [
  {
    title: "Your business brief · 2 minutes",
    body: "Tell us what you sell, who you want to reach and what you want your advertising to achieve.",
  },
  {
    title: "Campaign to launch · 6 minutes",
    body: "See an example campaign move from a business brief to AI-assisted ads, a budget and the steps to launch.",
  },
  {
    title: "Reporting and follow-up · 3 minutes",
    body: "See where to review campaign performance, track new leads and manage the next follow-up.",
  },
  {
    title: "Your questions · 4 minutes",
    body: "Ask about the workflow, plan support or costs, including the advertising budget paid separately from your subscription.",
  },
];

export default function BookADemoPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/book-a-demo",
            name: "Book a demo of AI Ad Engine",
            description:
              "Book a free 15-minute demo of AI Ad Engine, from business brief to launch, reporting and lead follow-up. No payment needed.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book a demo", path: "/book-a-demo" },
          ]),
        )}
      />
      <SiteHeader />
      <main id="main">
        {/* Full-bleed hero sized to the screen, so the calendar is in view on load. */}
        <section className="bg-engine flex min-h-[calc(100svh-4rem)] items-center border-b border-line py-8">
          <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)] lg:gap-14 xl:gap-20">
              <div>
                <p className="eyebrow">Book a demo</p>
                <h1 className="display mt-4 text-[clamp(2rem,4.6vw,3.4rem)] uppercase">
                  See the full workflow in 15 minutes.
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
                  We will show you how a campaign moves from business brief to launch, reporting
                  and lead follow-up, then answer your questions.
                </p>

                <ul className="mt-7 space-y-3">
                  {POINTS.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <Check className="mt-1 text-brand" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="rounded-card border border-line bg-navy-2/70 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-3">
                  <iframe
                    src={CALENDAR_URL}
                    id={`${CALENDAR_ID}_booking`}
                    title="AI Ad Engine demo booking calendar"
                    scrolling="no"
                    className="block h-[735px] min-h-[560px] w-full rounded-[10px] border-0"
                  />
                </div>

                <p className="mt-2 text-xs text-muted-2">
                  Calendar not loading? An ad blocker may be blocking it. Email{" "}
                  <a
                    href={`mailto:${BUSINESS.email}?subject=Demo%20booking`}
                    className="text-brand-2 underline underline-offset-4"
                    translate="no"
                  >
                    {BUSINESS.email}
                  </a>{" "}
                  and we will book it for you by hand.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />

        <Section className="border-b border-line bg-navy-2/55">
          <Container>
            <h2 className="display text-[clamp(1.5rem,3.6vw,2.15rem)] uppercase">
              What happens on the call.
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {AGENDA.map((item, index) => (
                <li
                  key={item.title}
                  className="flex flex-col rounded-card border border-line bg-navy-2/70 p-6"
                >
                  <span className="display tnum text-3xl text-brand/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[16px] font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-line bg-navy-2/70 p-6">
                <h3 className="text-[16px] font-semibold">Prefer a quick preview?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Watch the{" "}
                  <Link href="/#demo" className="text-brand-2 underline underline-offset-4">
                    recorded walkthrough
                  </Link>{" "}
                  for an introduction to the platform, then send your questions through the{" "}
                  <Link href="/contact" className="text-brand-2 underline underline-offset-4">
                    contact page
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-card border border-line bg-navy-2/70 p-6">
                <h3 className="text-[16px] font-semibold">Ready without the call?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Both plans are month-to-month and you can cancel any time.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/#pricing" variant="ghost">
                    See pricing
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
