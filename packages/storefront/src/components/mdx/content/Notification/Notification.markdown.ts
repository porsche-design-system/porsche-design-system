import { defineMarkdownComponent, type MarkdownComponentOf } from '@porsche-design-system/docs-components/markdown';
import type { BlockContent, Paragraph } from 'mdast';
import type { Notification as ReactNotification } from './Notification';

/**
 * A blockquote. The heading, if set, is its first paragraph, in bold; the children follow as blocks. With `frameworks`,
 * only the Markdown of those frameworks has it. `state` and `headingTag` only affect the Storefront.
 *
 * @example
 * > **Note**
 * >
 * > See [Partials](https://designsystem.porsche.com/v4/partials/).
 */
export const Notification: MarkdownComponentOf<typeof ReactNotification> = defineMarkdownComponent(
  'Notification',
  ({ heading, frameworks, children }, { framework, renderChildren }) => {
    if (frameworks && !frameworks.includes(framework)) {
      return [];
    }
    const headingParagraph: Paragraph[] = heading
      ? [{ type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', value: heading }] }] }]
      : [];
    return [{ type: 'blockquote', children: [...headingParagraph, ...(renderChildren(children) as BlockContent[])] }];
  }
);
