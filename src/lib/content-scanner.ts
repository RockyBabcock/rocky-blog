/**
 * DOM scanning functions for ContentEnhancer.
 *
 * Each scanner finds elements of a specific type in a container,
 * creates mount points for React portals, and returns ToolbarEntry objects.
 * Extracted to keep ContentEnhancer focused on rendering.
 */

import { extractLanguage, isInfographicBlock, wrapElement } from './content-enhancer-utils';

export interface ToolbarEntry {
  id: string;
  type: 'code' | 'mermaid' | 'infographic' | 'note' | 'encrypted' | 'encrypted-post';
  mountPoint: HTMLElement;
  preElement: HTMLElement;
}

/** Scan <pre> elements and categorize as code/mermaid/infographic */
export function scanPreElements(container: Element): ToolbarEntry[] {
  const entries: ToolbarEntry[] = [];
  const preElements = container.querySelectorAll<HTMLElement>('pre');

  preElements.forEach((pre, index) => {
    if (pre.dataset.reactEnhanced === 'true') return;
    const language = extractLanguage(pre);

    if (language === 'mermaid') {
      const wrapper = wrapElement(pre, 'mermaid-wrapper');
      const mount = wrapper.querySelector('.mermaid-wrapper-toolbar-mount') as HTMLElement;
      pre.dataset.reactEnhanced = 'true';
      entries.push({ id: `mermaid-${index}`, type: 'mermaid', mountPoint: mount, preElement: pre });
    } else if (isInfographicBlock(pre)) {
      const wrapper = wrapElement(pre, 'infographic-wrapper');
      const mount = wrapper.querySelector('.infographic-wrapper-toolbar-mount') as HTMLElement;
      pre.dataset.reactEnhanced = 'true';
      entries.push({ id: `infographic-${index}`, type: 'infographic', mountPoint: mount, preElement: pre });
    } else {
      const wrapper = wrapElement(pre, 'code-block-wrapper');
      const mount = wrapper.querySelector('.code-block-wrapper-toolbar-mount') as HTMLElement;
      pre.dataset.reactEnhanced = 'true';
      entries.push({ id: `code-${index}`, type: 'code', mountPoint: mount, preElement: pre });
    }
  });

  return entries;
}

/** Scan note blocks for icon injection */
export function scanNoteBlocks(container: Element): ToolbarEntry[] {
  const entries: ToolbarEntry[] = [];
  const noteBlocks = container.querySelectorAll<HTMLElement>('.note-block:not(.no-icon)');

  noteBlocks.forEach((noteBlock, nIndex) => {
    if (noteBlock.dataset.reactEnhanced === 'true') return;
    const mount = document.createElement('span');
    mount.className = 'note-icon-mount';
    noteBlock.insertBefore(mount, noteBlock.firstChild);
    noteBlock.dataset.reactEnhanced = 'true';
    entries.push({ id: `note-${nIndex}`, type: 'note', mountPoint: mount, preElement: noteBlock });
  });

  return entries;
}

/** Scan encrypted posts (full-page encryption) */
export function scanEncryptedPosts(container: Element): ToolbarEntry[] {
  const entries: ToolbarEntry[] = [];
  const posts = container.querySelectorAll<HTMLElement>('.encrypted-post[data-cipher]');

  posts.forEach((post, pIndex) => {
    if (post.dataset.reactEnhanced === 'true') return;
    const mount = document.createElement('div');
    mount.className = 'encrypted-post-mount';
    post.appendChild(mount);
    post.dataset.reactEnhanced = 'true';
    entries.push({ id: `encrypted-post-${pIndex}`, type: 'encrypted-post', mountPoint: mount, preElement: post });
  });

  return entries;
}

/** Scan encrypted blocks */
export function scanEncryptedBlocks(container: Element): ToolbarEntry[] {
  const entries: ToolbarEntry[] = [];
  const blocks = container.querySelectorAll<HTMLElement>('.encrypted-block[data-cipher]');

  blocks.forEach((block, eIndex) => {
    if (block.dataset.reactEnhanced === 'true') return;
    const mount = document.createElement('div');
    mount.className = 'encrypted-block-mount';
    block.appendChild(mount);
    block.dataset.reactEnhanced = 'true';
    entries.push({ id: `encrypted-${eIndex}`, type: 'encrypted', mountPoint: mount, preElement: block });
  });

  return entries;
}
