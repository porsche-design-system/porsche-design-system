import * as jsPartials from '@porsche-design-system/components-js/partials';
import * as angularPartials from '@porsche-design-system/components-angular/partials';

describe('Angular partials', () => {
  const angularPartialKeys = Object.keys(angularPartials).sort();
  const jsPartialKeys = Object.keys(jsPartials).sort();

  it('should match snapshot', () => {
    expect(angularPartialKeys).toMatchSnapshot();
  });
});
