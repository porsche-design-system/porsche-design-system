import * as jsStyles from '@porsche-design-system/components-js/styles';
import * as vueStyles from '@porsche-design-system/components-vue/styles';

it('should reexport styles sub-package from components-js', () => {
  expect(vueStyles).toEqual(jsStyles);
});
