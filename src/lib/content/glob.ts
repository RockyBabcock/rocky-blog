export function isBlogContentFile(relativePath: string): boolean {
  const segments = relativePath.split('/');
  if (segments.some((segment) => segment.startsWith('_'))) return false;
  return /\.(md|mdx)$/i.test(relativePath);
}
