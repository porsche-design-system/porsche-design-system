import { isScrollable } from './scroller-utils';

describe('isScrollable()', () => {
  it('should return false when both prev and next are undefined', () => {
    expect(isScrollable(undefined, undefined)).toBe(false);
  });

  it('should return false when both prev and next are false', () => {
    expect(isScrollable(false, false)).toBe(false);
  });

  it('should return true when only prev is visible', () => {
    expect(isScrollable(true, false)).toBe(true);
  });

  it('should return true when only next is visible', () => {
    expect(isScrollable(false, true)).toBe(true);
  });

  it('should return true when both prev and next are visible', () => {
    expect(isScrollable(true, true)).toBe(true);
  });
});
