"use client";

import Link from "next/link";
import { useState } from "react";
import { trackConversion } from "@/lib/events";
import type { Plan } from "@/lib/plans";

const field =
  "min-h-[48px] w-full rounded-xl border border-line bg-navy/45 px-4 text-[16px] text-ink placeholder:text-muted-2 transition-colors focus:border-brand/60";

export function CheckoutForm({ plan }: { plan: Plan }) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      method="POST"
      action="/api/payfast/create"
      onSubmit={() => {
        setSubmitting(true);
        trackConversion("InitiateCheckout", {
          value: plan.price,
          contentName: plan.itemName,
        });
      }}
      className="space-y-5"
    >
      <input type="hidden" name="plan" value={plan.id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name_first" className="mb-2 block text-sm text-muted">
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
          <label htmlFor="name_last" className="mb-2 block text-sm text-muted">
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

      <div>
        <label htmlFor="email_address" className="mb-2 block text-sm text-muted">
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
        <p className="mt-2 text-xs text-muted-2">
          Your login and receipts go here, so use one you actually check.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cell_number" className="mb-2 block text-sm text-muted">
            Mobile number <span className="text-muted-2">(optional)</span>
          </label>
          <input
            id="cell_number"
            name="cell_number"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            spellCheck={false}
            placeholder="082 000 0000…"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="business_name" className="mb-2 block text-sm text-muted">
            Business name <span className="text-muted-2">(optional)</span>
          </label>
          <input
            id="business_name"
            name="business_name"
            type="text"
            autoComplete="organization"
            placeholder="Your business…"
            className={field}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-navy/45 p-4 text-sm leading-relaxed text-muted has-checked:border-brand/50 has-checked:bg-brand-soft">
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
        className="inline-flex min-h-[54px] w-full touch-manipulation items-center justify-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-semibold text-navy shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_14px_36px_-16px_rgba(11,132,246,0.9)] transition-colors hover:bg-[#2f97ff] active:translate-y-px"
      >
        {submitting ? (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy"
          />
        ) : null}
        Continue to PayFast
      </button>

      <p aria-live="polite" className="sr-only">
        {submitting ? "Taking you to PayFast…" : ""}
      </p>

      <p className="text-center text-xs text-muted-2">
        Card details are entered on PayFast, never on this site.
      </p>
    </form>
  );
}
