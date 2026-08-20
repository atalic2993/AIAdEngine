/**
 * Business identity shown on the site. PayFast reviews a merchant's website
 * for exactly these details, so anything empty here is a gap in the review.
 *
 * Fill the blanks once and every place on the site updates.
 */
type Business = {
  tradingName: string;
  registeredName: string;
  registrationNumber: string;
  vatNumber: string;
  address: string;
  email: string;
  phone: string;
  country: string;
};

export const BUSINESS: Business = {
  tradingName: "AI Ad Engine",
  /** Registered company name as it appears at CIPC. TODO: confirm. */
  registeredName: "",
  /** CIPC registration number, format 2026/123456/07. TODO: confirm. */
  registrationNumber: "",
  /** Leave empty if not VAT registered. */
  vatNumber: "",
  /** Physical business address, the one PayFast has on file. TODO: confirm. */
  address: "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@aiadengine.co.za",
  /** Support phone or WhatsApp number. TODO: confirm. */
  phone: "",
  country: "South Africa",
};

/** What the customer gets after paying, and when. Stated on the site as a promise. */
export const DELIVERY_PROMISE =
  "Your AI Ad Engine login details are emailed to you within one business day of payment.";

export const hasCompanyDetails = () =>
  Boolean(BUSINESS.registeredName && BUSINESS.registrationNumber);
