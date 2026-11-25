import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { translateCategoryName } from '@lib/content/category-translate';
import { encodeSlug } from '@lib/url';
import { shuffleArray } from '@lib/utils';
import { useMemo } from 'react';
import { localizedPath } from '@/i18n';
import type { PostRefWithCategory } from '@/types/blog';

interface Props {
  postsPool: PostRefWithCategory[]; // Pool to randomly select from
  count: number; // Number of posts to display
  locale?: string;
}

export default function RandomPostList({ postsPool, count, locale }: Props) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  // Shuffle on client-side for fresh randomization on each page load
  const posts = useMemo(() => {
    if (!isMounted) return [];
    if (postsPool.length <= count) {
      return shuffleArray(postsPool);
    }
    return shuffleArray(postsPool).slice(0, count);
  }, [postsPool, count, isMounted]);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-foreground/80 text-2xl font-semibold">{t('post.randomPosts')}</h2>
      <div className="flex flex-col gap-2">
        {posts.map((post, index) => (
          <a
            key={post.slug}
            href={localizedPath(`/post/${encodeSlug(post.link ?? post.slug)}`, locale)}
            className="motion-reveal group hover:bg-foreground/5 hover:text-primary flex gap-3 rounded-md p-2 text-sm transition-colors duration-300 [--rise-y:0.75rem]"
          >
            <span className="text-foreground/30 shrink-0 font-mono">{index + 1}</span>
            <div className="flex min-w-0 flex-col gap-0.5">
              {post.categoryName && (
                <div className="text-foreground/50 truncate text-xs">
                  {locale ? translateCategoryName(post.categoryName, locale) : post.categoryName}
                </div>
              )}
              <div className="text-foreground/80 group-hover:text-primary line-clamp-2 transition-colors">{post.title}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
