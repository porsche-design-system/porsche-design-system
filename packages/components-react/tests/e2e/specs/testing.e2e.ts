import { test, expect } from '@playwright/test';
import * as jsTesting from '@porsche-design-system/components-js/testing';
import * as reactTesting from '@porsche-design-system/components-react/testing';

test('should reexport testing sub-package from components-js', () => {
  expect(reactTesting).toEqual(jsTesting);
});
