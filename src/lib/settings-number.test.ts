import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatNumberInput, parsePositiveNumberInput, roundStepValue, stepPositiveNumber } from './settings-number';

describe('formatNumberInput', () => {
  it('formats numbers as strings and null as empty string', () => {
    assert.equal(formatNumberInput(16), '16');
    assert.equal(formatNumberInput(1.7), '1.7');
    assert.equal(formatNumberInput(null), '');
  });
});

describe('parsePositiveNumberInput', () => {
  it('accepts finite positive integers and decimals', () => {
    assert.deepEqual(parsePositiveNumberInput('18', false), { valid: true, value: 18 });
    assert.deepEqual(parsePositiveNumberInput(' 1.75 ', false), { valid: true, value: 1.75 });
  });

  it('handles empty strings according to allowsEmpty', () => {
    assert.deepEqual(parsePositiveNumberInput('', true), { valid: true, value: null });
    assert.deepEqual(parsePositiveNumberInput('   ', true), { valid: true, value: null });
    assert.deepEqual(parsePositiveNumberInput('', false), { valid: false });
  });

  it('rejects zero, negative, NaN, and Infinity values', () => {
    assert.deepEqual(parsePositiveNumberInput('0', false), { valid: false });
    assert.deepEqual(parsePositiveNumberInput('-5', true), { valid: false });
    assert.deepEqual(parsePositiveNumberInput('abc', false), { valid: false });
    assert.deepEqual(parsePositiveNumberInput('Infinity', false), { valid: false });
  });
});

describe('stepPositiveNumber', () => {
  it('steps cleanly without floating-point drift', () => {
    assert.equal(roundStepValue(1.6 + 0.1), 1.7);
    assert.equal(stepPositiveNumber(1.6, undefined, 0.1, 1), 1.7);
    assert.equal(stepPositiveNumber(1.6, undefined, 0.1, -1), 1.5);
  });

  it('uses fallback when value is null', () => {
    assert.equal(stepPositiveNumber(null, 65, 1, 1), 66);
    assert.equal(stepPositiveNumber(null, 65, 1, -1), 64);
    assert.equal(stepPositiveNumber(null, undefined, 1, 1), null);
  });

  it('refuses to step to zero or negative values', () => {
    assert.equal(stepPositiveNumber(1, undefined, 1, -1), null);
    assert.equal(stepPositiveNumber(0.1, undefined, 0.1, -1), null);
  });
});
