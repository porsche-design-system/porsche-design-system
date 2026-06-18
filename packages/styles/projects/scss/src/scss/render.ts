import type { ScssBranch, ScssNode } from '../types';

/** A leaf carries a variable/mixin `name` or a verbatim `raw` body. */
const isLeaf = (node: ScssBranch): node is ScssNode => 'name' in node || 'raw' in node;

/** Walk the meta tree (records/arrays group; only leaves render) into a flat node list in source order. */
export const flatten = (node: ScssBranch): ScssNode[] =>
  Array.isArray(node) ? node.flatMap(flatten) : isLeaf(node) ? [node] : Object.values(node).flatMap(flatten);

/**
 * Serialize a single render node: a mixin to `@mixin name(signature) { raw }` (the escape hatch
 * wraps the verbatim body), a variable to `$name: value;` (with optional trailing comment), a raw
 * snippet verbatim.
 */
export const renderNode = (node: ScssNode): string => {
  if ('name' in node && 'raw' in node) {
    const comment = node.comment ? `/* ${node.comment} */\n` : '';
    return `${comment}@mixin ${node.name}${node.signature ?? ''} {\n${node.raw}\n}`;
  }
  if ('name' in node) {
    const comment = node.comment ? ` /* ${node.comment} */` : '';
    return `${node.name}: ${node.value};${comment}`;
  }
  return node.raw;
};
