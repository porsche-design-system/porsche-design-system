import { hasSlottedAnchorOrButton } from './tag-status-utils';

describe('hasSlottedAnchorOrButton()', () => {
  it.each<{ tagName: string; expected: boolean }>([
    { tagName: 'a', expected: true },
    { tagName: 'button', expected: true },
    { tagName: 'div', expected: false },
  ])('should return true for %s', ({ tagName, expected }) => {
    const host = document.createElement('div');
    const tag = document.createElement(tagName);
    host.appendChild(tag);

    expect(hasSlottedAnchorOrButton(host)).toBe(expected);
  });
});
