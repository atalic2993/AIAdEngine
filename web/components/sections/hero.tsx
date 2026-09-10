import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui";
import { HeroConsole, HeroConsoleCompact } from "@/components/mockups";
import { FacebookMark, GoogleMark, InstagramMark, TikTokMark } from "@/components/logos";

const TRUST_POINTS = [
  "Four major advertising platforms",
  "CRM and sales pipeline included",
  "Real human support when needed",
];

const CHANNELS = [
  { name: "Facebook", Mark: FacebookMark, tint: "text-[#0866FF]" },
  { name: "Instagram", Mark: InstagramMark, tint: "" },
  { name: "Google", Mark: GoogleMark, tint: "" },
  { name: "TikTok", Mark: TikTokMark, tint: "text-ink" },
];

export function Hero() {
  return (
    <section className="hero-shell relative flex flex-col overflow-hidden border-b border-line">
      {/* Layered light: a wide arc from the top, a pool under the console. */}
      <div className="bg-engine pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="hero-stage relative hero-pad flex flex-1 items-center">
        <div className="hero-gap grid w-full items-center gap-3 sm:gap-4 md:gap-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-12">
          <div className="text-center lg:text-left">
            <p className="glass inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 sm:gap-2.5 sm:px-3.5 sm:py-1.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-2" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-chrome sm:text-[11px] sm:tracking-[0.16em]">
                Built for South African businesses
              </span>
            </p>

            <h1 className="display hero-title mt-2 uppercase max-[380px]:mt-1 sm:mt-4">
              <span className="chrome-text">Run your ads.</span>
              <br />
              <span className="text-electric">Keep every lead in sight.</span>
            </h1>

            <p className="hero-sub mx-auto mt-2 max-w-xl text-[14px] leading-snug text-muted max-[380px]:mt-1 sm:mt-4 sm:text-[17px] sm:leading-relaxed lg:mx-0">
              Plan, launch and manage advertising across Facebook, Instagram, Google and TikTok—then track every enquiry in one connected CRM and sales pipeline.
            </p>

            <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-0 sm:mt-4 sm:gap-x-5 sm:gap-y-1 lg:justify-start">
              {TRUST_POINTS.map((line) => (
                <li key={line} className="flex items-center gap-1.5 text-[12.5px] text-chrome sm:gap-2 sm:text-[14px]">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-brand-2"
                    fill="none"
                  >
                    <path
                      d="M3 8.4 6.2 11.6 13 4.8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center gap-2.5 max-[380px]:mt-2 sm:mt-6 sm:justify-center sm:gap-3 lg:justify-start">
              <ButtonLink
                href="/#pricing"
                size="md"
                className="flex-1 sm:flex-none sm:min-h-[52px] sm:px-6 sm:text-[15px]"
              >
                Choose your plan
              </ButtonLink>
              <ButtonLink
                href="/book-a-demo"
                variant="ghost"
                size="md"
                className="flex-1 sm:flex-none sm:min-h-[52px] sm:px-6 sm:text-[15px]"
              >
                Book a 15-minute demo
              </ButtonLink>
            </div>

            <p className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0.5 text-[13px] text-muted max-[380px]:mt-1 sm:mt-4 sm:gap-x-2.5 sm:text-sm lg:justify-start">
              <span className="eyebrow">From</span>
              <span className="display tnum text-xl text-ink sm:text-2xl">
                R599<span className="text-xs text-muted sm:text-sm">/month</span>
              </span>
              <span>
                Rands · month-to-month
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-2">Advertising spend is separate.</p>
          </div>

          {/* The product, on a lit stage. */}
          <div>
            <div className="hero-floor relative">
              <div className="hero-console-wrap relative">
                <div className="sm:hidden">
                  <HeroConsoleCompact />
                </div>
                <div className="hidden sm:block">
                  <HeroConsole />
                </div>
              </div>
            </div>
            <p className="hero-note mt-1 text-center text-[10px] text-muted-2 sm:mt-2 sm:text-[11px] lg:text-right">
              Interface illustration. Example figures, not a performance promise.
            </p>
          </div>
        </div>
      </Container>

      {/* Proof strip closes the hero: what it runs on, and one real result. */}
      <Container className="relative">
        <div className="hairline-x h-px w-full" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3 py-1.5 sm:gap-4 sm:py-4">
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="eyebrow hidden shrink-0 sm:inline">Runs on</span>
            <span
              className="flex items-center gap-3 sm:gap-4"
              aria-label="Facebook, Instagram, Google and TikTok"
            >
              {CHANNELS.map((channel) => (
                <channel.Mark key={channel.name} className={`size-4 sm:size-5 ${channel.tint}`} />
              ))}
            </span>
          </div>

          <Link
            href="/#results"
            className="glass flex min-h-[44px] items-center gap-2 rounded-full border border-line px-3 transition-colors hover:border-line-strong sm:gap-3 sm:px-4"
          >
            <span className="eyebrow hidden sm:inline">Reported SA result</span>
            <span className="tnum text-[12.5px] text-ink sm:text-sm">
              <span className="block font-mono text-[9px] uppercase leading-none tracking-[0.12em] text-muted sm:hidden">
                Reported
              </span>
              R4K<span className="text-muted-2">/mo</span>
              <span aria-hidden="true" className="mx-1.5 text-brand-2">
                →
              </span>
              R165K+<span className="text-muted-2">/mo</span>
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-brand-2 sm:inline">
              View result
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
