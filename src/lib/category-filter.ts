export function setupCategoryFilter() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-category-filter]');
  const rows = document.querySelectorAll<HTMLElement>('.post-row[data-filter-key]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.categoryFilter || 'all';
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      rows.forEach((row) => {
        const key = row.dataset.filterKey || '';
        const visible = target === 'all' || key === target || key.startsWith(`${target}/`);
        row.style.display = visible ? '' : 'none';
      });
    });
  });
}
