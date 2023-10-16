import { getComponentCss } from './button-pure-styles';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName, TextSize, Theme } from '../../types';

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
  const breakpointCustomizableAlignLabel: BreakpointCustomizable<AlignLabel> = {
    base: 'start',
    xs: 'end',
    s: 'start',
    m: 'end',
    l: 'start',
    xl: 'end',
  };

  it.each<{
    icon: LinkButtonIconName;
    iconSource: string;
    active: boolean;
    isLoading: boolean;
    isDisabledOrLoading: boolean;
    stretch: BreakpointCustomizable<boolean>;
    size: BreakpointCustomizable<TextSize>;
    hideLabel: BreakpointCustomizable<boolean>;
    alignLabel: BreakpointCustomizable<AlignLabel>;
    theme: Theme;
  }>([
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: true,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'none',
      iconSource: '',
      active: false,
      isLoading: true,
      isDisabledOrLoading: true,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: true,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: true,
      isLoading: false,
      isDisabledOrLoading: true,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: true,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'start',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: true,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'start',
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'none',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'none',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: 'inherit',
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'none',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: false,
      size: breakpointCustomizableSize,
      hideLabel: false,
      alignLabel: 'end',
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      isLoading: false,
      isDisabledOrLoading: false,
      stretch: breakpointCustomizableBoolean,
      size: breakpointCustomizableSize,
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: breakpointCustomizableAlignLabel,
      theme: 'light',
    },
  ])(
    'should return correct css for %j',
    ({ icon, iconSource, active, isLoading, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, theme }) => {
      expect(
        getComponentCss(
          icon,
          iconSource,
          active,
          isLoading,
          isDisabledOrLoading,
          stretch,
          size,
          hideLabel,
          alignLabel,
          theme
        )
      ).toMatchSnapshot();
    }
  );
});
