import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const ELSEWHERE = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#platform", label: "The platform" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/book-a-demo", label: "Book a demo" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-engine flex flex-1 items-center py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Error 404</p>
            <h1 className="display mt-4 text-[clamp(2rem,6vw,3.4rem)] uppercase">
              That page is not here.
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-muted">
              The link may be old, or the address may have a typo in it. Nothing is broken on your
              side.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/" size="lg">
                Back to the homepage
              </ButtonLink>
              <ButtonLink href="/#pricing" size="lg" variant="ghost">
                See pricing
              </ButtonLink>
            </div>

            <nav aria-label="Popular pages" className="mt-10 border-t border-line pt-6">
              <p className="eyebrow">Or try one of these</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {ELSEWHERE.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
