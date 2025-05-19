import * as fs from 'fs';
import { createRequire } from 'node:module';
import * as path from 'path';
import { describe, expect, test, vi } from 'vitest';

const nodeRequire = createRequire(import.meta.url);
const ESMBuildDirAgGrid = path.resolve(__dirname, './../../../../dist/vue-wrapper/ag-grid/esm');

// Ag grid theme will access the cdn url in order to build the icon urls
vi.stubGlobal('document', {
  porscheDesignSystem: {
    cdn: {
      url: 'test',
    },
  },
});

describe('style package content', () => {
  test('should contain typings', () => {
    const exists = fs.existsSync(`${ESMBuildDirAgGrid}/index.d.ts`);
    expect(exists).toBe(true);
  });

  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-vue/ag-grid');
    expect(styles).toMatchSnapshot();
  });
});
