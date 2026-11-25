import { useCallback, useState } from 'react';

export function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T | ((prev: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolled;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved = typeof next === 'function' ? (next as (prev: T) => T)(value) : next;
      if (!isControlled) setUncontrolled(resolved);
      onChange?.(resolved);
    },
    [isControlled, onChange, value],
  );

  return [value, setValue];
}
