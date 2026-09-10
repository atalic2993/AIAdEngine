# AI Ad Engine South African Copy Design

## Objective

Reposition `aiadengine.co.za` around its complete customer journey: planning and launching ads, understanding performance, managing enquiries and following leads through a sales pipeline. Keep the message unmistakably South African through real commercial details, not slang or stereotypes.

The primary conversion is choosing a plan and completing checkout. The secondary conversion is booking a 15-minute demo.

## Strategic Position

AI Ad Engine is a guided advertising platform for owner-led South African businesses that need more control and visibility than boosted posts provide, without taking on a traditional agency retainer.

The central promise is:

> Run advertising across the major platforms, keep every enquiry in sight and get practical help when you need it.

The product should not be positioned as fully automatic, a replacement for every agency, or a guarantee of leads and sales.

## Audience

Primary audience:

- South African small and growing businesses.
- Owner-operators, founders and hands-on marketing managers.
- Businesses that rely on enquiries, quotations, bookings or online sales.
- Customers with enough intent to advertise but not enough time or specialist knowledge to manage several disconnected systems.

Agencies are not treated as a primary audience because multi-client, account-management and white-label features are not confirmed.

## Message Hierarchy

Every important page should answer these questions in order:

1. What business outcome does AI Ad Engine help me achieve?
2. What does the product bring together?
3. Why is it a better fit than my current approach?
4. How much control and help do I get?
5. What does it cost, and what is not included?
6. What should I do next?

Benefits lead. Features provide evidence. AI is described as assistance, not as the outcome.

## Core Copy Direction

### Homepage hero

**Purpose:** Establish the complete value proposition immediately.

**Primary action:** Move the visitor to plan selection.

**Secondary action:** Book a 15-minute demo.

The hero will communicate:

- Advertising across Facebook, Instagram, Google and TikTok.
- Enquiry tracking through a built-in CRM and sales pipeline.
- Pricing in Rands and month-to-month flexibility.
- Human support without presenting the product as a full agency.

Working direction:

**Headline:** Run your ads. Keep every lead in sight.

**Supporting copy:** Plan, launch and manage advertising across Facebook, Instagram, Google and TikTok—then track every enquiry in one connected CRM and sales pipeline. Built for South African businesses, with pricing in Rands and real support when needed.

**Primary CTA:** Choose your plan

**Secondary CTA:** Book a 15-minute demo

### Homepage narrative

The existing component structure will be retained where practical, but each section will have one job:

1. **Hero:** Complete promise and conversion choices.
2. **Channel rail:** Show four advertising channels feeding one connected system.
3. **Problem:** Expose the wider problem: fragmented tools, unclear reporting and missed follow-up.
4. **How it works:** Present the guided journey from business brief to campaign, result analysis and lead follow-up.
5. **Platform:** Explain the connected workspace and customer outcomes.
6. **Walkthrough:** Reduce uncertainty with a short product demonstration.
7. **Capabilities:** Support the promise without repeating channel names or vague AI claims.
8. **Comparison:** Compare boosting, native tools, agencies and AI Ad Engine fairly.
9. **Proof:** Present only the approved Polvytjie figures and clearly distinguish reported results from verified context.
10. **Pricing:** Help visitors select the right support level.
11. **FAQ:** Resolve practical buying objections.
12. **Final CTA:** Offer plan selection first and a 15-minute demo second.

## Supporting Pages

### Channel landing pages

**Purpose:** Match channel-specific South African search intent and help visitors judge fit.

**Primary action:** View plans.

**Secondary action:** Book a 15-minute demo.

Each page will preserve useful channel education while connecting the channel to the wider workflow: campaign, enquiry, CRM, follow-up and customer. Unsupported market claims, absolute statements and time-sensitive assertions will be removed or softened.

### Marketing agency comparison

**Purpose:** Help a visitor choose the right delivery model without attacking agencies.

**Primary action:** View plans.

