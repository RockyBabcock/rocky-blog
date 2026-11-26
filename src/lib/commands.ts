/**
 * Pure Command Palette matching, grouping, and keyboard navigation helpers.
 */

export type CommandGroup = 'actions' | 'navigation' | 'recent';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  group: CommandGroup;
  keywords?: string[];
  shortcut?: string;
  icon: string;
  href?: string;
  actionId?: 'search' | 'search-query' | 'settings' | 'focus' | 'theme';
}

/**
 * Score and filter commands against a user query.
 * Supports multi-token case-insensitive matching across label, description, and keywords.
 */
export function filterCommands(items: CommandItem[], query: string): CommandItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const scored: { item: CommandItem; score: number }[] = [];

  for (const item of items) {
    const labelLower = item.label.toLowerCase();
    const descLower = (item.description ?? '').toLowerCase();
    const keywordLower = (item.keywords ?? []).join(' ').toLowerCase();
    const haystack = `${labelLower} ${descLower} ${keywordLower}`;

    if (!tokens.every((token) => haystack.includes(token))) continue;

    let score = 0;
    if (labelLower === normalized) score += 100;
    else if (labelLower.startsWith(normalized)) score += 60;
    else if (labelLower.includes(normalized)) score += 40;
    else if (keywordLower.includes(normalized)) score += 25;
    else score += 10;

    scored.push({ item, score });
  }

  return scored.sort((a, b) => b.score - a.score).map((entry) => entry.item);
}

/** Move highlighted index circularly across a list of length `total`. */
export function nextActiveIndex(current: number, delta: 1 | -1, total: number): number {
  if (total <= 0) return 0;
  return (current + delta + total) % total;
}

/** Whether a keyboard event originated from a text editing element. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || typeof target !== 'object') return false;
  const el = target as { tagName?: string; isContentEditable?: boolean };
  const tag = (el.tagName ?? '').toUpperCase();
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || Boolean(el.isContentEditable);
}
