/**
 * @jest-environment jsdom
 */
// annotation is required since polyfill is applied which doesn't work in node environment

import * as jsJsdomPolyfill from '@porsche-design-system/components-js/jsdom-polyfill';
import * as vueJsdomPolyfill from '@porsche-design-system/components-vue/jsdom-polyfill';

it('should reexport jsdom-polyfill from components-js', () => {
  expect(vueJsdomPolyfill).toEqual(jsJsdomPolyfill);
});
