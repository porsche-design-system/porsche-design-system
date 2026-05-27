import * as fs from 'node:fs';
import * as path from 'node:path';
import * as emotion from '@porsche-design-system/emotion';
import { camelCase } from 'change-case';
import fg from 'fast-glob';
import {
  extractTokenInfo,
  SEGMENTS_WITHOUT_VALUE,
  serializeTree,
  sortTokenFiles,
  sortTree,
  type TokenLeaf,
  type TokenTree,
} from '../../../../meta-shared.mts';

const startTime = performance.now();
const sourceDirectory = path.resolve('../../src/');
const outputFile = path.resolve('./src/lib/emotionMeta.ts');

const files = await fg(`${sourceDirectory}/**/*.ts`);
const tokenFiles = files.filter((f) => !f.endsWith('index.ts') && !f.endsWith('.spec.ts'));
const sortedTokenFiles = sortTokenFiles(tokenFiles);

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

  // Resolve the runtime value from the built emotion package by the JS identifier (not the display name).
  const resolvedValue = (emotion as Record<string, unknown>)[info.identifier];
  if (resolvedValue === undefined) continue;
  // Some top-level directories (e.g. typography) and functions (e.g. getFocusVisibleStyle) omit the value.
  let value: string | number | undefined;
  if (SEGMENTS_WITHOUT_VALUE.includes(segments[0]) || typeof resolvedValue === 'function') {
    value = undefined;
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
  } satisfies TokenLeaf;
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
