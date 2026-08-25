import { NextResponse } from "next/server";
import { hasDurableStore, wasRemembered } from "@/lib/idempotency";
import { confirmationKey } from "@/lib/payfast";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * "Has this payment actually been confirmed?"
 *
 * Plain English: the welcome page asks this before it reports a sale. PayFast
 * sends the customer's browser back to us and separately tells our server the
 * payment went through, and those two arrive in whichever order they like. So
 * the page waits here for a moment rather than believing its own address bar.
 *
 * It answers yes or no and nothing else. No amounts, no names, no plan.
 */

/** The shape reference(): AAE-SCALE-MF3K9QZX. Anything else is not ours. */
const REFERENCE_PATTERN = /^AAE-[A-Z]+-[A-Z0-9]{4,32}$/;

/**
 * A light cap so this cannot be hammered.
 *
 * A real customer asks about twelve times over half a minute, so this sits far
 * above normal use and only bites on abuse. It is counted per server instance
 * rather than globally, which is enough to stop one caller burning through the
 * payment store's request allowance, and it costs no store lookup of its own.
 */
const RATE_LIMIT_PER_MINUTE = 60;
const seen = new Map<string, { count: number; resets: number }>();

function withinRateLimit(caller: string): boolean {
  const now = Date.now();
  const entry = seen.get(caller);

  if (!entry || entry.resets <= now) {
    if (seen.size > 10_000) {
      for (const [key, value] of seen) if (value.resets <= now) seen.delete(key);
      if (seen.size > 10_000) seen.clear();
    }
    seen.set(caller, { count: 1, resets: now + 60_000 });
    return true;
  }

  entry.count += 1;
  return entry.count <= RATE_LIMIT_PER_MINUTE;
}

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("ref") ?? "";
  const caller =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const answer = (confirmed: boolean, extra: Record<string, unknown> = {}) =>
    NextResponse.json(
      { confirmed, ...extra },
      { headers: { "cache-control": "no-store" } },
    );

  if (!withinRateLimit(caller)) {
    return NextResponse.json(
      { confirmed: false, checkable: false },
      { status: 429, headers: { "cache-control": "no-store", "retry-after": "60" } },
    );
  }

  // Rejecting anything that is not shaped like one of our references keeps this
  // from being used to poke around the store for other keys.
  if (!REFERENCE_PATTERN.test(reference)) return answer(false);

  // With no shared store configured there is nothing to check against, and the
  // caller is told so rather than being given a false negative forever.
  if (!hasDurableStore()) return answer(false, { checkable: false });

  return answer(await wasRemembered(confirmationKey(reference)), { checkable: true });
}
