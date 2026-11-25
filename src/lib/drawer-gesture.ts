export interface DragSample {
  x: number;
  t: number;
}

export const DRAWER_RELEASE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function resolveDragAxis(dx: number, dy: number): 'x' | 'y' | null {
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  if (absX < 6 && absY < 6) return null;
  return absX >= absY ? 'x' : 'y';
}

export function dragOffset(dx: number, width: number): number {
  if (dx >= 0) return 0;
  return Math.max(-width, dx);
}

export function dragVelocity(samples: DragSample[]): number {
  if (samples.length < 2) return 0;
  const first = samples[0];
  const last = samples[samples.length - 1];
  const dt = last.t - first.t;
  if (dt <= 0) return 0;
  return (last.x - first.x) / dt;
}

export function resolveDrawerRelease(offset: number, velocity: number, width: number): { close: boolean; duration: number } {
  const close = Math.abs(offset) > width * 0.35 || velocity < -0.4;
  return { close, duration: 240 };
}
