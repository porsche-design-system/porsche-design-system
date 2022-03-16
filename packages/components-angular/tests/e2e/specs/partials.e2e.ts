import * as jsPartials from '@porsche-design-system/components-js/partials';
import * as angularPartials from '@porsche-design-system/components-angular/partials';

it('should reexport all partials from components-js', () => {
  expect(angularPartials).toEqual(jsPartials);
});
