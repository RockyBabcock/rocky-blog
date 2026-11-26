import { useEscapeKey, useKeyboardShortcut } from '@hooks/useKeyboardShortcut';
import { useStore } from '@nanostores/react';
import { $isCommandOpen, closeModal, toggleModal } from '@store/modal';
import { useEffect, useState } from 'react';

const loadCommandPalette = () => import('./CommandPaletteContent');

export function preloadCommandPalette(): void {
  void loadCommandPalette().catch(() => {});
}

/**
 * Global Command Palette trigger host.
 * Binds `Ctrl+K` / `Cmd+K` globally (even inside inputs) and lazy-loads UI on first open.
 */
export default function CommandPalette() {
  const open = useStore($isCommandOpen);
  const [Content, setContent] = useState<typeof import('./CommandPaletteContent').default | null>(null);

  useKeyboardShortcut({
    key: 'k',
    modifiers: ['meta'],
    handler: () => toggleModal('command'),
    ignoreInputs: false,
  });
  useEscapeKey(() => closeModal(), open);

  useEffect(() => {
    if (!open || Content) return;
    let cancelled = false;
    void loadCommandPalette()
      .then((mod) => {
        if (!cancelled) setContent(() => mod.default);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error('[CommandPalette] Failed to load:', error);
          closeModal();
        }
      });
    return () => {
      cancelled = true;
    };
  }, [open, Content]);

  useEffect(() => {
    const closeForNavigation = () => closeModal();
    document.addEventListener('astro:before-preparation', closeForNavigation);
    return () => document.removeEventListener('astro:before-preparation', closeForNavigation);
  }, []);

  return Content ? <Content /> : null;
}
