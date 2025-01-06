import * as fs from 'fs';
import { createRequire } from 'node:module';
import * as path from 'path';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const ESMBuildDirStyles = path.resolve(__dirname, './../../../dist/react-wrapper/styles/esm');
const ESMBuildDirVanillaExtract = path.resolve(
  __dirname,
  './../../../dist/react-wrapper/styles/vanilla-extract/esm/vanilla-extract'
);

describe('style package content', () => {
  test('should contain typings', () => {
    const exists = fs.existsSync(`${ESMBuildDirStyles}/index.d.ts`);
    expect(exists).toBe(true);
  });

  test('should contain typings in vanilla-extract', () => {
    const exists = fs.existsSync(`${ESMBuildDirVanillaExtract}/index.d.ts`);
    expect(exists).toBe(true);
  });

  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-angular/styles');
    expect(styles).toMatchSnapshot();
  });

  test(`should match vanilla-extract content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-angular/styles/vanilla-extract');
    expect(styles).toMatchSnapshot();
  });

  // Exported names should be the same, only differs in function implementations
  test(`should have identical exported content for style and style/vanilla-extract`, () => {
    const styles = nodeRequire('@porsche-design-system/components-angular/styles');
    const veStyles = nodeRequire('@porsche-design-system/components-angular/styles/vanilla-extract');
    expect(JSON.stringify(styles)).toEqual(JSON.stringify(veStyles));
  });
});
