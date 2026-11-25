import { cn } from '@lib/utils';
import type { PostRef } from 'types/blog';
import { localizedPath } from '@/i18n';

interface SeriesPostListProps {
  posts: PostRef[];
  currentPostSlug?: string;
  locale?: string;
}

export function SeriesPostList({ posts, currentPostSlug, locale }: SeriesPostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="px-3 py-6 text-center text-xs text-muted-foreground">
        —
      </div>
    );
  }

  return (
    <ul data-series-list className="flex flex-col gap-1 px-1 py-2">
      {posts.map((post, idx) => {
        const isCurrent = post.slug === currentPostSlug;
        return (
          <li key={post.slug}>
            <a
              href={localizedPath(`/post/${post.slug}`, locale)}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'flex items-start gap-2 rounded-lg px-2.5 py-2 text-xs leading-5 transition-colors',
                isCurrent
                  ? 'bg-primary/12 font-semibold text-primary'
                  : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
              )}
            >
              <span className="mt-0.5 shrink-0 font-mono text-[11px] opacity-60 tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="line-clamp-2">{post.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SeriesPostList;
