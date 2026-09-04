"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackConversion } from "@/lib/events";
import type { Plan } from "@/lib/plans";
import { DEFAULT_COUNTRY, SUPPORTED_COUNTRIES, countryByCode, parsePhoneForCountry } from "@/lib/phone";

const field =
  "min-h-[44px] w-full rounded-xl border border-line bg-navy/45 px-3.5 text-[16px] text-ink placeholder:text-muted-2 transition-colors focus:border-brand/60";

const labelClass = "mb-1.5 block text-[13px] text-muted";

export function CheckoutForm({ plan }: { plan: Plan }) {
  const [submitting, setSubmitting] = useState(false);
  /**
   * A second click can land before React has re-rendered the disabled button,
   * so the guard that actually stops a double submission is this ref, not the
   * state. Two submissions would mean two PayFast references for one customer.
   */
  const sent = useRef(false);
  const [stalled, setStalled] = useState(false);
  const [country, setCountry] = useState<string>(DEFAULT_COUNTRY);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const phoneValid = phoneValue.trim() === "" || parsePhoneForCountry(country, phoneValue) !== null;
  const selectedCountry = countryByCode(country);

  useEffect(() => {
    // Coming back with the browser's Back button can restore this page from the
    // cache exactly as it was left: mid-submit, with the button disabled. Reset
    // it so the form is usable again instead of dead.
    function revive(event: PageTransitionEvent) {
      if (!event.persisted) return;
      sent.current = false;
      setSubmitting(false);
      setStalled(false);
    }
    window.addEventListener("pageshow", revive);
    return () => window.removeEventListener("pageshow", revive);
  }, []);

  useEffect(() => {
    if (!submitting) return;
    // Submitting takes the browser off this page entirely, so if we are still
    // sitting here fifteen seconds later the request did not get through. Hand
    // the form back rather than leaving somebody staring at a dead button.
    const timer = setTimeout(() => {
      sent.current = false;
      setSubmitting(false);
      setStalled(true);
    }, 15_000);
    return () => clearTimeout(timer);
  }, [submitting]);

  return (
    <form
      method="POST"
      action="/api/payfast/create"
      onSubmit={(event) => {
        if (sent.current) {
          event.preventDefault();
          return;
        }
        if (!parsePhoneForCountry(country, phoneValue)) {
          event.preventDefault();
          setPhoneTouched(true);
          return;
        }
        sent.current = true;
        setStalled(false);
        setSubmitting(true);
        trackConversion("InitiateCheckout", {
          value: plan.price,
          contentName: plan.itemName,
        });
      }}
      className="space-y-3.5"
    >
      <input type="hidden" name="plan" value={plan.id} />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name_first" className={labelClass}>
            First name
          </label>
          <input
            id="name_first"
            name="name_first"
            type="text"
            required
            autoComplete="given-name"
            spellCheck={false}
            placeholder="Thabo…"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="name_last" className={labelClass}>
            Last name
          </label>
          <input
            id="name_last"
            name="name_last"
            type="text"
            required
            autoComplete="family-name"
            spellCheck={false}
            placeholder="Mokoena…"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="email_address" className={labelClass}>
            Email address
          </label>
          <input
            id="email_address"
            name="email_address"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            placeholder="you@yourbusiness.co.za…"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="cell_number_national" className={labelClass}>
            Mobile number
          </label>
          <input type="hidden" name="cell_country" value={country} />
          <div className="flex gap-2">
            <select
              aria-label="Country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className={`${field} w-[92px] shrink-0 pr-1`}
            >
              {SUPPORTED_COUNTRIES.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.flag} {option.dialCode}
                </option>
              ))}
            </select>
            <input
              id="cell_number_national"
              name="cell_number_national"
              type="tel"
              required
              autoComplete="tel-national"
              inputMode="tel"
              spellCheck={false}
              value={phoneValue}
              onChange={(event) => setPhoneValue(event.target.value)}
              onBlur={() => setPhoneTouched(true)}
              aria-invalid={phoneTouched && !phoneValid}
              title={`Enter a valid ${selectedCountry?.name ?? ""} mobile number.`}
              placeholder={selectedCountry?.example}
              className={`${field} flex-1`}
            />
          </div>
          <p
            aria-live="polite"
            className={phoneTouched && !phoneValid ? "mt-1 text-[12px] text-warn" : "sr-only"}
          >
            {phoneTouched && !phoneValid
              ? `Enter a valid ${selectedCountry?.name ?? "mobile"} number, e.g. ${selectedCountry?.example}.`
              : ""}
          </p>
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="business_name" className={labelClass}>
            Business name
          </label>
          <input
            id="business_name"
            name="business_name"
            type="text"
            required
            autoComplete="organization"
            placeholder="Your business…"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="business_niche" className={labelClass}>
            Business niche
          </label>
          <input
            id="business_niche"
            name="business_niche"
            type="text"
            required
            list="niche-options"
            placeholder="Plumbing, dentistry, gym…"
            className={field}
          />
          <datalist id="niche-options">
            <option value="Home services" />
            <option value="Construction and trades" />
            <option value="Health and medical" />
            <option value="Beauty and wellness" />
            <option value="Fitness" />
            <option value="Property and real estate" />
            <option value="Motor and automotive" />
            <option value="Retail and e-commerce" />
            <option value="Hospitality and food" />
            <option value="Professional services" />
            <option value="Education and training" />
            <option value="Financial services" />
          </datalist>
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="business_address" className={labelClass}>
            Business address
          </label>
          <input
            id="business_address"
            name="business_address"
            type="text"
            required
            autoComplete="street-address"
            placeholder="Street, suburb, city…"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>
            Website <span className="text-muted-2">(optional)</span>
          </label>
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder="yourbusiness.co.za…"
            className={field}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-navy/45 p-3.5 text-[13px] leading-relaxed text-muted has-checked:border-brand/50 has-checked:bg-brand-soft">
        <input
          type="checkbox"
          name="consent"
          required
          value="yes"
          className="mt-0.5 size-5 shrink-0 accent-[#0b84f6]"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms" target="_blank" className="text-brand-2 underline underline-offset-4">
            Terms &amp; Conditions
          </Link>
          ,{" "}
          <Link
            href="/refund-cancellation-policy"
            target="_blank"
            className="text-brand-2 underline underline-offset-4"
          >
            Refund &amp; Cancellation Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" target="_blank" className="text-brand-2 underline underline-offset-4">
            Privacy Policy
          </Link>
          , and understand that my subscription renews monthly until cancelled.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="inline-flex min-h-[50px] w-full touch-manipulation items-center justify-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-semibold text-navy shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_14px_36px_-16px_rgba(11,132,246,0.9)] transition-colors hover:bg-[#2f97ff] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand disabled:active:translate-y-0"
      >
        {submitting ? (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy"
          />
        ) : null}
        {submitting ? "Taking you to PayFast…" : "Continue to PayFast"}
      </button>

      <p
        aria-live="polite"
        className={stalled ? "text-center text-[13px] text-warn" : "sr-only"}
      >
        {stalled
          ? "That did not go through. Check your connection and try again."
          : submitting
            ? "Taking you to PayFast…"
            : ""}
      </p>

      <p className="text-center text-[11px] text-muted-2">
        Card details are entered on PayFast, never on this site. Every field is used to build your
        advertising account.
      </p>
    </form>
  );
}
