import { getDeprecationComment, isDeprecated } from '@porsche-design-system/shared/deprecation';
import type { ColorCssVariableMeta, CssDeclaration, CssNode, CssVariableMeta, StylesheetTokenTree } from './types';

const isLeaf = (node: StylesheetTokenTree | CssVariableMeta): node is CssVariableMeta =>
  typeof (node as CssVariableMeta).property === 'string';

export const flattenCssVariables = (tree: StylesheetTokenTree): CssVariableMeta[] =>
  Object.values(tree).flatMap((node) => (isLeaf(node) ? [node] : flattenCssVariables(node)));

export const flattenColorVariables = (tree: StylesheetTokenTree): ColorCssVariableMeta[] =>
  flattenCssVariables(tree).filter((leaf): leaf is ColorCssVariableMeta => leaf.type === 'color');

/**
 * Preserves leaf identity so documentation and generated CSS share the same declarations.
 */
export const stripDeprecated = <T extends StylesheetTokenTree>(tree: T): T =>
  Object.fromEntries(
    Object.entries(tree)
      .filter(([, node]) => !isDeprecated(node))
      .map(([key, node]) => [key, isLeaf(node) ? node : stripDeprecated(node)])
  ) as T;

const isCssDeclaration = (node: CssNode): node is CssDeclaration =>
  typeof (node as CssDeclaration).property === 'string';

export const renderCssNode = (node: CssNode): string => {
  // CSS cannot hide deprecation comments from compiled consumer output.
  const deprecation = isDeprecated(node) ? `${getDeprecationComment(node.deprecation, 'block')}\n` : '';
  if (isCssDeclaration(node)) {
    return `${deprecation}${node.property}: ${node.value};`;
  }
  const comment = node.comment ? `/* ${node.comment} */\n` : '';
  return `${deprecation}${comment}${node.selector} {\n${node.declarations.map(renderCssNode).join('\n')}\n}`;
};

export const renderCss = (nodes: CssNode[]): string => nodes.map(renderCssNode).join('\n\n');
