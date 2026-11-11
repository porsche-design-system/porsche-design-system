import { createElement } from 'preact';
import { assertCommentText, commentTag } from '../../lib/comment.ts';

type CommentProps = {
  /** Why the markup below is written the way it is – plain text, without `--`, `<`, `>` or `&`. */
  children: string;
};

/**
 * An HTML comment in the markup of an example, explaining the element that follows it.
 *
 * It reaches the `index.html` of the example, and with it the code view of the storefront, StackBlitz and the knowledge
 * skill – so the reason for a technique is read where the markup is copied. Write why, not what: the classes say
 * what. Tailwind scans the `index.html`, comments included, so a comment must not contain a word that reads like a
 * utility, e.g. a class name – a unit test compiles every comment of every page to keep them free of them.
 */
export const Comment = ({ children }: CommentProps) => {
  assertCommentText(children);

  return createElement(commentTag, { dangerouslySetInnerHTML: { __html: children } });
};
