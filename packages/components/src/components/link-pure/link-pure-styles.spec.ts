import { getComponentCss } from './link-pure-styles';
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
    stretch: BreakpointCustomizable<boolean>;
    size: BreakpointCustomizable<TextSize>;
    hideLabel: BreakpointCustomizable<boolean>;
    alignLabel: BreakpointCustomizable<AlignLabel>;
    underline: boolean;
    hasSlottedAnchor: boolean;
    theme: Theme;
  }>([
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'left',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      underline: true,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: true,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'start',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: true,
      stretch: true,
      size: 'x-large',
      hideLabel: false,
      alignLabel: 'start',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'dark',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'none',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'none',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'inherit',
      hideLabel: false,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: true,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: true,
      alignLabel: 'end',
      underline: false,
      hasSlottedAnchor: true,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      iconSource: '',
      active: false,
      stretch: breakpointCustomizableBoolean,
      size: breakpointCustomizableSize,
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: breakpointCustomizableAlignLabel,
      underline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
  ])(
    'should return correct css for %j',
    ({ icon, iconSource, active, stretch, size, hideLabel, alignLabel, underline, hasSlottedAnchor, theme }) => {
      expect(
        getComponentCss(
          icon,
          iconSource,
          active,
          stretch,
          size,
          hideLabel,
          alignLabel,
          underline,
          hasSlottedAnchor,
          theme
        )
      ).toMatchSnapshot();
    }
  );
});
