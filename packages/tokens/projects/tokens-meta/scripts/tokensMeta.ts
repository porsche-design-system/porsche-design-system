import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Deprecated, Deprecations } from '@porsche-design-system/shared/deprecation';
import * as tokens from '@porsche-design-system/tokens';
import { camelCase } from 'change-case';
import ts from 'typescript';
import type { TokenMeta } from '../src/types/token-meta';
import { deprecationOf } from './deprecations';

/**
 * Builds documentation and deprecation projections from exported token declarations. Each token
 * appears in exactly one projection.
 */

const TOKENS_SOURCE_DIRECTORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../src');

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
 * Reads documented and deprecated barrel exports so legacy tokens cannot disappear from both
 * projections. Replacement links are validated against current exports.
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

  // Replacements must resolve to current barrel exports.
  const documented = new Set(exports.filter(({ tag }) => !tag).map(({ name }) => name));

  return exports.flatMap(({ name, file, description, tag }) => {
    if (!file || !(description || tag)) return [];

    // Catalog paths use POSIX separators on every platform.
    const directory = path.relative(root, path.dirname(file)).replace(/\\/g, '/');
    return [{ name, description, directory, ...(tag ? { deprecation: deprecationOf(tag, name, documented) } : {}) }];
  });
};

// Color documentation groups semantic families, then variants from plain to frosted.
const COLOR_FAMILIES = ['primary', 'info', 'success', 'warning', 'error'];
const COLOR_VARIANTS = ['', 'Higher', 'High', 'Medium', 'Low', 'Frosted', 'FrostedSoft'];

const rank = (order: string[], value: string): number => (order.indexOf(value) + 1 || order.length + 1) - 1;

const family = (name: string): string => name.match(/^color([A-Z][a-z]+)/)?.[1].toLowerCase() ?? name;

const variant = (name: string): string => name.match(/^color[A-Z][a-z]+((?:[A-Z][a-z]*)+)?$/)?.[1] ?? '';

/** Locale-independent comparison keeps generated output deterministic. */
const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

const byCatalogOrder = (a: TokenSource, b: TokenSource): number =>
  compare(a.directory, b.directory) ||
  rank(COLOR_FAMILIES, family(a.name)) - rank(COLOR_FAMILIES, family(b.name)) ||
  compare(family(a.name), family(b.name)) ||
  rank(COLOR_VARIANTS, variant(a.name)) - rank(COLOR_VARIANTS, variant(b.name)) ||
  compare(a.name, b.name);

const toSortNum = (value: string | number): number => {
  if (typeof value === 'number') return value;
  if (value.includes('infinity')) return Infinity;
  const clamp = value.match(/clamp\(\s*([\d.]+)/)?.[1];
  const pixels = Array.from(value.matchAll(/([\d.]+)px/g), (match) => parseFloat(match[1]));
  return clamp ? parseFloat(clamp) : pixels.length ? Math.max(...pixels) : parseFloat(value);
};

/**
 * Sorts numeric scales by value while preserving source order for non-numeric groups.
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
  const group = directory
    .split('/')
    .filter(Boolean)
    .reduce<TokenTree>((node, segment) => (node[camelCase(segment)] ??= {}) as TokenTree, tree);
  group[leaf.name] = leaf;
};

/**
 * Builds mutually exclusive projections. Exports without resolved runtime values are not tokens.
 */
export const buildCatalogs = (sources: TokenSource[], values: Record<string, unknown> = tokens): TokenCatalogs => {
  const tokensMeta: TokenTree = {};
  const tokenDeprecations: Deprecations = [];

  for (const { name, description, directory, deprecation } of [...sources].sort(byCatalogOrder)) {
    const value = values[name];
    if (typeof value !== 'string' && typeof value !== 'number') continue;

    if (deprecation) {
      tokenDeprecations.push({ usageKind: 'jsExport', identifier: name, deprecation });
    } else {
      insert(tokensMeta, directory, { name, value, description });
    }
  }

  return { tokensMeta: sortTree(tokensMeta), tokenDeprecations };
};

export const renderTokensMeta = ({ tokensMeta, tokenDeprecations }: TokenCatalogs): string =>
  `// GENERATED FILE — do not edit. Built by \`scripts/generateTokensMeta.ts\` from the declarations
// of \`@porsche-design-system/tokens\` and the \`@deprecated\` annotations they carry.
import type { Deprecations } from '@porsche-design-system/shared/deprecation';
import type { TokensMetaTree } from '../types/token-meta';

/** Documented tokens grouped like their sources. */
export const tokensMeta = ${JSON.stringify(tokensMeta, null, 2)} satisfies TokensMetaTree;

/** Deprecated tokens in catalog order. */
export const tokenDeprecations: Deprecations = ${JSON.stringify(tokenDeprecations, null, 2)};
`;
