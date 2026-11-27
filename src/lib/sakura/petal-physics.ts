/**
 * Pure physics and geometry for sparse, natural falling sakura petals in Hero covers.
 *
 * Designed to stay lightweight, deterministic when seeded, and strictly restrained:
 * sparse count, soft muted blush/ivory tones, slow organic wind drift, and smooth
 * edge wrapping without visual clutter.
 */

export interface PetalParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayPhase: number;
  swayAmp: number;
  swaySpeed: number;
  rotation: number;
  rotationSpeed: number;
  tiltPhase: number;
  tiltSpeed: number;
  opacity: number;
  tone: number;
}

export interface PetalBounds {
  width: number;
  height: number;
}

const MIN_PETALS = 6;
const MAX_PETALS = 18;

/**
 * Compute a restrained, sparse petal count scaled to cover area.
 * Keeps hero atmosphere delicate on wide displays and uncluttered on mobile.
 */
export function computePetalCount(width: number, height: number): number {
  if (width <= 0 || height <= 0) return 0;
  const raw = Math.round((width * height) / 48_000);
  return Math.max(MIN_PETALS, Math.min(MAX_PETALS, raw));
}

/**
 * Create a single sakura petal with organic size, drift, and opacity parameters.
 */
export function createPetal(bounds: PetalBounds, random: () => number = Math.random, randomY = true): PetalParticle {
  const size = 6.5 + random() * 6;
  return {
    x: random() * bounds.width,
    y: randomY ? random() * bounds.height : -size * 2 - random() * 24,
    size,
    speedY: 16 + random() * 18,
    speedX: -6 - random() * 11,
    swayPhase: random() * Math.PI * 2,
    swayAmp: 10 + random() * 14,
    swaySpeed: 0.7 + random() * 0.75,
    rotation: random() * Math.PI * 2,
    rotationSpeed: (random() - 0.5) * 0.9,
    tiltPhase: random() * Math.PI * 2,
    tiltSpeed: 0.9 + random() * 0.9,
    opacity: 0.32 + random() * 0.34,
    tone: random(),
  };
}

/**
 * Advance a petal by `dtSeconds` (clamped to avoid jumps after tab backgrounding).
 */
export function stepPetal(
  petal: PetalParticle,
  dtSeconds: number,
  bounds: PetalBounds,
  random: () => number = Math.random,
): PetalParticle {
  const dt = Math.min(Math.max(dtSeconds, 0), 0.05);
  const swayPhase = petal.swayPhase + petal.swaySpeed * dt;
  const tiltPhase = petal.tiltPhase + petal.tiltSpeed * dt;
  const swayVx = Math.cos(swayPhase) * petal.swayAmp;

  let x = petal.x + (petal.speedX + swayVx) * dt;
  let y = petal.y + petal.speedY * dt;
  const rotation = petal.rotation + petal.rotationSpeed * dt;

  const margin = petal.size * 2.5;
  if (y > bounds.height + margin) {
    y = -margin;
    x = random() * (bounds.width + margin * 2) - margin;
  }
  if (x < -margin) {
    x = bounds.width + margin;
  } else if (x > bounds.width + margin) {
    x = -margin;
  }

  return {
    ...petal,
    x,
    y,
    swayPhase,
    tiltPhase,
    rotation,
  };
}

/**
 * Resolve a natural muted botanical blush/ivory fill color for a petal.
 */
export function getPetalFill(tone: number, isDark: boolean): string {
  if (isDark) {
    if (tone < 0.34) return 'rgba(242, 206, 215, 0.85)';
    if (tone < 0.68) return 'rgba(229, 174, 188, 0.78)';
    return 'rgba(248, 236, 238, 0.74)';
  }
  if (tone < 0.34) return 'rgba(255, 240, 243, 0.92)';
  if (tone < 0.68) return 'rgba(244, 210, 219, 0.88)';
  return 'rgba(255, 250, 248, 0.86)';
}

/**
 * Draw a refined, natural notched sakura petal silhouette onto a 2D canvas context.
 */
export function drawSakuraPetal(ctx: CanvasRenderingContext2D, petal: PetalParticle, isDark: boolean): void {
  const scaleY = 0.52 + 0.48 * Math.abs(Math.cos(petal.tiltPhase));
  const r = petal.size;

  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.scale(1, scaleY);
  ctx.globalAlpha = petal.opacity;

  ctx.beginPath();
  // Natural teardrop petal with subtle sakura apical notch
  ctx.moveTo(0, r * 0.78);
  ctx.bezierCurveTo(-r * 0.72, r * 0.38, -r * 0.68, -r * 0.56, -r * 0.16, -r * 0.84);
  ctx.lineTo(0, -r * 0.58);
  ctx.lineTo(r * 0.16, -r * 0.84);
  ctx.bezierCurveTo(r * 0.68, -r * 0.56, r * 0.72, r * 0.38, 0, r * 0.78);
  ctx.closePath();

  ctx.fillStyle = getPetalFill(petal.tone, isDark);
  ctx.fill();
  ctx.restore();
}
