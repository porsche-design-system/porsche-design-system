import * as jsStyles from '@porsche-design-system/components-js/styles';
import * as angularStyles from '@porsche-design-system/components-angular/styles';

it('should reexport styles sub-package from components-js', () => {
  expect(angularStyles).toEqual(jsStyles);
});
