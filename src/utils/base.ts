/**
 * Shared base URL utility.
 * Strips trailing slash from Astro's BASE_URL for consistent path concatenation.
 */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
