export const responsiveImageQuality = 80;

export async function resolveResponsiveImage(_src: string, _maxWidth?: number) {
  // Public images under /img/* render directly via <img> with zero build overhead.
  return null;
}
