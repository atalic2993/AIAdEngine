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
    "Book a free walkthrough of AI Ad Engine. Pick a time that suits you. Open to everyone, whether you are already subscribed or still deciding.",
  alternates: { canonical: "/book-a-demo" },
  openGraph: {
    title: "Book a demo of AI Ad Engine",
    description:
      "A free walkthrough on a call. Pick a time that suits you. No payment needed to book.",
    url: "/book-a-demo",
  },
};

/** GoHighLevel booking widget. The calendar itself controls available times. */
const CALENDAR_ID = "O1KPRvwQk4LHi59vYQUT";
const CALENDAR_URL = `https://api.leadconnectorhq.com/widget/booking/${CALENDAR_ID}`;

const POINTS = [
  "Free, 30 minutes, on a screen share.",
  "No payment needed to book, and no pressure to sign up on the call.",
  "Already subscribed? Use the same slot as your setup session.",
];

const AGENDA = [
  {
    title: "We look at your business",
    body: "What you sell, who buys it and where they are. Bring your website or your Facebook page if you have one.",
  },
  {
    title: "We open the platform",
    body: "A live look at connecting your ad accounts, building a campaign and writing the ads with AI, on a real screen and not a slide deck.",
  },
  {
    title: "We talk numbers in Rands",
    body: "What you would spend on ads, what the subscription costs and whether the whole thing makes sense for you right now.",
  },
  {
    title: "You decide, or you do not",
    body: "No pressure to sign up on the call. If it is not a fit we will say so.",
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
              "Book a free walkthrough of AI Ad Engine. Pick a time that suits you. No payment needed to book.",
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
                  See it live before you decide.
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
                  Pick a time and we will walk you through AI Ad Engine on a call, screen shared,
                  your questions answered.
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
                <h3 className="text-[16px] font-semibold">Rather not sit through a call?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Watch the{" "}
                  <Link href="/#demo" className="text-brand-2 underline underline-offset-4">
                    recorded walkthrough
                  </Link>{" "}
                  instead. It covers the same ground in under two minutes, and you can email us
                  anything it does not answer from the{" "}
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
