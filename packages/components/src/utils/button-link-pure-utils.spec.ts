import { hasVisibleIcon } from './button-link-pure-utils';

describe('hasVisibleIcon()', () => {
  it('should return true if called with valid iconName', () => {
    expect(hasVisibleIcon('highway', '')).toBe(true);
  });

  it('should return true if called with custom icon name', () => {
    expect(hasVisibleIcon('none', 'custom-icon.svg')).toBe(true);
  });

  it('should return false if iconName = none && iconSource = ""', () => {
    expect(hasVisibleIcon('none', '')).toBe(false);
  });
});
