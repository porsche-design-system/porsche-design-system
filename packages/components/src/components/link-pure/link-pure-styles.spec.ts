import { getComponentCss } from './link-pure-styles';
import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  Theme,
} from '../../types';

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
    stretch: BreakpointCustomizable<boolean>;
    size: BreakpointCustomizable<TextSize>;
    weight: TextWeight;
    hideLabel: BreakpointCustomizable<boolean>;
    alignLabel: BreakpointCustomizable<AlignLabel>;
    hasSubline: boolean;
    hasSlottedAnchor: boolean;
    theme: Theme;
  }>([
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      weight: 'thin',
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
      weight: 'regular',
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
      weight: 'semibold',
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
      weight: 'bold',
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
      weight: 'thin',
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
      weight: 'regular',
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
      weight: 'semibold',
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
      weight: 'bold',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
    {
      icon: 'none',
      active: false,
      stretch: false,
      size: 'inherit',
      weight: 'regular',
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
      weight: 'thin',
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
      weight: 'regular',
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
      weight: 'semibold',
      hideLabel: breakpointCustomizableBoolean,
      alignLabel: breakpointCustomizableAlignLabel,
      hasSubline: false,
      hasSlottedAnchor: false,
      theme: 'light',
    },
  ])(
    'should return correct css for %j',
    ({ icon, active, stretch, size, weight, hideLabel, alignLabel, hasSubline, hasSlottedAnchor, theme }) => {
      expect(
        getComponentCss(icon, active, stretch, size, weight, hideLabel, alignLabel, hasSubline, hasSlottedAnchor, theme)
      ).toMatchSnapshot();
    }
  );
});
