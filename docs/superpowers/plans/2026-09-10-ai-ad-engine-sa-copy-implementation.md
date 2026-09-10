# AI Ad Engine South African Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the complete `aiadengine.co.za` website so it sells a connected advertising, CRM and lead-follow-up workflow to South African small businesses with clear, credible and locally natural copy.

**Architecture:** Keep the existing Next.js routes, components and visual system. Change copy at its existing sources of truth: shared product and plan language in `web/lib`, homepage narrative in section components, and intent-specific language in route files. Add a small source scanner so unsupported claims, inconsistent demo duration and stale calls to action cannot return unnoticed.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node.js source-check script.

**Spec:** `docs/superpowers/specs/2026-09-10-ai-ad-engine-sa-copy-design.md`

## Global Constraints

- Use natural South African English and British spelling.
- Primary conversion: choose a plan and complete checkout.
- Secondary conversion: book a 15-minute demo.
- Lead with business outcomes; use features as supporting evidence.
- Explain CRM as the place where customer enquiries and conversations stay organised.
- Explain a sales pipeline as the stages showing where each enquiry is, from new lead to customer.
- Advertising spend is separate and paid directly to Meta, Google or TikTok.
- Both plans remain month-to-month.
- Login details remain promised within one business day of payment.
- Do not guarantee leads, sales, lower costs or growth.
- Do not describe the product as fully automatic or as a complete marketing agency replacement.
- Do not add plan limits, response times, integrations or services that are not confirmed.
- Use the Polvytjie figures only as a reported before-and-after result; do not state a timeframe, channel, spend or cause.
- Keep legal policies and generated email files outside this pass unless consistency requires a narrow change.

---

### Task 1: Add Copy Guardrail Check

**Files:**

- Create: `web/scripts/check-copy.mjs`
- Modify: `web/package.json`

**Interfaces:**

- Consumes: Website source under `web/app`, `web/components` and `web/lib`.
- Produces: `npm run check:copy`, exiting non-zero when a forbidden phrase remains.

- [ ] **Step 1: Add a failing copy-check script**

Create a Node.js script that recursively scans `.ts` and `.tsx` files and reports these forbidden patterns:

```js
const forbidden = [
  { pattern: /30[- ]minute/i, reason: "Demo must be described as 15 minutes" },
  { pattern: /roughly 6 months/i, reason: "Polvytjie timeframe is not approved" },
  { pattern: /steady optimisation took Polvytjie/i, reason: "Polvytjie causation is not approved" },
  { pattern: /Stop boosting posts/i, reason: "Old Meta-only hero positioning" },
  { pattern: />\s*Get started\s*</i, reason: "Use an outcome-specific call to action" },
];
```

The script must skip legal files and print `relative/path:line reason` for every match.

- [ ] **Step 2: Expose the command**

Add this script to `web/package.json`:

```json
"check:copy": "node scripts/check-copy.mjs"
```

- [ ] **Step 3: Run the check and verify it fails**

Run: `npm run check:copy`

Expected: FAIL with the existing 30-minute demo, old hero, generic CTA and unapproved Polvytjie claims.

- [ ] **Step 4: Commit the guardrail**

```bash
git add web/scripts/check-copy.mjs web/package.json
git commit -m "test: add website copy guardrails"
```

---

### Task 2: Rewrite Shared Positioning and Plan Language

**Files:**

- Modify: `web/lib/plans.ts`
- Modify: `web/lib/schema.ts`
- Modify: `web/app/layout.tsx`
- Modify: `web/components/site-header.tsx`
- Modify: `web/components/site-footer.tsx`

**Interfaces:**

- Consumes: `PLAN_LIST`, `SPEND_DISCLOSURE`, `RESULTS_DISCLAIMER`, `SITE_URL`.
- Produces: Shared plan descriptions, metadata and site-wide calls to action used by all routes.

- [ ] **Step 1: Rewrite plan positioning around support level**

Use these plan descriptions as the shared source:

