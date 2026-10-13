import { defineMarkdownComponent } from '../../renderer/define';
import type { MarkdownOnlyProps } from './MarkdownOnly';

/**
 * Its children, rendered like any other part of the page, without a wrapper.
 *
 * @example
 * Next, run `npx pds-skill` to link the `pds-knowledge-react` skill.
 */
export const MarkdownOnly = defineMarkdownComponent<MarkdownOnlyProps>(
  'MarkdownOnly',
  ({ children }, { renderChildren }) => renderChildren(children)
);
