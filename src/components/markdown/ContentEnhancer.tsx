import { useTranslation } from '@hooks/useTranslation';
import { useEffect } from 'react';

interface ContentEnhancerProps {
  enableCopy?: boolean;
  enableFullscreen?: boolean;
  enableQuiz?: boolean;
  enableEncryptedBlock?: boolean;
}

export default function ContentEnhancer({ enableCopy = true }: ContentEnhancerProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!enableCopy || typeof document === 'undefined') return;

    const attachCopyButtons = () => {
      const blocks = document.querySelectorAll<HTMLElement>('.custom-content pre');
      blocks.forEach((pre) => {
        if (pre.dataset.copyEnhanced === 'true') return;
        pre.dataset.copyEnhanced = 'true';
        pre.classList.add('relative', 'group');

        const button = document.createElement('button');
        button.type = 'button';
        button.className =
          'code-copy-btn absolute top-2.5 right-2.5 rounded-md border border-border/60 bg-background/85 px-2 py-1 text-[11px] font-medium text-muted-foreground opacity-0 backdrop-blur-sm transition-all hover:text-primary group-hover:opacity-100 focus:opacity-100';
        button.textContent = t('common.copy');
        button.setAttribute('aria-label', t('common.copy'));

        button.addEventListener('click', async () => {
          const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
          try {
            await navigator.clipboard.writeText(code);
            button.textContent = t('common.copied');
            window.setTimeout(() => {
              button.textContent = t('common.copy');
            }, 1600);
          } catch {
            // Clipboard may be unavailable in restricted contexts
          }
        });

        pre.appendChild(button);
      });
    };

    attachCopyButtons();
    document.addEventListener('astro:page-load', attachCopyButtons);
    return () => {
      document.removeEventListener('astro:page-load', attachCopyButtons);
    };
  }, [enableCopy, t]);

  return null;
}
