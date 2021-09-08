import { getComponentCss, getSlottedCss } from './link-pure-styles';
import type { BreakpointCustomizable } from '../../../utils';
import { AlignLabel, LinkButtonPureIconName, TextSize, Theme } from '../../../types';

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-link-pure');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});

describe('getComponentCss()', () => {
  const breakpointCustomizableBoolean = { base: true, xs: false, s: true, m: false, l: true, xl: false };
  const breakpointCustomizableSize: BreakpointCustomizable<TextSize> = {
    base: 'x-small',
    xs: 'small',
    s: 'medium',
    m: 'large',
    l: 'x-large',
    xl: 'inherit',
  };
  const breakpointCustomizableAlignLabel: AlignLabel = {
    base: 'left',
    xs: 'right',
    s: 'left',
    m: 'right',
    l: 'left',
    xl: 'right',
  };
  it.each<
    [
      LinkButtonPureIconName,
      boolean,
      BreakpointCustomizable<boolean>,
      BreakpointCustomizable<TextSize>,
      BreakpointCustomizable<boolean>,
      AlignLabel,
      boolean,
      boolean,
      Theme
    ]
  >([
    ['arrow-head-right', false, false, 'small', false, 'right', false, true, 'light'],
    ['arrow-head-right', false, false, 'small', false, 'right', false, true, 'dark'],
    ['arrow-head-right', true, true, 'x-large', false, 'left', false, true, 'light'],
    ['arrow-head-right', true, true, 'x-large', false, 'left', false, true, 'dark'],
    ['arrow-head-right', false, false, 'small', true, 'right', false, true, 'light'],
    ['arrow-head-right', false, false, 'small', true, 'right', true, true, 'light'],
    ['arrow-head-right', false, false, 'small', breakpointCustomizableBoolean, 'right', false, true, 'light'],
    ['none', false, false, 'small', false, 'right', false, true, 'light'],
    ['arrow-head-right', false, false, 'small', false, 'right', false, false, 'light'],
    [
      'arrow-head-right',
      false,
      breakpointCustomizableBoolean,
      breakpointCustomizableSize,
      false,
      breakpointCustomizableAlignLabel,
      false,
      true,
      'light',
    ],
  ])('should return correct css', (icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasHref, theme) => {
    expect(
      getComponentCss(icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasHref, theme)
    ).toMatchSnapshot();
  });
});
