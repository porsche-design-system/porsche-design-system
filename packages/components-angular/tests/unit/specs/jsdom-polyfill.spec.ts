import * as angularJsdomPolyfill from '@porsche-design-system/components-angular/jsdom-polyfill';
import * as jsJsdomPolyfill from '@porsche-design-system/components-js/jsdom-polyfill';
import { describe, expect, it } from 'vitest';

describe('jsdom-polyfill', () => {
  it('should reexport jsdom-polyfill sub-package from components-js', () => {
    const angularKeys = Object.keys(angularJsdomPolyfill)
      .filter((key) => key !== 'default')
      .sort();
    const jsKeys = Object.keys(jsJsdomPolyfill)
      .filter((key) => key !== 'default')
      .sort();

    expect(angularKeys).toEqual(jsKeys);
  });
});
