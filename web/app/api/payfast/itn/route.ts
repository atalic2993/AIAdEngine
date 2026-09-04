import crypto from "node:crypto";
import { PLANS, isPlanId } from "@/lib/plans";
import { confirmationKey, payfastConfig, signatureForItn, signaturesMatch } from "@/lib/payfast";
import { postToGhl, purchasePayload, purchaseWebhookUrl, type PaymentKind } from "@/lib/ghl";
import { claimOnce, forget, hasDurableStore, remember } from "@/lib/idempotency";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PayFast Instant Transaction Notification.
 *
 * Plain English: PayFast calls this address server-to-server after a payment.
 * We check the message really came from PayFast and really matches the plan
 * price before treating the customer as paid. This is the source of truth for
 * conversions, because a browser can be closed or blocked by an ad blocker.
 *
 * Two things are only allowed to happen once:
 *   - Acting on a single payment. The same notification can arrive twice, and
 *     a copy of it could be replayed at us later, so each PayFast payment id is
 *     claimed before anything is sent anywhere.
 *   - Onboarding a customer. A subscription sends one of these every month when
 *     it renews. The first one signs the customer up; the rest are marked as
 *     renewals so the welcome workflow does not run again.
 */

type ItnData = Record<string, string>;

/** Long enough that a replayed notification can never come back into scope. */
const PAYMENT_TTL_SECONDS = 60 * 60 * 24 * 400;

/**
 * How long the welcome page will accept a reference as genuinely paid. Only has
 * to outlive the customer sitting on that page, so a day is generous.
 */
const CONFIRMATION_TTL_SECONDS = 60 * 60 * 24;


async function verifyWithPayfast(raw: string, validateUrl: string): Promise<boolean> {
  try {
    const response = await fetch(validateUrl, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: raw,
    });
    const text = (await response.text()).trim();
    return text.startsWith("VALID");
  } catch {
    return false;
  }
}

async function sendMetaPurchase(data: ItnData, amount: number, eventId: string) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) return;

  const email = (data.email_address ?? "").trim().toLowerCase();
  const hashed = email ? crypto.createHash("sha256").update(email).digest("hex") : undefined;

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: hashed ? { em: [hashed] } : {},
        custom_data: {
          currency: "ZAR",
          value: amount,
          content_name: data.item_name,
        },
      },
    ],
  };

  try {
    await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Never let a tracking failure break payment handling.
  }
}

