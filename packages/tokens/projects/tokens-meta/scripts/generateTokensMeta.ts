import * as fs from 'node:fs';
import * as path from 'node:path';
import * as tokens from '@porsche-design-system/tokens';
import { camelCase } from 'change-case';
import fg from 'fast-glob';
import ts from 'typescript';

const startTime = Date.now();
const sourceDirectory = path.resolve('../../src/');
const outputFile = path.resolve('./src/lib/tokensMeta.ts');

const files = await fg(`${sourceDirectory}/**/*.ts`);
// Exclude barrel files, tests, light/dark theme-specific files (only light-dark variants are used),
// and the raw palette constants which are not design tokens themselves (as per previous implementation).
const tokenFiles = files.filter(
  (f) =>
    !f.endsWith('index.ts') &&
    !f.endsWith('.spec.ts') &&
    !f.includes('/color/light/') &&
    !f.includes('/color/dark/') &&
    !f.endsWith('palette.ts')
);

function extractTokenInfo(filePath: string): { name: string; description: string } | null {
  // setParentNodes=true is required so getJSDocCommentsAndTags() can walk up
  // the AST via .parent pointers to find the comment attached to each node.
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
        // node.comment is either a plain string or an array of JSDocText/JSDocLink nodes
        description =
          typeof node.comment === 'string'
            ? node.comment
            : node.comment.map((c) => ('text' in c ? c.text : '')).join('');
        break;
      }
    }

    if (name && description) return { name, description };
  }

  return null;
}

// TokenLeaf is a resolved design token; TokenTree is any intermediate folder level.
type TokenLeaf = { name: string; value: string; description: string };
type TokenTree = { [key: string]: TokenTree | TokenLeaf };

const tree: TokenTree = {};

for (const file of tokenFiles) {
  const info = extractTokenInfo(file);
  if (!info) continue;

  // Resolve the runtime value from the built tokens package by the exported const name.
  const resolvedValue = (tokens as Record<string, unknown>)[info.name];
  if (resolvedValue === undefined) continue;

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
    // String() handles numeric token values (e.g. breakpoints) that aren't already strings
    value: String(resolvedValue),
    description: info.description,
  };
}

// Recursively converts the nested tree into formatted TypeScript source.
// Leaf detection: any object with a "name" string property is a TokenLeaf, not a subtree.
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
  `import type { TokenMeta } from '../types/token-meta';`,
  ``,
  `export type TokensMetaTree = { [key: string]: TokensMetaTree | TokenMeta };`,
  ``,
  `export const tokensMeta = ${serializeTree(tree)} satisfies TokensMetaTree;`,
  ``,
].join('\n');

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output);
const endTime = Date.now();
console.log(`Generated ${outputFile} in ${endTime - startTime}ms`);
