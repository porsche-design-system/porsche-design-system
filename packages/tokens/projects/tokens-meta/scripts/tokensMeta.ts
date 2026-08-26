import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Deprecated, Deprecations } from '@porsche-design-system/shared/deprecation';
import * as tokens from '@porsche-design-system/tokens';
import { camelCase } from 'change-case';
import ts from 'typescript';
import type { TokenMeta } from '../src/types/token-meta';
import { deprecationOf } from './deprecations';

/**
 * Builds the token package's two public projections from its own exports: `tokensMeta` from the
 * documented declarations, `tokenDeprecations` from those carrying a `@deprecated` annotation. A
 * token lands in exactly one of them, and `TokenMeta` has no `deprecation` field, so a marker cannot
 * reach the documented catalog — see `src/types/token-meta.ts`.
 *
 * The deprecated surface is the shared `Deprecations` and nothing else, exactly as scss publishes it.
 *
 * Names, descriptions and annotations come from the type checker walking the package barrel, so the
 * public surface is whatever the package actually exports and the wording is whatever a consumer's
 * IDE shows. Recovering a marker from an annotation is `scripts/deprecations.ts`; this file decides
 * only which catalog a declaration lands in, how it is grouped and ordered, and how it is rendered.
 * `generateTokensMeta.ts` writes the result.
 */

/** The token declarations this metadata is generated from, resolved from here rather than the cwd. */
const TOKENS_SOURCE_DIRECTORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../src');

/** A token export, with the docs, marker and source location the checker resolved for it. */
export type TokenSource = {
  name: string;
  description: string;
  /** Source directory relative to the package root — the catalog path, and the catalog order. */
  directory: string;
} & Deprecated;

type TokenTree = { [key: string]: TokenTree | TokenMeta };
export type TokenCatalogs = { tokensMeta: TokenTree; tokenDeprecations: Deprecations };

const isLeaf = (node: TokenTree | TokenMeta): node is TokenMeta => typeof (node as TokenMeta).name === 'string';

/**
 * Every token the package exports, read through its barrel.
 *
 * An export is read when it is documented **or** deprecated: a deprecated token is not rendered into
 * `tokensMeta` and its docs row may be dropped along with it, so reading only documented exports
 * would drop the token out of the metadata entirely — the one way a legacy token could reach a
 * consumer unindexed.
 *
 * The exports are resolved first and the markers second, because a `{@link}` replacement is checked
 * against the documented ones — the tokens a consumer can actually migrate to.
 */
export const readTokenSources = (
  entry: string = path.join(TOKENS_SOURCE_DIRECTORY, 'index.ts'),
  root: string = TOKENS_SOURCE_DIRECTORY
): TokenSource[] => {
  const program = ts.createProgram([entry], {});
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(entry);
  const barrel = source && checker.getSymbolAtLocation(source);

  const exports = (barrel ? checker.getExportsOfModule(barrel) : []).map((exported) => {
    // A barrel exports aliases; the documentation sits on the declaration they point at.
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;

    return {
      name: exported.getName(),
      file: symbol.valueDeclaration?.getSourceFile().fileName,
      description: ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim(),
      tag: symbol.getJsDocTags(checker).find(({ name }) => name === 'deprecated'),
    };
  });

  /** The names a replacement may be: everything the barrel exports that is not itself deprecated. */
  const documented = new Set(exports.filter(({ tag }) => !tag).map(({ name }) => name));

  return exports.flatMap(({ name, file, description, tag }) => {
    if (!file || !(description || tag)) return [];

    // path.relative + forward slashes so this works on Windows too.
    const directory = path.relative(root, path.dirname(file)).replace(/\\/g, '/');
    return [{ name, description, directory, ...(tag ? { deprecation: deprecationOf(tag, name, documented) } : {}) }];
  });
};

// Color values sort by neither their name nor their value, so the two orders the documentation reads
// in — semantic families first, then plainest variant first — are stated here. Everything else is
// ordered by its value (see `sortTree`), which is why this is the whole of the domain knowledge.
const COLOR_FAMILIES = ['primary', 'info', 'success', 'warning', 'error'];
const COLOR_VARIANTS = ['', 'Higher', 'High', 'Medium', 'Low', 'Frosted', 'FrostedSoft'];

/** Position in an order, with everything unranked sorted behind it. */
const rank = (order: string[], value: string): number => (order.indexOf(value) + 1 || order.length + 1) - 1;

/** The first camelCase segment after "color", e.g. colorErrorFrostedSoft → "error"; else the name. */
const family = (name: string): string => name.match(/^color([A-Z][a-z]+)/)?.[1].toLowerCase() ?? name;

