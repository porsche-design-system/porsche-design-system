/**
 * @jest-environment node
 */

import * as fromPartials from '../../../src';
import * as shared from '../../../src/shared';

it.each(Object.keys(fromPartials))('should not throw in node for %s', (partialName) => {
  const spy = jest.spyOn(shared, 'throwIfRunInBrowser');

  try {
    // catch exception that may occur in followup validation regarding options
    expect(fromPartials[partialName]).not.toThrow();
  } catch {}

  expect(spy).toBeCalledWith(partialName);
});
