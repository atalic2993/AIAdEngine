import { Container, Section } from "@/components/ui";

const PROBLEMS = [
  "Boost Facebook posts and hope something happens",
  "Spend hours trying to understand Ads Manager",
  "Do not know who they should be targeting",
  "Struggle to write advertising copy",
  "Cannot tell which campaigns are actually working",
  "Or pay a traditional agency thousands of Rands every month",
];

export function Problem() {
  return (
    <Section className="border-b border-line bg-navy-2/55">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="display text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
              Running ads should not require a marketing degree.
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
              Most small business owners end up doing one of these six things.
            </p>
          </div>

          <div>
            <ul className="divide-y divide-white/[0.07] border-y border-line">
              {PROBLEMS.map((problem) => (
                <li key={problem} className="flex items-start gap-4 py-4">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full border border-warn/40 text-warn"
                  >
                    <svg viewBox="0 0 16 16" className="size-3" fill="none">
                      <path
                        d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[15px] text-muted">{problem}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-card border border-brand/35 bg-brand-soft p-6">
              <p className="display text-xl uppercase text-brand-2">There is a better way.</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
                AI Ad Engine uses AI and automation to make launching and managing digital
                advertising dramatically simpler.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
