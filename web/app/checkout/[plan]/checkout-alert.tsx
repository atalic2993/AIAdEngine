"use client";

import { useSearchParams } from "next/navigation";

/**
 * Explains a bounce back from the server.
 *
 * The browser blocks almost every bad submission before it leaves the page, but
 * if one gets through, /api/payfast/create sends the customer back here with
 * ?incomplete=1 and nothing on screen would otherwise say why.
 *
 * Kept apart from the form so only this line waits for the query string. The
 * form itself stays in the statically rendered HTML.
 */
export function CheckoutAlert() {
  const params = useSearchParams();

  if (params.has("cancelled")) {
    return (
      <p
        role="status"
        className="mb-4 rounded-xl border border-line-strong bg-navy-2/70 p-3.5 text-[13px] leading-relaxed text-muted"
      >
        That payment was cancelled, so nothing was charged. Your details are below if you want to
        try again.
      </p>
    );
  }

  if (!params.has("incomplete")) return null;

  return (
    <p
      role="alert"
      className="mb-4 rounded-xl border border-warn/40 bg-warn/10 p-3.5 text-[13px] leading-relaxed text-warn"
    >
      Something in the form was not accepted. Check that your mobile number is ten digits starting
      06, 07 or 08, and that every field is filled in.
    </p>
  );
}
