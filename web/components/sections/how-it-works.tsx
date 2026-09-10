import { Container, Section } from "@/components/ui";
import { FacebookMark, GoogleMark, InstagramMark, TikTokMark } from "@/components/logos";

const STEPS = [
  {
    number: "01",
    title: "Research",
    body: "Get clear on your offer, market and customer before spending.",
  },
  {
    number: "02",
    title: "Build",
    body: "Turn the business brief into campaign structure, angles and copy.",
  },
  {
    number: "03",
    title: "Launch",
    body: "Approve the campaign, choose the budget and go live.",
    channels: true,
  },
  {
    number: "04",
    title: "Analyse",
    body: "See spend, enquiries and cost per lead in plain language.",
  },
  {
    number: "05",
    title: "Improve",
    body: "Use performance signals to decide what to adjust next.",
  },
  {
    number: "06",
    title: "Follow up",
    body: "Move every enquiry through the pipeline towards a sale.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-b border-line bg-navy-2/55">
      <Container>
        <p className="eyebrow">How it works</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          From the first idea to the next sales conversation.
        </h2>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="relative flex flex-col rounded-card border border-line bg-navy-2/70 p-6"
            >
              <span className="display tnum text-4xl text-brand/55">{step.number}</span>
              <h3 className="display mt-4 text-lg uppercase tracking-[0.04em]">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
              {step.channels ? (
                <span
                  className="mt-5 flex items-center gap-3 border-t border-line pt-4"
                  aria-label="Facebook, Instagram, Google and TikTok"
                >
                  <FacebookMark className="size-4 text-[#0866FF]" />
                  <InstagramMark className="size-4" />
                  <GoogleMark className="size-4" />
                  <TikTokMark className="size-4 text-ink" />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
