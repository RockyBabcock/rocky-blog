import { HomeSiderSegmentType } from '@constants/enum';
import { useTranslation } from '@hooks/useTranslation';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { homeSiderSegmentType } from '@store/app';
import { useEffect } from 'react';

interface HomeSiderSegmentedProps {
  className?: string;
  itemClass?: string;
  defaultValue?: HomeSiderSegmentType;
}

export default function HomeSiderSegmented({
  className,
  itemClass,
  defaultValue = HomeSiderSegmentType.DIRECTORY,
}: HomeSiderSegmentedProps) {
  const { t } = useTranslation();
  const active = useStore(homeSiderSegmentType);

  useEffect(() => {
    homeSiderSegmentType.set(defaultValue);
  }, [defaultValue]);

  const items: Array<{ type: HomeSiderSegmentType; label: string }> = [
    { type: HomeSiderSegmentType.DIRECTORY, label: t('post.toc') },
    { type: HomeSiderSegmentType.SERIES, label: t('post.series') },
    { type: HomeSiderSegmentType.INFO, label: t('post.info') },
  ];

  return (
    <div
      role="tablist"
      className={cn('inline-flex rounded-xl bg-muted/70 p-1 text-muted-foreground', className)}
    >
      {items.map((item) => {
        const isSelected = active === item.type;
        return (
          <button
            key={item.type}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => homeSiderSegmentType.set(item.type)}
            className={cn(
              'cursor-pointer rounded-lg px-2.5 py-1.5 text-center font-medium text-xs transition-all',
              isSelected ? 'bg-card text-primary shadow-sm' : 'hover:text-foreground',
              itemClass,
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
