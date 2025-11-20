import * as angularPartials from '@porsche-design-system/components-angular/partials';
import * as jsPartials from '@porsche-design-system/components-js/partials';
import { describe, expect, it } from 'vitest';

describe('partials', () => {
  it('should reexport partials sub-package from components-js', () => {
    expect(angularPartials).toEqual(jsPartials);
  });
});
