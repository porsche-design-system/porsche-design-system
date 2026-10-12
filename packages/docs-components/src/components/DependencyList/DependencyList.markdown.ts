import type { List } from 'mdast';
import { defineMarkdownComponent } from '../../renderer/define';
import type { DependencyListProps } from './DependencyList';

/**
 * A bullet list with one inline code item per dependency, so an agent can copy the specifiers as they are.
 *
 * @example
 * - `vite@8`
 * - `@porsche-design-system/components-react@4`
 */
export const DependencyList = defineMarkdownComponent<DependencyListProps>('DependencyList', ({ items }) => {
  const list: List = {
    type: 'list',
    ordered: false,
    spread: false,
    children: items.map((item) => ({
      type: 'listItem',
      spread: false,
      children: [{ type: 'paragraph', children: [{ type: 'inlineCode', value: item }] }],
    })),
  };
  return [list];
});
