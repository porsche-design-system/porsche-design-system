import { createRequire } from 'node:module';
import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const ESMBuildDirStyles = path.resolve(__dirname, './../../../../dist/angular-wrapper/styles/esm');
const ESMBuildDirVanillaExtract = path.resolve(
  __dirname,
  './../../../../dist/angular-wrapper/styles/vanilla-extract/esm'
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

  // Utility to sort object keys recursively
  const sortObjectKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce(
          (acc, key) => {
            acc[key] = sortObjectKeys(obj[key]);
            return acc;
          },
          {} as Record<string, any>
        );
    }
    return obj;
  };

  // TODO: Enable test again
  // Exported names should be the same, only differs in function implementations
  test.skip(`should have identical exported content for style and style/vanilla-extract`, async () => {
    const styles = nodeRequire('@porsche-design-system/components-angular/styles');
    const veStyles = nodeRequire('@porsche-design-system/components-angular/styles/vanilla-extract');
    // Vanilla-Extract is also exporting a separate skeletonKeyframe object which is not exported in the normal styles package
    const { skeletonKeyframes, ...rest } = veStyles;
    expect(JSON.stringify(styles)).toEqual(JSON.stringify(rest));
  });
});
