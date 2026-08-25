import crypto from "node:crypto";
import { PLANS, isPlanId } from "@/lib/plans";
import { confirmationKey, payfastConfig, signatureForItn, signaturesMatch } from "@/lib/payfast";
import { postToGhl, purchasePayload, purchaseWebhookUrl, type PaymentKind } from "@/lib/ghl";
import { claimOnce, hasDurableStore, remember } from "@/lib/idempotency";

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

  const planId = data.custom_str1 ?? "";
  const plan = isPlanId(planId) ? PLANS[planId] : undefined;
  const grossAmount = Number.parseFloat(data.amount_gross ?? "0");
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

  const firstTimeSeeingPayment = await claimOnce(
    `payfast:payment:${paymentId}`,
    PAYMENT_TTL_SECONDS,
  );

  if (!firstTimeSeeingPayment) {
    console.log("[payfast:itn] duplicate, already handled", { pf_payment_id: paymentId });
    return new Response("ok", { status: 200 });
  }

  // The subscription reference stays the same for every monthly renewal, so
  // whoever claims it first is the signup and everything after is a renewal.
  const subscriptionRef = data.token || data.m_payment_id || paymentId;
  const isFirstPayment = await claimOnce(`payfast:subscription:${subscriptionRef}`);
  const kind: PaymentKind = isFirstPayment ? "first" : "renewal";

  console.log("[payfast:itn] accepted", {
    pf_payment_id: paymentId,
    reference: data.m_payment_id,
    plan: planId,
    amount_gross: data.amount_gross,
    kind,
    durableStore: hasDurableStore(),
  });

  await Promise.all([
    // Renewals are real revenue but they are not new conversions, so only the
    // first payment is reported to the ad platforms.
    kind === "first" ? sendMetaPurchase(data, plan.price, data.m_payment_id ?? paymentId) : null,
    postToGhl(purchaseWebhookUrl(), purchasePayload(data, plan.name, plan.price, kind), kind),
    // This is the only place a reference is ever marked as paid. The welcome
    // page checks for it rather than trusting whatever is in its own address
    // bar, so a shared or edited link cannot report a sale that never happened.
    data.m_payment_id
      ? remember(confirmationKey(data.m_payment_id), CONFIRMATION_TTL_SECONDS)
      : null,
  ]);

  return new Response("ok", { status: 200 });
}
