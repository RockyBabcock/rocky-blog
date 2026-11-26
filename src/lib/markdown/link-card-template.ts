/**
 * Pure HTML renderer for OG link preview cards.
 * Output is consumed verbatim by built pages, so markup must stay byte-stable.
 */

import sanitizeHtml from 'sanitize-html';
import type { OGData } from './og-fetcher';

/** Strip every HTML tag from user-generated text. */
function sanitizeText(text: string): string {
  return sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

/** Escape text for interpolation into a quoted HTML attribute. */
function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function sanitizeAttribute(value: string): string {
  return sanitizeText(value).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Drop anything that is not an http(s) URL, defeating `javascript:` style payloads. */
function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.href;
  } catch {
    return '';
  }
}

function sanitizeUrlAttribute(url: string): string {
  return escapeHtmlAttribute(sanitizeUrl(url));
}

function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch (error) {
    console.warn('[Link Embed] Failed to parse domain from URL:', url, error);
    return url;
  }
}

/** Fallback card used when the fetch failed or the page exposed no title. */
function renderFallbackCard(ogData: OGData, domain: string): string {
  const { originUrl, url, description } = ogData;
  let displayText = domain;
  let subtitle = '';

  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/').filter((s) => s);

    if (domain === 'github.com' && pathSegments.length >= 2) {
      // GitHub: /org/repo
      displayText = `GitHub - ${pathSegments.slice(0, 2).join('/')}`;
    } else if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment && lastSegment !== 'index.html') {
        displayText = originUrl;
        subtitle = description ?? domain;
      }
    }
  } catch (error) {
    console.warn('[Link Embed] Failed to extract readable text from URL:', url, error);
  }

  // originUrl preserves the original path (metascraper may normalize og:url incorrectly)
  const safeUrl = sanitizeUrlAttribute(originUrl);
  const safeDisplayText = sanitizeText(displayText);
  const safeSubtitle = subtitle
    ? sanitizeText(subtitle)
    : sanitizeText(originUrl.length > 60 ? `${originUrl.substring(0, 60)}...` : originUrl);

  return `<div class="link-preview-block not-prose" data-state="error">
  <a href="${safeUrl}" target="_blank" class="hover:border-primary/50 group block rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <div class="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
          <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"></path></svg>
        </div>
        <div class="min-w-0 flex-1">
          <div class="text-foreground font-medium truncate">${safeDisplayText}</div>
          <div class="text-muted-foreground text-xs truncate mt-0.5">${safeSubtitle}</div>
        </div>
      </div>
      <svg class="text-primary h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
      </svg>
    </div>
  </a>
</div>`;
}

/** OG link preview card; falls back to a compact card when metadata is missing. */
export function renderLinkPreview(ogData: OGData): string {
  const { originUrl, url, title, description, image, logo, error } = ogData;
  const domain = getDomain(url);

  if (error || !title) {
    return renderFallbackCard(ogData, domain);
  }

  // originUrl preserves the original path (metascraper may normalize og:url incorrectly)
  const safeUrl = sanitizeUrlAttribute(originUrl);
  const safeTitle = sanitizeText(title);
  const safeDescription = description ? sanitizeText(description) : '';
  const safeDomain = sanitizeText(domain);
  const safeTitleAttribute = sanitizeAttribute(title);
  const safeLogo = logo ? sanitizeUrlAttribute(logo) : '';
  const safeImage = image ? sanitizeUrlAttribute(image) : '';
  const safeOriginUrl = sanitizeText(originUrl);
  return `<div class="link-preview-block not-prose" data-state="success">
  <a href="${safeUrl}" target="_blank" class="group block overflow-hidden rounded-lg border border-border transition-all hover:border-primary/50 hover:shadow-md">
    <div class="bg-card flex md:flex-col flex-row">
      <div class="flex-1 p-4">
        <div class="mb-2 flex items-center gap-2">
          ${safeLogo ? `<img src="${safeLogo}" alt="" class="h-4 w-4 shrink-0" loading="lazy" aria-hidden="true" referrerpolicy="no-referrer" />` : ''}
          <span class="text-muted-foreground truncate text-xs font-medium">${safeDomain}</span>
        </div>
        <div class="text-foreground mb-2 line-clamp-2 font-semibold leading-tight">${safeTitle}</div>
        ${safeDescription ? `<p class="text-muted-foreground mb-3 line-clamp-2 text-sm">${safeDescription}</p>` : ''}
        <div class="text-primary flex items-center gap-1 text-xs">
          <span class="truncate">${safeOriginUrl}</span>
          <svg class="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" viewBox="0 0 12 12"><path fill="currentColor" d="M4 3.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-.25a.75.75 0 0 1 1.5 0V8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h.25a.75.75 0 0 1 0 1.5zm2.75 0a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69L7.28 5.78a.75.75 0 0 1-1.06-1.06L7.44 3.5z"/></svg> 
        </div>
      </div>
      ${safeImage ? `<div class="bg-muted relative md:w-full shrink-0 aspect-1200/630 md:aspect-auto md:max-h-48 w-80"><img src="${safeImage}" alt="${safeTitleAttribute}" class="link-preview-image h-full md:h-full w-full object-cover" loading="lazy" referrerpolicy="no-referrer" data-fallback-title="${safeTitleAttribute}" /></div>` : ''}
    </div>
  </a>
</div>`;
}
