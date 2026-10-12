import type { BlockContent, Blockquote, Paragraph } from 'mdast';
import { defineMarkdownComponent } from '../../renderer/define';
import type { NotificationProps } from './Notification';

/**
 * A blockquote. The heading, if set, is its first paragraph, in bold; the children follow as blocks. `state` and
 * `headingTag` only affect the Storefront.
 *
 * @example
 * > **Note**
 * >
 * > See [Partials](https://designsystem.porsche.com/v4/partials/).
 */
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
