import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Deprecation } from '@porsche-design-system/shared/deprecation';
import * as tokens from '@porsche-design-system/tokens';
import { camelCase } from 'change-case';
import ts from 'typescript';
import type { DeprecatedTokenMeta, TokenMeta } from '../src/types/token-meta';

/**
 * Builds the two token metadata catalogs from the token package's own exports: `tokensMeta` from the
 * documented declarations, `tokenDeprecationsMeta` from those carrying a `@deprecated` annotation.
 * A token is classified into exactly one of them, and the leaf types make that a compile error to
 * get wrong rather than a review question — see `src/types/token-meta.ts`.
 *
 * Names, descriptions and annotations come from the type checker walking the package barrel, so the
 * public surface is whatever the package actually exports and the wording is whatever a consumer's
 * IDE shows. `generateTokensMeta.ts` only writes the result.
 */

/** The token declarations this metadata is generated from, resolved from here rather than the cwd. */
const TOKENS_SOURCE_DIRECTORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../src');

/** A token export, with the docs, marker and source location the checker resolved for it. */
export type TokenSource = {
  name: string;
  description: string;
  /** Source directory relative to the package root — the catalog path, and the catalog order. */
  directory: string;
  /** Present exactly when the declaration carries a `@deprecated` annotation. */
  deprecation?: Deprecation;
};

type TokenLeaf = TokenMeta | DeprecatedTokenMeta;
type TokenTree = { [key: string]: TokenTree | TokenLeaf };
export type TokenCatalogs = { tokensMeta: TokenTree; tokenDeprecationsMeta: TokenTree };

const isLeaf = (node: TokenTree | TokenLeaf): node is TokenLeaf => typeof (node as TokenLeaf).name === 'string';

/**
 * The deprecation marker of an annotation, or `undefined` when there is none.
 *
 * The replacement is the `{@link otherToken}` reference, taken as its own part of the annotation and
 * never as a phrase recovered from the sentence around it. Both part kinds count: the checker reports
 * a link it resolved in the file's scope as `linkName` and any other as `linkText`, and a token names
 * its replacement across files, where nothing is in scope. That the name is a real token is what
 * {@link buildCatalogs} checks. Everything else in the tag is carried verbatim as `message`; an
 * annotation that is only a link (or only the tag) carries none, so the shared wording applies.
 */
const deprecationOf = (tags: ts.JSDocTagInfo[]): Deprecation | undefined => {
  const tag = tags.find(({ name }) => name === 'deprecated');
  if (!tag) return undefined;

  const parts = tag.text ?? [];
  const replacement = parts.find(({ kind }) => kind === 'linkName' || kind === 'linkText')?.text.trim();
  const message = parts
    .filter(({ kind }) => kind === 'text')
    .map(({ text }) => text)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

  return { ...(replacement ? { replacement } : {}), ...(message ? { message } : {}) };
};

/**
 * Every token the package exports, read through its barrel.
 *
 * An export is read when it is documented **or** deprecated: `Deprecated<T>` drops the description,
 * so deprecating a token and removing its now-unrendered docs row must not drop the token out of the
 * metadata — the one way a legacy token could reach a consumer unindexed.
 */
