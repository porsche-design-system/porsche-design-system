import type { CssNode } from './types';

/**
 * Serializes a single {@link CssNode}. Declarations and rules render structurally,
 * while {@link CssRaw} nodes (and rules carrying `raw`) are emitted verbatim.
 * Indentation and blank lines are normalized afterwards by Prettier.
 */
export const renderNode = (node: CssNode): string => {
  if ('property' in node) {
    return `${node.property}: ${node.value};`;
  }
  if ('selector' in node) {
    const body = node.raw !== undefined ? node.raw : (node.declarations ?? []).map(renderNode).join('\n');
    return `${node.comment ? `/* ${node.comment} */\n` : ''}${node.selector} {\n${body}\n}`;
  }
  return node.raw;
};

