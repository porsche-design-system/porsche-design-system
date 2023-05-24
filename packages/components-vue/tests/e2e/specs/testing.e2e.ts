import * as jsTesting from '@porsche-design-system/components-js/testing';
import * as vueTesting from '@porsche-design-system/components-vue/testing';

it('should reexport testing sub-package from components-js', () => {
  expect(vueTesting).toEqual(jsTesting);
});
