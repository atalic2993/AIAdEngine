import Link from "next/link";
import { Container, ButtonLink } from "@/components/ui";
import { LogoLockup } from "@/components/brand";

const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#platform", label: "Platform" },
  { href: "/#results", label: "Results" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/book-a-demo", label: "Book a demo" },
];

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

        <ButtonLink href="/#pricing">Get started</ButtonLink>
      </Container>
    </header>
  );
}
