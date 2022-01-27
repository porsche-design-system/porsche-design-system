import { hasVisibleIcon, hasSlottedSubline } from './button-link-pure-utils';

describe('hasVisibleIcon()', () => {
  it('should return true if called with valid iconName', () => {
    expect(hasVisibleIcon('highway')).toBe(true);
  });

  it('should return false if iconName = none', () => {
    expect(hasVisibleIcon('none')).toBe(false);
  });
});

describe('hasSlottedSubline()', () => {
  it('should return true with slotted subline', () => {
    const host = document.createElement('p-link-pure');
    const paragraph = document.createElement('p');
    paragraph.slot = 'subline';
    host.appendChild(paragraph);

    expect(hasSlottedSubline(host)).toBe(true);
  });

  it('should return false without subline', () => {
    const host = document.createElement('p-link-pure');
    expect(hasSlottedSubline(host)).toBe(false);
  });
});
