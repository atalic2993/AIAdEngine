import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";

export type LegalBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function LegalPage({
  title,
  path,
  description,
  updated,
  intro,
  blocks,
  children,
}: {
  title: string;
  /** The page's own address, used for the trail search engines display. */
  path: string;
  description: string;
  updated: string;
  intro?: string[];
  blocks: LegalBlock[];
  children?: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
        )}
      />
      <SiteHeader />
      <main id="main">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Legal</p>
            <h1 className="display mt-4 text-[clamp(1.9rem,5.5vw,3rem)] uppercase">{title}</h1>
            <p className="mt-3 font-mono text-xs text-muted-2">Last updated: {updated}</p>

            {intro?.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-[16px] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <div className="mt-12 space-y-10">
              {blocks.map((block, index) => (
                <section key={block.heading ?? index}>
                  {block.heading ? (
                    <h2 className="display scroll-mt-24 text-lg uppercase tracking-[0.04em]">
                      {block.heading}
                    </h2>
                  ) : null}
                  {block.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-[16px] leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {block.bullets ? (
                    <ul className="mt-4 space-y-2">
                      {block.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-[16px] leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-px w-3 shrink-0 bg-brand/60"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {children}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
