import { ButtonLink, Check, Container, Section } from "@/components/ui";
import { PLAN_LIST, SPEND_DISCLOSURE } from "@/lib/plans";

export function Pricing() {
  return (
    <Section id="pricing" className="border-b border-line bg-navy-2/55">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">Pricing</p>
          <h2 className="display mt-4 text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
            Two plans. Both month-to-month.
          </h2>
          <p className="mt-4 text-[16px] text-muted">
            Pick the one that matches how much help you want. Change or cancel whenever you like.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {PLAN_LIST.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-card border p-6 sm:p-8 ${
                plan.featured
                  ? "border-brand/50 bg-brand-soft shadow-[0_40px_90px_-55px_rgba(11,132,246,1)]"
                  : "border-line bg-navy-2/70"
              }`}
            >
              {plan.badge ? (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
                  {plan.badge}
                </span>
              ) : null}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-2xl uppercase tracking-[0.04em]">{plan.name}</h3>
                <span className="eyebrow">{plan.tagline}</span>
              </div>

              <p className="mt-4 min-h-[72px] text-[15px] leading-relaxed text-muted">
                {plan.positioning}
              </p>

              <p className="mt-6 flex items-baseline gap-2">
                <span
                  className={`display tnum text-[2.75rem] ${plan.featured ? "text-brand-2" : ""}`}
                >
                  {plan.priceLabel}
                </span>
                <span className="text-sm text-muted">per month</span>
              </p>
              <p className="mt-1 text-xs text-muted-2">
                Month-to-month. No lock-in. Cancel anytime.
              </p>

              <ul className="mt-6 grid gap-2.5 border-t border-line pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[15px]">
                    <Check className={`mt-0.5 ${plan.featured ? "text-brand" : "text-brand/70"}`} />
                    <span className={plan.featured ? "text-ink" : "text-muted"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <ButtonLink
                  href={`/checkout/${plan.id}`}
                  size="lg"
                  variant={plan.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  {plan.cta}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl rounded-xl border border-line bg-navy-2/70 p-4 text-center text-sm leading-relaxed text-muted">
          <strong className="font-semibold text-ink">Important:</strong> {SPEND_DISCLOSURE}
        </p>
      </Container>
    </Section>
  );
}
