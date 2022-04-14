import * as jsUtilities from '@porsche-design-system/components-js/utilities/js';
import * as reactUtilities from '@porsche-design-system/components-react/utilities/js';

it('should reexport all utilities from components-js', () => {
  expect(reactUtilities).toEqual(jsUtilities);
});
