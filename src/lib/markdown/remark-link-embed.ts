/**
 * Remark plugin to automatically embed standalone links as OG preview cards.
 * Detects standalone links in paragraphs and replaces them with build-time
 * rendered HTML.
 *
 * Layers: `og-fetcher` (network), `og-cache` (persistence), `link-card-template` (markup).
 */

import type { Html, Link, Paragraph, Root } from 'mdast';
import type { Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { renderLinkPreview } from './link-card-template';
import { isStandaloneLinkParagraph } from './link-utils';
import { DEFAULT_CACHE_TTL_DAYS, getSharedOGCache } from './og-cache';
import { fetchOGData } from './og-fetcher';

interface RemarkLinkEmbedOptions {
  enableLinkEmbed?: boolean;
  enableOGPreview?: boolean;
  /** TTL for successful OG entries, in days. */
  previewCacheTime?: number;
}

interface EmbedCandidate {
  index: number;
  parent: Parent;
  url: string;
}

/**
 * Remark plugin that transforms standalone links into OG link preview cards,
 * fetching OG metadata at build time (cached in `.cache/og-data.json`).
 */
export function remarkLinkEmbed(options: RemarkLinkEmbedOptions = {}) {
  const { enableLinkEmbed = true, enableOGPreview = true, previewCacheTime = DEFAULT_CACHE_TTL_DAYS } = options;

  // v4.x BREAKING: previewCacheTime unit changed from seconds to days.
  // Warn legacy values (e.g. 3600 from seconds-era config) instead of silently
  // caching for ~10 years.
  if (previewCacheTime > 365) {
    console.warn(
      `[Link Embed] previewCacheTime=${previewCacheTime} looks unusually large. ` +
        `Unit changed from seconds to days in v4.x — please update config/site.yaml.`,
    );
  }

  const cache = getSharedOGCache(previewCacheTime * 24 * 60 * 60 * 1000);

  const renderEmbed = async ({ url }: EmbedCandidate): Promise<string | null> => {
    const cached = cache.get(url);
    if (cached) return renderLinkPreview(cached);

    const ogData = await fetchOGData(url);
    cache.set(url, ogData);
    return renderLinkPreview(ogData);
  };

  return async (tree: Root) => {
    if (!enableLinkEmbed || !enableOGPreview) {
      return;
    }

    const candidates: EmbedCandidate[] = [];

    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      if (index === undefined || !parent) return;
      if (!isStandaloneLinkParagraph(node)) return;

      const { url } = node.children[0] as Link;
      candidates.push({ index, parent, url });
    });

    const htmlValues = await Promise.all(candidates.map(renderEmbed));

    // Flush once per markdown file; the cache merges with disk so parallel
    // processors cannot drop each other's entries.
    cache.flush();

    candidates.forEach(({ index, parent }, i) => {
      const value = htmlValues[i];
      if (!value) return;
      const html: Html = { type: 'html', value };
      parent.children[index] = html;
    });
  };
}
