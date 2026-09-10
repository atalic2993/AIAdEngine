import Link from "next/link";
import { Container, ButtonLink } from "@/components/ui";
import { LogoLockup } from "@/components/brand";

const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#platform", label: "Platform" },
  { href: "/#results", label: "Results" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Booking a demo is deliberately not the same action as choosing a plan.
 * Bordered glass keeps this as the quieter option beside the primary button.
 */
function BookDemoLink() {
  return (
    <Link
      href="/book-a-demo"
      className="cta-demo header-cta inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-xl border border-brand/45 bg-brand-soft font-semibold tracking-tight text-ink transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-brand/70 hover:bg-brand/25 hover:shadow-[0_10px_30px_-14px_rgba(29,140,255,0.9)] active:translate-y-px"
    >
      <span className="cta-demo-dot" aria-hidden="true" />
      <span className="sm:hidden">Book a demo</span>
      <span className="hidden sm:inline">Book a 15-minute demo</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <LogoLockup size={34} priority wordmarkClassName="hidden sm:inline" />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <BookDemoLink />
          <ButtonLink href="/#pricing" className="header-cta">
            Choose a plan
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
