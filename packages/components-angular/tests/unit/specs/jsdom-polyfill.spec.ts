import * as angularJsdomPolyfill from '@porsche-design-system/components-angular/jsdom-polyfill';
import jsJsdomPolyfill from '@porsche-design-system/components-js/jsdom-polyfill';
import { expect, it } from 'vitest';

it('should reexport jsdom-polyfill sub-package from components-js', () => {
  expect(angularJsdomPolyfill).toEqual(jsJsdomPolyfill);
});
