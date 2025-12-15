// @vitest-environment node

import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { useBrowserLayoutEffect } from '../../../src/hooks';

describe('useBrowserLayoutEffect()', () => {
  it('should be an alias for useEffect in node', () => {
    expect(typeof global.window).toBe('undefined');
    expect(typeof global.document).toBe('undefined');
    expect(useBrowserLayoutEffect).toEqual(useEffect);
  });
});
