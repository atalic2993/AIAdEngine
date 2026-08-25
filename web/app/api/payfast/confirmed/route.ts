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

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("ref") ?? "";

  const answer = (confirmed: boolean, extra: Record<string, unknown> = {}) =>
    NextResponse.json(
      { confirmed, ...extra },
      { headers: { "cache-control": "no-store" } },
    );

  // Rejecting anything that is not shaped like one of our references keeps this
  // from being used to poke around the store for other keys.
  if (!REFERENCE_PATTERN.test(reference)) return answer(false);

  // With no shared store configured there is nothing to check against, and the
  // caller is told so rather than being given a false negative forever.
  if (!hasDurableStore()) return answer(false, { checkable: false });

  return answer(await wasRemembered(confirmationKey(reference)), { checkable: true });
}
