import { createRequire } from 'node:module';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const ESMBuildDirVanillaExtract = path.resolve(__dirname, './../../../../dist/angular-wrapper/vanilla-extract/esm');

describe('style package content', () => {
  test('should contain typings in vanilla-extract', () => {
    const exists = fs.existsSync(`${ESMBuildDirVanillaExtract}/index.d.ts`);
    expect(exists).toBe(true);
  });

  test(`should match vanilla-extract content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-angular/vanilla-extract');
    expect(styles).toMatchSnapshot();
  });
});
