import { describe, test, expect } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import { sync as globbySync } from 'fast-glob';

describe('package content', () => {
  const ESMBuildDir = path.resolve(__dirname, './../../../../../dist/vue-wrapper/esm');

  const filePaths = globbySync([
    `${ESMBuildDir}/**/*.mjs`, // Include all .mjs files
    `!${ESMBuildDir}/**/*.vue2.mjs`, // Exclude *.vue2.mjs files
    `!${ESMBuildDir}/**/*.vue_vue_type_script_setup_true_lang.mjs`, // Exclude vue internal helper files
  ]);

  test.each(filePaths)('should contain type definitions in bundled vue-wrapper for file: %s', (filePath) => {
    const basePath = filePath.replace(/\.(js|mjs|cjs)$/, '');
    const vueDtsExists = fs.existsSync(`${basePath}.vue.d.ts`);
    const dtsExists = fs.existsSync(`${basePath}.d.ts`);

    expect(vueDtsExists || dtsExists).toBe(true);
  });

  test('should contain bundled component types file', () => {
    const exists = fs.existsSync(`${ESMBuildDir}/lib/types.d.ts`);

    expect(exists).toBe(true);
  });
});
