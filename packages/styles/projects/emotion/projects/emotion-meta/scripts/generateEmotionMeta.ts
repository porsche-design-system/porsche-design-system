import * as path from 'node:path';
import * as emotion from '@porsche-design-system/emotion';
import { generateMeta, SEGMENTS_WITHOUT_VALUE, stringifyMetaValue } from '../../../../meta-shared.mts';

const startTime = performance.now();
const sourceDirectory = path.resolve('../../src/');
const outputFile = path.resolve('./src/lib/emotionMeta.ts');

await generateMeta({
  sourceDirectory,
  outputFile,
  packageExports: emotion,
  typeImport: 'EmotionMeta',
  typeImportPath: 'emotion-meta',
  treeTypeName: 'EmotionMetaTree',
  exportName: 'emotionMeta',
  resolveTokenValue: ({ resolvedValue, segments }) =>
    SEGMENTS_WITHOUT_VALUE.includes(segments[0]) || typeof resolvedValue === 'function'
      ? undefined
      : stringifyMetaValue(resolvedValue),
});

const endTime = performance.now();
console.log(`Generated ${outputFile} in ${endTime - startTime}ms`);
