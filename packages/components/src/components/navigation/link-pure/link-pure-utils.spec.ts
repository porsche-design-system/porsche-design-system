import { hasIcon } from './link-pure-utils';

describe('hasIcon', () => {
  it('should return true if called with valid iconName', () => {
    expect(hasIcon('highway')).toBe(true);
  });
  it('should return false if iconName = none', () => {
    expect(hasIcon('none')).toBe(false);
  });
});
