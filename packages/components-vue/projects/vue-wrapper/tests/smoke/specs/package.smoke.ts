import { describe, test, expect } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import { globbySync } from 'globby';

describe('package content', () => {
  const ESMBuildDir = path.resolve(__dirname, './../../../../../dist/vue-wrapper/esm');

  const filePaths = globbySync([
    `${ESMBuildDir}/**/*.mjs`, // Include all .mjs files
    `!${ESMBuildDir}/**/*.vue2.mjs`, // Exclude *.vue2.mjs files
  ]);

  test.each(filePaths)('should contain type definitions in bundled vue-wrapper for file: %s', (filePath) => {
    const typeDefinitionPath = filePath.replace(/\.(js|mjs|cjs)$/, '.d.ts');
    const exists = fs.existsSync(typeDefinitionPath);

    expect(exists).toBe(true);
  });

  test('should contain bundled component types file', () => {
    const exists = fs.existsSync(`${ESMBuildDir}/lib/types.d.ts`);

    expect(exists).toBe(true);
  });
});
