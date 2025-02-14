import * as fs from 'fs';
import { createRequire } from 'node:module';
import * as path from 'path';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const ESMBuildDirAgGrid = path.resolve(__dirname, './../../../dist/react-wrapper/ag-grid/esm');

describe('style package content', () => {
  test('should contain typings', () => {
    const exists = fs.existsSync(`${ESMBuildDirAgGrid}/index.d.ts`);
    expect(exists).toBe(true);
  });

  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-react/ag-grid');
    expect(styles).toMatchSnapshot();
  });
});
