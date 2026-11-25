import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { $isDrawerOpen, toggleDrawer } from '@store/modal';
import { t } from '@/i18n';

interface MenuIconProps {
  locale: string;
  className?: string;
  id?: string;
}

export function MenuIcon({ locale, className, id }: MenuIconProps) {
  const isOpen = useStore($isDrawerOpen);

  return (
    <div id={id} className={cn('items-center justify-center', className)}>
      <button
        type="button"
        onClick={toggleDrawer}
        aria-label={isOpen ? t(locale, 'drawer.close') : t(locale, 'drawer.navMenu')}
        aria-expanded={isOpen}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full text-current transition-colors hover:bg-current/10"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {isOpen ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
