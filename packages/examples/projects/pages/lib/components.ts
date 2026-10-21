import { componentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';

/**
 * The components a page is built from, each by the component documenting it – a sub-component such as
 * `p-drilldown-link` is documented by its parent, preferably one the page renders as well.
 */
export const getComponents = (markup: string): TagName[] => {
  const meta = componentMeta as Record<string, { requiredParent?: string | string[] }>;
  const tags = new Set(Array.from(markup.matchAll(/<(p-[a-z0-9-]+)/g), ([, tag]) => tag));

  const getDocumentedTag = (tag: string, visited: ReadonlySet<string> = new Set()): string | undefined => {
    if (!meta[tag] || visited.has(tag)) {
      return undefined;
    }
    const parents = [meta[tag].requiredParent ?? []].flat();
    if (parents.length === 0) {
      return tag;
    }
    const parent = parents.find((candidate) => tags.has(candidate)) ?? parents[0];
    return getDocumentedTag(parent, new Set([...visited, tag]));
  };

  return [...new Set([...tags].flatMap((tag) => getDocumentedTag(tag) ?? []))].sort() as TagName[];
};
