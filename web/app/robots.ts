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
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout/", "/welcome", "/api/"] },
    sitemap: `${site}/sitemap.xml`,
  };
}
