/**
 * Post Table Component
 *
 * Displays a sortable table of blog posts with actions.
 */

import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import type { SortField, SortOrder } from '@/hooks';
import { cn } from '@/lib/utils';
import type { PostListItem } from '@/types';

interface SortableHeaderProps {
  label: string;
  field: SortField;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

function SortableHeader({ label, field, sortField, sortOrder, onSort }: SortableHeaderProps) {
  const isActive = field === sortField;
  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className={cn('flex items-center gap-1 text-xs font-medium tracking-wide uppercase', isActive && 'text-primary')}
    >
      {label}
      <Icon
        icon={isActive ? (sortOrder === 'asc' ? 'ri:arrow-up-s-fill' : 'ri:arrow-down-s-fill') : 'ri:arrow-up-down-line'}
        className={cn('size-4', !isActive && 'opacity-50')}
      />
    </button>
  );
}

interface PostTableProps {
  posts: PostListItem[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onToggleDraft: (postId: string) => void;
  onToggleSticky?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  onOpenInEditor?: (postId: string) => void;
}

export function PostTable({
  posts,
  sortField,
  sortOrder,
  onSort,
  onToggleDraft,
  onToggleSticky,
  onEdit,
  onOpenInEditor,
}: PostTableProps) {
  if (posts.length === 0) {
    return (
      <div className="border-border flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <Icon icon="ri:file-list-3-line" className="text-muted-foreground size-12" />
        <p className="text-muted-foreground mt-2 font-medium">No posts found</p>
      </div>
    );
  }

  return (
    <div className="border-border overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-border bg-muted/50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">
                <SortableHeader label="Title" field="title" sortField={sortField} sortOrder={sortOrder} onSort={onSort} />
              </th>
              <th className="hidden px-4 py-3 text-left md:table-cell">
                <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Category</span>
              </th>
              <th className="hidden px-4 py-3 text-left lg:table-cell">
                <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Tags</span>
              </th>
              <th className="px-4 py-3 text-left">
                <SortableHeader label="Date" field="date" sortField={sortField} sortOrder={sortOrder} onSort={onSort} />
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Status</span>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {post.sticky && (
                      <span title="Sticky">
                        <Icon icon="ri:pushpin-fill" className="size-4 shrink-0 text-orange-500" />
                      </span>
                    )}
                    <span className="line-clamp-1 text-sm font-medium">{post.title}</span>
                  </div>
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <span className="text-muted-foreground text-sm">{post.categories.join(' > ') || '-'}</span>
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-muted rounded-md px-2 py-0.5 text-xs">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                    {post.tags.length === 0 && <span className="text-muted-foreground text-xs">-</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-muted-foreground text-sm">{format(new Date(post.date), 'yyyy-MM-dd')}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-xs',
                      post.draft ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500',
                    )}
                  >
                    {post.draft ? 'Draft' : 'Published'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(post.id)}
                        className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1.5 transition-colors"
                        title="Edit post"
                      >
                        <Icon icon="ri:edit-line" className="size-4" />
                      </button>
                    )}
                    {onOpenInEditor && (
                      <button
                        type="button"
                        onClick={() => onOpenInEditor(post.id)}
                        className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1.5 transition-colors"
                        title="Open in VS Code"
                      >
                        <Icon icon="ri:vscode-line" className="size-4" />
                      </button>
                    )}
                    {onToggleSticky && (
                      <button
                        type="button"
                        onClick={() => onToggleSticky(post.id)}
                        className={cn(
                          'hover:bg-accent hover:text-foreground rounded-md p-1.5 transition-colors',
                          post.sticky ? 'text-orange-500' : 'text-muted-foreground',
                        )}
                        title={post.sticky ? 'Unpin post' : 'Pin post'}
                      >
                        <Icon icon={post.sticky ? 'ri:pushpin-fill' : 'ri:pushpin-line'} className="size-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onToggleDraft(post.id)}
                      className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1.5 transition-colors"
                      title={post.draft ? 'Publish' : 'Mark as draft'}
                    >
                      <Icon icon={post.draft ? 'ri:check-line' : 'ri:draft-line'} className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
