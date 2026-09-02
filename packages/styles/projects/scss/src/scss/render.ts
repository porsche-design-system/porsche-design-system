import { getDeprecationComment, isDeprecated } from '@porsche-design-system/shared/deprecation';
import type { ScssCatalog, ScssMeta, ScssMixin, ScssNode, ScssVariable } from '../types';

const isLeaf = (branch: ScssCatalog): branch is ScssVariable | ScssMixin => 'name' in branch;

export const flatten = (branch: ScssCatalog): (ScssVariable | ScssMixin)[] =>
  Array.isArray(branch) ? branch.flatMap(flatten) : isLeaf(branch) ? [branch] : Object.values(branch).flatMap(flatten);

export const stripDeprecated = <T>(branch: T): ScssMeta<T> =>
  (Array.isArray(branch)
    ? branch.filter((node) => !isDeprecated(node)).map(stripDeprecated)
    : isLeaf(branch as ScssCatalog)
      ? branch
      : Object.fromEntries(
          Object.entries(branch as object)
            .filter(([, node]) => !isDeprecated(node))
            .map(([key, node]) => [key, stripDeprecated(node)])
        )) as ScssMeta<T>;

/**
 * Uses silent Sass comments so deprecation guidance remains in source without entering every
 * consumer's compiled CSS.
 */
const deprecationComment = (node: ScssNode): string =>
  isDeprecated(node) ? `${getDeprecationComment(node.deprecation, 'line')}\n` : '';

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
