import * as path from 'node:path';
import * as vanillaExtract from '@porsche-design-system/vanilla-extract';
import { generateMeta, SEGMENTS_WITHOUT_VALUE, stringifyMetaValue } from '../../../../meta-shared.mts';

const startTime = performance.now();
const sourceDirectory = path.resolve('../../src/');
const outputFile = path.resolve('./src/lib/vanillaExtractMeta.ts');

await generateMeta({
  sourceDirectory,
  outputFile,
  packageExports: vanillaExtract,
  typeImport: 'VanillaExtractMeta',
  typeImportPath: 'vanilla-extract-meta',
  treeTypeName: 'VanillaExtractMetaTree',
  exportName: 'vanillaExtractMeta',
  resolveTokenValue: ({ identifier, name, resolvedValue, segments }) => {
    if (SEGMENTS_WITHOUT_VALUE.includes(segments[0])) return undefined;
    if (typeof resolvedValue !== 'function') return stringifyMetaValue(resolvedValue);

    // Functions with @signature have required parameters — don't call them, just include without value.
    if (name !== identifier) return undefined;

    try {
      const result = (resolvedValue as () => unknown)();
      if (result === undefined || typeof result === 'function') {
        console.warn(`[vanilla-extract-meta] Skipping ${identifier}: zero-arg call returned unexpected type`);
        return null;
      }
      return stringifyMetaValue(result);
    } catch (e) {
      console.warn(`[vanilla-extract-meta] Skipping ${identifier}: zero-arg call threw — ${e}`);
      return null;
    }
  },
});

const endTime = performance.now();
console.log(`Generated ${outputFile} in ${endTime - startTime}ms`);
