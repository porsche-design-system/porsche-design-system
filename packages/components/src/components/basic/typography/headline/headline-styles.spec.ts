import { getComponentCss, getSlottedCss } from './headline-styles';
import type { HeadlineVariant, TextAlign, TextColor, Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<[HeadlineVariant, TextAlign, Extract<TextColor, 'default' | 'inherit'>, boolean, Theme]>([
    ['headline-1', 'left', 'default', false, 'light'],
    ['inherit', 'left', 'default', false, 'light'],
    ['large-title', 'center', 'inherit', true, 'dark'],
    ['headline-2', 'center', 'inherit', true, 'dark'],
    ['headline-3', 'center', 'inherit', true, 'dark'],
    ['headline-4', 'center', 'inherit', true, 'dark'],
    ['headline-5', 'center', 'inherit', true, 'dark'],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
    ],
  ])(
    'should return correct css for variant: %s, align: %s, color: %s, ellipsis: %s and theme: %o',
    (variant, align, color, ellipsis, theme) => {
      expect(getComponentCss(variant, align, color, ellipsis, theme)).toMatchSnapshot();
    }
  );
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
