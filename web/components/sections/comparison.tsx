import { Check, Container, Cross, Section } from "@/components/ui";

const COLUMNS = [
  {
    name: "Boosting posts",
    kind: "bad" as const,
    points: [
      "Limited control",
      "Limited targeting",
      "Little strategy",
      "Basically hoping for results",
    ],
  },
  {
    name: "Traditional marketing agency",
    kind: "bad" as const,
    points: [
      "Expensive monthly retainers",
      "Often thousands of Rands every month",
      "Waiting for campaign changes",
      "Limited control",
      "Contracts in many cases",
    ],
  },
  {
    name: "AI Ad Engine",
    kind: "good" as const,
    points: [
      "AI-powered advertising",
      "Facebook + Instagram",
      "Google",
      "TikTok",
      "Simple platform",
      "From R599/month",
      "Month-to-month",
      "No lock-in",
      "Cancel anytime",
    ],
  },
];

export function Comparison() {
  return (
    <Section className="border-b border-line">
      <Container>
        <h2 className="display max-w-3xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          Stop choosing between complicated and expensive.
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {COLUMNS.map((column) => {
            const good = column.kind === "good";
            return (
              <div
                key={column.name}
                className={`rounded-card border p-6 ${
                  good
                    ? "border-brand/45 bg-brand-soft shadow-[0_30px_70px_-45px_rgba(11,132,246,0.9)]"
                    : "border-line bg-navy-2/70"
                }`}
              >
                <h3
                  className={`display text-lg uppercase tracking-[0.04em] ${
                    good ? "text-brand-2" : "text-muted"
                  }`}
                  translate={good ? "no" : undefined}
                >
                  {column.name}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px]">
                      {good ? (
                        <Check className="mt-0.5 text-brand" />
                      ) : (
                        <Cross className="mt-0.5 text-warn/80" />
                      )}
                      <span className={good ? "text-ink" : "text-muted"}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
