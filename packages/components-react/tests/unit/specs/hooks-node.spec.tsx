/**
 * @jest-environment node
 */

import { useBrowserLayoutEffect } from '../../../projects/components-wrapper/src/hooks';
import { useEffect } from 'react';

describe('useBrowserLayoutEffect()', () => {
  it('should be an alias for useEffect in node', () => {
    expect(typeof global.window).toBe('undefined');
    expect(typeof global.document).toBe('undefined');
    expect(useBrowserLayoutEffect).toEqual(useEffect);
  });
});
