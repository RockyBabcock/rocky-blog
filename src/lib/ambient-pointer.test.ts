import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { computeRelativePointerPosition } from './ambient-pointer';

describe('computeRelativePointerPosition', () => {
  it('maps pointer coordinates inside the bounding box to percentages', () => {
    const rect = { left: 100, top: 200, width: 400, height: 200 };
    assert.deepEqual(computeRelativePointerPosition(300, 250, rect), {
      xPercent: 50,
      yPercent: 25,
    });
  });

  it('clamps out-of-bounds coordinates to [0, 100]', () => {
    const rect = { left: 50, top: 50, width: 200, height: 100 };
    assert.deepEqual(computeRelativePointerPosition(-20, 500, rect), {
      xPercent: 0,
      yPercent: 100,
    });
    assert.deepEqual(computeRelativePointerPosition(400, 10, rect), {
      xPercent: 100,
      yPercent: 0,
    });
  });

  it('falls back to center for degenerate zero-sized rectangles', () => {
    assert.deepEqual(computeRelativePointerPosition(10, 20, { left: 0, top: 0, width: 0, height: 100 }), {
      xPercent: 50,
      yPercent: 50,
    });
    assert.deepEqual(computeRelativePointerPosition(10, 20, { left: 0, top: 0, width: 100, height: 0 }), {
      xPercent: 50,
      yPercent: 50,
    });
  });
});
