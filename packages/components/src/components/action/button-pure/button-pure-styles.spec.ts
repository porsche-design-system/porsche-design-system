import { getComponentCss } from './button-pure-styles';
import type { BreakpointCustomizable } from '../../../utils';
import type { AlignLabel, LinkButtonPureIconName, TextSize, Theme } from '../../../types';
import { ThemeExtendedElectric } from '../../../types';

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
    isDisabledOrLoading: boolean;
    stretch: BreakpointCustomizable<boolean>;
    size: BreakpointCustomizable<TextSize>;
    hideLabel: BreakpointCustomizable<boolean>;
    alignLabel: AlignLabel;
    hasSubline: boolean;
    theme: ThemeExtendedElectric;
  }>([
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: true,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: true,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: true,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: true,
      isDisabledOrLoading: true,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      active: true,
      isDisabledOrLoading: false,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'left',
      hasSubline: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: true,
      isDisabledOrLoading: false,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'left',
      hasSubline: false,
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'right',
      hasSubline: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'right',
      hasSubline: true,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: 'right',
      hasSubline: false,
      theme: 'light',
    },
    {
      icon: 'none',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: false,
      stretch: breakpointCustomizableBoolean,
      size: breakpointCustomizableSize,
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: breakpointCustomizableAlignLabel,
      hasSubline: false,
      theme: 'light',
    },
  ])(
    'should return correct css for %j',
    ({ icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, hasSubline, theme }) => {
      expect(
        getComponentCss(icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, hasSubline, theme)
      ).toMatchSnapshot();
    }
  );
});
