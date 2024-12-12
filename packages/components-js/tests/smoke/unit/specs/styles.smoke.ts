import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

describe('style package content', () => {
  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-js/styles');
    expect(styles).toMatchSnapshot();
  });

  test(`should match vanilla-extract content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-js/styles/vanilla-extract');
    expect(styles).toMatchSnapshot();
  });

  // Exported names should be the same, only differs in function implementations
  test(`should have identical exported content for style and style/vanilla-extract`, () => {
    const styles = nodeRequire('@porsche-design-system/components-js/styles');
    const veStyles = nodeRequire('@porsche-design-system/components-js/styles/vanilla-extract');
    expect(JSON.stringify(styles)).toEqual(JSON.stringify(veStyles));
  });
});
