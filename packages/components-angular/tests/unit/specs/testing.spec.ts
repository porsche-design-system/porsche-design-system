import * as angularTesting from '@porsche-design-system/components-angular/testing';
import * as jsTesting from '@porsche-design-system/components-js/testing';
import { describe, expect, it } from 'vitest';

describe('testing', () => {
  const angularTestingKeys = Object.keys(angularTesting)
    .filter((key) => key !== 'default')
    .sort();
  const jsTestingKeys = Object.keys(jsTesting)
    .filter((key) => key !== 'default')
    .sort();

  it('should match snapshot', () => {
    expect(angularTestingKeys).toMatchSnapshot();
    expect(jsTestingKeys).toMatchSnapshot();
  });

  it('should reexport testing sub-package from components-js', () => {
    angularTestingKeys.forEach((exportName) => {
      expect(jsTestingKeys).toContain(exportName);
      expect(typeof (jsTesting as any)[exportName]).not.toBe('default');
    });
  });
});
