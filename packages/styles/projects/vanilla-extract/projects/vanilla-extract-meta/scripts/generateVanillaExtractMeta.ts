import * as fs from 'node:fs';
import * as path from 'node:path';
import * as vanillaExtract from '@porsche-design-system/vanilla-extract';
import { camelCase } from 'change-case';
import fg from 'fast-glob';
import ts from 'typescript';

const startTime = performance.now();
const sourceDirectory = path.resolve('../../src/');
const outputFile = path.resolve('./src/lib/vanillaExtractMeta.ts');

const files = await fg(`${sourceDirectory}/**/*.ts`);
const tokenFiles = files.filter((f) => !f.endsWith('index.ts') && !f.endsWith('.spec.ts'));

function extractTokenInfo(filePath: string): { identifier: string; name: string; description: string } | null {
  const source = ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf-8'), ts.ScriptTarget.Latest, true);

  for (const statement of source.statements) {
    // Pick up both `export const x = ...` and `export function x(...)` declarations.
    let identifier: string;
    if (ts.isVariableStatement(statement)) {
      if (!statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
      const declaration = statement.declarationList.declarations[0];
      if (!declaration || !ts.isIdentifier(declaration.name)) continue;
      identifier = declaration.name.text;
    } else if (ts.isFunctionDeclaration(statement)) {
      if (!statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
      if (!statement.name) continue;
      identifier = statement.name.text;
    } else {
      continue;
    }

    // name may be overridden by @signature to include a display-friendly function signature.
    let name = identifier;

    const jsDocs = ts.getJSDocCommentsAndTags(statement);
    let description = '';

    for (const node of jsDocs) {
      if (!ts.isJSDoc(node)) continue;
      // Extract the main comment as description (first non-empty one wins).
      if (node.comment && !description) {
        description =
          typeof node.comment === 'string'
            ? node.comment
            : node.comment.map((c) => ('text' in c ? c.text : '')).join('');
      }
      // @signature overrides the display name (e.g. to include function parameters).
      // @deprecated provides a fallback description when no main comment exists.
      for (const tag of node.tags ?? []) {
        const tagText =
          typeof tag.comment === 'string'
            ? tag.comment
            : (tag.comment ?? []).map((c) => ('text' in c ? c.text : '')).join('');
        if (tag.tagName.text === 'signature' && tagText) name = tagText;
        if (tag.tagName.text === 'deprecated' && tagText && !description) description = tagText;
      }
    }

    if (identifier && description) return { identifier, name, description };
  }

  return null;
}

// TokenLeaf is a resolved design token; TokenTree is any intermediate folder level.
type TokenLeaf = { name: string; value?: string | number; description: string };
type TokenTree = { [key: string]: TokenTree | TokenLeaf };

// Top-level directories whose entries should omit the value (too verbose or not useful for the storefront table).
const SEGMENTS_WITHOUT_VALUE = ['typography', 'focus'];

// Order matches the storefront color page sections: Background → Foreground → Semantic → A11y.
const COLOR_FAMILY_ORDER = [
  'canvas',
  'surface',
  'frosted',
  'backdrop',
  'primary',
  'contrast',
  'info',
  'success',
  'warning',
  'error',
  'focus',
];
// '' -> accounts for cases such as "colorInfo", "colorWarning".... and puts it on top
const COLOR_VARIANT_ORDER = ['', 'Higher', 'High', 'Medium', 'Low', 'Frosted', 'FrostedSoft'];

// Typography size order: largest first so the storefront table displays largest-to-smallest.
const TYPOGRAPHY_SIZE_ORDER = ['5Xl', '4Xl', '3Xl', '2Xl', 'Xl', 'Lg', 'Md', 'Sm', 'Xs', '2Xs'];

// Extracts the first camelCase segment after "color", e.g. colorErrorFrostedSoft → "error".
const extractColorFamily = (name: string): string => name.match(/^color([A-Z][a-z]+)/)?.[1].toLowerCase() ?? name;

// Extracts everything after the family segment, e.g. colorErrorFrostedSoft → "FrostedSoft".
const extractColorVariant = (name: string): string => {
  const match = name.match(/^color[A-Z][a-z]+((?:[A-Z][a-z]*)+)?$/);
  return match?.[1] ?? '';
};

// Extracts the size suffix from a typography file name, e.g. proseText5XlStyle → "5Xl", proseHeading2XsStyle → "2Xs".
const extractTypographySize = (name: string): string =>
  name.match(/(?:Text|Heading)([A-Z0-9][a-zA-Z0-9]*)Style$/)?.[1] ?? '';

// Extracts a numeric sort key from a token value (clamp, rem, px, or plain number).
// rem is checked before px so that typography styles with a fixed font-size (e.g. ".875rem / calc(6px...)")
// sort by font-size rather than by the stray 6px embedded in the shared line-height calc.
const toSortNum = (value: string | number | undefined): number => {
  if (value === undefined) return NaN;
  if (typeof value === 'number') return value;
  if (value.includes('infinity')) return Infinity;
  const clampMatch = value.match(/clamp\(\s*([\d.]+)/);
  if (clampMatch) return parseFloat(clampMatch[1]);
  const remValues = Array.from(value.matchAll(/([\d.]+)rem/g), (m) => parseFloat(m[1]));
  if (remValues.length > 0) return Math.max(...remValues);
  const pxValues = Array.from(value.matchAll(/([\d.]+)px/g), (m) => parseFloat(m[1]));
  if (pxValues.length > 0) return Math.max(...pxValues);
  return parseFloat(value);
};

const sortLeaves = (leaves: TokenLeaf[]): TokenLeaf[] => {
  const nums = new Map(leaves.map((t) => [t.name, toSortNum(t.value)]));
  const allNumeric = [...nums.values()].every((n) => !Number.isNaN(n));

  if (allNumeric) {
    const sorted = [...leaves].sort((a, b) => (nums.get(a.name) ?? 0) - (nums.get(b.name) ?? 0));
    // Typography style objects (JSON objects sorted by clamp font-size) are displayed
    // largest-to-smallest — reverse the ascending sort for all-JSON-object groups.
    const allJsonObjects = leaves.every((l) => String(l.value).trimStart().startsWith('{'));
    return allJsonObjects ? sorted.reverse() : sorted;
  }

  // Mixed types: non-numeric items first (e.g. compound breakpoint objects before px values),
  // then numeric items sorted ascending.
  const nonNumeric = leaves.filter((l) => Number.isNaN(nums.get(l.name)));
  const numeric = leaves.filter((l) => !Number.isNaN(nums.get(l.name)));
  const sortedNumeric = [...numeric].sort((a, b) => (nums.get(a.name) ?? 0) - (nums.get(b.name) ?? 0));
  return [...nonNumeric, ...sortedNumeric];
};

// Sort subtrees alphabetically; 'deprecated' is always placed last.
const sortSubtrees = (subtrees: [string, TokenTree][]): [string, TokenTree][] =>
  [...subtrees].sort(([a], [b]) => {
    if (a === 'deprecated') return 1;
    if (b === 'deprecated') return -1;
    return a.localeCompare(b);
  });

// Recursively sorts leaves at each level of the tree; subtrees are sorted alphabetically.
const sortTree = (obj: TokenTree): TokenTree => {
  const leaves: TokenLeaf[] = [];
  const subtrees: [string, TokenTree][] = [];
  // Track the original tree key (JS identifier) per leaf — name may differ when @signature overrides it.
  const keyByLeaf = new Map<TokenLeaf, string>();
  for (const [k, v] of Object.entries(obj)) {
    if (typeof (v as TokenLeaf).name === 'string') {
      const leaf = v as TokenLeaf;
      leaves.push(leaf);
      keyByLeaf.set(leaf, k);
    } else subtrees.push([k, sortTree(v as TokenTree)]);
  }
  const sorted = sortLeaves(leaves);
  const sortedSubtrees = sortSubtrees(subtrees);
  if (leaves.length === 0) return Object.fromEntries(sortedSubtrees);
  return Object.fromEntries([...sorted.map((l) => [keyByLeaf.get(l)!, l] as [string, TokenLeaf]), ...sortedSubtrees]);
};

// Sort files within each directory so tokens arrive in the correct display order.
// JS object insertion order is preserved, so the tree inherits this ordering without any post-sort.
const sortedTokenFiles = [...tokenFiles].sort((a, b) => {
  if (path.dirname(a) !== path.dirname(b)) return 0; // cross-directory: stable sort preserves relative order
  const nameA = path.basename(a, '.ts');
  const nameB = path.basename(b, '.ts');
  // Typography: largest-to-smallest (5Xl → 2Xs).
  const sizeA = extractTypographySize(nameA);
  const sizeB = extractTypographySize(nameB);
  if (sizeA || sizeB) return TYPOGRAPHY_SIZE_ORDER.indexOf(sizeA) - TYPOGRAPHY_SIZE_ORDER.indexOf(sizeB);
  // Color: family order, then variant order within each family.
  const famA = extractColorFamily(nameA);
  const famB = extractColorFamily(nameB);
  const idxA = COLOR_FAMILY_ORDER.indexOf(famA);
  const idxB = COLOR_FAMILY_ORDER.indexOf(famB);
  const familyCmp =
    (idxA === -1 ? COLOR_FAMILY_ORDER.length : idxA) - (idxB === -1 ? COLOR_FAMILY_ORDER.length : idxB) ||
    famA.localeCompare(famB);
  if (familyCmp !== 0) return familyCmp;
  const varA = extractColorVariant(nameA);
  const varB = extractColorVariant(nameB);
  const varIdxA = COLOR_VARIANT_ORDER.indexOf(varA);
  const varIdxB = COLOR_VARIANT_ORDER.indexOf(varB);
  return (
    (varIdxA === -1 ? COLOR_VARIANT_ORDER.length : varIdxA) - (varIdxB === -1 ? COLOR_VARIANT_ORDER.length : varIdxB)
  );
});

const tree: TokenTree = {};

for (const file of sortedTokenFiles) {
  const info = extractTokenInfo(file);
  if (!info) continue;

  // Use path.relative + normalize to forward slashes so this works on Windows too.
  // e.g. "color/light-dark/background/colorBackdrop.ts" -> ["color", "lightDark", "background"]
  const relativePath = path.relative(sourceDirectory, file).replace(/\\/g, '/');
  const parts = relativePath.split('/');
  // Drop the filename (last segment); camelCase each directory name so "light-dark" -> "lightDark"
  const segments = parts.slice(0, -1).map((p) => camelCase(p));

  // Resolve the runtime value from the built vanilla-extract package by the JS identifier (not the display name).
  const resolvedValue = (vanillaExtract as Record<string, unknown>)[info.identifier];
  if (resolvedValue === undefined) continue;
  // Some top-level directories (e.g. typography) omit the value — their CSS-in-JS objects are too verbose for the storefront table.
  let value: string | number | undefined;
  if (SEGMENTS_WITHOUT_VALUE.includes(segments[0])) {
    value = undefined;
  } else if (typeof resolvedValue === 'function') {
    // Functions with @signature have required parameters — don't call them, just include without value.
    if (info.name !== info.identifier) {
      value = undefined;
    } else {
      // Call zero-arg functions (e.g. getFocusVisibleStyle) to capture their
      // default CSS-in-JS output as the value. Functions that require arguments are skipped.
      try {
        const result = (resolvedValue as () => unknown)();
        if (result === undefined || typeof result === 'function') continue;
        value = typeof result === 'string' || typeof result === 'number' ? result : JSON.stringify(result);
      } catch {
        continue;
      }
    }
  } else if (typeof resolvedValue === 'string' || typeof resolvedValue === 'number') {
    value = resolvedValue;
  } else {
    value = JSON.stringify(resolvedValue);
  }

  let node = tree;
  for (const seg of segments) {
    if (!node[seg]) node[seg] = {};
    node = node[seg] as TokenTree;
  }

  // Use identifier as the tree key (JS-friendly); name may differ if @signature overrides the display name.
  node[info.identifier] = {
    name: info.name,
    ...(value !== undefined && { value }),
    description: info.description,
  };
}

function serializeTree(obj: TokenTree | TokenLeaf, indent = 0): string {
  const pad = '  '.repeat(indent);
  const innerPad = '  '.repeat(indent + 1);

  if (typeof (obj as TokenLeaf).name === 'string') {
    const leaf = obj as TokenLeaf;
    const valuePart = leaf.value !== undefined ? `, value: ${JSON.stringify(leaf.value)}` : '';
    return `{ name: ${JSON.stringify(leaf.name)}${valuePart}, description: ${JSON.stringify(leaf.description)} }`;
  }

  const entries = Object.entries(obj as TokenTree)
    .map(([key, val]) => `${innerPad}${key}: ${serializeTree(val, indent + 1)}`)
    .join(',\n');

  return `{\n${entries},\n${pad}}`;
}

const output = [
  `import type { VanillaExtractMeta } from '../types/vanilla-extract-meta';`,
  ``,
  `export type VanillaExtractMetaTree = { [key: string]: VanillaExtractMetaTree | VanillaExtractMeta };`,
  ``,
  `export const vanillaExtractMeta = ${serializeTree(sortTree(tree))} satisfies VanillaExtractMetaTree;`,
  ``,
].join('\n');

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output);
const endTime = performance.now();
console.log(`Generated ${outputFile} in ${endTime - startTime}ms`);
