# AI Ad Engine — website V1

South African AI advertising platform. Facebook, Instagram, Google, TikTok. Self-serve signup, PayFast recurring subscriptions, no demo call.

- Code: `web/` (Next.js 16 App Router, Tailwind v4, TypeScript)
- Domain to connect: `aiadengine.co.za` (registered at HostAfrica)
- Local preview: `cd web && npm run dev` then open http://localhost:3000
- Live preview: https://ai-ad-engine-rose.vercel.app (sandbox payments, hidden from Google)
- Deployment: see [DEPLOY.md](DEPLOY.md)
- Going live for PayFast approval: see [GO-LIVE-PAYFAST.md](GO-LIVE-PAYFAST.md)

## What is built

| Piece | Status |
| --- | --- |
| Home page (hero, channels, problem, how it works, product, video slot, features, comparison, Polvytjie case study, pricing, FAQ, closing CTA) | Done |
| Checkout pages `/checkout/scale`, `/checkout/dominate` with terms acceptance | Done |
| PayFast recurring subscription handoff (`/api/payfast/create`) | Done, tested against PayFast sandbox |
| PayFast notification handler (`/api/payfast/itn`) | Done, untested against live PayFast |
| `/welcome` post-payment onboarding framework | Done (V1 framework only) |
| `/terms`, `/refund-cancellation-policy`, `/privacy`, `/contact` | Done, wording as supplied |
| Tracking framework (Meta Pixel, GA4, TikTok Pixel, Meta Conversions API) | Wired, switched off until IDs are added |
| Mobile layout | Done, checked at 390px |

## Design direction

Taken from `logo.jpeg`: lifted navy ground (`#0e1626`, panels `#182440`), electric blue (`#1d8cff`), lighter blue (`#3fc4ee`) and chrome silver (`#f2f5fa`) for headline lettering. Display type is Archivo set wide and uppercase, body is Instrument Sans, numbers and labels are JetBrains Mono. Platform brand colours are the only other colours on the page. Tagline "Smarter ads. Bigger results." appears in the footer and the platform section.

Logo assets generated from `logo.jpeg` by `sharp`: `public/logo-mark.png` (badge crop used in headers and footers), `public/logo-full.jpg`, `public/og.jpg` (social sharing image), `app/icon.png` and `app/apple-icon.png` (browser tab and phone icons). Regenerate these if the logo is ever redrawn — ideally supply a transparent PNG or SVG so the mark can sit on any background instead of carrying its own navy square.

Alternating section bands (`bg-navy-2/55`) keep the page from reading as one flat dark slab.

The hero is locked to one screen: the section is `min-height: calc(100svh - 4rem)` and the headline size, hero padding and console scale step down through height-based media queries in `globals.css` (breakpoints at 880px and 760px tall, plus a tablet-portrait block). Phones get the same treatment: a compact console (`HeroConsoleCompact`) replaces the full one under 640px wide, and extra height breakpoints at 740px, 680px and 645px tall drop the channel row, shrink type and shorten the price line. Verified whole-hero-visible at 1920x1080, 1440x900, 1366x768, 1280x720, 1024x768, 768x1024, 430x932, 390x844, 375x667, 360x740 and 360x640. Anything added to the hero has to be re-checked at 1280x720 and 360x640, the two tightest cases.

The signature element is the channel rail: four channels feeding one engine, used in the platform section.

Interface visuals in `components/mockups.tsx` are **drawn in code**, captioned "Interface illustration. Figures shown are examples", and are placeholders for real screenshots.

## Environment variables

Copy `web/.env.example` to `web/.env.local` (already done locally) and fill in:

```
NEXT_PUBLIC_SITE_URL=https://aiadengine.co.za
NEXT_PUBLIC_CONTACT_EMAIL=

PAYFAST_SANDBOX=true          # false when going live
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=

NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
```

Each pixel stays off until its ID is present, so nothing tracks and no cookies are set before launch.

## PayFast notes

- Subscription, not once-off: `subscription_type=1`, `frequency=3` (monthly), `cycles=0` (until cancelled), `recurring_amount` equal to the plan price.
- The signature must be built over the fields **in PayFast's documented order with empty fields removed**. Any other order is rejected with "Generated signature does not match submitted signature". This is handled in `lib/payfast.ts`.
- Sandbox uses PayFast's public test account and its published passphrase automatically.
- The notification handler verifies the signature, posts the message back to PayFast for validation, checks the merchant ID and checks the amount against the plan price before treating a payment as real.

## Needed from Aaron

1. **PayFast**: merchant ID, merchant key, passphrase (set one in the PayFast dashboard under Settings, it is required for signatures). Confirm the account is enabled for recurring subscriptions.
2. **HostAfrica**: DNS access for `aiadengine.co.za`, or add the records I supply once hosting is chosen.
3. **Tracking IDs**: Meta Pixel ID, Meta Conversions API token, GA4 measurement ID, TikTok Pixel ID.
4. **Contact details**: support email and WhatsApp number for the contact page and footer.
5. **Logo source file**: a transparent PNG or SVG version of the logo. The JPEG has the navy background baked in, so the mark is currently shown as a rounded tile.
6. **Polvytjie assets**: logo in higher resolution, product or store photos, sales screenshots. The current logo came from the existing Polvytjie project folder.
7. **Real platform screenshots** of AI Ad Launcher: campaign creation, channel connection, AI copy, reporting. These replace the code-drawn illustrations before any ad spend.
8. **Final plan inclusions** for Scale and Dominate, so pricing and checkout copy match what is delivered.
9. **Product walkthrough video** for the "See AI Ad Engine in action" slot.

## Open items before launch

- Onboarding after payment is a page, not a workflow. Account creation and the welcome email still need to be wired to whatever creates the customer in Plai / AI Ad Launcher.
- Cancellation method: the policy says customers may cancel through the method provided. Decide whether that is a self-serve cancel link or email, then state it on the site.
- Business details for the footer (registered name, company registration number) if PayFast requires them for approval.
