/**
 * PostShareActions — Compact article share menu beside Markdown actions.
 *
 * Actions:
 * - Copy canonical article link
 * - Copy Markdown formatted link `[Title](url)`
 * - System share (`navigator.share`) when supported, with automatic fallback to copy link
 */

import { useIsMounted } from '@hooks/useIsMounted';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { copyText } from '@lib/clipboard';
import { buildCanonicalShareUrl, formatMarkdownShareLink } from '@lib/share';
import { cn } from '@lib/utils';
import { useEffect, useRef, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface PostShareActionsProps {
  locale: string;
  title: string;
  description?: string;
}

export default function PostShareActions({ locale, title, description }: PostShareActionsProps) {
  const { t } = useTranslation(locale);
  const isMounted = useIsMounted();
  const [feedback, setFeedback] = useState<'idle' | 'copied'>('idle');
  const [liveMessage, setLiveMessage] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const canNativeShare = isMounted && typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const announce = async (message: string, isError = false) => {
    setLiveMessage(message);
    if (!isError) {
      setFeedback('copied');
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setFeedback('idle'), 1600);
    }
    try {
      const { toast } = await import('sonner');
      if (isError) toast.error(message);
      else toast.success(message);
    } catch {
      // aria-live still announces status
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = buildCanonicalShareUrl(window.location.href);
    const ok = await copyText(shareUrl);
    await announce(ok ? t('share.linkCopied') : t('share.failed'), !ok);
  };

  const handleCopyMarkdown = async () => {
    const markdown = formatMarkdownShareLink(title, window.location.href);
    const ok = await copyText(markdown);
    await announce(ok ? t('share.markdownCopied') : t('share.failed'), !ok);
  };

  const handleNativeShare = async () => {
    const shareUrl = buildCanonicalShareUrl(window.location.href);
    if (typeof navigator.share !== 'function') {
      await handleCopyLink();
      return;
    }
    try {
      await navigator.share({
        title,
        text: description || title,
        url: shareUrl,
      });
      await announce(t('share.shared'));
    } catch (error) {
      // User cancelling the OS share sheet is not an error.
      if (error instanceof DOMException && error.name === 'AbortError') return;
      await handleCopyLink();
    }
  };

  return (
    <div className="flex shrink-0 items-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-share-trigger
            aria-label={t('share.title')}
            title={isMounted ? t('share.title') : undefined}
            className={cn(
              'bg-primary/10 text-primary border-primary/18 hover:border-primary/35 hover:bg-primary/18 data-[state=open]:bg-primary/20',
              'focus-visible:ring-primary/50 flex items-center gap-1 rounded-full border px-2.5 py-1 text-sm transition-[background-color,border-color,transform] duration-200 outline-none focus-visible:ring-2 active:scale-95',
            )}
          >
            <Icon
              icon={feedback === 'copied' ? 'ri:check-line' : 'ri:share-forward-line'}
              aria-hidden="true"
              className="size-3.5 shrink-0"
            />
            <span className="hidden sm:inline">{t('share.title')}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuItem data-share-copy-link onSelect={() => void handleCopyLink()} className="cursor-pointer">
            <Icon icon="ri:link" aria-hidden="true" className="size-4" />
            {t('share.copyLink')}
          </DropdownMenuItem>
          <DropdownMenuItem data-share-copy-md onSelect={() => void handleCopyMarkdown()} className="cursor-pointer">
            <Icon icon="ri:markdown-line" aria-hidden="true" className="size-4" />
            {t('share.copyMarkdown')}
          </DropdownMenuItem>
          {canNativeShare && (
            <DropdownMenuItem onSelect={() => void handleNativeShare()} className="cursor-pointer">
              <Icon icon="ri:share-box-line" aria-hidden="true" className="size-4" />
              {t('share.nativeShare')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
    </div>
  );
}
