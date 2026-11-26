import { type OptionType, Segmented } from '@components/ui/segmented';
import type { HomeSiderSegmentType } from '@constants/enum';
import { HomeSiderSegmentType as SegmentTypeEnum } from '@constants/enum';
import { useTranslation } from '@hooks/useTranslation';
import { homeSiderSegmentType } from '@store/app';
import React from 'react';
import { cn } from '@/lib/utils';

type HomeSiderSegmentedProps = {
  defaultValue?: HomeSiderSegmentType; // 默认值
  className?: string;
  indicateClass?: string;
  itemClass?: string;
  value?: HomeSiderSegmentType; // 受控
};

export const HomeSiderSegmented = ({ className, ...props }: HomeSiderSegmentedProps) => {
  const { t } = useTranslation();

  const options: OptionType<HomeSiderSegmentType>[] = [
    {
      label: t('sider.overview'),
      value: SegmentTypeEnum.INFO,
      icon: 'ri:dashboard-3-line',
    },
    {
      label: t('sider.toc'),
      value: SegmentTypeEnum.DIRECTORY,
      icon: 'ri:list-ordered-2',
    },
    {
      label: t('sider.series'),
      value: SegmentTypeEnum.SERIES,
      icon: 'ri:article-line',
    },
  ];

  return (
    <Segmented<HomeSiderSegmentType>
      {...props}
      options={options}
      className={cn('bg-foreground/6', className)}
      onChange={(value) => homeSiderSegmentType.set(value)}
    />
  );
};

HomeSiderSegmented.displayName = 'HomeSiderSegmented';
export default React.memo(HomeSiderSegmented);
