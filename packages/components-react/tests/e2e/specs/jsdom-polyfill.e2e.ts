/**
 * @jest-environment jsdom
 */
// annotation is required since polyfill is applied which doesn't work in node environment

import * as jsJsdomPolyfill from '@porsche-design-system/components-js/jsdom-polyfill';
import * as reactJsdomPolyfill from '@porsche-design-system/components-react/jsdom-polyfill';

it('should reexport jsdom-polyfill sub-package from components-js', () => {
  expect(reactJsdomPolyfill).toEqual(jsJsdomPolyfill);
});