**Secondary action:** Book a 15-minute demo.

The page will explain where an agency is the right choice and where AI Ad Engine is a better commercial fit. The comparison will centre on control, speed, support level, budget fit and ownership.

### Demo page

**Purpose:** Secure a qualified booking.

**Primary action:** Book a demo slot.

All references will use 15 minutes. The page will set a short, specific agenda and make clear that no payment is needed.

### Checkout pages

**Purpose:** Complete checkout with clear expectations.

**Primary action:** Continue to PayFast.

The copy will explain the selected plan, monthly renewal, separate advertising spend, one-business-day access promise and what happens after payment. It will avoid introducing new sales arguments that create doubt at the point of purchase.

### Contact page

**Purpose:** Resolve uncertainty and route the visitor to the right next step.

**Primary action:** Email support or book a 15-minute demo.

### Welcome page

**Purpose:** Reduce post-purchase uncertainty and move the customer into setup.

**Primary action:** Book the setup call.

The page will separate payment confirmation from account access and explain the onboarding sequence accurately.

### Shared navigation, footer and metadata

Navigation CTA language, footer positioning and search descriptions will use the same message hierarchy. British and South African English conventions will be applied consistently.

## Claims and Trust Guardrails

- Do not guarantee leads, sales, lower costs or faster growth.
- Do not describe the product as fully automated.
- Do not imply that the subscription includes advertising spend.
- Do not invent plan limits, response times, integrations or managed services.
- Do not claim that every advertising placement is available unless the existing product supports it.
- State that customers control their accounts, assets, budgets and approvals.
- Use the Polvytjie before-and-after sales figures only as a reported customer result.
- Do not publish a timeframe, channel, advertising spend or causal explanation for Polvytjie without documented approval.
- Keep the one-business-day login delivery promise consistent.
- Use 15 minutes consistently for the demo.

## Localisation Rules

- Use South African and British spelling: organise, optimisation, analyse.
- Use “enquiry” for a potential customer contacting a business.
- Use “Rands” or correctly formatted rand prices.
- Use familiar local-business situations only where they clarify the product.
- Avoid slang, stereotypes and gratuitous references to South African institutions.
- Prefer “month-to-month” over imported subscription language.
- Explain CRM and sales pipeline in ordinary words on first use.

## Files in Scope

Expected copy changes:

- `web/app/layout.tsx`
- `web/components/site-header.tsx`
- `web/components/site-footer.tsx`
- `web/components/sections/*.tsx`
- `web/lib/plans.ts`
- `web/lib/channels.ts`
- `web/components/channel-landing.tsx`
- `web/app/vs-marketing-agency/page.tsx`
- `web/app/book-a-demo/page.tsx`
- `web/app/contact/page.tsx`
- `web/app/checkout/[plan]/page.tsx`
- `web/app/checkout/[plan]/checkout-form.tsx`
- `web/app/welcome/page.tsx`

Legal policies will not be rewritten unless a copy change creates a direct consistency requirement. Generated email files are outside this website-copy pass.

## Verification

After implementation:

1. Search the codebase for conflicting claims, US spelling, old demo durations and old CTA labels.
2. Run lint and the production build.
3. Render the homepage and affected conversion pages.
4. Check desktop and mobile layouts for overflow caused by revised copy.
5. Confirm all calls to action point to the intended destination.
6. Confirm structured data and visible copy agree.
7. Confirm pricing, separate advertising spend, cancellation language and access timing remain consistent.

## Acceptance Criteria

- The complete advertising-to-follow-up value proposition appears above the fold.
- Every section has a distinct conversion purpose.
- AI is presented as practical assistance rather than hype.
- Copy reads naturally in South African English.
- Pricing and plan support levels are clear.
- The 15-minute demo duration is consistent everywhere.
- No unsupported customer result or product claim remains.
- Homepage, channel pages and conversion pages use one coherent positioning system.
