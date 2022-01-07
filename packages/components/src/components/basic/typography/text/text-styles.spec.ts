import { getComponentCss, getSlottedCss } from './text-styles';
import type { BreakpointCustomizable, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<[TextAlign, boolean, Theme, TextWeight, TextColor, BreakpointCustomizable<TextSize>]>([
    ['left', false, 'light', 'regular', 'default', 'small'],
    ['right', true, 'dark', 'thin', 'brand', 'x-large'],
    [
      'center',
      true,
      'dark',
      'bold',
      'notification-error',
      { base: 'small', xs: 'large', s: 'medium', m: 'inherit', l: 'x-small', xl: 'x-large' },
    ],
  ])(
    'should return correct css for align: %s, ellipsis: %o, theme: %s, weight: %s, color: %s and size: %s',
    (align, ellipsis, theme, weight, color, size) => {
      expect(getComponentCss(align, ellipsis, theme, weight, color, size)).toMatchSnapshot();
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
