import { test, expect } from '@playwright/test';
import * as jsPartials from '@porsche-design-system/components-js/partials';
import * as vuePartials from '@porsche-design-system/components-vue/partials';

test('should reexport partials sub-package from components-js', () => {
  expect(vuePartials).toEqual(jsPartials);
});
