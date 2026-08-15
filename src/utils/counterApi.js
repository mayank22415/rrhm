/**
 * Global Voice Counter — persists across ALL users/devices via a free counter API.
 * Falls back silently to localStorage if the API is unavailable.
 *
 * Uses counterapi.dev v2 — a free, anonymous, persistent counter service.
 * Workspace: test  |  Key: rrmi-v1
 *
 * SEED_OFFSET: The counter started fresh at 0. We add 1857 to reflect the
 * historical voice count before the v2 migration.
 */

const WORKSPACE = 'test';
const KEY = 'rrmi-v1';
const BASE = `https://api.counterapi.dev/v2/${WORKSPACE}/${KEY}`;

/** v2 returns { data: { up_count, down_count, ... } }. Net count = up_count - down_count. */
const SEED_OFFSET = 1857;

function parseV2Count(json) {
  const d = json?.data;
  if (!d) return null;
  const up = typeof d.up_count === 'number' ? d.up_count : 0;
  const down = typeof d.down_count === 'number' ? d.down_count : 0;
  return SEED_OFFSET + up - down;
}

/**
 * Fetch the current global voice count.
 * Returns null if the API is unavailable.
 */
export async function fetchGlobalCount() {
  try {
    const res = await fetch(BASE, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const json = await res.json();
    return parseV2Count(json);
  } catch {
    return null;
  }
}

/**
 * Increment the global counter by 1 and return the new count.
 * Returns null if the API is unavailable.
 */
export async function incrementGlobalCount() {
  try {
    const res = await fetch(`${BASE}/up`, {
      method: 'GET',
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return parseV2Count(json);
  } catch {
    return null;
  }
}
