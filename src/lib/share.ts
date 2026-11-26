/**
 * Pure article share URL and Markdown link helpers.
 */

/**
 * Build a clean canonical share URL without transient query params (like `?resume=1`) or hashes.
 */
export function buildCanonicalShareUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    parsed.searchParams.delete('resume');
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * Escape Markdown link brackets in an article title and build `[Title](url)`.
 */
export function formatMarkdownShareLink(title: string, url: string): string {
  const cleanTitle = title.trim().replaceAll('[', '\\[').replaceAll(']', '\\]');
  const cleanUrl = buildCanonicalShareUrl(url);
  return `[${cleanTitle}](${cleanUrl})`;
}
