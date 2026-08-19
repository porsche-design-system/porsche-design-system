import * as jsTesting from '@porsche-design-system/components-js/testing';
import * as vueTesting from '@porsche-design-system/components-vue/testing';
import { expect, it } from 'vitest';

it('should reexport testing sub-package from components-js', () => {
  const vueKeys = Object.keys(vueTesting)
    .filter((key) => key !== 'default')
    .sort();
  const jsKeys = Object.keys(jsTesting)
    .filter((key) => key !== 'default')
    .sort();

  expect(vueKeys).toEqual(jsKeys);
});
