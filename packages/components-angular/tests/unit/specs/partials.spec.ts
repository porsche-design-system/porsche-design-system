import * as angularPartials from '@porsche-design-system/components-angular/partials';
import * as jsPartials from '@porsche-design-system/components-js/partials';
import { describe, expect, it } from 'vitest';

describe('partials', () => {
  it('should reexport partials sub-package from components-js', () => {
    const angularKeys = Object.keys(angularPartials)
      .filter((key) => key !== 'default')
      .sort();
    const jsKeys = Object.keys(jsPartials)
      .filter((key) => key !== 'default')
      .sort();

    expect(angularKeys).toEqual(jsKeys);
  });
});
