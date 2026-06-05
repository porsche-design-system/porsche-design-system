import type { ColorCssVariableMeta, CssDeclaration, CssNode, CssVariableMeta, CssVariablesMetaTree } from './types';

const isLeaf = (node: CssVariablesMetaTree | CssVariableMeta): node is CssVariableMeta =>
  typeof (node as CssVariableMeta).property === 'string';

/** Recursively collects all CSS variable leaves from a tree, in declaration order. */
export const flattenCssVariables = (tree: CssVariablesMetaTree): CssVariableMeta[] =>
  Object.values(tree).flatMap((node) => (isLeaf(node) ? [node] : flattenCssVariables(node)));

/** Returns only theme-aware color variables (`type: 'color'`), carrying explicit light/dark values. */
export const flattenColorVariables = (tree: CssVariablesMetaTree): ColorCssVariableMeta[] =>
  flattenCssVariables(tree).filter((leaf): leaf is ColorCssVariableMeta => leaf.type === 'color');

const isCssDeclaration = (node: CssNode): node is CssDeclaration =>
  typeof (node as CssDeclaration).property === 'string';

/** Serializes a single CSS node (declaration or nested rule) into a CSS string. */
export const renderCssNode = (node: CssNode): string => {
  if (isCssDeclaration(node)) {
    return `${node.property}: ${node.value};`;
  }
  const comment = node.comment ? `/* ${node.comment} */\n` : '';
  return `${comment}${node.selector} {\n${node.declarations.map(renderCssNode).join('\n')}\n}`;
};

/** Serializes a list of CSS nodes into a CSS string (top-level rules separated by a blank line). */
export const renderCss = (nodes: CssNode[]): string => nodes.map(renderCssNode).join('\n\n');
