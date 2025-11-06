import * as angularTesting from '@porsche-design-system/components-angular/testing';
import * as jsTesting from '@porsche-design-system/components-js/testing';
import { expect, it } from 'vitest';

it('should reexport testing sub-package from components-js', () => {
  expect(angularTesting).toEqual(jsTesting);
});
