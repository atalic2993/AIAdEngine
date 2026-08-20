"use client";

type EventPayload = {
  value?: number;
  currency?: string;
  contentName?: string;
  eventId?: string;
};

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;
type Ttq = { track: (name: string, data?: unknown) => void };

declare global {
  interface Window {
    fbq?: Fbq;
    gtag?: Gtag;
    ttq?: Ttq;
  }
}

/**
 * Fires one conversion event to every pixel that is switched on.
 * eventId lets Meta match this browser event with the server event we send
 * from the PayFast notification, so one sale is never counted twice.
 */
export function trackConversion(
  name: "InitiateCheckout" | "Purchase" | "Lead",
  payload: EventPayload = {},
) {
  const { value, currency = "ZAR", contentName, eventId } = payload;

  if (typeof window === "undefined") return;

  window.fbq?.(
    "track",
    name,
    { value, currency, content_name: contentName },
    eventId ? { eventID: eventId } : undefined,
  );

  window.gtag?.("event", name === "Purchase" ? "purchase" : name.toLowerCase(), {
    value,
    currency,
    items: contentName ? [{ item_name: contentName }] : undefined,
    transaction_id: eventId,
  });

  window.ttq?.track(name === "Purchase" ? "CompletePayment" : name, {
    value,
    currency,
    content_name: contentName,
  });
}
