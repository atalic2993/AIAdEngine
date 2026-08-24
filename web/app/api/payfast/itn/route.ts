import crypto from "node:crypto";
import { PLANS, isPlanId } from "@/lib/plans";
import { payfastConfig, signatureForItn } from "@/lib/payfast";
import { postToGhl, purchasePayload, purchaseWebhookUrl } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PayFast Instant Transaction Notification.
 *
 * Plain English: PayFast calls this address server-to-server after a payment.
 * We check the message really came from PayFast and really matches the plan
 * price before treating the customer as paid. This is the source of truth for
 * conversions, because a browser can be closed or blocked by an ad blocker.
 */

type ItnData = Record<string, string>;

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

async function sendMetaPurchase(data: ItnData, amount: number) {
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
        event_id: data.m_payment_id,
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
  const signatureOk = expected === data.signature;
  const payfastOk = await verifyWithPayfast(raw, config.validateUrl);

  const planId = data.custom_str1 ?? "";
  const plan = isPlanId(planId) ? PLANS[planId] : undefined;
  const grossAmount = Number.parseFloat(data.amount_gross ?? "0");
  const amountOk = plan ? Math.abs(grossAmount - plan.price) < 0.01 : false;
  const merchantOk = !config.merchantId || data.merchant_id === config.merchantId;

  const trusted = signatureOk && payfastOk && merchantOk;

  console.log("[payfast:itn]", {
    m_payment_id: data.m_payment_id,
    pf_payment_id: data.pf_payment_id,
    status: data.payment_status,
    plan: planId,
    amount_gross: data.amount_gross,
    signatureOk,
    payfastOk,
    amountOk,
    merchantOk,
  });

  if (!trusted) {
    // Answer 200 so PayFast stops retrying, but do nothing with the data.
    return new Response("ignored", { status: 200 });
  }

  if (data.payment_status === "COMPLETE" && amountOk && plan) {
    await Promise.all([
      sendMetaPurchase(data, plan.price),
      postToGhl(purchaseWebhookUrl(), purchasePayload(data, plan.name, plan.price), "purchase"),
    ]);
  }

  return new Response("ok", { status: 200 });
}
