import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { openSearch } from '@store/modal';

export function SearchTrigger() {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label={t('common.search')}
      title={`${t('common.search')} (Ctrl+K)`}
      className="flex size-10 cursor-pointer items-center justify-center rounded-full transition-[background-color,scale] duration-200 hover:bg-current/15 active:scale-90"
    >
      <Icon icon="ri:search-line" className="size-5" />
    </button>
  );
}
