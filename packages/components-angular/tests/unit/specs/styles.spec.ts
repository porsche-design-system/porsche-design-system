import * as angularStyles from '@porsche-design-system/components-angular/emotion';
import * as jsStyles from '@porsche-design-system/components-js/emotion';
import { expect, it } from 'vitest';

it('should reexport styles sub-package from components-js', () => {
  expect(angularStyles).toEqual(jsStyles);
});
