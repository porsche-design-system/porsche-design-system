import * as jsUtilities from '@porsche-design-system/components-js/utilities/jss';
import * as reactUtilities from '@porsche-design-system/components-react/utilities/jss';

it('should reexport all utilities from components-js', () => {
  expect(reactUtilities).toEqual(jsUtilities);
});
