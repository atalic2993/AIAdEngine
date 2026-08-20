"use client";

import { useEffect, useRef } from "react";
import { trackConversion } from "@/lib/events";

/**
 * Browser-side purchase event. The server event fired from the PayFast
 * notification carries the same event id, so Meta counts one sale, not two.
 */
export function PurchaseTracking({
  value,
  contentName,
  eventId,
}: {
  value: number;
  contentName: string;
  eventId?: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackConversion("Purchase", { value, contentName, eventId });
  }, [value, contentName, eventId]);

  return null;
}
