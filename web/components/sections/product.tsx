import { Container, Section, VisualNote } from "@/components/ui";
import { AIPanel, CampaignBuilder, ChannelBoard, ReportingBoard } from "@/components/mockups";

const BLOCKS = [
  {
    title: "Launch ads without becoming an ads expert.",
    body: "Pick what you want more of, set a daily budget in Rands, choose where your customers are. AI Ad Engine handles the parts that normally send people to YouTube tutorials.",
    Visual: CampaignBuilder,
  },
  {
    title: "Facebook. Instagram. Google. TikTok.",
    body: "Connect the advertising accounts you already have, or create new ones, and run all of them from a single screen instead of four different dashboards.",
    Visual: ChannelBoard,
  },
  {
    title: "Let AI do the heavy lifting.",
    body: "Describe your business in your own words. AI Ad Engine helps build the campaign, suggest who to target and write ad copy you can edit, approve or rewrite.",
    Visual: AIPanel,
  },
  {
    title: "Know what is working.",
    body: "Spend, leads, cost per lead and the campaigns behind them, in plain language. No exported spreadsheets and no waiting for an agency report.",
    Visual: ReportingBoard,
  },
];

export function Product() {
  return (
    <Section className="border-b border-line">
      <Container>
        <p className="eyebrow">The platform</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          This is what you are actually buying.
        </h2>

        <div className="mt-14 space-y-16 sm:space-y-24">
          {BLOCKS.map((block, index) => (
            <div
              key={block.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <h3 className="display text-[clamp(1.5rem,3.6vw,2.15rem)] uppercase">
                  {block.title}
                </h3>
                <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted">{block.body}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                <block.Visual />
              </div>
            </div>
          ))}
        </div>

        <VisualNote>
          Interface illustrations. Figures shown are examples, not a performance promise. Product
          screenshots and a full walkthrough are on the way.
        </VisualNote>
      </Container>
    </Section>
  );
}

export function VideoSlot() {
  return (
    <Section id="demo" className="border-b border-line">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Walkthrough</p>
          <h2 className="display mt-4 text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
            See AI Ad Engine in action.
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            A short screen recording of the platform, start to finish.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-card border border-line bg-navy-2">
            {/* Replace this block with the embed once the walkthrough is recorded. */}
            <div className="bg-engine absolute inset-0 grid place-items-center">
              <div className="text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto grid size-16 place-items-center rounded-full border border-brand/40 bg-brand-soft"
                >
                  <svg viewBox="0 0 24 24" className="size-6 text-brand" fill="currentColor">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </span>
                <p className="mt-4 text-sm text-muted">Product walkthrough coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
