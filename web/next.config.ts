import type { NextConfig } from "next";

// Vercel builds and traces the app itself; asking for a standalone bundle there
// breaks its build. Everywhere else (HostAfrica, a VPS, any Node host) the
// standalone output is what `npm run package` ships.
const selfHosted = !process.env.VERCEL;

/**
 * Security headers.
 *
 * Plain English: instructions to the browser about what this site is allowed to
 * do and who is allowed to embed it. They cost nothing to send and they close
 * off whole categories of attack, which matters on a site that hands people to
 * a payment gateway.
 */

/** Everywhere the site legitimately loads something from, grouped by purpose. */
const ALLOWED = {
  /** Tracking snippets and the booking widget. */
  scripts: [
    "https://connect.facebook.net",
    "https://www.googletagmanager.com",
    "https://analytics.tiktok.com",
    "https://link.msgsndr.com",
  ],
  /** Where those snippets phone home to. */
  connect: [
    "https://connect.facebook.net",
    "https://www.facebook.com",
    "https://graph.facebook.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://*.analytics.google.com",
    "https://*.google-analytics.com",
    "https://analytics.tiktok.com",
    "https://*.leadconnectorhq.com",
  ],
  /** Tracking pixels are ordinary images as far as the browser is concerned. */
  images: [
    "https://www.facebook.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://www.google.com",
    "https://www.google.co.za",
    "https://googleads.g.doubleclick.net",
    "https://analytics.tiktok.com",
    "https://*.leadconnectorhq.com",
    "https://*.msgsndr.com",
  ],
  /** The GoHighLevel booking calendar is embedded on /book-a-demo. */
  frames: ["https://*.leadconnectorhq.com", "https://*.msgsndr.com"],
  /** Checkout posts the customer to PayFast, so that form target must be allowed. */
  forms: ["https://www.payfast.co.za", "https://sandbox.payfast.co.za"],
};

/**
 * "unsafe-inline" is required because Next.js and every advertising pixel put
 * script directly in the page. Removing it means switching to per-request
 * nonces, which would make every page dynamic and give up static rendering.
 * The host allow-list above is what is doing the real work here: a script from
 * anywhere not on that list cannot run, and cannot send anything out.
 *
 * To watch this without enforcing it, change the key below to
 * "Content-Security-Policy-Report-Only". Violations then appear in the browser
 * console and nothing is blocked.
 */
const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'none'`,
  `script-src 'self' 'unsafe-inline' ${ALLOWED.scripts.join(" ")}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: ${ALLOWED.images.join(" ")}`,
  `font-src 'self' data:`,
  `media-src 'self'`,
  `connect-src 'self' ${ALLOWED.connect.join(" ")}`,
  `frame-src 'self' ${ALLOWED.frames.join(" ")}`,
  `form-action 'self' ${ALLOWED.forms.join(" ")}`,
  `upgrade-insecure-requests`,
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: csp },
  // Stops the browser second-guessing a file's type, which is how a stray
  // upload becomes a script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Nobody may put this site inside a frame on their own page and collect
  // clicks meant for us. frame-ancestors above says the same to newer browsers.
  { key: "X-Frame-Options", value: "DENY" },
  // Other sites are told which site the visitor came from, never which page.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Hardware this site never uses is switched off for it.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Two years of HTTPS-only. Deliberately without includeSubDomains, which
  // would also commit every future subdomain of the domain to HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  ...(selfHosted ? { output: "standalone" as const } : {}),
  // Images are already sized for their slots, so no server-side image
  // pipeline (and no sharp install) is needed on the host.
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
