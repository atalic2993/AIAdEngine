"use client";

import { useEffect, useRef, useState } from "react";
import { trackConversion } from "@/lib/events";

/**
 * Reports the sale, but only once it is real.
 *
 * Plain English: this page used to report a purchase to Facebook, Google and
 * TikTok purely because of what was in the web address. Anyone who opened or
 * shared that link added a sale that never happened. Now the page asks our own
 * server whether PayFast has actually confirmed the payment, and only reports
 * it when the answer is yes.
 *
 * PayFast sends the customer's browser back at the same moment it tells our
 * server about the payment, and those two can arrive in either order, so the
 * page waits a little rather than giving up on the first try.
 */

const POLL_INTERVAL_MS = 2500;
const POLL_ATTEMPTS = 12; // roughly thirty seconds

type Status = "checking" | "confirmed" | "unconfirmed";

export function PurchaseTracking({
  value,
  contentName,
  eventId,
  confirmed,
  /**
   * False when no shared store is configured, in which case there is nothing to
   * check against and the old behaviour is kept so tracking is not silently off.
   */
  verifiable,
}: {
  value: number;
  contentName: string;
  eventId?: string;
  confirmed: boolean;
  verifiable: boolean;
}) {
  const fired = useRef(false);
  const [status, setStatus] = useState<Status>(
    !verifiable || confirmed ? "confirmed" : "checking",
  );

  useEffect(() => {
    function report() {
      if (fired.current) return;
      fired.current = true;
      trackConversion("Purchase", { value, contentName, eventId });
    }

    if (!verifiable || confirmed) {
      report();
      return;
    }

    if (!eventId) {
      setStatus("unconfirmed");
      return;
    }

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;

    async function check() {
      attempts += 1;
      try {
        const response = await fetch(
          `/api/payfast/confirmed?ref=${encodeURIComponent(eventId!)}`,
          { cache: "no-store" },
        );
        const body = (await response.json()) as { confirmed?: boolean };
        if (stopped) return;
        if (body.confirmed) {
          setStatus("confirmed");
          report();
          return;
        }
      } catch {
        // A failed check is just an unfinished one. Try again.
      }
      if (stopped) return;
      if (attempts >= POLL_ATTEMPTS) {
        setStatus("unconfirmed");
        return;
      }
      timer = setTimeout(check, POLL_INTERVAL_MS);
    }

    check();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [value, contentName, eventId, confirmed, verifiable]);

  if (status === "confirmed") {
    return (
      <p className="mt-6 text-sm text-muted-2" aria-live="polite">
        A confirmation email is on its way to the address you used at checkout.
      </p>
    );
  }

  if (status === "checking") {
    return (
      <p className="mt-6 flex items-center justify-center gap-2.5 text-sm text-muted-2" aria-live="polite">
        <span
          aria-hidden="true"
          className="size-3.5 animate-spin rounded-full border-2 border-muted-2/40 border-t-brand-2"
        />
        Confirming your payment with PayFast…
      </p>
    );
  }

  return (
    <p className="mt-6 text-sm text-muted-2" aria-live="polite">
      Your payment is still being confirmed by PayFast. Your confirmation email is the receipt, and
      nothing further is needed from you.
    </p>
  );
}
