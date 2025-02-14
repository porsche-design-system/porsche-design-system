import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

describe('ag-grid package content', () => {
  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-js/ag-grid');
    expect(styles).toMatchSnapshot();
  });
});
