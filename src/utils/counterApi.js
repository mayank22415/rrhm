/**
 * Global Voice Counter — persists across ALL users/devices via a free counter API.
 * Falls back silently to localStorage if the API is unavailable.
 *
 * Uses counterapi.dev — a free, anonymous, persistent counter service.
 * Namespace: rrmi-manifesto  |  Key: voices-v1
 */

const NAMESPACE = 'rrmi-manifesto-2026';
const KEY = 'voices-v1';
const BASE = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`;

/**
 * Fetch the current global voice count.
 * Returns null if the API is unavailable.
 */
export async function fetchGlobalCount() {
  try {
    const res = await fetch(`${BASE}`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const json = await res.json();
    // counterapi.dev returns { count: <number> }
    return typeof json.count === 'number' ? json.count : null;
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
    return typeof json.count === 'number' ? json.count : null;
  } catch {
    return null;
  }
}
