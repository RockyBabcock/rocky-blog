/**
 * FloatingGroup Component
 *
 * Floating action buttons for navigation and utilities.
 * - Scroll to top/bottom
 * - Expand/collapse toggle, ringed with the reading progress
 */

import { LazyMotionProvider } from '@components/common/LazyMotionProvider';
import { preloadCommandPalette } from '@components/layout/CommandPalette';
import { preloadSettingsPanel } from '@components/settings/SettingsPanel';
import { animation } from '@constants/design-tokens';
import { useIsMounted } from '@hooks/useIsMounted';
import { useMotionLevel } from '@hooks/useMotionLevel';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { getScrollBehavior } from '@lib/motion-level';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { $isDrawerOpen, $isSettingsOpen, openModal, toggleSettings } from '@store/modal';
import { initSettings, scrollProgressEnabled } from '@store/settings';
import { AnimatePresence, type MotionValue, m, useScroll, useSpring, type Variants } from 'motion/react';
import { useEffect, useState } from 'react';

interface FloatingButtonProps {
  onClick: () => void;
  ariaLabel: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Optional data attribute for identifying settings toggle button */
  dataSettingsToggle?: boolean;
  /** Optional preload callback for controls that reveal lazy UI. */
  onIntent?: () => void;
  ariaExpanded?: boolean;
}

// Buttons pop out of the toggle one after another (nearest first) and fold back faster.
const listVariants: Variants = {
  open: { transition: { staggerChildren: 0.045, staggerDirection: -1 } },
  closed: { transition: { staggerChildren: 0.03 } },
};

// Whole-transform values (not x/y/scale) run on the compositor through WAAPI, so the stagger stays smooth
// while the main thread is busy.
const itemVariants: Variants = {
  open: { opacity: 1, transform: 'translate3d(0px, 0px, 0px) scale(1)', transition: animation.spring.pop },
  closed: {
    opacity: 0,
    transform: 'translate3d(0px, 14px, 0px) scale(0.6)',
    transition: { duration: 0.16, ease: animation.bezier.inQuart },
  },
};

const staticVariants: Variants = {
  open: { opacity: 1, transform: 'translate3d(0px, 0px, 0px) scale(1)', transition: { duration: 0 } },
  closed: { opacity: 0, transition: { duration: 0 } },
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
}

function scrollToBottom() {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: getScrollBehavior() });
}

function FloatingButton({
  onClick,
  ariaLabel,
  title,
  children,
  className,
  dataSettingsToggle,
  onIntent,
  ariaExpanded,
}: FloatingButtonProps) {
  const isMounted = useIsMounted();

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={onIntent}
      onPointerDown={onIntent}
      onFocus={onIntent}
      className={cn(
        'flex-center bg-background/85 shadow-sakura-sm ring-primary/10 relative size-10 rounded-full ring-1 backdrop-blur-md',
        'ease-out-quart transition-[background-color,box-shadow,translate,scale] duration-300',
        'hover:bg-background hover:shadow-sakura-md hover:ring-primary/25 hover:-translate-y-0.5 active:scale-90 active:duration-100',
        className,
      )}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      title={isMounted ? title : undefined}
      data-tooltip-interactive="false"
      data-settings-toggle={dataSettingsToggle || undefined}
    >
      {children}
    </button>
  );
}