/** Everything after the family segment, e.g. colorErrorFrostedSoft → "FrostedSoft". */
const variant = (name: string): string => name.match(/^color[A-Z][a-z]+((?:[A-Z][a-z]*)+)?$/)?.[1] ?? '';

/** Code-unit comparison, so the order does not depend on the host's locale. */
const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

/** Catalog order: by source directory, then by color family and variant, then by name. */
const byCatalogOrder = (a: TokenSource, b: TokenSource): number =>
  compare(a.directory, b.directory) ||
  rank(COLOR_FAMILIES, family(a.name)) - rank(COLOR_FAMILIES, family(b.name)) ||
  compare(family(a.name), family(b.name)) ||
  rank(COLOR_VARIANTS, variant(a.name)) - rank(COLOR_VARIANTS, variant(b.name)) ||
  compare(a.name, b.name);

/** A numeric sort key for a token value (px, clamp, box-shadow, or plain number), or `NaN`. */
const toSortNum = (value: string | number): number => {
  if (typeof value === 'number') return value;
  if (value.includes('infinity')) return Infinity;
  const clamp = value.match(/clamp\(\s*([\d.]+)/)?.[1];
  const pixels = Array.from(value.matchAll(/([\d.]+)px/g), (match) => parseFloat(match[1]));
  return clamp ? parseFloat(clamp) : pixels.length ? Math.max(...pixels) : parseFloat(value);
};

/**
 * Orders each group's tokens by value, ascending — the order a scale reads in. Groups whose values
 * are not numeric (colors, gradients, font families) keep the order they were inserted in, which
 * {@link byCatalogOrder} decided.
 */
const sortTree = (tree: TokenTree): TokenTree => {
  const entries = Object.entries(tree);
  const leaves = entries.filter((entry): entry is [string, TokenMeta] => isLeaf(entry[1]));
  const groups = entries.filter((entry): entry is [string, TokenTree] => !isLeaf(entry[1]));
  const sorted = leaves.every(([, leaf]) => !Number.isNaN(toSortNum(leaf.value)))
    ? [...leaves].sort(([, a], [, b]) => toSortNum(a.value) - toSortNum(b.value))
    : leaves;

  return Object.fromEntries([...sorted, ...groups.map(([key, group]) => [key, sortTree(group)])]);
};

const insert = (tree: TokenTree, directory: string, leaf: TokenMeta): void => {
  // e.g. "color/light-dark/background" -> tree.color.lightDark.background
  const group = directory
    .split('/')
    .filter(Boolean)
    .reduce<TokenTree>((node, segment) => (node[camelCase(segment)] ??= {}) as TokenTree, tree);
  group[leaf.name] = leaf;
};

/**
 * Both projections, from the token exports.
 *
 * A token appears in exactly one of them. A `replacement` was already resolved against the documented
 * exports while they were read, so an annotation cannot point at a token that no longer exists (or at
 * one that is itself deprecated).
 *
 * `values` are the resolved runtime values, which only the built package has; an export without one
 * is not a token.
 */
export const buildCatalogs = (sources: TokenSource[], values: Record<string, unknown> = tokens): TokenCatalogs => {
  const tokensMeta: TokenTree = {};
  const tokenDeprecations: Deprecations = [];

  for (const { name, description, directory, deprecation } of [...sources].sort(byCatalogOrder)) {
    const value = values[name];
    if (typeof value !== 'string' && typeof value !== 'number') continue;

    if (deprecation) {
      // The identifier is the export name: a token is imported by it, where scss spells `$name` and
      // Tailwind a custom property.
      tokenDeprecations.push({ usageKind: 'jsExport', identifier: name, deprecation });
    } else {
      insert(tokensMeta, directory, { name, value, description });
    }
  }

  return { tokensMeta: sortTree(tokensMeta), tokenDeprecations };
};

/** The generated module source: the documented catalog and the deprecated list beside it. */
export const renderTokensMeta = ({ tokensMeta, tokenDeprecations }: TokenCatalogs): string =>
  `// GENERATED FILE — do not edit. Built by \`scripts/generateTokensMeta.ts\` from the declarations
// of \`@porsche-design-system/tokens\` and the \`@deprecated\` annotations they carry.
import type { Deprecations } from '@porsche-design-system/shared/deprecation';
import type { TokensMetaTree } from '../types/token-meta';

/** The recommended token catalog: every documented token, grouped like the token sources. */
export const tokensMeta = ${JSON.stringify(tokensMeta, null, 2)} satisfies TokensMetaTree;

/**
 * The deprecated token surface: the legacy tokens that still ship, as an ordered flat list of export
 * names and markers, in the same order the documented catalog reads in. A token is either documented
 * above or listed here.
 */
export const tokenDeprecations: Deprecations = ${JSON.stringify(tokenDeprecations, null, 2)};
`;
