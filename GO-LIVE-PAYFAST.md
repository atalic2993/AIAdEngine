# Going live on aiadengine.co.za for PayFast approval

Follow these in order. Steps 1 and 2 are yours (they need your HostAfrica login). Steps 3 onward I do, or we do together.

Current state: the site is deployed and the Vercel project already has `aiadengine.co.za` and `www.aiadengine.co.za` attached. It is waiting for DNS. The site also already knows its real address, so canonical links, the sitemap and the PayFast return address all point at aiadengine.co.za.

---

## Step 1 — Point the domain at the site (HostAfrica)

1. Log into `panel.hostafrica.com`.
2. Left menu → **Domains** → the row for `aiadengine.co.za` → **Manage DNS**.
3. Add or edit these two records only:

| Type | Host / Name | Points to | TTL |
| --- | --- | --- | --- |
| `A` | `@` (or blank, meaning the domain itself) | `216.198.79.1` | default |
| `CNAME` | `www` | `cname.vercel-dns.com` | default |

4. If an `A` record for `@` already exists (pointing at a parking page), **edit it** rather than adding a second one. Two A records for `@` will make the site load only half the time.
5. Save.

### Do not touch these

You have a live Email service on this domain. Leave every **MX** record and every **TXT** record (SPF, DKIM, DMARC) exactly as they are. Deleting them stops mail to your @aiadengine.co.za addresses immediately.

### If HostAfrica shows different values

Vercel sometimes issues a project-specific CNAME target (something like `d1d4fc829fe7bc7c.vercel-dns-017.com`). If the Vercel dashboard shows different values than the table above, use Vercel's. Send me a screenshot and I will confirm.

---

## Step 2 — Wait, then tell me

DNS usually updates within 10–30 minutes, sometimes a few hours. When `aiadengine.co.za` opens the site in your browser, tell me. I will confirm the SSL certificate (the padlock) issued correctly and that `www` redirects to the main address.

---

## Step 3 — What PayFast looks at on the website

PayFast reviews the site before approving a business. Here is what they expect and where we stand.

| What they look for | Status |
| --- | --- |
| Clear description of what is being sold | Done — the whole home page |
| Prices shown in Rands | Done — R599 and R1,599, both marked month-to-month |
| Recurring billing disclosed before payment | Done — stated on pricing, checkout and in the tick box |
| Terms & Conditions page | Done — `/terms` |
| Refund & Cancellation Policy page | Done — `/refund-cancellation-policy` |
| Privacy Policy page | Done — `/privacy` |
| Working checkout that reaches PayFast | Done — tested against PayFast's sandbox |
| Business contact details: email, phone, address | **Missing** — I need these from you |
| Registered business name and registration number | **Missing** — I need these from you |
| How and when the customer receives what they paid for | Done — "login details emailed within one business day", shown on checkout, FAQ, contact page and footer |

The last three are the usual reason a review comes back with questions, so we should add them before you submit.

---

## Step 4 — Details I need from you

Send me these and I will add them to the footer and the contact page:

You confirmed: registered company (Pty) Ltd, access emailed within one business day. The delivery promise is already on the site. Still needed, all of them going into `web/lib/business.ts`:

1. **Registered company name** exactly as it appears at CIPC
2. **CIPC registration number** (format 2026/123456/07)
3. **VAT number**, if registered. Say "not registered" if not.
4. **Business address** — the physical address PayFast has on file
5. **Support email** — confirm `support@aiadengine.co.za` exists as a mailbox, or give me the right one
6. **Support phone or WhatsApp number**

Until these are filled in, the footer and contact page simply leave those lines out, so nothing false is published. PayFast will very likely ask for them.

---

## Step 5 — PayFast side

In your PayFast dashboard:

1. **Settings → Integration**: copy the Merchant ID and Merchant Key, and set a **Passphrase**. Send me all three. The passphrase is what stops anyone editing the price in their browser.
2. Confirm with PayFast that **recurring subscriptions (subscription_type 1)** are enabled on the account. Some accounts have to ask for it.
3. Upload your KYC documents. PayFast verifies under FICA, so expect to supply:
   - Sole proprietor: SA ID or passport, proof of address not older than three months, bank confirmation letter or recent statement
   - Registered company: CIPC registration documents, proof of business address, bank account confirmation, ID documents for all directors, beneficial ownership where applicable
   - Blurry scans, an address older than three months, or details that do not match CIPC are the usual causes of delay.

When you send me the three PayFast values I switch the site from sandbox to live.

---

## Step 6 — The live test

Once the domain is live and the PayFast keys are in:

1. Subscribe to **Scale** yourself on the real site, with your own card. R599 will actually be taken.
2. Check that you land on the welcome page with the plan and reference shown.
3. I check the server log for the PayFast notification, with the signature verified and status COMPLETE.
4. In PayFast, **cancel the subscription and refund the payment**.

That test is the only proof that the recurring billing and the payment confirmation both work. Do it before spending anything on ads.

---

## Step 7 — Only after approval

- Add the Meta Pixel, Meta Conversions API token, GA4 and TikTok Pixel IDs
- Swap the code-drawn interface illustrations for real AI Ad Launcher screenshots
- Add the product walkthrough video to the slot that is waiting for it
