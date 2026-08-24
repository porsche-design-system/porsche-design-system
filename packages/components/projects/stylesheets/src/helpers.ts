import { getDeprecationComment, isDeprecated } from '@porsche-design-system/shared/deprecation';
import type { ColorCssVariableMeta, CssDeclaration, CssNode, CssVariableMeta, StylesheetTokenTree } from './types';

const isLeaf = (node: StylesheetTokenTree | CssVariableMeta): node is CssVariableMeta =>
  typeof (node as CssVariableMeta).property === 'string';

/** Recursively collects all CSS variable leaves from a token tree, in declaration order. */
export const flattenCssVariables = (tree: StylesheetTokenTree): CssVariableMeta[] =>
  Object.values(tree).flatMap((node) => (isLeaf(node) ? [node] : flattenCssVariables(node)));

/** Returns only theme-aware color variables (`type: 'color'`), carrying explicit light/dark values. */
export const flattenColorVariables = (tree: StylesheetTokenTree): ColorCssVariableMeta[] =>
  flattenCssVariables(tree).filter((leaf): leaf is ColorCssVariableMeta => leaf.type === 'color');

/**
 * Walk a token tree into the same tree without its deprecated variables. Leaves keep their identity,
 * so the documented catalog and the generated CSS stay the same objects.
 *
 * Identity-preserving in its type as well: every group is a `Record`, so dropping a key is invisible
 * to `CssVariableTokens` and no key-removing conditional type is needed to keep `stylesheetsMeta`
 * assignable to it.
 */
export const stripDeprecated = <T extends StylesheetTokenTree>(tree: T): T =>
  Object.fromEntries(
    Object.entries(tree)
      .filter(([, node]) => !isDeprecated(node))
      .map(([key, node]) => [key, isLeaf(node) ? node : stripDeprecated(node)])
  ) as T;

const isCssDeclaration = (node: CssNode): node is CssDeclaration =>
  typeof (node as CssDeclaration).property === 'string';

/** Serializes a single CSS node (declaration or nested rule) into a CSS string. */
export const renderCssNode = (node: CssNode): string => {
  // CSS has no silent comment, so this ships to every consumer of the generated stylesheets. The
  // catalog holds no deprecations today, and the guidance is worth its bytes when it does — the same
  // trade Tailwind's `index.css` makes.
  const deprecation = isDeprecated(node) ? `${getDeprecationComment(node.deprecation, 'block')}\n` : '';
  if (isCssDeclaration(node)) {
    return `${deprecation}${node.property}: ${node.value};`;
  }
  const comment = node.comment ? `/* ${node.comment} */\n` : '';
  return `${deprecation}${comment}${node.selector} {\n${node.declarations.map(renderCssNode).join('\n')}\n}`;
};

/** Serializes a list of CSS nodes into a CSS string (top-level rules separated by a blank line). */
export const renderCss = (nodes: CssNode[]): string => nodes.map(renderCssNode).join('\n\n');
