/**
 * SeriesShowcaseProgress — Hydrates local reading progress (`X / N`) for a featured series
 * card on the homepage using the single source of truth (`$readingHistory` + `computeSeriesProgress`).
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { computeSeriesProgress, type SeriesRouteItem } from '@lib/series-progress';
import { useStore } from '@nanostores/react';
import { $readingHistory, initReadingHistory } from '@store/reading-history';
import { useEffect, useMemo } from 'react';

export interface SeriesShowcaseProgressProps {
  locale: string;
  items: SeriesRouteItem[];
  seriesHref: string;
}

export default function SeriesShowcaseProgress({ locale, items, seriesHref }: SeriesShowcaseProgressProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const history = useStore($readingHistory);

  useEffect(() => {
    initReadingHistory();
  }, []);

  const summary = useMemo(() => computeSeriesProgress(items, isMounted ? history : []), [items, history, isMounted]);

  const ctaHref = summary.recommendedItem?.href ?? seriesHref;
  const ctaLabel = summary.hasStarted ? t('series.continueReading') : t('series.startReading');

  return (
    <div className="border-border/55 mt-auto flex flex-col gap-2.5 border-t pt-3">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground tabular-nums">
          {t('series.completedCount', { read: summary.completedCount, total: summary.total })}
        </span>
        <span className="text-primary font-mono text-[11px] font-semibold tabular-nums">{summary.percent}%</span>
      </div>
      <div className="bg-muted h-1 w-full overflow-hidden rounded-full" aria-hidden="true">
        <div
          className="bg-primary h-full rounded-full transition-[width] duration-300"
          style={{ width: `${summary.percent}%` }}
        />
      </div>
      <div className="mt-0.5 flex flex-wrap items-center justify-between gap-2">
        <a
          href={ctaHref}
          className="border-primary/25 bg-primary/10 text-primary hover:border-primary/45 hover:bg-primary/16 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
        >
          <Icon icon="ri:play-circle-line" className="size-3.5" aria-hidden="true" />
          <span>{ctaLabel}</span>
        </a>
        <a
          href={seriesHref}
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-0.5 text-xs font-medium transition-colors"
        >
          <span>{t('series.viewAll')}</span>
          <Icon icon="ri:arrow-right-s-line" className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
