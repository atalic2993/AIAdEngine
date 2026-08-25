import crypto from "node:crypto";

/**
 * PayFast recurring subscription helper.
 *
 * Plain English: PayFast wants the payment details posted to them as a form,
 * plus a "signature" — a fingerprint of those details made with our secret
 * passphrase — so they know the amounts were not tampered with in the browser.
 */

export const PAYFAST_FIELD_ORDER = [
  "merchant_id",
  "merchant_key",
  "return_url",
  "cancel_url",
  "notify_url",
  "name_first",
  "name_last",
  "email_address",
  "cell_number",
  "m_payment_id",
  "amount",
  "item_name",
  "item_description",
  "custom_int1",
  "custom_int2",
  "custom_int3",
  "custom_int4",
  "custom_int5",
  "custom_str1",
  "custom_str2",
  "custom_str3",
  "custom_str4",
  "custom_str5",
  "email_confirmation",
  "confirmation_address",
  "payment_method",
  "subscription_type",
  "billing_date",
  "recurring_amount",
  "frequency",
  "cycles",
  "subscription_notify_email",
  "subscription_notify_webhook",
  "subscription_notify_buyer",
] as const;

export type PayfastFields = Record<string, string>;

const SANDBOX = {
  process: "https://sandbox.payfast.co.za/eng/process",
  validate: "https://sandbox.payfast.co.za/eng/query/validate",
  merchantId: "10000100",
  merchantKey: "46f0cd694581a",
  // PayFast's published sandbox test account uses this passphrase.
  passphrase: "jt7NOE43FZPn",
};

const LIVE = {
  process: "https://www.payfast.co.za/eng/process",
  validate: "https://www.payfast.co.za/eng/query/validate",
};

export function isSandbox(): boolean {
  return process.env.PAYFAST_SANDBOX === "true";
}

export function payfastConfig() {
  const sandbox = isSandbox();
  return {
    sandbox,
    processUrl: sandbox ? SANDBOX.process : LIVE.process,
    validateUrl: sandbox ? SANDBOX.validate : LIVE.validate,
    merchantId: process.env.PAYFAST_MERCHANT_ID || (sandbox ? SANDBOX.merchantId : ""),
    merchantKey: process.env.PAYFAST_MERCHANT_KEY || (sandbox ? SANDBOX.merchantKey : ""),
    passphrase: process.env.PAYFAST_PASSPHRASE || (sandbox ? SANDBOX.passphrase : ""),
  };
}

/** PayFast encodes exactly like PHP urlencode(): spaces become "+", hex uppercase. */
export function payfastEncode(value: string): string {
  return encodeURIComponent(value.trim())
    .replace(/%20/g, "+")
    .replace(/%[0-9a-f]{2}/g, (match) => match.toUpperCase());
}

/**
 * Build the signature over the fields exactly as they are posted, in the same
 * order. Empty fields must be left out of both the form and the signature or
 * PayFast calculates a different fingerprint and rejects the payment.
 */
export function signatureFor(fields: PayfastFields, passphrase: string): string {
  const parts = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${payfastEncode(value)}`);
  if (passphrase) parts.push(`passphrase=${payfastEncode(passphrase)}`);
  return crypto.createHash("md5").update(parts.join("&")).digest("hex");
}

/**
 * Drop empty values and put the rest in PayFast's documented order. PayFast
 * rebuilds the fingerprint in that order, so the form must post it that way.
 */
export function compactFields(fields: PayfastFields): PayfastFields {
  const ordered: PayfastFields = {};
  for (const key of PAYFAST_FIELD_ORDER) {
    const value = fields[key];
    if (value !== undefined && value !== "") ordered[key] = value;
  }
  return ordered;
}

/** Signature check for incoming ITN posts: the order is the order PayFast sent. */
export function signatureForItn(
  entries: Array<[string, string]>,
  passphrase: string,
): string {
  const parts = entries
    .filter(([key]) => key !== "signature")
    .map(([key, value]) => `${key}=${payfastEncode(value)}`);
  if (passphrase) parts.push(`passphrase=${payfastEncode(passphrase)}`);
  return crypto.createHash("md5").update(parts.join("&")).digest("hex");
}

/**
 * The note the ITN writes and the welcome page looks for, so a reference can
 * only be treated as paid once PayFast has actually confirmed it.
 */
export function confirmationKey(reference: string): string {
  return `payfast:confirmed:${reference}`;
}

export function money(amount: number): string {
  return amount.toFixed(2);
}

/**
 * Compares two signatures without leaking, through how long the check takes,
 * how much of a guess was right. Lengths are compared first because
 * timingSafeEqual throws when the two buffers are different sizes.
 */
export function signaturesMatch(expected: string, received: string): boolean {
  const a = Buffer.from(expected ?? "", "utf8");
  const b = Buffer.from(received ?? "", "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
