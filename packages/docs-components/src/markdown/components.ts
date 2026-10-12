import type { BlockContent, Blockquote, List, Paragraph } from 'mdast';
import type { DependencyListProps, NotificationProps, TableOfContentsProps, TargetOnlyProps } from '../props';
import { defineMarkdownComponent } from './define';

/** The Markdown implementations, resolved instead of `src/react` under the `markdown` export condition. */

export const TableOfContents = defineMarkdownComponent<TableOfContentsProps>('TableOfContents', () => []);

export const Notification = defineMarkdownComponent<NotificationProps>(
  'Notification',
  ({ heading, children }, { renderChildren }) => {
    const headingParagraph: Paragraph[] = heading
      ? [{ type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', value: heading }] }] }]
      : [];
    const blockquote: Blockquote = {
      type: 'blockquote',
      children: [...headingParagraph, ...(renderChildren(children) as BlockContent[])],
    };
    return [blockquote];
  }
);

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

export const StorefrontOnly = defineMarkdownComponent<TargetOnlyProps>('StorefrontOnly', () => []);

export const MarkdownOnly = defineMarkdownComponent<TargetOnlyProps>(
  'MarkdownOnly',
  ({ children }, { renderChildren }) => renderChildren(children)
);
