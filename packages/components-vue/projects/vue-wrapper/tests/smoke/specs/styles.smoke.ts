import { createRequire } from 'node:module';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const ESMBuildDirStyles = path.resolve(__dirname, './../../../../../dist/vue-wrapper/emotion/esm');
const ESMBuildDirVanillaExtract = path.resolve(
  __dirname,
  './../../../../../dist/vue-wrapper/vanilla-extract/esm'
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
    const styles = nodeRequire('@porsche-design-system/components-angular/emotion');
    expect(styles).toMatchSnapshot();
  });

  test(`should match vanilla-extract content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-angular/vanilla-extract');
    expect(styles).toMatchSnapshot();
  });

  // TODO: Enable test again
  // Exported names should be the same, only differs in function implementations
  test.skip(`should have identical exported content for /emotion and /vanilla-extract`, () => {
    const styles = nodeRequire('@porsche-design-system/components-angular/emotion');
    const veStyles = nodeRequire('@porsche-design-system/components-angular/vanilla-extract');
    // Vanilla-Extract is also exporting a separate skeletonKeyframe object which is not exported in the normal styles package
    const { skeletonKeyframes, ...rest } = veStyles;
    expect(JSON.stringify(styles)).toEqual(JSON.stringify(rest));
  });
});
