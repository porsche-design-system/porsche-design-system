/**
 * @vitest-environment jsdom
 */

import { vi, it, expect } from 'vitest';
import * as fromPartials from '../../../src';
import * as shared from '../../../src/shared';

for (const partialName of Object.keys(fromPartials)) {
  it(`should throw exception in jsdom for ${partialName}`, () => {
    const spy = vi.spyOn(shared, 'throwIfRunInBrowser');
    const expectedError = new Error(
      `[Porsche Design System] Partials can only be used during build time. You are using '${partialName}' at run time in a browser which defeats the effect of the partial.`
    );
    expect(() => fromPartials[partialName]()).toThrow(expectedError);
    expect(spy).toHaveBeenCalledWith(partialName);
  });
}
