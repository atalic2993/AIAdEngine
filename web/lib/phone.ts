import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

/**
 * International mobile numbers, restricted to the markets this business sells
 * into.
 *
 * Plain English: the customer picks their country from a dropdown, then types
 * their number the way they normally would at home (no +27, no dashes
 * required). We validate that against the real numbering rules for that
 * country using libphonenumber-js instead of a hand-rolled regex, since every
 * country has a different length and prefix pattern.
 */

export type SupportedCountry = {
  code: CountryCode;
  name: string;
  /** Shown next to the flag in the dropdown, e.g. "+27". */
  dialCode: string;
  flag: string;
  /** A realistic example number, local format, used as the input placeholder. */
  example: string;
};

export const SUPPORTED_COUNTRIES: SupportedCountry[] = [
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦", example: "821234567" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸", example: "2015550123" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧", example: "7911123456" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺", example: "412345678" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦", example: "4165551234" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪", example: "851234567" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿", example: "211234567" },
];

export const DEFAULT_COUNTRY: CountryCode = "ZA";

export function isSupportedCountry(code: string): code is CountryCode {
  return SUPPORTED_COUNTRIES.some((country) => country.code === code);
}

export function countryByCode(code: string): SupportedCountry | undefined {
  return SUPPORTED_COUNTRIES.find((country) => country.code === code);
}

export type ParsedPhone = {
  country: CountryCode;
  /** Local dialling format, digits only, e.g. "0821234567" or "2015550123". */
  national: string;
  /** E.164, e.g. "+27821234567" — what GoHighLevel uses for SMS. */
  e164: string;
};

/**
 * Validates a number the customer typed against the country they selected.
 * Rejects numbers that are the wrong shape for that country, and rejects a
 * pasted full international number that carries a different country's dialling
 * code than the one selected, rather than silently going with whichever the
 * library guesses.
 */
export function parsePhoneForCountry(
  countryCode: string,
  nationalInput: string,
): ParsedPhone | null {
  if (!isSupportedCountry(countryCode)) return null;

  const trimmed = String(nationalInput ?? "").trim();
  if (!trimmed) return null;

  const parsed = parsePhoneNumberFromString(trimmed, countryCode);
  if (!parsed || !parsed.isValid() || parsed.country !== countryCode) return null;

  return {
    country: countryCode,
    national: parsed.formatNational().replace(/[^\d]/g, ""),
    e164: parsed.number,
  };
}

/** Re-derives country/national from a stored E.164 number, e.g. read back off PayFast. */
export function parsePhoneE164(value: string): ParsedPhone | null {
  const parsed = parsePhoneNumberFromString(String(value ?? "").trim());
  if (!parsed || !parsed.isValid() || !parsed.country) return null;

  return {
    country: parsed.country,
    national: parsed.formatNational().replace(/[^\d]/g, ""),
    e164: parsed.number,
  };
}