```ts
scale.positioning =
  "For hands-on business owners who want to create, manage and track their own advertising from one place.";

dominate.positioning =
  "For businesses that want the full platform plus hands-on help to plan, build and launch their campaigns.";
```

Keep existing feature lists unless a feature is merely duplicated. Use sentence case for `Done-with-you`.

- [ ] **Step 2: Rewrite global metadata**

Use this promise consistently:

```ts
description:
  "Plan and manage ads across Facebook, Instagram, Google and TikTok, then track every enquiry in one CRM and sales pipeline. Built for South African businesses.";
```

Keep the title focused on the category and South African audience. Keep `en_ZA` and the existing canonical-domain behaviour.

- [ ] **Step 3: Replace shared calls to action**

Header primary CTA: `Choose a plan`.

Header secondary CTA: `Book a 15-minute demo` where space allows; retain `Book a demo` only where mobile width makes the full label impractical.

Footer position:

```text
Plan and manage advertising across four major platforms, then keep every enquiry organised in one CRM and sales pipeline. Built for South African businesses and priced in Rands.
```

- [ ] **Step 4: Verify shared-source consistency**

Run:

```bash
npm run lint
npm run check:copy
```

Expected: lint passes; copy check may still fail only in files scheduled for later tasks.

- [ ] **Step 5: Commit shared positioning**

```bash
git add web/lib/plans.ts web/lib/schema.ts web/app/layout.tsx web/components/site-header.tsx web/components/site-footer.tsx
git commit -m "copy: align shared South African positioning"
```

---

### Task 3: Rewrite the Homepage Narrative

**Files:**

- Modify: `web/app/page.tsx`
- Modify: `web/components/sections/hero.tsx`
- Modify: `web/components/sections/channels.tsx`
- Modify: `web/components/sections/problem.tsx`
- Modify: `web/components/sections/how-it-works.tsx`
- Modify: `web/components/sections/product.tsx`
- Modify: `web/components/sections/demo-video.tsx`
- Modify: `web/components/sections/features.tsx`
- Modify: `web/components/sections/comparison.tsx`
- Modify: `web/components/sections/case-study.tsx`
- Modify: `web/components/sections/pricing.tsx`
- Modify: `web/components/sections/faq.tsx`

**Interfaces:**

- Consumes: Shared plan, spend and result language from Task 2.
- Produces: A homepage argument from advertising need to connected follow-up, proof, plan selection and demo booking.

- [ ] **Step 1: Rewrite the hero**

Use:

```text
Headline: Run your ads. Keep every lead in sight.
Supporting copy: Plan, launch and manage advertising across Facebook, Instagram, Google and TikTok—then track every enquiry in one connected CRM and sales pipeline.
Primary CTA: Choose your plan
Secondary CTA: Book a 15-minute demo
```

Replace the existing negatives with three trust points:

```text
Four major advertising platforms
CRM and sales pipeline included
Real human support when needed
```

Keep price, Rands, month-to-month and separate-spend disclosure visible without overloading the hero.

- [ ] **Step 2: Rewrite the problem and channel sections**

Problem heading:

```text
Getting the click is only half the job.
```

Explain that advertising fails when campaigns, enquiries and follow-up live in separate places. Retain channel coverage, but change the engine card to explain that one login connects campaigns, performance and leads.

- [ ] **Step 3: Expand the workflow from launch to conversion**

Use six concise stages:

```text
Research — Get clear on your offer, market and customer before spending.
Build — Turn the business brief into campaign structure, angles and copy.
Launch — Approve the campaign, choose the budget and go live.
Analyse — See spend, enquiries and cost per lead in plain language.
Improve — Use performance signals to decide what to adjust next.
Follow up — Move every enquiry through the pipeline towards a sale.
```

- [ ] **Step 4: Rewrite platform and capability sections**

Each block must pair a capability with an outcome:

```text
Bring every channel into one workspace.
Build campaigns with AI assistance.
See what happens after the click.
Keep follow-up moving.
```

