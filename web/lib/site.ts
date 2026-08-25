/**
 * One place that knows the site's real address.
 *
 * Plain English: canonical links, the sitemap and the structured data all have
 * to agree on which address is the official one, otherwise search engines treat
 * the preview deployments and the live domain as rival copies of the same site.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiadengine.co.za"
).replace(/\/$/, "");

/** Turns "/pricing" into "https://aiadengine.co.za/pricing". */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
