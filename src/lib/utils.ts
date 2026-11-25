import type { Router } from '@constants/router';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeHexColor(color?: string): string | undefined {
  if (!color) return undefined;
  const trimmed = color.trim();
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmed)) {
    return trimmed;
  }
  return undefined;
}

export function normalizeUrl(url?: string): string {
  if (!url) return '';
  return url.replace(/\/+$/, '');
}

export function filterNavItems(
  items: Router[],
  configuredSeriesSlugs: Set<string>,
  enabledSeriesSlugs: Set<string>,
  _reservedRoutes?: Set<string>,
): Router[] {
  return items
    .map((item) => {
      if (item.children?.length) {
        const filteredChildren = filterNavItems(item.children, configuredSeriesSlugs, enabledSeriesSlugs, _reservedRoutes);
        if (filteredChildren.length === 0) return null;
        return { ...item, children: filteredChildren };
      }
      if (item.path) {
        const slug = item.path.replace(/^\/+/, '').split('/')[0];
        if (configuredSeriesSlugs.has(slug) && !enabledSeriesSlugs.has(slug)) {
          return null;
        }
      }
      return item;
    })
    .filter((item): item is Router => item !== null);
}