Capabilities should cover guided campaign creation, cross-channel management, advertising copy and creative direction, performance reporting, CRM, pipeline and human support without repeating the same platform list in every card.

- [ ] **Step 5: Make the comparison credible**

Compare these approaches:

- Boosting posts: quick, but limited control and reporting.
- Native advertising tools: powerful, but fragmented and time-consuming.
- Traditional agency: broader service, but usually more expensive and less immediate control.
- AI Ad Engine: guided platform, connected lead tracking, month-to-month, with plan-dependent support.

Avoid claiming AI Ad Engine is always the correct choice.

- [ ] **Step 6: Correct the proof section**

Use:

```text
Eyebrow: A reported South African customer result
Headline: From R4,000 to more than R165,000 in reported monthly online sales.
Body: Polvytjie has given AI Ad Engine permission to share its reported before-and-after online sales figures and to act as a customer reference.
```

Remove timeframe, advertising channel, spend and causal explanation.

- [ ] **Step 7: Rewrite pricing, FAQ and final CTA**

Pricing must help visitors choose based on desired support. Add or revise FAQ answers for account ownership, CRM, AI's role and realistic outcomes.

Final section:

```text
Headline: Ready to connect your advertising and follow-up?
Body: Choose the support level that suits your business, or book a 15-minute demo and see the platform before deciding.
Primary CTA: Choose your plan
Secondary CTA: Book a 15-minute demo
```

- [ ] **Step 8: Verify homepage copy**

Run:

```bash
npm run lint
npm run check:copy
```

Expected: lint passes; copy check failures remain only in supporting routes scheduled for Tasks 4 and 5.

- [ ] **Step 9: Commit the homepage rewrite**

```bash
git add web/app/page.tsx web/components/sections
git commit -m "copy: rewrite South African homepage journey"
```

---

### Task 4: Rewrite Channel Landing Pages

**Files:**

- Modify: `web/lib/channels.ts`
- Modify: `web/components/channel-landing.tsx`

**Interfaces:**

- Consumes: `Channel` and `CHANNELS` data model, shared plans and site components.
- Produces: Three search-focused pages with channel-specific education and shared conversion language.

- [ ] **Step 1: Revise channel data for accuracy and local tone**

Keep each page's search intent but remove or soften unsupported absolutes such as:

- Claims about where “most reach” comes from.
- Assertions that TikTok is cheaper.
- Unverified audience-growth and cost trends.
- Claims that a particular creative approach “routinely” beats another.

Keep local examples where they explain service areas, enquiries, bookings or online sales.

- [ ] **Step 2: Connect each channel to the full workflow**

Replace generic handling language with:

```text
Build with guidance — Start with your offer and customer, then use AI assistance to shape the campaign and copy.
Manage from one place — Keep this channel alongside your other advertising instead of opening another disconnected dashboard.
Track every enquiry — New leads enter the CRM, where conversations and next steps stay organised.
Follow performance through — See spend, enquiries and pipeline movement together, not only clicks and impressions.
```

- [ ] **Step 3: Standardise conversion copy**

Primary CTA: `View plans`.

Secondary CTA: `Book a 15-minute demo`.

Keep the R599 starting price, Rands, month-to-month and separate-spend disclosure.

- [ ] **Step 4: Verify and commit channel pages**

Run:

```bash
npm run lint
npm run check:copy
```

Then:

```bash
git add web/lib/channels.ts web/components/channel-landing.tsx
git commit -m "copy: localise advertising channel pages"
```

---

### Task 5: Rewrite Decision and Conversion Pages

**Files:**

- Modify: `web/app/vs-marketing-agency/page.tsx`
- Modify: `web/app/book-a-demo/page.tsx`
- Modify: `web/app/contact/page.tsx`
- Modify: `web/app/checkout/[plan]/page.tsx`
- Modify: `web/app/checkout/[plan]/checkout-form.tsx`
- Modify: `web/app/welcome/page.tsx`

**Interfaces:**

- Consumes: Shared plan descriptions and delivery promise.
- Produces: Consistent decision, booking, checkout, support and onboarding journeys.

