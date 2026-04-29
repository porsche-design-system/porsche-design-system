import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

describe('style package content', () => {
  test(`should match vanilla-extract content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-js/vanilla-extract');
    expect(styles).toMatchSnapshot();
  });
});
