import { isScrollable } from './scroller-utils';

describe('isScrollable()', () => {
  it('should return false when both prev and next are hidden', () => {
    expect(isScrollable(true, true)).toBe(false);
  });

  it('should return true when only prev is hidden', () => {
    expect(isScrollable(true, false)).toBe(true);
  });

  it('should return true when only next is hidden', () => {
    expect(isScrollable(false, true)).toBe(true);
  });

  it('should return true when neither prev nor next is hidden', () => {
    expect(isScrollable(false, false)).toBe(true);
  });
});
