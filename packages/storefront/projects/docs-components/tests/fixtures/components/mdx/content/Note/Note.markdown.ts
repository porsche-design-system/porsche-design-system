import type { BlockContent } from 'mdast';
import { defineMarkdownComponent, type MarkdownComponentOf } from '../../../../../../src/renderer';
import type { Note as ReactNote } from './Note';

/** Its Markdown implementation, which the hook resolves the folder to: a blockquote under its heading in bold. */
export const Note: MarkdownComponentOf<typeof ReactNote> = defineMarkdownComponent(
  'Note',
  ({ heading, children }, { renderChildren }) => [
    {
      type: 'blockquote',
      children: [
        { type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', value: heading }] }] },
        ...(renderChildren(children) as BlockContent[]),
      ],
    },
  ]
);
