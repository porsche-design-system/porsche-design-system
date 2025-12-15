import * as angularTesting from '@porsche-design-system/components-angular/testing';
import * as jsTesting from '@porsche-design-system/components-js/testing';
import { describe, expect, it } from 'vitest';

describe('testing', () => {
  it('should reexport testing sub-package from components-js', () => {
    const angularKeys = Object.keys(angularTesting)
      .filter((key) => key !== 'default')
      .sort();
    const jsKeys = Object.keys(jsTesting)
      .filter((key) => key !== 'default')
      .sort();

    expect(angularKeys).toEqual(jsKeys);
  });
});
