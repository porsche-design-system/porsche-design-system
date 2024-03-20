import { test, expect } from '@playwright/test';
import * as jsTesting from '@porsche-design-system/components-js/testing';
import * as vueTesting from '@porsche-design-system/components-vue/testing';

test('should reexport testing sub-package from components-js', () => {
  expect(vueTesting).toEqual(jsTesting);
});
