import { deprecationText, isDeprecated } from '@porsche-design-system/shared/deprecation';
import type { ScssCatalog, ScssMeta, ScssMixin, ScssNode, ScssVariable } from '../types';

/** A leaf carries a variable/mixin `name`; lists and groups don't. */
const isLeaf = (branch: ScssCatalog): branch is ScssVariable | ScssMixin => 'name' in branch;

/** Walk a catalog into a flat declaration list in source order. */
export const flatten = (branch: ScssCatalog): (ScssVariable | ScssMixin)[] =>
  Array.isArray(branch) ? branch.flatMap(flatten) : isLeaf(branch) ? [branch] : Object.values(branch).flatMap(flatten);

/** Walk a catalog into the same tree without its deprecated declarations. Leaves keep their identity. */
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
 * The standalone `@deprecated` comment a deprecated declaration is preceded by, generated from the
 * declaration's structured `deprecation` — never hand-written, so replacement guidance reaches
 * consumers reading the shipped partials as well as the audit index.
 *
 * It is a Sass *silent* comment on purpose. A loud `/* … *\/` at top level is copied into the
 * compiled CSS of every project that `@use`s the package, whether or not it touches a single legacy
 * API — 12 KB of prose shipped to browsers to document 127 APIs the project most likely never calls.
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
