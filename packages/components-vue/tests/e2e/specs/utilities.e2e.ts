import * as jsUtilities from '@porsche-design-system/components-js/utilities/js';
import * as vueUtilities from '@porsche-design-system/components-vue/utilities/js';

xit('should reexport all utilities from components-js', () => {
  expect(vueUtilities).toEqual(jsUtilities);
});
