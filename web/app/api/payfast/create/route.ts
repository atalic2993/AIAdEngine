import { NextResponse } from "next/server";
import { PLANS, isPlanId } from "@/lib/plans";
import { compactFields, money, payfastConfig, signatureFor, type PayfastFields } from "@/lib/payfast";
import { parseSaMobile } from "@/lib/phone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function siteUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  return new URL(request.url).origin;
}

function reference(planId: string): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AAE-${planId.toUpperCase()}-${stamp}${salt}`;
}

export async function POST(request: Request) {
  const form = await request.formData();
  const planId = String(form.get("plan") ?? "");

  if (!isPlanId(planId)) {
    return NextResponse.redirect(new URL("/#pricing", siteUrl(request)), 303);
  }

  const plan = PLANS[planId];
  const config = payfastConfig();

  if (!config.merchantId || !config.merchantKey) {
    return new NextResponse(
      "Payments are not configured yet. Add PAYFAST_MERCHANT_ID and PAYFAST_MERCHANT_KEY.",
      { status: 503 },
    );
  }

  const site = siteUrl(request);
  const paymentId = reference(planId);

  const firstName = String(form.get("name_first") ?? "").trim().slice(0, 100);
  const lastName = String(form.get("name_last") ?? "").trim().slice(0, 100);
  const email = String(form.get("email_address") ?? "").trim().slice(0, 100);
  // Rejected outright if it is not a South African mobile number, and stored in
  // the ten-digit form PayFast expects.
  const mobile = parseSaMobile(String(form.get("cell_number") ?? ""));
  const cell = mobile?.local ?? "";
  const business = String(form.get("business_name") ?? "").trim().slice(0, 200);
  const address = String(form.get("business_address") ?? "").trim().slice(0, 250);
  // These two share one custom field, so each half is capped to stay inside
  // PayFast's 255-character limit, and the pipe that separates them is stripped.
  const niche = String(form.get("business_niche") ?? "").replace(/\|/g, " ").trim().slice(0, 100);
  const website = String(form.get("website") ?? "").replace(/\|/g, "").trim().slice(0, 150);
  const consent = String(form.get("consent") ?? "");

  // Everything except the website is required.
  if (
    !firstName ||
    !lastName ||
    !email ||
    !cell ||
    !business ||
    !address ||
    !niche ||
    !consent
  ) {
    return NextResponse.redirect(new URL(`/checkout/${planId}?incomplete=1`, site), 303);
  }

  const draft: PayfastFields = {
    merchant_id: config.merchantId,
    merchant_key: config.merchantKey,
    return_url: `${site}/welcome?plan=${planId}&ref=${paymentId}`,
    cancel_url: `${site}/checkout/${planId}?cancelled=1`,
    notify_url: `${site}/api/payfast/itn`,
    name_first: firstName,
    name_last: lastName,
    email_address: email,
    m_payment_id: paymentId,
    amount: money(plan.price),
    item_name: plan.itemName,
    item_description: plan.itemDescription,
    // PayFast only echoes the name and email fields back on its notification,
    // so everything else the customer typed rides along in the custom fields.
    // These are what reach GoHighLevel once the payment is confirmed.
    custom_str1: planId,
    custom_str2: business,
    custom_str3: cell,
    custom_str4: address,
    // Only five custom fields exist, so the last two share one, split on a pipe.
    custom_str5: `${niche}|${website}`,
    email_confirmation: "1",
    confirmation_address: email,
    // Recurring monthly subscription, not a once-off payment.
    subscription_type: "1",
    recurring_amount: money(plan.price),
    frequency: "3", // monthly
    cycles: "0", // until cancelled
  };

  draft.cell_number = cell;

  const fields = compactFields(draft);
  const signature = signatureFor(fields, config.passphrase);

  const inputs = Object.entries(fields)
    .map(
      ([name, value]) =>
        `<input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(value)}">`,
    )
    .join("\n    ");

  const html = `<!doctype html>
<html lang="en-ZA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Taking you to PayFast…</title>
  <style>
    :root { color-scheme: dark; }
    body { margin:0; min-height:100dvh; display:grid; place-items:center; background:#0b1220;
      color:#f2f5fa; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; text-align:center; padding:24px; }
    .dot { width:10px; height:10px; border-radius:99px; background:#1d8cff; display:inline-block; }
    button { margin-top:20px; min-height:48px; padding:0 22px; border:0; border-radius:12px;
      background:#1d8cff; color:#0b1220; font-size:15px; font-weight:600; cursor:pointer; }
    p { color:#adbace; }
  </style>
</head>
<body>
  <form id="payfast" action="${config.processUrl}" method="post">
    ${inputs}
    <input type="hidden" name="signature" value="${signature}">
    <p><span class="dot"></span> Taking you to PayFast to set up your ${escapeHtml(plan.name)} subscription…</p>
    <button type="submit">Continue to PayFast</button>
  </form>
  <script>document.getElementById("payfast").submit();</script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
