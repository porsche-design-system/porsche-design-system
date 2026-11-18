import * as jsPartials from '@porsche-design-system/components-js/partials';
import * as vuePartials from '@porsche-design-system/components-vue/partials';
import { expect, test } from '@porsche-design-system/testing/playwright';

test('should reexport partials sub-package from components-js', () => {
  expect(vuePartials).toEqual(jsPartials);
});
