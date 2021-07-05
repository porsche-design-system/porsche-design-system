import { getCollapsibleElementHeight } from '../../../src/components/content/accordion/accordion-utils';

describe('getCollapsibleElementHeight()', () => {
  it('should return "200px" if isOpen = true', () => {
    expect(getCollapsibleElementHeight(true, '200px')).toBe('200px');
  });

  it('should return "0" if isOpen = false', () => {
    expect(getCollapsibleElementHeight(false, '200px')).toBe('0');
  });
});
