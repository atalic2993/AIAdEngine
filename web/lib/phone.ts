/**
 * South African mobile numbers.
 *
 * Plain English: only the plain ten-digit local format is accepted, like
 * 0821234567. No spaces, no dashes, no +27. That is the shape PayFast wants,
 * so what the customer types is exactly what gets sent.
 *
 * SA mobile numbers are ten digits and start 06, 07 or 08. Landlines (011, 021,
 * 031 and so on) are rejected: PayFast bills a cell number and the onboarding
 * messages are sent by SMS.
 */

export type SaMobile = {
  /** 0821234567 — the format PayFast accepts. */
  local: string;
  /** +27821234567 — the international format GoHighLevel uses for SMS. */
  e164: string;
};

/**
 * Ten digits, starting 06, 07 or 08. Written as a regular expression literal so
 * the escapes cannot be mangled, then handed to the input's pattern attribute
 * as text and reused for the check on the server.
 */
const SA_MOBILE_RE = /^0[6-8][0-9]{8}$/;

/** The pattern attribute is anchored by the browser, so the anchors come off. */
export const SA_MOBILE_PATTERN = SA_MOBILE_RE.source.replace(/^\^|\$$/g, "");

/** How long the number is, used to stop typing past ten digits. */
export const SA_MOBILE_LENGTH = 10;

export function parseSaMobile(input: string): SaMobile | null {
  const local = String(input ?? "").trim();

  if (!SA_MOBILE_RE.test(local)) return null;

  return { local, e164: `+27${local.slice(1)}` };
}
