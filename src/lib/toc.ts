export interface Heading {
  depth: number;
  slug: string;
  text: string;
  id: string;
  level: number;
  children?: Heading[];
}

export function buildHeadingTree(
  items: Array<{ id: string; text: string; level: number }>,
): Heading[] {
  const roots: Heading[] = [];
  const stack: Heading[] = [];

  for (const item of items) {
    const node: Heading = {
      id: item.id,
      slug: item.id,
      text: item.text,
      level: item.level,
      depth: item.level,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      roots.push(node);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    }
    stack.push(node);
  }

  return roots;
}

export function flattenHeadings(headings: Heading[]): Heading[] {
  const result: Heading[] = [];
  const visit = (nodes: Heading[]) => {
    for (const node of nodes) {
      result.push(node);
      if (node.children?.length) {
        visit(node.children);
      }
    }
  };
  visit(headings);
  return result;
}

export function findHeadingById(headings: Heading[], id: string): Heading | null {
  if (!id) return null;
  for (const h of headings) {
    if (h.id === id || h.slug === id) return h;
    if (h.children?.length) {
      const found = findHeadingById(h.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function chapterIndexOf(headings: Heading[], activeId: string): number {
  if (!activeId) return 0;
  for (let i = 0; i < headings.length; i += 1) {
    const h = headings[i];
    if (h.id === activeId || h.slug === activeId) return i + 1;
    if (h.children?.length && findHeadingById(h.children, activeId)) {
      return i + 1;
    }
  }
  return 0;
}