export async function POST(request: Request) {
  const raw = await request.text();
  const params = new URLSearchParams(raw);
  const entries = [...params.entries()];
  const data: ItnData = Object.fromEntries(entries);
  const config = payfastConfig();

  const expected = signatureForItn(entries, config.passphrase);
  const signatureOk = signaturesMatch(expected, data.signature ?? "");
  const payfastOk = await verifyWithPayfast(raw, config.validateUrl);

  // TEMPORARY, remove once PayFast confirms how Multi-Currency Pricing (MCP)
  // reports amounts on the ITN: log every field name PayFast actually sent,
  // minus anything personal, so a sandbox MCP test can show whether a
  // currency field exists and whether amount_gross stays in ZAR for a
  // non-ZAR buyer. PII fields (name/email/phone/address/business) are
  // stripped before logging.
  const piiFields = new Set([
    "name_first",
    "name_last",
    "email_address",
    "custom_str2",
    "custom_str3",
    "custom_str4",
    "custom_str5",
    "token",
  ]);
  console.log(
    "[payfast:itn:debug] raw fields received",
    Object.fromEntries(entries.filter(([key]) => !piiFields.has(key))),
  );

  const planId = data.custom_str1 ?? "";
  const plan = isPlanId(planId) ? PLANS[planId] : undefined;
  const grossAmount = Number.parseFloat(data.amount_gross ?? "0");
  // This assumes amount_gross is always ZAR. If Multi-Currency Pricing makes
  // PayFast report the buyer's converted currency/amount instead, this check
  // will reject every non-ZAR payment as a mismatch. Do not change this until
  // a real MCP test (see the debug log above) confirms which way it behaves.
  const amountOk = plan ? Math.abs(grossAmount - plan.price) < 0.01 : false;
  const merchantOk = !config.merchantId || data.merchant_id === config.merchantId;

  const trusted = signatureOk && payfastOk && merchantOk;

  if (!trusted) {
    console.warn("[payfast:itn] rejected", {
      pf_payment_id: data.pf_payment_id,
      signatureOk,
      payfastOk,
      merchantOk,
    });
    // Answer 200 so PayFast stops retrying, but do nothing with the data.
    return new Response("ignored", { status: 200 });
  }

  if (data.payment_status !== "COMPLETE" || !amountOk || !plan) {
    console.log("[payfast:itn] no action", {
      pf_payment_id: data.pf_payment_id,
      status: data.payment_status,
      plan: planId,
      amountOk,
    });
    return new Response("ok", { status: 200 });
  }

  // One PayFast payment, handled once. A repeat of this exact notification —
  // whether PayFast sent it twice or somebody replayed a captured copy — stops
  // here without touching the CRM or the pixel.
  const paymentId = data.pf_payment_id || data.m_payment_id;
  if (!paymentId) {
    console.error("[payfast:itn] notification carried no payment id, ignoring");
    return new Response("ok", { status: 200 });
  }

  const paymentKey = `payfast:payment:${paymentId}`;

  /**
   * Which values might identify this subscription across its whole life.
   *
   * PayFast's own documentation does not pin down which of these stays put from
   * the signup through to every later renewal, so both are claimed. A renewal
   * only has to match on one of them to be recognised, whichever field PayFast
   * turns out to keep stable.
   */
  const subscriptionRefs = [...new Set([data.token, data.m_payment_id].filter(Boolean))];
  const subscriptionKeys = subscriptionRefs.length
    ? subscriptionRefs.map((ref) => `payfast:subscription:${ref}`)
    : [`payfast:subscription:${paymentId}`];

  const claimedSubscriptionKeys: string[] = [];
  let kind: PaymentKind;

  try {
    const firstTimeSeeingPayment = await claimOnce(paymentKey, PAYMENT_TTL_SECONDS);

    if (!firstTimeSeeingPayment) {
      console.log("[payfast:itn] duplicate, already handled", { pf_payment_id: paymentId });
      return new Response("ok", { status: 200 });
    }

    // Claimed one at a time so a failure part way through still knows exactly
    // which claims it needs to give back.
    const claimResults: boolean[] = [];
    for (const key of subscriptionKeys) {
      const claimed = await claimOnce(key);
      claimResults.push(claimed);
      if (claimed) claimedSubscriptionKeys.push(key);
    }

    // Only a payment where every reference is brand new is a genuine signup.
    // If any one of them has been seen before, this subscription already exists.
    kind = claimResults.every(Boolean) ? "first" : "renewal";
  } catch (error) {
    // The store is configured but unreachable. Rather than guess and risk
    // onboarding an existing customer all over again, ask PayFast to try later.
    console.error("[payfast:itn] payment memory unavailable, asking PayFast to retry", {
      pf_payment_id: paymentId,
      error: error instanceof Error ? error.message : String(error),
    });
    return new Response("payment memory unavailable", { status: 503 });
  }

  console.log("[payfast:itn] accepted", {
    pf_payment_id: paymentId,
    reference: data.m_payment_id,
    plan: planId,
    amount_gross: data.amount_gross,
    kind,
    durableStore: hasDurableStore(),
  });

  // An empty string is not caught by ??, and an empty event id would stop Meta
  // pairing the browser event with this one.
  const eventId = data.m_payment_id || paymentId;

  const [, delivered] = await Promise.all([
    // Renewals are real revenue but they are not new conversions, so only the
    // first payment is reported to the ad platforms.
    kind === "first" ? sendMetaPurchase(data, plan.price, eventId) : Promise.resolve(),
    postToGhl(purchaseWebhookUrl(), purchasePayload(data, plan.name, plan.price, kind), kind),
  ]);

  if (!delivered) {
    // The customer has paid but their details did not reach the CRM. Give back
    // every claim so a retry is able to do the work properly, and answer with an
    // error so PayFast sends this notification again. Without this the sale
    // would be lost silently and no replay could ever recover it.
    await Promise.all([forget(paymentKey), ...claimedSubscriptionKeys.map(forget)]);
    console.error("[payfast:itn] CRM delivery failed, claims released for retry", {
      pf_payment_id: paymentId,
      reference: data.m_payment_id,
    });
    return new Response("crm delivery failed", { status: 503 });
  }

  // Marked as paid only once the sale is safely recorded. This is the note the
  // welcome page looks for instead of trusting whatever is in its address bar.
  if (data.m_payment_id) {
    try {
      await remember(confirmationKey(data.m_payment_id), CONFIRMATION_TTL_SECONDS);
    } catch (error) {
      // The sale is already recorded, so this must not fail the notification.
      // The welcome page falls back to saying the payment is still confirming.
      console.error("[payfast:itn] could not mark reference as paid", {
        reference: data.m_payment_id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return new Response("ok", { status: 200 });
}
