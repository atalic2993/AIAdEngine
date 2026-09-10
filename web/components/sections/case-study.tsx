import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { RESULTS_DISCLAIMER } from "@/lib/plans";

export function CaseStudy() {
  return (
    <Section id="results" className="border-b border-line">
      <Container>
        <p className="eyebrow">A reported South African customer result</p>
        <h2 className="display mt-4 max-w-3xl text-[clamp(1.9rem,5vw,3.1rem)] uppercase">
          From R4,000 to more than R165,000 in reported monthly online sales.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          {/* The number, told as a before and after. */}
          <div className="rounded-card border border-brand/35 bg-brand-soft p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Image
                src="/polvytjie-logo-96.png"
                alt="Polvytjie"
                width={44}
                height={44}
                className="size-11 rounded-lg bg-white/90 object-contain p-1"
              />
              <div>
                <p className="text-[15px] font-semibold" translate="no">
                  Polvytjie
                </p>
                <p className="text-xs text-muted">
                  Ladies’ footwear · boutique and online store
                </p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
              <div>
                <dt className="eyebrow">Reported before</dt>
                <dd className="display tnum mt-2 text-[clamp(1.5rem,4.5vw,2.25rem)] text-muted">
                  R4K<span className="text-base text-muted-2">/mo</span>
                </dd>
                <div
                  aria-hidden="true"
                  className="mt-3 h-2 w-[14%] min-w-[10px] rounded-full bg-white/20"
                />
              </div>
              <div aria-hidden="true" className="pb-6 text-2xl text-brand">
                →
              </div>
              <div>
                <dt className="eyebrow">Reported after</dt>
                <dd className="display tnum mt-2 text-[clamp(1.75rem,5.5vw,2.75rem)] text-brand-2">
                  R165K+<span className="text-base text-brand/70">/mo</span>
                </dd>
                <div
                  aria-hidden="true"
                  className="mt-3 h-2 w-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                />
              </div>
            </dl>

            <p className="mt-6 text-[15px] leading-relaxed text-ink/90">
              Polvytjie has given AI Ad Engine permission to share its reported before-and-after online sales figures and to act as a customer reference.
            </p>
          </div>

          {/* Verify it yourself. */}
          <div className="rounded-card border border-line bg-navy-2/70 p-6 sm:p-8">
            <h3 className="display text-xl uppercase">Speak to a customer reference.</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Visit the store or contact Polvytjie directly to ask about their experience.
              These are customer-reported figures, not a promise of what your business will achieve.
            </p>

            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="https://polvytjie.co.za"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex min-h-[52px] items-center justify-between gap-3 rounded-xl border border-line bg-navy/45 px-4 text-[15px] transition-colors hover:border-line-strong hover:bg-white/[0.05]"
                >
                  <span className="min-w-0 truncate" translate="no">
                    polvytjie.co.za
                  </span>
                  <span className="eyebrow shrink-0">Visit store</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@polvytjie.co.za"
                  className="flex min-h-[52px] items-center justify-between gap-3 rounded-xl border border-line bg-navy/45 px-4 text-[15px] transition-colors hover:border-line-strong hover:bg-white/[0.05]"
                >
                  <span className="min-w-0 truncate" translate="no">
                    admin@polvytjie.co.za
                  </span>
                  <span className="eyebrow shrink-0">Ask for a reference</span>
                </a>
              </li>
            </ul>

            <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted-2">
              {RESULTS_DISCLAIMER}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
