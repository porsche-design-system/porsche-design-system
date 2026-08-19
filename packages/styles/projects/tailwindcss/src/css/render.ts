import { isDeprecated } from '@porsche-design-system/shared/deprecation';
import type { CssNode, ThemeBranch } from '../types';

/**
 * The marker a deprecated declaration is preceded by, derived from its `deprecation` rather than
 * hand-written. It stays terse on purpose: CSS has no silent comment, so every byte reaches every
 * consumer of `index.css`. The full guidance — replacement and lifecycle message — lives in
 * `tailwindDeprecationsMeta` and the knowledge skill's deprecation index.
 */
const DEPRECATION_MARKER = 'alias (deprecated)';

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
    const marker = isDeprecated(node) ? DEPRECATION_MARKER : 'comment' in node ? node.comment : undefined;
    const comment = marker ? `/* ${marker} */\n` : '';
    return `${comment}${node.property}: ${node.value};`;
  }
  if ('selector' in node) {
    const body = node.raw !== undefined ? node.raw : (node.declarations ?? []).map(renderNode).join('\n');
    return `${node.comment ? `/* ${node.comment} */\n` : ''}${node.selector} {\n${body}\n}`;
  }
  return node.raw;
};
