import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiadengine.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  return ["", "/book-a-demo", "/terms", "/refund-cancellation-policy", "/privacy", "/contact"].map((path) => ({
    url: `${site}${path}`,
    lastModified: updated,
    changeFrequency: path === "" || path === "/book-a-demo" ? "weekly" : "yearly",
    priority: path === "" ? 1 : path === "/book-a-demo" ? 0.8 : 0.5,
  }));
}
