import { getComponentCss } from './button-pure-styles';
import type { AlignLabel, BreakpointCustomizable, LinkButtonPureIconName, TextSize, Theme } from '../../types';

xdescribe('getComponentCss()', () => {
  const breakpointCustomizableBoolean = { base: true, xs: false, s: true, m: false, l: true, xl: false };
  const breakpointCustomizableSize: BreakpointCustomizable<TextSize> = {
    base: 'x-small',
    xs: 'small',
    s: 'medium',
    m: 'large',
    l: 'x-large',
    xl: 'inherit',
  };
  const breakpointCustomizableAlignLabel: BreakpointCustomizable<AlignLabel> = {
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
    alignLabel: BreakpointCustomizable<AlignLabel>;
    theme: Theme;
  }>([
    {
      icon: 'arrow-head-right',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
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
      theme: 'light',
    },
    {
      icon: 'none',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'inherit',
      hideLabel: false,
      alignLabel: 'right',
      theme: 'light',
    },
    {
      icon: 'none',
      active: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: breakpointCustomizableSize,
      hideLabel: false,
      alignLabel: 'right',
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
      theme: 'light',
    },
  ])(
    'should return correct css for %j',
    ({ icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, theme }) => {
      expect(
        getComponentCss(icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, theme)
      ).toMatchSnapshot();
    }
  );
});
