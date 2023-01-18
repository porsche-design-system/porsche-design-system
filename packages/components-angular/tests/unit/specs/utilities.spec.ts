import * as jsUtilities from '@porsche-design-system/components-js/utilities/js';
import * as angularUtilities from '@porsche-design-system/components-angular/utilities/js';

it('should reexport all utilities from components-js', () => {
  expect(angularUtilities).toEqual(jsUtilities);
});
