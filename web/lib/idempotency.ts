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
 *   - Otherwise a list held in the server's own memory. That still catches the
 *     common case of the same notification arriving twice in quick succession,
 *     but it is forgotten on restart, so set the environment variables in
 *     production.
 */

const FIVE_YEARS_SECONDS = 60 * 60 * 24 * 365 * 5;

function store(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function hasDurableStore(): boolean {
  return store() !== null;
}

/** In-memory fallback. Kept small and self-pruning so it cannot grow forever. */
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

/** Writes a note without caring whether one was already there. */
export async function remember(key: string, ttlSeconds: number): Promise<void> {
  const redis = store();
  if (!redis) {
    claimLocally(key, ttlSeconds);
    return;
  }

  try {
    const response = await fetch(redis.url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${redis.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(["SET", key, "1", "EX", String(ttlSeconds)]),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`store responded ${response.status}`);
  } catch (error) {
    console.error("[idempotency] could not write note, using in-memory fallback", error);
    claimLocally(key, ttlSeconds);
  }
}

/** Reads a note back. False also means "we could not check", never "definitely not". */
export async function wasRemembered(key: string): Promise<boolean> {
  const redis = store();
  if (!redis) {
    const expires = local.get(key);
    return expires !== undefined && expires > Date.now();
  }

  try {
    const response = await fetch(redis.url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${redis.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(["EXISTS", key]),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`store responded ${response.status}`);
    const body = (await response.json()) as { result?: unknown };
    return body.result === 1;
  } catch (error) {
    console.error("[idempotency] could not read note", error);
    return false;
  }
}

/**
 * Claims a key. Returns true the first time a key is seen and false every time
 * after that, so the caller can act once and skip the repeats.
 *
 * If the Redis store is configured but unreachable, this falls back to the
 * in-memory list rather than dropping a real payment on the floor.
 */
export async function claimOnce(
  key: string,
  ttlSeconds: number = FIVE_YEARS_SECONDS,
): Promise<boolean> {
  const redis = store();
  if (!redis) return claimLocally(key, ttlSeconds);

  try {
    // SET key 1 NX EX <ttl>: writes only if the key does not already exist.
    const response = await fetch(redis.url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${redis.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(["SET", key, "1", "NX", "EX", String(ttlSeconds)]),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`store responded ${response.status}`);

    const body = (await response.json()) as { result?: unknown };
    // "OK" means we claimed it. null means someone already had it.
    return body.result === "OK";
  } catch (error) {
    console.error("[idempotency] store unreachable, using in-memory fallback", error);
    return claimLocally(key, ttlSeconds);
  }
}
