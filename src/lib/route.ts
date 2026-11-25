export function encodeSlug(slug: string): string {
  return slug
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}
