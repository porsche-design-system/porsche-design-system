import type { FrameworkMarkup } from '@porsche-design-system/shared';
import type { A11yComment, A11yNode } from '@/models/accessibilityMeta';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const renderComment: Record<keyof FrameworkMarkup, (comment: string) => string> = {
  'vanilla-js': (comment) => `<!-- ${comment} -->`,
  angular: (comment) => `<!-- ${comment} -->`,
  vue: (comment) => `<!-- ${comment} -->`,
  react: (comment) => `{/* ${comment} */}`,
};

const isComment = (node: Exclude<A11yNode, string | undefined>): node is A11yComment => 'comment' in node;

/**
 * Lowers the `A11yComment` nodes of a generated accessibility story into the comment syntax of the
 * target framework, so a snippet is valid in the language its code fence claims — JSX needs
 * `{/* … *\/}` where the template-based frameworks need `<!-- … -->`. Applied recursively, since
 * comments also appear as element children.
 *
 * Doing this here keeps the concept out of the shared generator pipeline: what leaves this function
 * is an ordinary `ElementConfig` tree that the framework generators already understand.
 */
export const renderExampleComments = (
  nodes: A11yNode[],
  framework: keyof FrameworkMarkup
): (string | ElementConfig<HTMLTagOrComponent> | undefined)[] =>
  nodes.map((node) => {
    if (node === undefined || typeof node === 'string') {
      return node;
    }
    if (isComment(node)) {
      return renderComment[framework](node.comment);
    }
    const { children, ...element } = node;
    return children ? { ...element, children: renderExampleComments(children, framework) } : element;
  });