function ProgressRingDrawing({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg className="pointer-events-none absolute -inset-0.5 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="20.5" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-15" />
      <m.circle
        cx="22"
        cy="22"
        r="20.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}

function SmoothProgressRing({ progress }: { progress: MotionValue<number> }) {
  const smooth = useSpring(progress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <ProgressRingDrawing progress={smooth} />;
}

function ProgressRing({ springy }: { springy: boolean }) {
  const { scrollYProgress } = useScroll();
  return springy ? <SmoothProgressRing progress={scrollYProgress} /> : <ProgressRingDrawing progress={scrollYProgress} />;
}

export default function FloatingGroup() {
  const { t } = useTranslation();
  // Phones and tablets start folded so the stack does not cover the text being read.
  const [isExpanded, setIsExpanded] = useState(() => !window.matchMedia('(max-width: 992px)').matches);
  const isDrawerOpen = useStore($isDrawerOpen);
  const isSettingsOpen = useStore($isSettingsOpen);
  const showProgress = useStore(scrollProgressEnabled);
  const reduced = useMotionLevel() === 'reduced';

  // Initialize settings state on mount
  useEffect(() => {
    initSettings();
  }, []);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Hide when drawer is open
  const isHidden = isDrawerOpen;

  return (
    <LazyMotionProvider>
      <m.div
        className="text-primary fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col items-center gap-2"
        animate={{
          transform: isHidden ? 'translateX(200px)' : 'translateX(0px)',
          opacity: isHidden ? 0 : 1,
          pointerEvents: isHidden ? 'none' : 'auto',
        }}
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease: animation.bezier.outQuart }}
      >
        <AnimatePresence initial={false}>
          {isExpanded && (
            <m.div
              className="flex flex-col items-center gap-2"
              variants={reduced ? undefined : listVariants}
              initial={reduced ? false : 'closed'}
              animate="open"
              exit="closed"
            >
              <m.div variants={reduced ? staticVariants : itemVariants}>
                <FloatingButton
                  onClick={() => openModal('command')}
                  ariaLabel={t('command.trigger')}
                  title={t('command.title')}
                  onIntent={preloadCommandPalette}
                >
                  <Icon icon="ri:command-line" className="size-5" />
                </FloatingButton>
              </m.div>
              <m.div variants={reduced ? staticVariants : itemVariants}>
                <FloatingButton
                  onClick={toggleSettings}
                  ariaLabel={t('floating.settings')}
                  title={t('floating.settings')}
                  dataSettingsToggle
                  onIntent={preloadSettingsPanel}
                >
                  <Icon
                    icon={isSettingsOpen ? 'ri:settings-3-fill' : 'ri:settings-3-line'}
                    className={cn('ease-out-expo size-5 transition-transform duration-500', isSettingsOpen && 'rotate-90')}
                  />
                </FloatingButton>
              </m.div>
              <m.div variants={reduced ? staticVariants : itemVariants}>
                <FloatingButton onClick={scrollToTop} ariaLabel={t('floating.backToTop')} title={t('floating.backToTop')}>
                  <Icon icon="ri:arrow-up-s-line" className="size-5" />
                </FloatingButton>
              </m.div>
              <m.div variants={reduced ? staticVariants : itemVariants}>
                <FloatingButton
                  onClick={scrollToBottom}
                  ariaLabel={t('floating.scrollToBottom')}
                  title={t('floating.scrollToBottom')}
                >
                  <Icon icon="ri:arrow-down-s-line" className="size-5" />
                </FloatingButton>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        <FloatingButton
          onClick={toggleExpand}
          ariaLabel={t('floating.toggleToolbar')}
          title={t('floating.toggleToolbar')}
          ariaExpanded={isExpanded}
        >
          {showProgress && <ProgressRing springy={!reduced} />}
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={isExpanded ? 'close' : 'magic'}
              className="flex-center"
              initial={reduced ? false : { opacity: 0, transform: 'rotate(-90deg) scale(0.5)' }}
              animate={{ opacity: 1, transform: 'rotate(0deg) scale(1)' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, transform: 'rotate(90deg) scale(0.5)' }}
              transition={reduced ? { duration: 0 } : animation.spring.press}
            >
              <Icon icon={isExpanded ? 'ri:close-large-fill' : 'ri:magic-fill'} className="size-4" />
            </m.span>
          </AnimatePresence>
        </FloatingButton>
      </m.div>
    </LazyMotionProvider>
  );
}
