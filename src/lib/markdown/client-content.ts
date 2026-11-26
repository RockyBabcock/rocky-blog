import type { ClientDirective } from 'astro';

declare module 'astro' {
  interface AstroClientDirectives {
    'client:content'?: boolean | string;
  }
}

const DEFAULT_CONTENT_SELECTOR =
  'pre, .note-block:not(.no-icon), .encrypted-post[data-cipher], .encrypted-block[data-cipher], details.collapse-block';

/** Hydrate the portal owner when any of its content needs controls, including anchor jumps. */
const contentDirective: ClientDirective = (load, options, island) => {
  let container = island.previousElementSibling;
  // Astro emits directive, renderer scripts, and sibling content islands between the content and this island.
  while (container?.matches('script, style, astro-island')) container = container.previousElementSibling;
  let observer: IntersectionObserver | undefined;
  let disposed = false;
  let started = false;
  const cleanup = () => {
    disposed = true;
    observer?.disconnect();
    document.removeEventListener('astro:before-swap', cleanup);
  };
  const hydrate = async () => {
    if (started || disposed) return;
    started = true;
    observer?.disconnect();
    const start = await load();
    if (!disposed && island.isConnected) await start();
    cleanup();
  };
  const start = () => {
    void hydrate().catch((error: unknown) => {
      cleanup();
      console.error('Content enhancement failed to load:', error);
    });
  };

  if (
    !(container instanceof HTMLElement) ||
    !container.classList.contains('custom-content') ||
    !('IntersectionObserver' in window)
  ) {
    start();
    return;
  }
  const selector = typeof options.value === 'string' && options.value.trim() ? options.value : DEFAULT_CONTENT_SELECTOR;
  const targets = container.querySelectorAll(selector);
  if (targets.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
    },
    { rootMargin: '800px' },
  );
  for (const target of targets) observer.observe(target);
  document.addEventListener('astro:before-swap', cleanup);
};

export default contentDirective;
