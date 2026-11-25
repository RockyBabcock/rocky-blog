import { useTocController } from '@hooks/useTocController';
import { useTranslation } from '@hooks/useTranslation';
import { cn } from '@lib/utils';
import { HeadingList } from './HeadingList';
import { TocProvider } from './TocContext';
import { TocGlide } from './TocGlide';

interface TableOfContentsProps {
  isDrawer?: boolean;
  enableNumbering?: boolean;
}

export function TableOfContents({ isDrawer = false, enableNumbering = true }: TableOfContentsProps) {
  const { t } = useTranslation();
  const { headings, toc, subscribeFrame } = useTocController({ offsetTop: 110, enabled: true });

  if (headings.length === 0) {
    return (
      <div className="px-3 py-6 text-center text-xs text-muted-foreground">
        {t('toc.empty')}
      </div>
    );
  }

  return (
    <div className={cn('relative px-1 py-2', isDrawer ? 'max-h-[60vh] overflow-y-auto' : 'h-full overflow-y-auto')}>
      <nav
        className={cn('toc-container relative flex flex-col gap-1 pl-2', !enableNumbering && 'toc-no-numbering')}
        aria-label={t('toc.title')}
      >
        <TocProvider value={toc}>
          <TocGlide headings={headings} subscribeFrame={subscribeFrame} />
          <HeadingList headings={headings} numbered={enableNumbering} />
        </TocProvider>
      </nav>
    </div>
  );
}

export default TableOfContents;
