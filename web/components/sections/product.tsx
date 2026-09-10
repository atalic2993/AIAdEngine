import { Container, Section, VisualNote } from "@/components/ui";
import { AIPanel, ChannelBoard, HeroConsole, ReportingBoard } from "@/components/mockups";

const BLOCKS = [
  {
    title: "Bring every channel into one workspace.",
    body: "Connect your advertising accounts and manage campaigns together. See where your budget is going without moving between separate dashboards.",
    Visual: ChannelBoard,
  },
  {
    title: "Build campaigns with AI assistance.",
    body: "Start with your business brief. Get guided campaign creation, suggested advertising copy and creative direction, then review the details before you approve and launch.",
    Visual: AIPanel,
  },
  {
    title: "See what happens after the click.",
    body: "Read spend, enquiries and cost per lead in plain language. Use campaign reports alongside customer records to understand where to focus your attention next.",
    Visual: ReportingBoard,
  },
  {
    title: "Keep follow-up moving.",
    body: "The included CRM keeps customer records together. Use the sales pipeline to track each enquiry towards a sale, so you can see who needs the next conversation. Human support is available, with hands-on campaign help on Dominate.",
    Visual: HeroConsole,
  },
];

export function Product() {
  return (
    <Section className="border-b border-line">
      <Container>
        <p className="eyebrow">The platform</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          Advertising and follow-up, connected.
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
          Interface illustrations. Figures shown are examples, not a performance promise. The
          walkthrough below is a recording of the real platform.
        </VisualNote>
      </Container>
    </Section>
  );
}
