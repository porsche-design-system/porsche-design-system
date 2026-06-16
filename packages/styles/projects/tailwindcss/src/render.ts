import type { CssNode, ThemeBranch } from './types';

/** Whether a meta branch is a concrete {@link CssNode} leaf (vs. a grouping record/array). */
const isLeaf = (node: ThemeBranch): node is CssNode => 'property' in node || 'selector' in node || 'raw' in node;

/** Recursively flatten any meta branch into a flat {@link CssNode} list, in source order. */
export const flatten = (node: ThemeBranch): CssNode[] =>
  Array.isArray(node) ? node.flatMap(flatten) : isLeaf(node) ? [node] : Object.values(node).flatMap(flatten);

/**
 * Serializes a single {@link CssNode}. Declarations and rules render structurally,
 * while {@link CssRaw} nodes (and rules carrying `raw`) are emitted verbatim.
 * Indentation and blank lines are normalized afterwards by Prettier.
 */
export const renderNode = (node: CssNode): string => {
  if ('property' in node) {
    const comment = 'comment' in node && node.comment ? `/* ${node.comment} */\n` : '';
    return `${comment}${node.property}: ${node.value};`;
  }
  if ('selector' in node) {
    const body = node.raw !== undefined ? node.raw : (node.declarations ?? []).map(renderNode).join('\n');
    return `${node.comment ? `/* ${node.comment} */\n` : ''}${node.selector} {\n${body}\n}`;
  }
  return node.raw;
};
