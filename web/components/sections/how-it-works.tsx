import { Container, Section } from "@/components/ui";
import { FacebookMark, GoogleMark, InstagramMark, TikTokMark } from "@/components/logos";

const STEPS = [
  {
    number: "01",
    title: "Connect",
    body: "Connect your advertising accounts. It takes a few clicks and you only do it once.",
    channels: true,
  },
  {
    number: "02",
    title: "Create",
    body: "Tell AI Ad Engine about your business, your offer and what you want to advertise.",
  },
  {
    number: "03",
    title: "Launch",
    body: "Use AI to help build your campaign, choose who sees it and write the advertising.",
  },
  {
    number: "04",
    title: "Grow",
    body: "Track your campaigns, leads and performance from one simple platform.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-b border-line bg-navy-2/55">
      <Container>
        <p className="eyebrow">How it works</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          Four steps from signing up to running.
        </h2>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
