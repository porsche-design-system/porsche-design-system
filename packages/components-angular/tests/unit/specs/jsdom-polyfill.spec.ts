import * as angularJsdomPolyfill from '@porsche-design-system/components-angular/jsdom-polyfill';
import jsJsdomPolyfill from '@porsche-design-system/components-js/jsdom-polyfill';
import { describe, expect, it } from 'vitest';

describe('jsdom-polyfill', () => {
  const angularPolyfillKeys = Object.keys(angularJsdomPolyfill)
    .filter((key) => key !== 'default')
    .sort();
  const jsPolyfillKeys = Object.keys(jsJsdomPolyfill)
    .filter((key) => key !== 'default')
    .sort();

  it('should match snapshot', () => {
    expect(angularPolyfillKeys).toMatchSnapshot();
    expect(jsPolyfillKeys).toMatchSnapshot();
  });

  it('should reexport jsdom-polyfill sub-package from components-js', () => {
    angularPolyfillKeys.forEach((exportName) => {
      expect(jsPolyfillKeys).toContain(exportName);
      expect(typeof (jsJsdomPolyfill as any)[exportName]).not.toBe('default');
    });
  });
});
