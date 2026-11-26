/**
 * Link detection utilities for markdown processing
 */

/** 通用 Markdown AST 节点类型 */
export interface MarkdownNode {
  type: string;
  children?: Array<{ type: string; url?: string; value?: string; children?: Array<{ type: string; value?: string }> }>;
}

/**
 * Check if a node is a standalone paragraph with only a link.
 * Used in remark plugin to detect links that should be converted to OG preview cards.
 */
export function isStandaloneLinkParagraph(node: MarkdownNode): boolean {
  // Check if node is a paragraph
  if (node.type !== 'paragraph') {
    return false;
  }

  // Check if paragraph has exactly one child
  if (!node.children || node.children.length !== 1) {
    return false;
  }

  const child = node.children[0];

  // Check if the child is a link
  if (child.type !== 'link') {
    return false;
  }

  // Check if link text is the same as URL (auto-linked URL)
  // or if link only contains text matching the URL
  if (child.children && child.children.length === 1) {
    const textNode = child.children[0];
    if (textNode.type === 'text') {
      // Allow the link if text is the URL itself or very similar
      const text = textNode.value?.trim() ?? '';
      const url = child.url?.trim() ?? '';
      return text === url || url.endsWith(text) || text.endsWith(url);
    }
  }

  return false;
}
