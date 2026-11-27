import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

export default function Divider({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('section-divider my-5 flex items-center gap-4', className)}>
      <span className="section-divider-line bg-border h-px grow origin-right" />
      {children ? (
        <h2 className="section-divider-title text-foreground/80 flex items-center gap-2.5 text-lg font-semibold tracking-[0.14em] uppercase">
          <span className="bg-primary/70 size-1.5 shrink-0 rounded-[1px]" aria-hidden="true" />
          {children}
          <span className="bg-primary/70 size-1.5 shrink-0 rounded-[1px]" aria-hidden="true" />
        </h2>
      ) : null}
      <span className="section-divider-line bg-border h-px grow origin-left" />
    </div>
  );
}
