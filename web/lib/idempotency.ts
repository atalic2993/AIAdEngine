/**
 * "Have we already handled this?" memory.
 *
 * Plain English: PayFast can send us the same payment notification more than
 * once, and it sends a fresh one every month when a subscription renews. Both
 * would otherwise create the customer in GoHighLevel again and re-run their
 * welcome workflow. This keeps a small note of what we have already acted on so
 * each thing happens exactly once.
 *
 * Where the note is kept:
 *   - A Redis store (Vercel KV or Upstash) when its two environment variables
 *     are present. This is the real one: it survives restarts and is shared by
 *     every server instance.
 *   - Only when no store is configured at all, a list held in this server's own
 *     memory, so local development still works.
 *
 * If a store IS configured but cannot be reached, these functions throw rather
 * than quietly falling back. Guessing would mean classifying a renewal as a new
 * sale and onboarding that customer all over again, which is the exact problem
 * this file exists to prevent. The caller is expected to fail the request so
 * PayFast retries it later.
 */

const FIVE_YEARS_SECONDS = 60 * 60 * 24 * 365 * 5;

/** Thrown when a configured store is unreachable, so the caller can retry. */
export class StoreUnavailableError extends Error {
  constructor(cause: unknown) {
    super(`payment memory unavailable: ${cause instanceof Error ? cause.message : cause}`);
    this.name = "StoreUnavailableError";
  }
}

function store(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function hasDurableStore(): boolean {
  return store() !== null;
}

async function command(parts: string[]): Promise<unknown> {
  const redis = store();
  if (!redis) throw new Error("no store configured");

  const response = await fetch(redis.url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${redis.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(parts),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`store responded ${response.status}`);
  return ((await response.json()) as { result?: unknown }).result;
}

/** In-memory stand-in, used only when no store is configured. */
const local = new Map<string, number>();
const LOCAL_LIMIT = 5000;

function claimLocally(key: string, ttlSeconds: number): boolean {
  const now = Date.now();

  if (local.size > LOCAL_LIMIT) {
    for (const [entry, expires] of local) {
      if (expires <= now) local.delete(entry);
    }
    if (local.size > LOCAL_LIMIT) local.clear();
  }

  const existing = local.get(key);
  if (existing !== undefined && existing > now) return false;

  local.set(key, now + ttlSeconds * 1000);
  return true;
}

/**
 * Claims a key. Returns true the first time a key is seen and false every time
 * after that, so the caller can act once and skip the repeats.
 *
 * Throws StoreUnavailableError if a store is configured but unreachable.
 */
export async function claimOnce(
  key: string,
  ttlSeconds: number = FIVE_YEARS_SECONDS,
): Promise<boolean> {
  if (!hasDurableStore()) return claimLocally(key, ttlSeconds);

  try {
    // SET key 1 NX EX <ttl>: writes only if the key does not already exist.
    return (await command(["SET", key, "1", "NX", "EX", String(ttlSeconds)])) === "OK";
  } catch (error) {
    throw new StoreUnavailableError(error);
  }
}

/**
 * Gives a claim back, so work that failed part way through can be retried.
 * Never throws: this runs on the failure path and must not mask the real error.
 */
export async function forget(key: string): Promise<void> {
  if (!hasDurableStore()) {
    local.delete(key);
    return;
  }

  try {
    await command(["DEL", key]);
  } catch (error) {
    console.error("[idempotency] could not release claim", { key, error });
  }
}

/** Writes a note without caring whether one was already there. */
export async function remember(key: string, ttlSeconds: number): Promise<void> {
  if (!hasDurableStore()) {
    claimLocally(key, ttlSeconds);
    return;
  }

  try {
    await command(["SET", key, "1", "EX", String(ttlSeconds)]);
  } catch (error) {
    throw new StoreUnavailableError(error);
  }
}

/**
 * Reads a note back. Deliberately lenient: this one is called while a customer
 * is watching a page, so a store hiccup answers "not yet" instead of erroring.
 */
export async function wasRemembered(key: string): Promise<boolean> {
  if (!hasDurableStore()) {
    const expires = local.get(key);
    return expires !== undefined && expires > Date.now();
  }

  try {
    return (await command(["EXISTS", key])) === 1;
  } catch (error) {
    console.error("[idempotency] could not read note", error);
    return false;
  }
}
