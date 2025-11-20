import * as angularTesting from '@porsche-design-system/components-angular/testing';
import * as jsTesting from '@porsche-design-system/components-js/testing';
import { describe, expect, it } from 'vitest';

describe('testing', () => {
  it('should reexport testing sub-package from components-js', () => {
    expect(angularTesting).toEqual(jsTesting);
  });
});
