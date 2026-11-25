/**
 * Safe cover-image URL resolver for article audio tracks.
 *
 * Upgrades insecure HTTP image URLs from common music CDNs to HTTPS,
 * rejects unsafe URI schemes, and appends compact resize parameters for
 * NetEase Music CDN covers to avoid downloading oversized album art.
 */

const NETEASE_IMAGE_HOST_RE = /(?:^|\.)music\.126\.net$/i;

/**
 * Normalize and validate an audio track cover URL.
 * Returns an empty string for missing or unsafe URLs.
 */
export function resolveMusicCoverUrl(rawUrl: string | undefined, size = 300): string {
  const trimmed = rawUrl?.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('/')) {
    return trimmed.startsWith('//') ? '' : trimmed;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return '';
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return '';
  }

  // Upgrade HTTP covers to HTTPS to prevent mixed-content blocking
  if (parsed.protocol === 'http:') {
    parsed.protocol = 'https:';
  }

  if (NETEASE_IMAGE_HOST_RE.test(parsed.hostname) && !parsed.searchParams.has('param')) {
    const safeSize = Math.max(64, Math.min(1000, Math.round(size)));
    parsed.searchParams.set('param', `${safeSize}y${safeSize}`);
  }

  return parsed.toString();
}
