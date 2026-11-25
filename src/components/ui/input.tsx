import { cn } from '@lib/utils';
import * as React from 'react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'border-input bg-background ring-offset-background flex h-10 w-full rounded-lg border px-3 py-2 text-sm',
      'placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-hidden',
      'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
