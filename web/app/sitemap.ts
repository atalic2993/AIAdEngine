import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Real dates, not today's date.
 *
 * Plain English: this file tells search engines when each page last genuinely
 * changed. Stamping every page with the current time on every crawl trains
 * Google to ignore the signal, so these are updated by hand when the content
 * on a page actually changes.
 */
type Entry = {
  path: string;
  updated: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const PAGES: Entry[] = [
  { path: "", updated: "2026-08-25", changeFrequency: "weekly", priority: 1 },
  { path: "/facebook-ads-south-africa", updated: "2026-08-25", changeFrequency: "monthly", priority: 0.9 },
  { path: "/google-ads-south-africa", updated: "2026-08-25", changeFrequency: "monthly", priority: 0.9 },
  { path: "/tiktok-ads-south-africa", updated: "2026-08-25", changeFrequency: "monthly", priority: 0.9 },
  { path: "/vs-marketing-agency", updated: "2026-08-25", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-a-demo", updated: "2026-08-25", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", updated: "2026-08-25", changeFrequency: "yearly", priority: 0.5 },
  { path: "/terms", updated: "2026-08-21", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-cancellation-policy", updated: "2026-08-21", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", updated: "2026-08-21", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(`${page.updated}T00:00:00Z`),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
