import * as fs from 'node:fs';
import * as path from 'node:path';
import * as emotion from '@porsche-design-system/emotion';
import { camelCase } from 'change-case';
import fg from 'fast-glob';
import ts from 'typescript';

const startTime = performance.now();
const sourceDirectory = path.resolve('../../src/');
const outputFile = path.resolve('./src/lib/emotionMeta.ts');

const files = await fg(`${sourceDirectory}/**/*.ts`);
const tokenFiles = files.filter((f) => !f.endsWith('index.ts') && !f.endsWith('.spec.ts'));

function extractTokenInfo(filePath: string): { name: string; description: string } | null {
  const source = ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf-8'), ts.ScriptTarget.Latest, true);

  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    // Only pick up exported declarations (e.g. `export const colorCanvas = ...`)
    if (!statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue;

    const declaration = statement.declarationList.declarations[0];
    if (!declaration || !ts.isIdentifier(declaration.name)) continue;

    const name = declaration.name.text;

    const jsDocs = ts.getJSDocCommentsAndTags(statement);
    let description = '';
    for (const node of jsDocs) {
      if (ts.isJSDoc(node) && node.comment) {
        description =
          typeof node.comment === 'string'
            ? node.comment
            : node.comment.map((c) => ('text' in c ? c.text : '')).join('');
        break;
      }
    }

    if (name && description) return { name, description };

    // Fallback: if no main comment, use @deprecated tag text as the description.
    // Deprecated files use `/** @deprecated since v4.0.0, ... */` without a leading description.
    if (name) {
      for (const node of jsDocs) {
        if (!ts.isJSDoc(node) || !node.tags) continue;
        for (const tag of node.tags) {
          if (tag.tagName.text !== 'deprecated' || !tag.comment) continue;
          const tagText =
            typeof tag.comment === 'string'
              ? tag.comment
              : tag.comment.map((c) => ('text' in c ? c.text : '')).join('');
          if (tagText) return { name, description: tagText };
        }
      }
    }
  }

  return null;
}

// TokenLeaf is a resolved design token; TokenTree is any intermediate folder level.
type TokenLeaf = { name: string; value: string | number; description: string };
type TokenTree = { [key: string]: TokenTree | TokenLeaf };

const COLOR_FAMILY_ORDER = ['primary', 'info', 'success', 'warning', 'error'];
// '' -> accounts for cases such as "colorInfo", "colorWarning".... and puts it on top
const COLOR_VARIANT_ORDER = ['', 'Higher', 'High', 'Medium', 'Low', 'Frosted', 'FrostedSoft'];

// Extracts the first camelCase segment after "color", e.g. colorErrorFrostedSoft → "error".
const extractColorFamily = (name: string): string => name.match(/^color([A-Z][a-z]+)/)?.[1].toLowerCase() ?? name;

// Extracts everything after the family segment, e.g. colorErrorFrostedSoft → "FrostedSoft".
const extractColorVariant = (name: string): string => {
  const match = name.match(/^color[A-Z][a-z]+((?:[A-Z][a-z]*)+)?$/);
  return match?.[1] ?? '';
};

