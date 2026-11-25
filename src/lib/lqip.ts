import lqipsData from '@assets/lqips.json';

const lqips = lqipsData as Record<string, string>;

export function getLqip(src?: string): string | undefined {
  if (!src) return undefined;
  return lqips[src] ?? lqips[src.replace(/^\//, '')];
}

export function getLqipStyle(src?: string): string | undefined {
  const dataUri = getLqip(src);
  if (!dataUri) return undefined;
  return `background-image: url("${dataUri}"); background-size: cover; background-position: center;`;
}
