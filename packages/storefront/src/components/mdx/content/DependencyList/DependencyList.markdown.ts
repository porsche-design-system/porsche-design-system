import { defineMarkdownComponent, type MarkdownComponentOf } from '@porsche-design-system/docs-components/markdown';
import type { DependencyList as ReactDependencyList } from './DependencyList';

/**
 * A bullet list with one inline code item per dependency, so an agent can copy the specifiers as they are.
 *
 * @example
 * - `vite@8`
 * - `@porsche-design-system/components-react@4`
 */
export const DependencyList: MarkdownComponentOf<typeof ReactDependencyList> = defineMarkdownComponent(
  'DependencyList',
  ({ items }) => [
    {
      type: 'list',
      ordered: false,
      spread: false,
      children: items.map((item) => ({
        type: 'listItem',
        spread: false,
        children: [{ type: 'paragraph', children: [{ type: 'inlineCode', value: item }] }],
      })),
    },
  ]
);
