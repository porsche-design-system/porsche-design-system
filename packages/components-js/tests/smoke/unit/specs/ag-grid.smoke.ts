import { createRequire } from 'node:module';
import { describe, expect, test, vi } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

// Ag grid theme will access the cdn url in order to build the icon urls
vi.stubGlobal('document', {
  porscheDesignSystem: {
    cdn: {
      url: 'test',
    },
  },
});

describe('ag-grid package content', () => {
  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-js/ag-grid');
    expect(styles).toMatchSnapshot();
  });
});
