import { hasIcon, hasSubline } from './link-pure-utils';

describe('hasIcon', () => {
  it('should return true if called with valid iconName', () => {
    expect(hasIcon('highway')).toBe(true);
  });
  it('should return false if iconName = none', () => {
    expect(hasIcon('none')).toBe(false);
  });
});

describe('hasSubline', () => {
  it('should return true with slotted subline', () => {
    const host = document.createElement('p-link-pure');
    const paragraph = document.createElement('p');
    paragraph.slot = 'subline';
    host.appendChild(paragraph);

    expect(hasSubline(host)).toBe(true);
  });
  it('should return false without subline', () => {
    const host = document.createElement('p-link-pure');
    expect(hasSubline(host)).toBe(false);
  });
});
