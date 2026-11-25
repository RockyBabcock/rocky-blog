import type { Heading } from '@lib/toc';
import { cn } from '@lib/utils';
import { useTocContext } from './TocContext';

interface HeadingListProps {
  headings: Heading[];
  numbered?: boolean;
  depth?: number;
  prefix?: string;
}

export function HeadingList({ headings, numbered = true, depth = 0, prefix = '' }: HeadingListProps) {
  const { activeId, onHeadingClick } = useTocContext();

  if (!headings || headings.length === 0) return null;

  return (
    <ul className={cn('flex flex-col gap-0.5', depth > 0 && 'ml-3 border-l border-border/60 pl-2.5')}>
      {headings.map((heading, idx) => {
        const numberLabel = prefix ? `${prefix}.${idx + 1}` : `${idx + 1}`;
        const isActive = activeId === heading.id;

        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              data-heading-id={heading.id}
              aria-current={isActive ? 'location' : undefined}
              onClick={(e) => {
                e.preventDefault();
                onHeadingClick(heading.id);
              }}
              className={cn(
                'flex items-baseline gap-1.5 rounded-md px-2 py-1 text-xs leading-5 transition-colors',
                isActive
                  ? 'bg-primary/10 font-semibold text-primary'
                  : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
              )}
            >
              {numbered && (
                <span className="shrink-0 font-mono text-[11px] opacity-65 tabular-nums">{numberLabel}.</span>
              )}
              <span className="truncate">{heading.text}</span>
            </a>
            {heading.children && heading.children.length > 0 && (
              <HeadingList headings={heading.children} numbered={numbered} depth={depth + 1} prefix={numberLabel} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
