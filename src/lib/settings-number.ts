/**
 * Pure numeric parsing and stepping helpers for Settings Center number fields.
 *
 * Replaces react-hook-form + zod for single numeric preference inputs while
 * keeping identical validation semantics (any finite positive number, plus
 * optional empty -> null for automatic settings).
 */

export type ParsedNumberInput = { valid: true; value: number | null } | { valid: false };

/** Remove floating-point noise from fractional steps (e.g. 1.6 + 0.1). */
export function roundStepValue(value: number): number {
  return Number(value.toFixed(4));
}

/** Format a numeric preference value for an HTML `<input type="number">`. */
export function formatNumberInput(value: number | null): string {
  return value === null ? '' : String(value);
}

/**
 * Parse raw string input from a settings number field.
 * Accepts any finite positive number; accepts empty string only when `allowsEmpty` is true.
 */
export function parsePositiveNumberInput(rawValue: string, allowsEmpty: boolean): ParsedNumberInput {
  const trimmed = rawValue.trim();
  if (trimmed === '') {
    return allowsEmpty ? { valid: true, value: null } : { valid: false };
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return { valid: false };
  }

  return { valid: true, value: parsed };
}

/**
 * Compute the next positive value for a +/- stepper click, or `null` when
 * stepping would produce a non-positive value or no base value is available.
 */
export function stepPositiveNumber(
  value: number | null,
  fallback: number | undefined,
  step: number,
  direction: 1 | -1,
): number | null {
  const base = value ?? fallback;
  if (base === undefined) return null;

  const next = roundStepValue(base + direction * step);
  return next > 0 ? next : null;
}
