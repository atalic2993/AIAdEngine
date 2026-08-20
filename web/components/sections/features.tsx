import { Container, Section } from "@/components/ui";
import { FacebookMark, GoogleMark, InstagramMark, TikTokMark } from "@/components/logos";
import { BoltMark } from "@/components/brand";

type Feature = {
  title: string;
  body: string;
  Mark?: (props: { className?: string }) => React.ReactElement;
  tint?: string;
};

const FEATURES: Feature[] = [
  {
    title: "AI Ad Launcher",
    body: "Use AI to help create and launch advertising campaigns.",
    Mark: BoltMark,
    tint: "text-brand-2",
  },
  {
    title: "Meta Ads",
    body: "Launch advertising across Facebook and Instagram.",
    Mark: FacebookMark,
    tint: "text-[#0866FF]",
  },
  {
    title: "Google Ads",
    body: "Reach customers actively searching for products and services.",
    Mark: GoogleMark,
  },
  {
    title: "TikTok Ads",
    body: "Launch advertising to TikTok audiences.",
    Mark: TikTokMark,
    tint: "text-ink",
  },
  {
    title: "AI-powered campaign creation",
    body: "Get assistance with campaign creation, targeting and advertising content.",
  },
  {
    title: "Instagram placements",
    body: "Feed, Reels and Stories, without setting each one up by hand.",
    Mark: InstagramMark,
  },
  {
    title: "CRM & pipeline",
    body: "Keep leads organised and track opportunities from enquiry to sale.",
  },
  {
    title: "Lead management",
    body: "Keep customer enquiries in one place instead of across inboxes and phones.",
  },
  {
    title: "Campaign reporting",
    body: "See how campaigns are performing without decoding complicated advertising dashboards.",
  },
];

export function Features() {
  return (
    <Section className="border-b border-line bg-navy-2/55">
      <Container>
        <p className="eyebrow">What is included</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          Everything needed to run your own ads.
        </h2>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="bg-navy-2/70 p-6">
              {feature.Mark ? (
                <feature.Mark className={`size-5 ${feature.tint ?? ""}`} />
              ) : (
                <span
                  aria-hidden="true"
                  className="block h-5 w-5 rounded-md border border-line-strong bg-white/[0.04]"
                />
              )}
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
