import * as fs from 'node:fs';
import * as path from 'node:path';
import * as vanillaExtract from '@porsche-design-system/vanilla-extract';
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
const outputFile = path.resolve('./src/lib/vanillaExtractMeta.ts');

const files = await fg(`${sourceDirectory}/**/*.ts`);
const tokenFiles = files.filter((f) => !f.endsWith('index.ts') && !f.endsWith('.spec.ts'));
const sortedTokenFiles = sortTokenFiles(tokenFiles);

const tree: TokenTree = {};

for (const file of sortedTokenFiles) {
  const info = extractTokenInfo(file);
  if (!info) continue;

  const relativePath = path.relative(sourceDirectory, file).replace(/\\/g, '/');
  const parts = relativePath.split('/');
  const segments = parts.slice(0, -1).map((p) => camelCase(p));

  const resolvedValue = (vanillaExtract as Record<string, unknown>)[info.identifier];
  if (resolvedValue === undefined) continue;
  let value: string | number | undefined;
  if (SEGMENTS_WITHOUT_VALUE.includes(segments[0])) {
    value = undefined;
  } else if (typeof resolvedValue === 'function') {
    // Functions with @signature have required parameters — don't call them, just include without value.
    if (info.name !== info.identifier) {
      value = undefined;
    } else {
      try {
        const result = (resolvedValue as () => unknown)();
        if (result === undefined || typeof result === 'function') {
          console.warn(`[vanilla-extract-meta] Skipping ${info.identifier}: zero-arg call returned unexpected type`);
          continue;
        }
        value = typeof result === 'string' || typeof result === 'number' ? result : JSON.stringify(result);
      } catch (e) {
        console.warn(`[vanilla-extract-meta] Skipping ${info.identifier}: zero-arg call threw — ${e}`);
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

  node[info.identifier] = {
    name: info.name,
    ...(value !== undefined && { value }),
    description: info.description,
  } satisfies TokenLeaf;
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
