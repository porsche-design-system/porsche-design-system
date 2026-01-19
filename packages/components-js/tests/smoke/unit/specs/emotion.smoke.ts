import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

describe('emotion package content', () => {
  test(`should match content`, () => {
    const styles = nodeRequire('@porsche-design-system/components-js/emotion');
    expect(styles).toMatchSnapshot();
  });
});
