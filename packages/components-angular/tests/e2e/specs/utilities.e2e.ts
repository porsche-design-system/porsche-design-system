import * as jsUtilities from '@porsche-design-system/components-js/utilities/jss';
import * as angularUtilities from '@porsche-design-system/components-angular/utilities/jss';

it('should reexport all utilities from components-js', () => {
  expect(angularUtilities).toEqual(jsUtilities);
});
