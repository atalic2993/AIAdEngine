import { ButtonLink, Check, Container, Section } from "@/components/ui";
import { PLAN_LIST, SPEND_DISCLOSURE } from "@/lib/plans";

/**
 * Both cards are subgrids of the same five rows, so the plan name, the price,
 * the feature list and the button line up across the two cards no matter how
 * much text each plan carries.
 */
const CARD_ROWS = "md:row-span-5 md:grid md:grid-rows-subgrid md:gap-0";

/** The featured card sits on a lighter blue, so its small text needs a lighter grey to stay readable. */
const fine = (featured: boolean) => (featured ? "text-muted" : "text-muted-2");
const fineLabel = (featured: boolean) => (featured ? "eyebrow text-muted!" : "eyebrow");

export function Pricing() {
  return (
    <Section
      id="pricing"
      className="flex min-h-[calc(100svh-65px)] items-center border-b border-line bg-navy-2/55 py-8!"
    >
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 className="display mt-3 text-[clamp(1.7rem,3.6vw,2.5rem)] uppercase">
              Choose how much help you want.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted lg:max-w-sm lg:text-right">
            Scale gives you the platform to run your own campaigns. Dominate adds hands-on help.
            Both are priced in Rands, month-to-month.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 md:grid-rows-[auto_auto_auto_1fr_auto] lg:gap-5">
          {PLAN_LIST.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-card border p-5 ${CARD_ROWS} ${
                plan.featured
                  ? "border-brand/50 bg-brand-soft shadow-[0_40px_90px_-55px_rgba(11,132,246,1)]"
                  : "border-line bg-navy-2/70"
              }`}
            >
              {/* Row 1 — plan name and tagline. The badge is taken out of the flow so it
                  cannot wrap the row onto a second line on narrow cards. */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pr-28">
                <h3 className="display text-xl uppercase tracking-[0.04em]">{plan.name}</h3>
                <p className={`eyebrow ${plan.featured ? "text-muted!" : ""}`}>{plan.tagline}</p>
              </div>
              {plan.badge ? (
                <span className="absolute right-5 top-5 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
                  {plan.badge}
                </span>
              ) : null}

              {/* Row 2 — who the plan is for. */}
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{plan.positioning}</p>

              {/* Row 3 — price. */}
              <div className="mt-4">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span
                    className={`display tnum text-[2.25rem] leading-none ${
                      plan.featured ? "text-brand-2" : ""
                    }`}
                  >
                    {plan.priceLabel}
                  </span>
                  <span className="text-sm whitespace-nowrap text-muted">per month</span>
                </p>
                <p className={`mt-1 text-[11px] ${fine(plan.featured)}`}>
                  No lock-in. Cancel anytime.
                </p>
              </div>

              {/* Row 4 — what you get. Grows so the button below stays level. */}
              <div className="mt-4 border-t border-line pt-4">
                <p className={fineLabel(plan.featured)}>What you get</p>
                <ul className="mt-3 grid gap-1 lg:grid-cols-2 lg:gap-x-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13.5px] leading-snug">
                      <Check
                        className={`mt-0.5 size-3.5 ${
                          plan.featured ? "text-brand" : "text-brand/70"
                        }`}
                      />
                      <span className={plan.featured ? "text-ink" : "text-muted"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 5 — call to action, level across both cards. */}
              <div className="mt-5">
                <ButtonLink
                  href={`/checkout/${plan.id}`}
                  variant={plan.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  {plan.cta}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-muted-2">
          {SPEND_DISCLOSURE}
        </p>
      </Container>
    </Section>
  );
}
