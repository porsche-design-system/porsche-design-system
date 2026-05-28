import * as fs from 'node:fs';
import * as path from 'node:path';
import { camelCase } from 'change-case';
import fg from 'fast-glob';
import ts from 'typescript';

export type TokenLeaf = { name: string; value?: string | number; description: string };
export type TokenTree = { [key: string]: TokenTree | TokenLeaf };
export type TokenValue = string | number | undefined;
export type TokenValueResolver = (params: {
  identifier: string;
  name: string;
  resolvedValue: unknown;
  segments: string[];
}) => TokenValue | null;

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

export const TYPOGRAPHY_SIZE_ORDER = ['5Xl', '4Xl', '3Xl', '2Xl', 'Xl', 'Lg', 'Md', 'Sm', 'Xs', '2Xs'];
export const SIZE_ORDER = ['2Xs', 'Xs', 'Sm', 'Md', 'Lg', 'Xl', '2Xl', '3Xl', '4Xl', '5Xl', 'Full'];
export const CATEGORY_ORDER = [
  'blur',
  'border',
  'color',
  'focus',
  'font',
  'gradient',
  'grid',
  'mediaQuery',
  'motion',
  'shadow',
  'skeleton',
  'spacing',
  'typography',
];
export const MEDIA_QUERY_ORDER = [
  'breakpoint',
  'breakpointShared',
  'getMediaQueryMax',
  'getMediaQueryMin',
  'getMediaQueryMinMax',
  'breakpointBase',
  'breakpointXS',
  'breakpointS',
  'breakpointM',
  'breakpointL',
  'breakpointXL',
  'breakpointXXL',
];
export const FONT_WEIGHT_ORDER = ['fontWeightNormal', 'fontWeightSemibold', 'fontWeightBold'];

export const orderIndex = (order: readonly string[], item: string): number => {
  const idx = order.indexOf(item);
  return idx === -1 ? order.length : idx;
};

export const extractColorFamily = (name: string): string =>
  name.match(/^color([A-Z][a-z]+)/)?.[1].toLowerCase() ?? name;

export const extractColorVariant = (name: string): string => {
  const match = name.match(/^color[A-Z][a-z]+((?:[A-Z][a-z]*)+)?$/);
  return match?.[1] ?? '';
};

export const stringifyMetaValue = (value: unknown): TokenValue =>
  typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value);

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

const legacySizeAliases = {
  XXSmall: '2Xs',
  XSmall: 'Xs',
  Small: 'Sm',
  Medium: 'Md',
  Large: 'Lg',
  XLarge: 'Xl',
  XXLarge: '2Xl',
  Short: 'Sm',
  Moderate: 'Md',
  Long: 'Lg',
  VeryLong: 'Xl',
} as const;
const sizeMatchOrder = [...SIZE_ORDER].sort((a, b) => b.length - a.length);
const legacySizeMatchOrder = Object.keys(legacySizeAliases).sort((a, b) => b.length - a.length);

const extractSize = (name: string): string => {
  for (const size of sizeMatchOrder) {
    if (name.endsWith(size) || name.endsWith(`${size}Style`)) return size;
  }
  for (const legacySize of legacySizeMatchOrder) {
    if (name.endsWith(legacySize) || name.endsWith(`${legacySize}Style`)) {
      return legacySizeAliases[legacySize as keyof typeof legacySizeAliases];
    }
  }
  return '';
};

const compareByOrder = (order: readonly string[], a: string, b: string): number => {
  const idxA = order.indexOf(a);
  const idxB = order.indexOf(b);
  if (idxA === -1 && idxB === -1) return 0;
  return orderIndex(order, a) - orderIndex(order, b);
};

const comparePathSegment = (a: string, b: string, depth: number): number => {
  if (a === b) return 0;
  if (a === 'deprecated') return 1;
  if (b === 'deprecated') return -1;
  if (a === 'helpers') return 1;
  if (b === 'helpers') return -1;
  return depth === 0
    ? compareByOrder(CATEGORY_ORDER, camelCase(a), camelCase(b)) || a.localeCompare(b)
    : a.localeCompare(b);
};

