import assert from 'node:assert/strict';
import test from 'node:test';
import { computePetalCount, createPetal, getPetalFill, stepPetal } from './petal-physics';

test('computePetalCount returns zero for empty bounds and stays sparse within limits', () => {
  assert.equal(computePetalCount(0, 600), 0);
  assert.equal(computePetalCount(1440, 0), 0);
  assert.equal(computePetalCount(360, 420), 6);
  assert.equal(computePetalCount(1440, 560), 17);
  assert.equal(computePetalCount(3840, 1200), 18);
});

test('stepPetal integrates gentle downward drift and clamps huge frame stalls', () => {
  const bounds = { width: 1200, height: 500 };
  const petal = createPetal(bounds, () => 0.5, true);
  const next = stepPetal(petal, 2.5, bounds, () => 0.5);

  // Clamped to 0.05s max step: downward movement must stay small
  const dy = next.y - petal.y;
  assert.ok(dy > 0 && dy < 3, `expected clamped dy in (0, 3), got ${dy}`);
});

test('stepPetal wraps petals smoothly when falling past bottom edge', () => {
  const bounds = { width: 800, height: 400 };
  const petal = {
    ...createPetal(bounds, () => 0.5, true),
    y: 430,
    speedY: 40,
  };
  const next = stepPetal(petal, 0.04, bounds, () => 0.4);
  assert.ok(next.y < 0, `expected wrapped petal above top edge, got y=${next.y}`);
});

test('getPetalFill returns muted natural blush/ivory colors for light and dark themes', () => {
  assert.match(getPetalFill(0.1, false), /^rgba\(/);
  assert.match(getPetalFill(0.5, true), /^rgba\(/);
  assert.notEqual(getPetalFill(0.1, false), getPetalFill(0.1, true));
});
