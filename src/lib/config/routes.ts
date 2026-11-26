/**
 * Core route definitions and default navigation entries.
 *
 * Lives in the config layer so `src/lib/**` modules never depend on `src/constants/**`.
 */

import type { RouterItem } from './types';

export enum Routes {
  Home = '/',
  About = '/about',
  Categories = '/categories',
  Tags = '/tags',
  Post = '/post',
  Archives = '/archives',
}

/**
 * Get the URL path for a featured series.
 * @param slug - The series slug (e.g., 'weekly')
 * @returns The full path (e.g., '/weekly')
 */
export function getSeriesPath(slug: string): string {
  return `/${slug}`;
}

/** Fallback navigation used when `config/site.yaml` does not define `navigation`. */
export const DEFAULT_ROUTERS: RouterItem[] = [
  { name: 'Home', path: Routes.Home, icon: 'fa6-solid:house-chimney' },
  { name: 'About', path: Routes.About, icon: 'fa6-regular:circle-user' },
];
