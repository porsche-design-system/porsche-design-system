import * as jsTesting from '@porsche-design-system/components-js/testing';
import * as reactTesting from '@porsche-design-system/components-react/testing';
import { expect, it } from 'vitest';

it('should reexport testing sub-package from components-js', () => {
  const reactKeys = Object.keys(reactTesting)
    .filter((key) => key !== 'default')
    .sort();
  const jsKeys = Object.keys(jsTesting)
    .filter((key) => key !== 'default')
    .sort();

  expect(reactKeys).toEqual(jsKeys);
});
