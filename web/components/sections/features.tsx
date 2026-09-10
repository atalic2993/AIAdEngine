import { Container, Section } from "@/components/ui";
import { BoltMark } from "@/components/brand";

type Feature = {
  title: string;
  body: string;
  Mark?: (props: { className?: string }) => React.ReactElement;
  tint?: string;
};

const FEATURES: Feature[] = [
  {
    title: "Guided campaign creation",
    body: "Turn your business brief into a campaign you can review and approve.",
    Mark: BoltMark,
    tint: "text-brand-2",
  },
  {
    title: "Cross-channel management",
    body: "Manage connected advertising accounts in one workspace to keep campaigns in view.",
  },
  {
    title: "Advertising copy",
    body: "Use AI-assisted drafts as a starting point, then edit them to fit your offer and voice.",
  },
  {
    title: "Creative direction",
    body: "Explore campaign angles and content ideas before deciding what to put in your ads.",
  },
  {
    title: "Performance reporting",
    body: "See spend, enquiries and cost per lead, so you can decide what to adjust next.",
  },
  {
    title: "CRM customer records",
    body: "Keep customer details and enquiries together, ready for the next conversation.",
  },
  {
    title: "Sales pipeline",
    body: "Track opportunities from enquiry towards a sale and see which stage each lead has reached.",
  },
  {
    title: "Lead management",
    body: "Keep enquiries organised so you can see who still needs follow-up.",
  },
  {
    title: "Human support",
    body: "Get help when needed. Dominate adds hands-on campaign assistance, priority onboarding and support.",
  },
];

export function Features() {
  return (
    <Section className="border-b border-line bg-navy-2/55">
      <Container>
        <p className="eyebrow">What is included</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          Tools for the campaign and the conversation.
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
