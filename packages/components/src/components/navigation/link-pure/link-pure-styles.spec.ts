import {
  getComponentCss,
  getFocusSlottedPseudoStyles,
  GetFocusSlottedPseudoStylesOptions,
  getSlottedCss,
} from './link-pure-styles';
import type { BreakpointCustomizable } from '../../../utils';
import { AlignLabel, LinkButtonPureIconName, TextSize, ThemeExtendedElectricDark } from '../../../types';

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

describe('getFocusSlottedPseudoStyles()', () => {
  it.each<GetFocusSlottedPseudoStylesOptions>([{}, { color: 'red' }, { offset: 1 }])(
    'should return correct JssStyle for params: %o',
    (params) => {
      expect(getFocusSlottedPseudoStyles()).toMatchSnapshot();
    }
  );
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

  it.each<{
    icon: LinkButtonPureIconName;
    active: boolean;
    stretch: BreakpointCustomizable<boolean>;
    size: BreakpointCustomizable<TextSize>;
    hideLabel: BreakpointCustomizable<boolean>;
    alignLabel: AlignLabel;
    hasSubline: boolean;
    hasSlottedAnchor: boolean;
    theme: ThemeExtendedElectricDark;
  }>([
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      active: true,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'left',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: true,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'left',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'right',
      hasSubline: true,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'none',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: true,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: true,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: breakpointCustomizableBoolean,
      size: breakpointCustomizableSize,
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: breakpointCustomizableAlignLabel,
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
  ])(
    'should return correct css for %j',
    ({ icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasSlottedAnchor, theme }) => {
      expect(
        getComponentCss(icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasSlottedAnchor, theme)
      ).toMatchSnapshot();
    }
  );
});
