import { getComponentCss, getSlottedCss } from './headline-styles';
import type { HeadlineVariant, TextAlign, TextColor, Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<[HeadlineVariant, boolean, Theme, TextAlign, Extract<TextColor, 'default' | 'inherit'>]>([
    ['headline-1', false, 'light', 'left', 'default'],
    ['large-title', true, 'dark', 'center', 'inherit'],
    [{ base: 'small' }, true, 'dark', 'right', 'default'],
    [{ base: 'small', xs: 'large', m: 'x-large' }, true, 'dark', 'right', 'default'],
    [{ base: 'small', xs: 'large', s: 'inherit', m: 'small' }, false, 'dark', 'right', 'brand'],
  ])(
    'should return correct css for variant: %s, ellipsis: %o, theme: %s, align: %s and color: %s',
    (variant, ellipsis, theme, align, color) => {
      expect(getComponentCss(variant, ellipsis, theme, align, color)).toMatchSnapshot();
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
