import { Container, Section } from "@/components/ui";

const COLUMNS = [
  {
    name: "Boosting posts",
    featured: false,
    points: [
      "Quick way to promote an existing post",
      "Useful for simple visibility goals",
      "Limited campaign control",
      "Limited reporting",
    ],
  },
  {
    name: "Native advertising tools",
    featured: false,
    points: [
      "Powerful platform-specific controls",
      "Suited to experienced advertisers",
      "Work spread across separate tools",
      "Time needed to learn and manage each one",
    ],
  },
  {
    name: "Traditional agency",
    featured: false,
    points: [
      "Broader service and specialist expertise",
      "Useful when you want to delegate the work",
      "Usually more expensive than self-service",
      "Less immediate control over changes",
    ],
  },
  {
    name: "AI Ad Engine",
    featured: true,
    points: [
      "Guided advertising platform",
      "Connected CRM and lead tracking",
      "Month-to-month, from R599 per month",
      "Support depends on your chosen plan",
    ],
  },
];

export function Comparison() {
  return (
    <Section className="border-b border-line">
      <Container>
        <h2 className="display max-w-3xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          Choose the approach that fits your business.
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
          The right choice depends on your time, experience and how much work you want to delegate.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((column) => {
            const featured = column.featured;
            return (
              <div
                key={column.name}
                className={`rounded-card border p-6 ${
                  featured
                    ? "border-brand/45 bg-brand-soft shadow-[0_30px_70px_-45px_rgba(11,132,246,0.9)]"
                    : "border-line bg-navy-2/70"
                }`}
              >
                <h3
                  className={`display text-lg uppercase tracking-[0.04em] ${
                    featured ? "text-brand-2" : "text-muted"
                  }`}
                  translate={featured ? "no" : undefined}
                >
                  {column.name}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px]">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-2" />
                      <span className={featured ? "text-ink" : "text-muted"}>{point}</span>
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
