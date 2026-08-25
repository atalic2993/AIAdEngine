import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Search engines are only invited once the real domain is configured.
 * Until NEXT_PUBLIC_SITE_URL is set, this is a temporary address and stays
 * out of Google so it can never compete with aiadengine.co.za.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    // Checkout and the welcome page are deliberately NOT blocked here. Both
    // already carry a "noindex" instruction, and a search engine has to be
    // allowed to fetch a page before it can read that instruction. Blocking
    // them here would leave Google able to list the bare address without ever
    // learning it was meant to stay out. Only the API, which has nothing to
    // read, is blocked outright.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${site}/sitemap.xml`,
  };
}
