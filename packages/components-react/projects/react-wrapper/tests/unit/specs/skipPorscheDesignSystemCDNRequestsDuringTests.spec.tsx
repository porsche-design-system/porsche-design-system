import { skipPorscheDesignSystemCDNRequestsDuringTests } from '@porsche-design-system/components-react';
import { expect, it } from 'vitest';

it('should set window.PDS_SKIP_FETCH to true', () => {
  expect((window as any).PDS_SKIP_FETCH).toBe(undefined); // since jsdom-polyfill isn't applied

  skipPorscheDesignSystemCDNRequestsDuringTests();
  expect((window as any).PDS_SKIP_FETCH).toBe(true);

  (window as any).PDS_SKIP_FETCH = undefined;
});
