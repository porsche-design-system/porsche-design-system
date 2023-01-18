import * as jsTestingUtils from '@porsche-design-system/components-js/testing';
import * as vueTestingUtils from '@porsche-design-system/components-vue/testing';

it('should reexport all testing utils from components-js', () => {
  expect(vueTestingUtils).toEqual(jsTestingUtils);
});
