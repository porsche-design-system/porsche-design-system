import * as jsTestingUtils from '@porsche-design-system/components-js/testing';
import * as angularTestingUtils from '@porsche-design-system/components-angular/testing';

it('should reexport all testing utils from components-js', () => {
  expect(angularTestingUtils).toEqual(jsTestingUtils);
});
