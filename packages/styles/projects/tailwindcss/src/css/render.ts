import { getDeprecationComment, isDeprecated } from '@porsche-design-system/shared/deprecation';
import type { CssNode, TailwindMeta, ThemeBranch } from '../types';

/** Whether a meta branch is a concrete {@link CssNode} leaf (vs. a grouping record/array). */
const isLeaf = (node: ThemeBranch): node is CssNode => 'property' in node || 'selector' in node || 'raw' in node;

/** Recursively flatten any meta branch into a flat {@link CssNode} list, in source order. */
export const flatten = (node: ThemeBranch): CssNode[] =>
  Array.isArray(node) ? node.flatMap(flatten) : isLeaf(node) ? [node] : Object.values(node).flatMap(flatten);

/** Walk a catalog into the same tree without its deprecated declarations. Leaves keep their identity. */
export const stripDeprecated = <T>(branch: T): TailwindMeta<T> =>
  (Array.isArray(branch)
    ? branch.filter((node) => !isDeprecated(node)).map(stripDeprecated)
    : isLeaf(branch as ThemeBranch)
      ? branch
      : Object.fromEntries(
          Object.entries(branch as object)
            .filter(([, node]) => !isDeprecated(node))
            .map(([key, node]) => [key, stripDeprecated(node)])
        )) as TailwindMeta<T>;

/**
 * Serializes a single {@link CssNode}. Declarations and rules render structurally,
 * while {@link CssRaw} nodes (and rules carrying `raw`) are emitted verbatim.
 * Indentation and blank lines are normalized afterwards by Prettier.
 */
export const renderNode = (node: CssNode): string => {
  if ('property' in node) {
    // CSS has no silent comment, so this ships to every consumer of `index.css`. At nine
    // declarations that is ~830 bytes, which buys the same guidance every other source generates.
    const comment = isDeprecated(node)
      ? `${getDeprecationComment(node.deprecation, 'block')}\n`
      : 'comment' in node && node.comment
        ? `/* ${node.comment} */\n`
        : '';
    return `${comment}${node.property}: ${node.value};`;
  }
  if ('selector' in node) {
    const body = node.raw !== undefined ? node.raw : (node.declarations ?? []).map(renderNode).join('\n');
    return `${node.comment ? `/* ${node.comment} */\n` : ''}${node.selector} {\n${body}\n}`;
  }
  return node.raw;
};
