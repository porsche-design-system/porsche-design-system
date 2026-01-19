import { createRequire } from 'node:module';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const ESMBuildDirStyles = path.resolve(__dirname, './../../../../dist/vue-wrapper/emotion/esm');

describe('emotion package content', () => {
  test('should contain typings', () => {
    const exists = fs.existsSync(`${ESMBuildDirStyles}/index.d.ts`);
    expect(exists).toBe(true);
  });

  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-vue/emotion');
    expect(styles).toMatchSnapshot();
  });
});
