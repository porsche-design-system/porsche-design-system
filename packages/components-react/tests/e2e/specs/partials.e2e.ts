import * as jsPartials from '@porsche-design-system/components-js/partials';
import * as reactPartials from '@porsche-design-system/components-react/partials';

it('should reexport all partials from components-js', () => {
  expect(reactPartials).toEqual(jsPartials);
});
