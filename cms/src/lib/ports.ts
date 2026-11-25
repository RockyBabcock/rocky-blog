/**
 * CMS Port & Dev Server Configuration (Browser-safe)
 *
 * Shared between the CMS Node server and the Vite React client without pulling
 * Node.js built-ins into the browser bundle.
 */

export const DEFAULT_CMS_PORT = 4322;
export const DEFAULT_BLOG_PORT = 3000;

export function parsePort(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) return fallback;
  return parsed;
}

const envCMSPort = typeof process !== 'undefined' ? process.env.CMS_PORT : undefined;
const envBlogPort =
  (import.meta.env?.VITE_BLOG_PORT as string | undefined) ||
  (typeof process !== 'undefined' ? process.env.BLOG_PORT : undefined);

/** CMS server port (default: 4322, override with CMS_PORT) */
export const CMS_PORT = parsePort(envCMSPort, DEFAULT_CMS_PORT);

/** Astro blog dev server port (default: 3000, override with BLOG_PORT / VITE_BLOG_PORT) */
export const DEV_SERVER_PORT = parsePort(envBlogPort, DEFAULT_BLOG_PORT);

/** Astro blog dev server URL for previewing posts and embedding the Writing Room */
export const DEV_SERVER_URL =
  (import.meta.env?.VITE_BLOG_DEV_SERVER_URL as string | undefined) || `http://localhost:${DEV_SERVER_PORT}`;
