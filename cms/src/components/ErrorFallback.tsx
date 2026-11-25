/**
 * Error Fallback Component
 *
 * Displays a user-friendly error message with retry option.
 */

import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <Icon icon="ri:error-warning-line" className="text-destructive size-16" />
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <pre className="bg-muted max-w-lg rounded-lg p-4 text-sm">{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
