import * as jsJsdomPolyfill from '@porsche-design-system/components-js/jsdom-polyfill';
import * as angularJsdomPolyfill from '@porsche-design-system/components-angular/jsdom-polyfill';

it('should reexport jsdom-polyfill from components-js', () => {
  expect(angularJsdomPolyfill).toEqual(jsJsdomPolyfill);
});
