import { test, expect } from '@playwright/test';
import * as jsStyles from '@porsche-design-system/components-js/emotion';
import * as vueStyles from '@porsche-design-system/components-vue/emotion';

test('should reexport styles sub-package from components-js', () => {
  expect(vueStyles).toEqual(jsStyles);
});
