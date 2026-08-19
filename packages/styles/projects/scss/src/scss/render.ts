import { deprecationText, isDeprecated } from '@porsche-design-system/shared/deprecation';
import type { ScssBranch, ScssNode } from '../types';

/** A leaf carries a variable/mixin `name` or a verbatim `raw` body. */
const isLeaf = (node: ScssBranch): node is ScssNode => 'name' in node || 'raw' in node;

/** Walk the meta tree (records/arrays group; only leaves render) into a flat node list in source order. */
export const flatten = (node: ScssBranch): ScssNode[] =>
  Array.isArray(node) ? node.flatMap(flatten) : isLeaf(node) ? [node] : Object.values(node).flatMap(flatten);

/**
 * The standalone `@deprecated` comment a deprecated declaration is preceded by, generated from the
 * node's structured `deprecation` — never hand-written, so replacement guidance reaches consumers
 * reading the shipped partials as well as the audit index.
 *
 * It is a Sass *silent* comment on purpose. A loud `/* … *\/` at top level is copied into the
 * compiled CSS of every project that `@use`s the package, whether or not it touches a single legacy
 * API — 12 KB of prose shipped to browsers to document 122 APIs the project most likely never calls.
 * `//` keeps the guidance in the source a developer reads and emits nothing.
 */
const deprecationComment = (node: ScssNode): string =>
  isDeprecated(node) ? `// @deprecated ${deprecationText(node)}\n` : '';

/** Serialize a node: a mixin to `@mixin name(sig) { raw }`, a variable to `$name: value;`, a raw snippet verbatim. */
export const renderNode = (node: ScssNode): string => {
  if ('name' in node && 'raw' in node) {
    const comment = node.comment ? `/* ${node.comment} */\n` : '';
    return `${deprecationComment(node)}${comment}@mixin ${node.name}${node.signature ?? ''} {\n${node.raw}\n}`;
  }
  if ('name' in node) {
    const comment = node.comment ? ` /* ${node.comment} */` : '';
    return `${deprecationComment(node)}${node.name}: ${node.value};${comment}`;
  }
  return node.raw;
};
