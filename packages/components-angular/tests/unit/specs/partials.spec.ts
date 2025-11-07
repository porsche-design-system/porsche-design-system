import * as angularPartials from '@porsche-design-system/components-angular/partials';
import * as jsPartials from '@porsche-design-system/components-js/partials';
import { describe, expect, it } from 'vitest';

describe('partials', () => {
  const angularPartialKeys = Object.keys(angularPartials)
    .filter((key) => key !== 'default')
    .sort();
  const jsPartialKeys = Object.keys(jsPartials)
    .filter((key) => key !== 'default')
    .sort();

  it('should match snapshot', () => {
    expect(angularPartialKeys).toMatchSnapshot();
    expect(jsPartialKeys).toMatchSnapshot();
  });

  it('should reexport all functions from js partials', () => {
    angularPartialKeys.forEach((exportName) => {
      expect(jsPartialKeys).toContain(exportName);
      expect(typeof (jsPartials as any)[exportName]).not.toBe('default');
    });
  });
});
