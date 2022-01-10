import { getComponentCss, getSlottedCss } from './text-styles';
import type { BreakpointCustomizable, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<TextSize>, TextWeight, TextAlign, TextColor, boolean, Theme]>([
    ['small', 'regular', 'left', 'default', false, 'light'],
    ['x-large', 'thin', 'right', 'brand', true, 'dark'],
    ['x-large', 'regular', 'center', 'brand', false, 'dark'],
    ['large', 'semibold', 'left', 'notification-error', true, 'light'],
    ['medium', 'bold', 'right', 'neutral-contrast-high', true, 'dark'],
    ['x-small', 'semibold', 'left', 'inherit', false, 'light'],
    ['inherit', 'bold', 'center', 'default', false, 'light'],
    [
      { base: 'small', xs: 'large', s: 'medium', m: 'inherit', l: 'x-small', xl: 'x-large' },
      'bold',
      'center',
      'notification-error',
      true,
      'dark',
    ],
  ])(
    'should return correct css for size: %s, weight: %s, align: %s, color: %s, ellipsis: %o and theme: %s',
    (size, weight, align, color, ellipsis, theme) => {
      expect(getComponentCss(size, weight, align, color, ellipsis, theme)).toMatchSnapshot();
    }
  );
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-text');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-text');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
