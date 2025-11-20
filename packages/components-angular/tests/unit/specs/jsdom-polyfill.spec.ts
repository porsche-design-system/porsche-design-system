import * as angularJsdomPolyfill from '@porsche-design-system/components-angular/jsdom-polyfill';
import * as jsJsdomPolyfill from '@porsche-design-system/components-js/jsdom-polyfill';
import { describe, expect, it } from 'vitest';

describe('jsdom-polyfill', () => {
  it('should reexport jsdom-polyfill sub-package from components-js', () => {
    expect(angularJsdomPolyfill).toEqual(jsJsdomPolyfill);
  });
});
