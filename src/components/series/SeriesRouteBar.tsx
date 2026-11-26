/**
 * SeriesRouteBar — Series reading progress bar & issue status enhancer.
 *
 * Reads local reading history (single source of truth) to compute completion
 * progress for the current series, render a Continue/Start Reading CTA, and
 * hydrate subtle status badges onto `[data-series-issue-slug]` elements in the DOM.
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { computeSeriesProgress, type SeriesRouteItem } from '@lib/series-progress';
import { useStore } from '@nanostores/react';
import { $readingHistory, initReadingHistory } from '@store/reading-history';
import { useEffect, useMemo } from 'react';

interface SeriesRouteBarProps {
  locale: string;
  items: SeriesRouteItem[];
}

export default function SeriesRouteBar({ locale, items }: SeriesRouteBarProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const history = useStore($readingHistory);

  useEffect(() => {
    initReadingHistory();
  }, []);

  const summary = useMemo(() => computeSeriesProgress(items, history), [items, history]);

  // Hydrate subtle per-issue status pills on static SeriesIssues rows
  useEffect(() => {
    if (!isMounted) return;
    const completedSet = new Set(summary.completedSlugs);
    document.querySelectorAll<HTMLElement>('[data-series-issue-slug]').forEach((row) => {
      const slug = row.dataset.seriesIssueSlug;
      const badge = row.querySelector<HTMLElement>('[data-series-issue-status]');
      if (!slug || !badge) return;
      const progress = summary.progressBySlug[slug] ?? 0;
      if (completedSet.has(slug)) {
        badge.textContent = t('series.statusRead');
        badge.dataset.status = 'completed';
        badge.hidden = false;
      } else if (progress > 0) {
        badge.textContent = t('series.statusInProgress', { percent: progress });
        badge.dataset.status = 'in-progress';
        badge.hidden = false;
      } else {
        badge.textContent = '';
        delete badge.dataset.status;
        badge.hidden = true;
      }
    });
  }, [isMounted, summary, t]);

  if (items.length === 0) return null;

  const target = summary.recommendedItem ?? items[0];
  const ctaLabel = summary.hasStarted ? t('series.continueReading') : t('series.startReading');
  const displayPercent = isMounted ? summary.percent : 0;
  const displayCompleted = isMounted ? summary.completedCount : 0;

  return (
    <section
      aria-label={t('series.progressTitle')}
      data-series-route-bar
      className="border-primary/15 bg-primary/[0.03] mb-6 rounded-xl border p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Icon icon="ri:route-line" className="text-primary size-4 shrink-0" aria-hidden="true" />
            <span className="text-foreground font-semibold">{t('series.progressTitle')}</span>
            <span className="text-muted-foreground text-xs tabular-nums" data-series-progress-text>
              {t('series.completedCount', { read: displayCompleted, total: summary.total })}
            </span>
          </div>
          <div className="bg-muted mt-2.5 h-2 w-full max-w-md overflow-hidden rounded-full" aria-hidden="true">
            <div
              className="bg-primary h-full rounded-full transition-[width] duration-300"
              style={{ width: `${displayPercent}%` }}
            />
          </div>
        </div>

        {target && (
          <a
            href={target.href}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors"
          >
            <span>{ctaLabel}</span>
            <Icon icon="ri:arrow-right-line" className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}