export const readTokenSources = (
  entry: string = path.join(TOKENS_SOURCE_DIRECTORY, 'index.ts'),
  root: string = TOKENS_SOURCE_DIRECTORY
): TokenSource[] => {
  const program = ts.createProgram([entry], {});
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(entry);
  const barrel = source && checker.getSymbolAtLocation(source);

  return (barrel ? checker.getExportsOfModule(barrel) : []).flatMap((exported) => {
    // A barrel exports aliases; the documentation sits on the declaration they point at.
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    const file = symbol.valueDeclaration?.getSourceFile().fileName;
    const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
    const deprecation = deprecationOf(symbol.getJsDocTags(checker));
    if (!file || !(description || deprecation)) return [];

    // path.relative + forward slashes so this works on Windows too.
    const directory = path.relative(root, path.dirname(file)).replace(/\\/g, '/');
    return [{ name: exported.getName(), description, directory, ...(deprecation ? { deprecation } : {}) }];
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
  const leaves = entries.filter((entry): entry is [string, TokenLeaf] => isLeaf(entry[1]));
  const groups = entries.filter((entry): entry is [string, TokenTree] => !isLeaf(entry[1]));
  const sorted = leaves.every(([, leaf]) => !Number.isNaN(toSortNum(leaf.value)))
    ? [...leaves].sort(([, a], [, b]) => toSortNum(a.value) - toSortNum(b.value))
    : leaves;

  return Object.fromEntries([...sorted, ...groups.map(([key, group]) => [key, sortTree(group)])]);
};

const insert = (tree: TokenTree, directory: string, leaf: TokenLeaf): void => {
  // e.g. "color/light-dark/background" -> tree.color.lightDark.background
  const group = directory
    .split('/')
    .filter(Boolean)
    .reduce<TokenTree>((node, segment) => (node[camelCase(segment)] ??= {}) as TokenTree, tree);
  group[leaf.name] = leaf;
};

/**
 * Both catalogs, from the token exports.
 *
 * A token appears in exactly one of them, and the deprecated one repeats every root domain of the
 * documented one — empty where nothing is deprecated — so a domain that was checked stays
 * distinguishable from one that was forgotten. A `replacement` is resolved against the documented
 * catalog, so an annotation cannot point at a token that no longer exists (or at one that is itself
 * deprecated).
 *
 * `values` are the resolved runtime values, which only the built package has; an export without one
 * is not a token.
 */
export const buildCatalogs = (sources: TokenSource[], values: Record<string, unknown> = tokens): TokenCatalogs => {
  const tokensMeta: TokenTree = {};
  const deprecations: TokenTree = {};
  const documented = new Set(sources.filter(({ deprecation }) => !deprecation).map(({ name }) => name));

  for (const { name, description, directory, deprecation } of [...sources].sort(byCatalogOrder)) {
    const value = values[name];
    if (typeof value !== 'string' && typeof value !== 'number') continue;

    if (!deprecation) {
      insert(tokensMeta, directory, { name, value, description });
    } else if (deprecation.replacement && !documented.has(deprecation.replacement)) {
      throw new Error(`@deprecated on \`${name}\` names \`${deprecation.replacement}\`, which is not a token.`);
    } else {
      insert(deprecations, directory, { name, value, deprecation });
    }
  }

  const sorted = sortTree(tokensMeta);
  // Every documented domain first, empty, then the deprecated ones in place of their namesakes: an
  // untouched domain reads as "checked, nothing deprecated" rather than as an omission.
  const domains = Object.fromEntries(
    Object.entries(sorted)
      .filter(([, node]) => !isLeaf(node))
      .map(([domain]) => [domain, {}])
  );

  return { tokensMeta: sorted, tokenDeprecationsMeta: { ...domains, ...sortTree(deprecations) } };
};

/** The generated module source: the two catalogs, each typed so it cannot hold the other's leaves. */
export const renderTokensMeta = ({ tokensMeta, tokenDeprecationsMeta }: TokenCatalogs): string =>
  `// GENERATED FILE — do not edit. Built by \`scripts/generateTokensMeta.ts\` from the declarations
// of \`@porsche-design-system/tokens\` and the \`@deprecated\` annotations they carry.
import type { TokenDeprecationsMeta, TokensMetaTree } from '../types/token-meta';

/** The recommended token catalog: every documented token, grouped like the token sources. */
export const tokensMeta = ${JSON.stringify(tokensMeta, null, 2)} satisfies TokensMetaTree;

/**
 * The deprecated token catalog: the legacy tokens that still ship, keyed by the same root domains
 * as \`tokensMeta\`. Empty domains are spelled out, so "nothing deprecated" is a checked result.
 */
export const tokenDeprecationsMeta = ${JSON.stringify(tokenDeprecationsMeta, null, 2)} satisfies TokenDeprecationsMeta;
`;
