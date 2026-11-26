/**
 * Numeric stepper used by the Settings Center.
 *
 * Accepts any finite positive number without an upper clamp.
 * Selected controls may also use an empty value for an automatic setting.
 */

import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { formatNumberInput, parsePositiveNumberInput, stepPositiveNumber } from '@lib/settings-number';
import { cn } from '@lib/utils';
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

/** Input debounce interval in milliseconds. */
const APPLY_DEBOUNCE = 150;

interface NumberFieldProps {
  label: string;
  value: number | null;
  step: number;
  unit?: string;
  emptyValue?: {
    label: string;
    fallback: number;
  };
  onApply: (value: number | null) => void;
}

export function NumberField({ label, value, step, unit, emptyValue, onApply }: NumberFieldProps) {
  const { t } = useTranslation();
  const allowsEmpty = emptyValue !== undefined;
  const [rawValue, setRawValue] = useState(() => formatNumberInput(value));
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingApply = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, []);

  // Synchronize external changes from the stepper or reset action.
  useEffect(() => {
    clearPendingApply();
    setRawValue(formatNumberInput(value));
  }, [value, clearPendingApply]);

  // Clear pending timeout on unmount.
  useEffect(() => clearPendingApply, [clearPendingApply]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextRaw = event.target.value;
    setRawValue(nextRaw);
    clearPendingApply();

    const parsed = parsePositiveNumberInput(nextRaw, allowsEmpty);
    if (!parsed.valid || parsed.value === value) return;

    const nextValue = parsed.value;
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      onApply(nextValue);
    }, APPLY_DEBOUNCE);
  };

  const stepBy = (direction: 1 | -1) => {
    const next = stepPositiveNumber(value, emptyValue?.fallback, step, direction);
    if (next === null) return;
    clearPendingApply();
    onApply(next);
  };

  const parsed = parsePositiveNumberInput(rawValue, allowsEmpty);
  const invalid = !parsed.valid;
  const hasDisplayValue = rawValue.trim() !== '';

  return (
    <div className="flex items-center gap-1" title={invalid ? t('settings.invalidNumber') : undefined}>
      <button
        type="button"
        className="flex-center text-muted-foreground hover:bg-accent hover:text-foreground size-7 rounded-md transition-[background-color,color,transform] active:scale-[0.96]"
        onClick={() => stepBy(-1)}
        aria-label={`${label} -${step}`}
      >
        <Icon icon="ri:subtract-line" className="h-4 w-4" />
      </button>
      <div className="relative">
        <input
          type="number"
          step={step}
          value={rawValue}
          onChange={handleChange}
          placeholder={emptyValue?.label}
          aria-label={label}
          aria-invalid={invalid || undefined}
          className={cn(
            'border-input bg-background w-20 rounded-md border px-2 py-1 text-center text-sm tabular-nums outline-hidden transition-colors',
            'focus-visible:ring-ring focus-visible:ring-2',
            invalid && 'border-destructive text-destructive focus-visible:ring-destructive',
          )}
        />
        {unit && hasDisplayValue && (
          <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-xs">
            {unit}
          </span>
        )}
      </div>
      <button
        type="button"
        className="flex-center text-muted-foreground hover:bg-accent hover:text-foreground size-7 rounded-md transition-[background-color,color,transform] active:scale-[0.96]"
        onClick={() => stepBy(1)}
        aria-label={`${label} +${step}`}
      >
        <Icon icon="ri:add-line" className="h-4 w-4" />
      </button>
    </div>
  );
}