- [ ] **Step 1: Rewrite the agency comparison**

Use the hero direction:

```text
Headline: Software, guided support or a full agency?
Supporting copy: The right choice depends on your budget, the work you want to keep in-house and how much specialist help you need.
```

Preserve the honest agency-fit section. Replace general attacks with practical comparison points: scope, control, turnaround, ownership and total cost.

- [ ] **Step 2: Rewrite the demo page to 15 minutes**

Use:

```text
Headline: See the full workflow in 15 minutes.
Supporting copy: We will show you how a campaign moves from business brief to launch, reporting and lead follow-up, then answer your questions.
Trust points: Free 15-minute screen share; no payment needed; no pressure to subscribe.
```

Compress the agenda so it is credible within 15 minutes.

- [ ] **Step 3: Tighten contact copy**

Lead with routing:

```text
Headline: Get the answer you need.
Body: Ask about the platform, plans, billing or your account. If seeing the workflow would be easier, book a free 15-minute demo.
```

Do not imply response times that are not confirmed.

- [ ] **Step 4: Reduce checkout uncertainty**

Use the checkout introduction:

```text
Enter your business details, accept the terms and continue to PayFast for secure payment. Your plan renews monthly until cancelled.
```

Keep the one-business-day access promise and separate-spend disclosure next to the plan summary. Change the form footer to explain why business details are needed without implying that every field creates an advertising account automatically.

- [ ] **Step 5: Clarify post-purchase onboarding**

The welcome page must distinguish these events:

1. Payment has been received.
2. The team prepares the account.
3. Login details arrive within one business day.
4. The customer connects relevant advertising accounts.
5. The customer builds and launches the first campaign with the support included in the selected plan.

- [ ] **Step 6: Verify and commit conversion pages**

Run:

```bash
npm run lint
npm run check:copy
```

Expected: both pass.

Then:

```bash
git add web/app/vs-marketing-agency/page.tsx web/app/book-a-demo/page.tsx web/app/contact/page.tsx web/app/checkout/[plan]/page.tsx web/app/checkout/[plan]/checkout-form.tsx web/app/welcome/page.tsx
git commit -m "copy: rewrite website conversion journeys"
```

---

### Task 6: Copy Edit, Build and Browser Verification

**Files:**

- Modify: Any website-copy source with an issue found during review.
- Test: `web/scripts/check-copy.mjs`

**Interfaces:**

- Consumes: Completed rewrite from Tasks 2–5.
- Produces: Production-ready copy with verified build, mobile fit and conversion paths.

- [ ] **Step 1: Run the copy-editing pass**

Check every changed string for clarity, repetition, unsupported implications, artificial South African phrasing, American spelling and unexplained technical language.

- [ ] **Step 2: Run automated verification**

Run:

```bash
npm run check:copy
npm run lint
npm run build
```

Expected: all three commands exit successfully.

- [ ] **Step 3: Start the local production preview**

Run:

```bash
npm run start
```

Use the system Chrome through Playwright. Check the homepage at 1280×720 and 360×640, then check `/book-a-demo`, `/checkout/scale`, `/checkout/dominate`, `/contact`, `/welcome`, each channel page and `/vs-marketing-agency`.

- [ ] **Step 4: Verify conversion paths and claims**

Confirm:

- `Choose your plan` moves to pricing or the intended checkout choice.
- Every `Book a 15-minute demo` link opens `/book-a-demo`.
- Checkout submits to the existing PayFast route without sending a payment during testing.
- No text overflows or important CTA falls outside the viewport.
- Metadata, structured data and visible copy use the same product promise.
- The Polvytjie section contains no timeframe, channel, spend or causal claim.

- [ ] **Step 5: Review the final diff**

Run:

```bash
git diff --check HEAD~4..HEAD
git status --short
```

Confirm unrelated untracked files remain untouched.

- [ ] **Step 6: Commit review fixes**

```bash
git add web
git commit -m "copy: polish and verify website messaging"
```