const compareTokenNames = (a: string, b: string, segments: string[]): number => {
  const category = camelCase(segments[0] ?? '');

  if (category === 'mediaQuery') {
    const mediaQueryCmp = compareByOrder(MEDIA_QUERY_ORDER, a, b);
    if (mediaQueryCmp !== 0) return mediaQueryCmp;
  }

  const fontWeightCmp = compareByOrder(FONT_WEIGHT_ORDER, a, b);
  if (fontWeightCmp !== 0) return fontWeightCmp;

  if (category === 'color') {
    const famA = extractColorFamily(a);
    const famB = extractColorFamily(b);
    const familyCmp = compareByOrder(COLOR_FAMILY_ORDER, famA, famB) || famA.localeCompare(famB);
    if (familyCmp !== 0) return familyCmp;
    const variantCmp = compareByOrder(COLOR_VARIANT_ORDER, extractColorVariant(a), extractColorVariant(b));
    if (variantCmp !== 0) return variantCmp;
  }

  const sizeOrder = category === 'typography' ? TYPOGRAPHY_SIZE_ORDER : SIZE_ORDER;
  const sizeCmp = compareByOrder(sizeOrder, extractSize(a), extractSize(b));
  if (sizeCmp !== 0) return sizeCmp;

  if (category === 'typography') {
    const kindCmp = Number(a.includes('Text')) - Number(b.includes('Text'));
    if (kindCmp !== 0) return kindCmp;
  }

  return a.localeCompare(b);
};

// Sort files before building the tree. JS object insertion order is preserved,
// so the generated meta output follows this one ordering path without post-sorting.
export const sortTokenFiles = (tokenFiles: string[], sourceDirectory: string): string[] =>
  [...tokenFiles].sort((a, b) => {
    const relativeA = path.relative(sourceDirectory, a).replace(/\\/g, '/');
    const relativeB = path.relative(sourceDirectory, b).replace(/\\/g, '/');
    const segmentsA = relativeA.split('/');
    const segmentsB = relativeB.split('/');
    const dirA = segmentsA.slice(0, -1);
    const dirB = segmentsB.slice(0, -1);

    for (let i = 0; i < Math.max(dirA.length, dirB.length); i++) {
      const segmentA = dirA[i];
      const segmentB = dirB[i];
      if (segmentA === undefined) return -1;
      if (segmentB === undefined) return 1;
      const segmentCmp = comparePathSegment(segmentA, segmentB, i);
      if (segmentCmp !== 0) return segmentCmp;
    }

    const nameA = path.basename(a, '.ts');
    const nameB = path.basename(b, '.ts');
    return compareTokenNames(nameA, nameB, dirA);
  });

export async function generateMeta({
  sourceDirectory,
  outputFile,
  packageExports,
  typeImport,
  typeImportPath,
  treeTypeName,
  exportName,
  resolveTokenValue,
}: {
  sourceDirectory: string;
  outputFile: string;
  packageExports: Record<string, unknown>;
  typeImport: string;
  typeImportPath: string;
  treeTypeName: string;
  exportName: string;
  resolveTokenValue: TokenValueResolver;
}): Promise<void> {
  const files = await fg(`${sourceDirectory}/**/*.ts`);
  const tokenFiles = files.filter((f) => !f.endsWith('index.ts') && !f.endsWith('.spec.ts'));
  const tree: TokenTree = {};

  for (const file of sortTokenFiles(tokenFiles, sourceDirectory)) {
    const info = extractTokenInfo(file);
    if (!info) continue; // no JSDoc → intentionally not exported to meta

    const relativePath = path.relative(sourceDirectory, file).replace(/\\/g, '/');
    const segments = relativePath
      .split('/')
      .slice(0, -1)
      .map((p) => camelCase(p));
    const resolvedValue = packageExports[info.identifier];
    if (resolvedValue === undefined) {
      console.warn(
        `[meta] SKIP "${info.identifier}" in ${relativePath}: not found in package exports.\n` +
          `  → Is it missing from the package's index.ts?`,
      );
      continue;
    }

    const value = resolveTokenValue({ ...info, resolvedValue, segments });
    if (value === null) {
      console.warn(
        `[meta] SKIP "${info.identifier}" in ${relativePath}: resolver returned null.\n` +
          `  → Token found in exports but excluded by the resolver.`,
      );
      continue;
    }

    let node = tree;
    for (const seg of segments) {
      if (!node[seg]) node[seg] = {};
      node = node[seg] as TokenTree;
    }

    node[info.identifier] = {
      name: info.name,
      ...(value !== undefined && { value }),
      description: info.description,
    } satisfies TokenLeaf;
  }

  const output = [
    `import type { ${typeImport} } from '../types/${typeImportPath}';`,
    ``,
    `export type ${treeTypeName} = { [key: string]: ${treeTypeName} | ${typeImport} };`,
    ``,
    `export const ${exportName} = ${serializeTree(tree)} satisfies ${treeTypeName};`,
    ``,
  ].join('\n');

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, output);
}
