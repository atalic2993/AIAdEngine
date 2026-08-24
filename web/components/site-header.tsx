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
 * Book a demo. Deliberately not the same button as "Get started": that one
 * takes the money, this one takes the hesitant. Bordered glass rather than
 * solid brand, so the two never compete for the same glance.
 */
function BookDemoLink() {
  return (
    <Link
      href="/book-a-demo"
      className="cta-demo hidden min-h-[44px] touch-manipulation items-center justify-center gap-2.5 rounded-xl border border-brand/45 bg-brand-soft px-5 text-sm font-semibold tracking-tight text-ink transition-[background-color,border-color,box-shadow,transform] duration-150 hover:border-brand/70 hover:bg-brand/25 hover:shadow-[0_10px_30px_-14px_rgba(29,140,255,0.9)] active:translate-y-px sm:inline-flex"
    >
      <span className="cta-demo-dot" aria-hidden="true" />
      Book a demo
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <LogoLockup size={34} priority />

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

        <div className="flex items-center gap-2.5">
          <BookDemoLink />
          <ButtonLink href="/#pricing">Get started</ButtonLink>
        </div>
      </Container>
    </header>
  );
}
