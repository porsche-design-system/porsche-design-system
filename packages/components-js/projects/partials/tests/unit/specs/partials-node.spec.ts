import * as fromPartials from '../../../src';
import * as shared from '../../../src/shared';
import { vi, it, expect } from 'vitest';

it.each(Object.keys(fromPartials))('should not throw in node for %s', (partialName) => {
  const spy = vi.spyOn(shared, 'throwIfRunInBrowser');

  try {
    // catch exception that may occur in followup validation regarding options
    // @ts-ignore
    expect(fromPartials[partialName]).not.toThrow();
  } catch {}

  expect(spy).toHaveBeenCalledWith(partialName);
});
