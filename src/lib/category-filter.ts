import { type CollectionSortDirection, compareCollectionKeys, matchesCollectionFilter } from '@lib/collection-controls';
import { readMotionLevel } from '@lib/motion-level';

function formatCountLabel(template: string | undefined, count: number, locale: string): string {
  if (!template) return String(count);
  const formatted = template.replace('#', String(count));
  if (count === 1) {
    if (locale === 'fr') return formatted.replace(/\barticles\b/, 'article');
    if (locale === 'en') return formatted.replace(/\bposts\b/, 'post');
  }
  return formatted;
}

/**
 * Enhances Archives and Category index pages with lightweight in-place controls:
 * category sub-tabs, instant title/tag filter, Newest/Oldest chronological sorting,
 * live visible counts, and an accessible empty-state reset.
 */
export function setupCategoryFilter(): void {
  let dispose: (() => void) | undefined;

  function init(): void {
    dispose?.();
    const roots = [
      ...new Set([
        ...document.querySelectorAll<HTMLElement>('[data-collection-filter-root]'),
        ...document.querySelectorAll<HTMLElement>('[data-category-filter-root]'),
      ]),
    ];
    if (!roots.length) return;

    const controller = new AbortController();

    for (const root of roots) {
      const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-category-filter]')];
      const searchInput = root.querySelector<HTMLInputElement>('[data-collection-search]');
      const clearBtn = root.querySelector<HTMLButtonElement>('[data-collection-search-clear]');
      const sortButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-collection-sort]')];
      const countEl = root.querySelector<HTMLElement>('[data-collection-count]');
      const emptyEl = root.querySelector<HTMLElement>('[data-collection-empty]');
      const resetBtn = root.querySelector<HTMLButtonElement>('[data-collection-reset]');
      const list = root.querySelector<HTMLElement>('.post-years');
      const yearNav = root.querySelector<HTMLElement>('.timeline-year-nav');
      const locale = list?.dataset.locale ?? 'en';

      if (!tabs.length && !searchInput && !sortButtons.length) continue;

      let activeCategory = '';
      let query = '';
      let sortDir: CollectionSortDirection = 'newest';
      let appliedSortDir: CollectionSortDirection = 'newest';

      const totalRows = root.querySelectorAll<HTMLElement>('.post-row').length;

      const reorderCollection = (direction: CollectionSortDirection) => {
        if (!list) return;
        const years = [...list.querySelectorAll<HTMLElement>(':scope > [data-post-year]')];
        years.sort((a, b) => compareCollectionKeys(a.dataset.sortYear ?? '', b.dataset.sortYear ?? '', direction));
        for (const yearEl of years) {
          list.appendChild(yearEl);

          const monthsContainer = yearEl.querySelector<HTMLElement>('.timeline-months');
          if (monthsContainer) {
            const months = [...monthsContainer.querySelectorAll<HTMLElement>(':scope > .timeline-month-group')];
            months.sort((a, b) => compareCollectionKeys(a.dataset.sortMonth ?? '', b.dataset.sortMonth ?? '', direction));
            for (const monthEl of months) {
              monthsContainer.appendChild(monthEl);
              const rowsList = monthEl.querySelector<HTMLElement>('.post-rows');
              if (rowsList) {
                const rows = [...rowsList.querySelectorAll<HTMLElement>(':scope > .post-row')];
                rows.sort((a, b) => compareCollectionKeys(a.dataset.sortDate ?? '', b.dataset.sortDate ?? '', direction));
                for (const row of rows) rowsList.appendChild(row);
              }
            }
          } else {
            const rowsList = yearEl.querySelector<HTMLElement>('.post-rows');
            if (rowsList) {
              const rows = [...rowsList.querySelectorAll<HTMLElement>(':scope > .post-row')];
              rows.sort((a, b) => compareCollectionKeys(a.dataset.sortDate ?? '', b.dataset.sortDate ?? '', direction));
              for (const row of rows) rowsList.appendChild(row);
            }
          }
        }

        if (yearNav) {
          const pills = [...yearNav.querySelectorAll<HTMLElement>('[data-year-pill]')];
          pills.sort((a, b) => compareCollectionKeys(a.dataset.yearPill ?? '', b.dataset.yearPill ?? '', direction));
          for (const pill of pills) yearNav.appendChild(pill);
        }
      };

      const apply = (animateList = false) => {
        for (const tab of tabs) {
          tab.setAttribute('aria-pressed', String(tab.dataset.categoryFilter === activeCategory));
        }
        for (const btn of sortButtons) {
          btn.setAttribute('aria-pressed', String(btn.dataset.collectionSort === sortDir));
        }
        if (clearBtn) {
          clearBtn.hidden = query.trim().length === 0;
        }

        if (appliedSortDir !== sortDir) {
          reorderCollection(sortDir);
          appliedSortDir = sortDir;
        }

        const years = [...root.querySelectorAll<HTMLElement>('[data-post-year]')];
        let totalVisible = 0;

        for (const yearEl of years) {
          let yearVisible = 0;
          const months = [...yearEl.querySelectorAll<HTMLElement>('.timeline-month-group')];

          if (months.length > 0) {
            for (const monthEl of months) {
              let monthVisible = 0;
              for (const row of monthEl.querySelectorAll<HTMLElement>('.post-row')) {
                const matched = matchesCollectionFilter(
                  {
                    filterKey: row.dataset.filterKey,
                    searchText: row.dataset.searchText ?? row.textContent ?? '',
                  },
                  activeCategory,
                  query,
                );
                row.hidden = !matched;
                if (matched) monthVisible++;
              }
              monthEl.hidden = monthVisible === 0;
              const monthCount = monthEl.querySelector<HTMLElement>('.timeline-month-heading [data-count-template]');
              if (monthCount) {
                monthCount.textContent = formatCountLabel(monthCount.dataset.countTemplate, monthVisible, locale);
              }
              yearVisible += monthVisible;
            }
          } else {
            for (const row of yearEl.querySelectorAll<HTMLElement>('.post-row')) {
              const matched = matchesCollectionFilter(
                {
                  filterKey: row.dataset.filterKey,
                  searchText: row.dataset.searchText ?? row.textContent ?? '',
                },
                activeCategory,
                query,
              );
              row.hidden = !matched;
              if (matched) yearVisible++;
            }
          }

          yearEl.hidden = yearVisible === 0;
          const yearCount = yearEl.querySelector<HTMLElement>('.year-rule [data-count-template]');
          if (yearCount) {
            yearCount.textContent = formatCountLabel(yearCount.dataset.countTemplate, yearVisible, locale);
          }

          const yearKey = yearEl.dataset.sortYear;
          if (yearNav && yearKey) {
            const pill = yearNav.querySelector<HTMLElement>(`[data-year-pill="${yearKey}"]`);
            if (pill) {
              pill.hidden = yearVisible === 0;
              const pillCount = pill.querySelector<HTMLElement>('[data-year-pill-count]');
              if (pillCount) pillCount.textContent = String(yearVisible);
            }
          }

          totalVisible += yearVisible;
        }

        if (countEl) {
          const template = countEl.dataset.template ?? '{visible} / {total}';
          const total = countEl.dataset.total ?? String(totalRows);
          countEl.textContent = template.replace('{visible}', String(totalVisible)).replace('{total}', total);
        }

        if (emptyEl) {
          emptyEl.hidden = totalVisible > 0;
        }

        if (animateList && list && readMotionLevel() !== 'reduced') {
          list.animate({ opacity: [0.35, 1] }, { duration: 160, easing: 'ease-out' });
        }
      };

      root.addEventListener(
        'click',
        (event) => {
          if (!(event.target instanceof Element)) return;

          const tab = event.target.closest<HTMLButtonElement>('[data-category-filter]');
          if (tab?.dataset.categoryFilter !== undefined) {
            activeCategory = tab.dataset.categoryFilter;
            apply(true);
            return;
          }

          const sortBtn = event.target.closest<HTMLButtonElement>('[data-collection-sort]');
          const nextSort = sortBtn?.dataset.collectionSort;
          if (nextSort === 'newest' || nextSort === 'oldest') {
            if (sortDir !== nextSort) {
              sortDir = nextSort;
              apply(true);
            }
            return;
          }

          if (clearBtn && event.target.closest('[data-collection-search-clear]')) {
            query = '';
            if (searchInput) {
              searchInput.value = '';
              searchInput.focus();
            }
            apply(false);
            return;
          }

          if (resetBtn && event.target.closest('[data-collection-reset]')) {
            activeCategory = '';
            query = '';
            if (searchInput) searchInput.value = '';
            apply(true);
          }
        },
        { signal: controller.signal },
      );

      searchInput?.addEventListener(
        'input',
        () => {
          query = searchInput.value;
          apply(false);
        },
        { signal: controller.signal },
      );
    }

    dispose = () => controller.abort();
  }

  if (document.readyState !== 'loading') init();
  document.addEventListener('astro:page-load', init);
  document.addEventListener('astro:before-swap', () => {
    dispose?.();
    dispose = undefined;
  });
}
