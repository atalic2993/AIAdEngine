import { parseSaMobile } from "@/lib/phone";

/**
 * GoHighLevel webhook.
 *
 * Plain English: once a payment is confirmed, we post everything the customer
 * entered at checkout to a GoHighLevel webhook address. GHL turns that into a
 * contact and kicks off whatever workflow is attached to it.
 *
 * The address can be overridden with an environment variable so it can be
 * rotated without a code change.
 */

/** Fires when a subscription payment is confirmed by PayFast. */
const PURCHASE_WEBHOOK_FALLBACK =
  "https://services.leadconnectorhq.com/hooks/bcvWrtKvUyOV8S5ZgByy/webhook-trigger/65b87277-004d-4c82-88fe-20a62713cde9";

export function purchaseWebhookUrl(): string {
  return process.env.GHL_PURCHASE_WEBHOOK_URL || PURCHASE_WEBHOOK_FALLBACK;
}

/**
 * Turns a PayFast notification into the contact GoHighLevel receives.
 *
 * PayFast only echoes the name and email fields back on its notification, so
 * everything else the customer typed at checkout is carried in the five custom
 * fields: plan, business name, mobile number, business address, and the niche
 * and website sharing the last one either side of a pipe.
 */
export function purchasePayload(
  data: Record<string, string>,
  planName: string,
  amount: number,
): Record<string, unknown> {
  const first = (data.name_first ?? "").trim();
  const last = (data.name_last ?? "").trim();
  const [niche = "", website = ""] = (data.custom_str5 ?? "").split("|");
  const mobile = parseSaMobile(data.custom_str3 ?? "");

  return {
    event: "subscription_payment",
    first_name: first,
    last_name: last,
    full_name: `${first} ${last}`.trim(),
    email: (data.email_address ?? "").trim().toLowerCase(),
    // GoHighLevel sends SMS off the international format, so that is the main
    // field. The local form is included for anyone reading the record.
    phone: mobile?.e164 ?? (data.custom_str3 ?? "").trim(),
    phone_local: mobile?.local ?? (data.custom_str3 ?? "").trim(),
    business_name: (data.custom_str2 ?? "").trim(),
    business_address: (data.custom_str4 ?? "").trim(),
    business_niche: niche.trim(),
    website: website.trim(),
    plan: data.custom_str1 ?? "",
    plan_name: planName,
    amount,
    currency: "ZAR",
    payment_reference: data.m_payment_id ?? "",
    payfast_payment_id: data.pf_payment_id ?? "",
    payment_status: data.payment_status ?? "",
    source: "aiadengine.co.za checkout",
    paid_at: new Date().toISOString(),
  };
}

/**
 * Posts a payload to a GHL webhook. Never throws: a webhook being down must not
 * break payment handling or leave the customer staring at an error.
 */
export async function postToGhl(
  url: string,
  payload: Record<string, unknown>,
  label: string,
): Promise<boolean> {
  if (!url) {
    console.error(`[ghl:${label}] no webhook configured, payload not delivered`, payload);
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[ghl:${label}] webhook returned ${response.status}`, payload);
      return false;
    }

    console.log(`[ghl:${label}] delivered`, { email: payload.email });
    return true;
  } catch (error) {
    console.error(`[ghl:${label}] webhook failed`, error, payload);
    return false;
  }
}