// Extracts a numeric sort key from a token value (px, clamp, box-shadow, or plain number).
const toSortNum = (value: string | number): number => {
  if (typeof value === 'number') return value;
  if (value.includes('infinity')) return Infinity;
  const clampMatch = value.match(/clamp\(\s*([\d.]+)/);
  if (clampMatch) return parseFloat(clampMatch[1]);
  const pxValues = Array.from(value.matchAll(/([\d.]+)px/g), (m) => parseFloat(m[1]));
  if (pxValues.length > 0) return Math.max(...pxValues);
  return parseFloat(value);
};

const sortLeaves = (leaves: TokenLeaf[]): TokenLeaf[] => {
  const nums = new Map(leaves.map((t) => [t.name, toSortNum(t.value)]));
  // All-numeric: sort ascending (e.g. radiusXs=2px < radiusSm=4px).
  if ([...nums.values()].every((n) => !Number.isNaN(n))) {
    return [...leaves].sort((a, b) => (nums.get(a.name) ?? 0) - (nums.get(b.name) ?? 0));
  }
  // Mixed types (e.g. font or motion): sort the numeric-parseable subset ascending,
  // keep non-parseable ones in insertion order after them.
  const numeric = leaves.filter((l) => !Number.isNaN(nums.get(l.name)));
  const nonNumeric = leaves.filter((l) => Number.isNaN(nums.get(l.name)));
  const sortedNumeric = [...numeric].sort((a, b) => (nums.get(a.name) ?? 0) - (nums.get(b.name) ?? 0));
  // Color tokens have no numeric sort key but are pre-ordered by the file-level sort above.
  return [...sortedNumeric, ...nonNumeric];
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
  const leaves: [string, TokenLeaf][] = [];
  const subtrees: [string, TokenTree][] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (typeof (v as TokenLeaf).name === 'string') leaves.push([k, v as TokenLeaf]);
    else subtrees.push([k, sortTree(v as TokenTree)]);
  }
  const sorted = sortLeaves(leaves.map(([, l]) => l));
  const sortedSubtrees = sortSubtrees(subtrees);
  if (leaves.length === 0) return Object.fromEntries(sortedSubtrees);
  return Object.fromEntries([...sorted.map((l) => [l.name, l] as [string, TokenLeaf]), ...sortedSubtrees]);
};

// Sort files within each directory so color tokens arrive in family+variant order.
// JS object insertion order is preserved, so the tree inherits this ordering without any post-sort.
const sortedTokenFiles = [...tokenFiles].sort((a, b) => {
  if (path.dirname(a) !== path.dirname(b)) return 0; // cross-directory: stable sort preserves relative order
  const nameA = path.basename(a, '.ts');
  const nameB = path.basename(b, '.ts');
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

  // Resolve the runtime value from the built emotion package by the exported const name.
  const resolvedValue = (emotion as Record<string, unknown>)[info.name];
  if (resolvedValue === undefined || typeof resolvedValue === 'function') continue;
  const serializedValue: string | number =
    typeof resolvedValue === 'string' || typeof resolvedValue === 'number'
      ? resolvedValue
      : JSON.stringify(resolvedValue);

  // Use path.relative + normalize to forward slashes so this works on Windows too.
  // e.g. "color/light-dark/background/colorBackdrop.ts" -> ["color", "lightDark", "background"]
  const relativePath = path.relative(sourceDirectory, file).replace(/\\/g, '/');
  const parts = relativePath.split('/');
  // Drop the filename (last segment); camelCase each directory name so "light-dark" -> "lightDark"
  const segments = parts.slice(0, -1).map((p) => camelCase(p));

  let node = tree;
  for (const seg of segments) {
    if (!node[seg]) node[seg] = {};
    node = node[seg] as TokenTree;
  }

  node[info.name] = {
    name: info.name,
    value: serializedValue,
    description: info.description,
  };
}

function serializeTree(obj: TokenTree | TokenLeaf, indent = 0): string {
  const pad = '  '.repeat(indent);
  const innerPad = '  '.repeat(indent + 1);

  if (typeof (obj as TokenLeaf).name === 'string') {
    const leaf = obj as TokenLeaf;
    return `{ name: '${leaf.name}', value: ${JSON.stringify(leaf.value)}, description: ${JSON.stringify(leaf.description)} }`;
  }

  const entries = Object.entries(obj as TokenTree)
    .map(([key, val]) => `${innerPad}${key}: ${serializeTree(val, indent + 1)}`)
    .join(',\n');

  return `{\n${entries},\n${pad}}`;
}

const output = [
  `import type { EmotionMeta } from '../types/emotion-meta';`,
  ``,
  `export type EmotionMetaTree = { [key: string]: EmotionMetaTree | EmotionMeta };`,
  ``,
  `export const emotionMeta = ${serializeTree(sortTree(tree))} satisfies EmotionMetaTree;`,
  ``,
].join('\n');

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output);
const endTime = performance.now();
console.log(`Generated ${outputFile} in ${endTime - startTime}ms`);
