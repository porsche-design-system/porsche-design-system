/**
 * @vitest-environment jsdom
 */

import * as fromPartials from '../../../src';
import * as shared from '../../../src/shared';
import { vi } from 'vitest';

for (const partialName of Object.keys(fromPartials)) {
  it(`should throw exception in jsdom for ${partialName}`, () => {
    const spy = vi.spyOn(shared, 'throwIfRunInBrowser');

    // @ts-ignore
    expect(fromPartials[partialName]).toThrowErrorMatchingInlineSnapshot(
      `[Error: [Porsche Design System] Partials can only be used during build time. You are using '${partialName}' at run time in a browser which defeats the effect of the partial.]`
    );
    expect(spy).toBeCalledWith(partialName);
  });
}
