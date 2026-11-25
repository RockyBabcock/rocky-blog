import SakuraSVG from '@components/svg/SakuraSvg';
import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

export default function Divider({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('section-divider my-4 flex items-center gap-4', className)}>
      <span className="section-divider-line to-primary/45 h-px grow origin-right bg-linear-to-r from-transparent" />
      {children ? (
        <h2 className="section-divider-title text-foreground/70 flex items-center gap-2.5 text-2xl font-bold tracking-widest">
          <SakuraSVG className="section-divider-bloom text-primary/70 size-4 shrink-0" />
          {children}
          <SakuraSVG className="section-divider-bloom text-primary/70 size-4 shrink-0" />
        </h2>
      ) : null}
      <span className="section-divider-line to-primary/45 h-px grow origin-left bg-linear-to-l from-transparent" />
    </div>
  );
}
