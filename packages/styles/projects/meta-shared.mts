import * as fs from 'node:fs';
import * as path from 'node:path';
import ts from 'typescript';

// TokenLeaf is a resolved design token; TokenTree is any intermediate folder level.
export type TokenLeaf = { name: string; value?: string | number; description: string };
export type TokenTree = { [key: string]: TokenTree | TokenLeaf };

// Top-level directories whose entries should omit the value (too verbose or not useful for the storefront table).
export const SEGMENTS_WITHOUT_VALUE = ['typography', 'focus'];

// Order matches the storefront color page sections: Background → Foreground → Semantic → A11y.
export const COLOR_FAMILY_ORDER = [
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
export const COLOR_VARIANT_ORDER = ['', 'Higher', 'High', 'Medium', 'Low', 'Lower', 'Frosted', 'FrostedSoft'];

// Typography size order: largest first so the storefront table displays largest-to-smallest.
export const TYPOGRAPHY_SIZE_ORDER = ['5Xl', '4Xl', '3Xl', '2Xl', 'Xl', 'Lg', 'Md', 'Sm', 'Xs', '2Xs'];

// Returns the position of item in order, or order.length when not found (sends unknowns to end).
export const orderIndex = (order: readonly string[], item: string): number => {
  const idx = order.indexOf(item);
  return idx === -1 ? order.length : idx;
};

// Extracts the first camelCase segment after "color", e.g. colorErrorFrostedSoft → "error".
export const extractColorFamily = (name: string): string =>
  name.match(/^color([A-Z][a-z]+)/)?.[1].toLowerCase() ?? name;

// Extracts everything after the family segment, e.g. colorErrorFrostedSoft → "FrostedSoft".
export const extractColorVariant = (name: string): string => {
  const match = name.match(/^color[A-Z][a-z]+((?:[A-Z][a-z]*)+)?$/);
  return match?.[1] ?? '';
};

// Extracts the size suffix from a typography file name, e.g. proseText5XlStyle → "5Xl", proseHeading2XsStyle → "2Xs".
export const extractTypographySize = (name: string): string =>
  name.match(/(?:Text|Heading)([A-Z0-9][a-zA-Z0-9]*)Style$/)?.[1] ?? '';

// Extracts a numeric sort key from a token value (clamp, rem, px, or plain number).
// rem is checked before px so that typography styles with a fixed font-size (e.g. ".875rem / calc(6px...)")
// sort by font-size rather than by the stray 6px embedded in the shared line-height calc.
export const toSortNum = (value: string | number | undefined): number => {
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

export const sortLeaves = (leaves: TokenLeaf[]): TokenLeaf[] => {
  // Keyed by object reference (not t.name) — display names may collide when @signature overrides produce
  // identical text for different tokens, which would corrupt the sort values.
  const nums = new Map(leaves.map((t) => [t, toSortNum(t.value)]));
  const allNumeric = [...nums.values()].every((n) => !Number.isNaN(n));

  if (allNumeric) {
    const sorted = [...leaves].sort((a, b) => (nums.get(a) ?? 0) - (nums.get(b) ?? 0));
    // Typography style objects (JSON objects sorted by clamp font-size) are displayed
    // largest-to-smallest — reverse the ascending sort for all-JSON-object groups.
    const allJsonObjects = leaves.every((l) => l.value !== undefined && String(l.value).trimStart().startsWith('{'));
    return allJsonObjects ? sorted.reverse() : sorted;
  }

  // Mixed types: non-numeric items first (e.g. compound breakpoint objects before px values),
  // then numeric items sorted ascending.
  const nonNumeric = leaves.filter((l) => Number.isNaN(nums.get(l)));
  const numeric = leaves.filter((l) => !Number.isNaN(nums.get(l)));
  const sortedNumeric = [...numeric].sort((a, b) => (nums.get(a) ?? 0) - (nums.get(b) ?? 0));
  return [...nonNumeric, ...sortedNumeric];
};

// Sort subtrees alphabetically; 'deprecated' is always placed last.
export const sortSubtrees = (subtrees: [string, TokenTree][]): [string, TokenTree][] =>
  [...subtrees].sort(([a], [b]) => {
    if (a === 'deprecated') return 1;
    if (b === 'deprecated') return -1;
    return a.localeCompare(b);
  });

// Recursively sorts leaves at each level of the tree; subtrees are sorted alphabetically.
export const sortTree = (obj: TokenTree): TokenTree => {
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

export function extractTokenInfo(filePath: string): { identifier: string; name: string; description: string } | null {
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

export function serializeTree(obj: TokenTree | TokenLeaf, pad = ''): string {
  if (typeof (obj as TokenLeaf).name === 'string') {
    const leaf = obj as TokenLeaf;
    const valuePart = leaf.value !== undefined ? `, value: ${JSON.stringify(leaf.value)}` : '';
    return `{ name: ${JSON.stringify(leaf.name)}${valuePart}, description: ${JSON.stringify(leaf.description)} }`;
  }

  const innerPad = `${pad}  `;
  const entries = Object.entries(obj as TokenTree)
    .map(([key, val]) => `${innerPad}${key}: ${serializeTree(val, innerPad)}`)
    .join(',\n');

  return `{\n${entries},\n${pad}}`;
}

// Sort files within each directory so tokens arrive in the correct display order.
// JS object insertion order is preserved, so the tree inherits this ordering without any post-sort.
export const sortTokenFiles = (tokenFiles: string[]): string[] =>
  [...tokenFiles].sort((a, b) => {
    if (path.dirname(a) !== path.dirname(b)) return 0; // cross-directory: stable sort preserves relative order
    const nameA = path.basename(a, '.ts');
    const nameB = path.basename(b, '.ts');
    // Typography: largest-to-smallest (5Xl → 2Xs).
    const sizeA = extractTypographySize(nameA);
    const sizeB = extractTypographySize(nameB);
    if (sizeA || sizeB) return orderIndex(TYPOGRAPHY_SIZE_ORDER, sizeA) - orderIndex(TYPOGRAPHY_SIZE_ORDER, sizeB);
    // Color: family order, then variant order within each family.
    const famA = extractColorFamily(nameA);
    const famB = extractColorFamily(nameB);
    const familyCmp =
      orderIndex(COLOR_FAMILY_ORDER, famA) - orderIndex(COLOR_FAMILY_ORDER, famB) || famA.localeCompare(famB);
    if (familyCmp !== 0) return familyCmp;
    return (
      orderIndex(COLOR_VARIANT_ORDER, extractColorVariant(nameA)) -
      orderIndex(COLOR_VARIANT_ORDER, extractColorVariant(nameB))
    );
  });
