import Link from "next/link";
import { Container } from "@/components/ui";
import { LogoMark, TAGLINE, Wordmark } from "@/components/brand";
import { RESULTS_DISCLAIMER, SPEND_DISCLOSURE } from "@/lib/plans";
import { BUSINESS, DELIVERY_PROMISE } from "@/lib/business";

const LINKS = [
  { href: "/", label: "AI Ad Engine" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/book-a-demo", label: "Book a demo" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-cancellation-policy", label: "Refund & Cancellation Policy" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-navy">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark size={40} />
              <span>
                <Wordmark className="block text-[15px]" />
                <span className="mt-0.5 block text-xs text-muted-2">{TAGLINE}</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted">
              AI-powered advertising across Facebook, Instagram, Google and TikTok. Built for South
              African businesses, priced in Rands.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-2 border-t border-line pt-6 text-xs text-muted-2">
          <p className="text-muted">
            {BUSINESS.registeredName ? (
              <>
                <span className="text-ink">{BUSINESS.registeredName}</span>
                {BUSINESS.registrationNumber ? ` · Reg ${BUSINESS.registrationNumber}` : null}
                {BUSINESS.vatNumber ? ` · VAT ${BUSINESS.vatNumber}` : null}
                {BUSINESS.address ? ` · ${BUSINESS.address}` : null}
              </>
            ) : null}
          </p>
          <p className="text-muted">
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-ink">
              {BUSINESS.email}
            </a>
            {BUSINESS.phone ? (
              <>
                {" · "}
                <a href={`tel:${BUSINESS.phone.replace(/s/g, "")}`} className="hover:text-ink">
                  {BUSINESS.phone}
                </a>
              </>
            ) : null}
          </p>
          <p>{DELIVERY_PROMISE}</p>
          <p>{SPEND_DISCLOSURE}</p>
          <p>{RESULTS_DISCLAIMER}</p>
          <p className="pt-2">© 2026 AI Ad Engine. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
