/**
 * HTML renderers for Shoka preprocessor output.
 *
 * Generates HTML strings for audio players and video embeds.
 * Separated from the preprocessor to keep parsing and rendering concerns distinct.
 */

export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export interface MediaItem {
  name?: string;
  artist?: string;
  url?: string;
  pic?: string;
  lrc?: string;
  title?: string;
  list?: unknown[];
}

interface AudioGroup {
  title?: string;
  list?: unknown[];
  name?: string;
  artist?: string;
  url?: string;
  pic?: string;
  lrc?: string;
}

export function renderAudioMedia(items: MediaItem[]): string {
  const groups: AudioGroup[] = [];

  for (const item of items) {
    if (item.list && Array.isArray(item.list)) {
      groups.push({ title: item.title, list: item.list });
    } else if (item.url) {
      groups.push({
        ...(item.title ? { title: item.title } : {}),
        ...(item.name ? { name: item.name } : {}),
        ...(item.artist ? { artist: item.artist } : {}),
        url: item.url,
        ...(item.pic ? { pic: item.pic } : {}),
        ...(item.lrc ? { lrc: item.lrc } : {}),
      });
    }
  }

  if (groups.length === 0) return '';

  const dataSrc = escapeHtml(JSON.stringify(groups));
  return `<div data-audio-player data-src="${dataSrc}"></div>`;
}

export function renderVideoMedia(items: MediaItem[]): string {
  const tracks = items
    .filter((item): item is MediaItem & { url: string } => !!item.url)
    .map((item) => ({ name: item.name || '', url: item.url }));

  if (tracks.length === 0) return '';
  const dataSrc = escapeHtml(JSON.stringify(tracks));
  return `<div data-video-player data-src="${dataSrc}"></div>`;
}
