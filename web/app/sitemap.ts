import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiadengine.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  return ["", "/terms", "/refund-cancellation-policy", "/privacy", "/contact"].map((path) => ({
    url: `${site}${path}`,
    lastModified: updated,
    changeFrequency: path === "" ? "weekly" : "yearly",
    priority: path === "" ? 1 : 0.5,
  }));
}
