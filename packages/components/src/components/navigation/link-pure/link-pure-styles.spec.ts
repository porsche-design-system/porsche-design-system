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

  it.each<{
    icon: LinkButtonPureIconName;
    active: boolean;
    stretch: BreakpointCustomizable<boolean>;
    size: BreakpointCustomizable<TextSize>;
    hideLabel: BreakpointCustomizable<boolean>;
    alignLabel: AlignLabel;
    hasSubline: boolean;
    hasHref: boolean;
    theme: Theme;
  }>([
    {
      icon: 'arrow-head-right',
      active: false,
      stretch: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasHref: true,
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
      hasHref: true,
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
      hasHref: true,
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
      hasHref: true,
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
      hasHref: true,
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
      hasHref: true,
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
      hasHref: true,
      theme: 'light',
    },
    {
      icon: 'none',
      stretch: false,
      active: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasHref: true,
      theme: 'light',
    },
    {
      icon: 'arrow-head-right',
      stretch: false,
      active: false,
      size: 'small',
      hideLabel: false,
      alignLabel: 'right',
      hasSubline: false,
      hasHref: false,
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
      hasHref: true,
      theme: 'light',
    },
  ])('should return correct css for %j', (props) => {
    const { icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasHref, theme } = props;
    expect(
      getComponentCss(icon, active, stretch, size, hideLabel, alignLabel, hasSubline, hasHref, theme)
    ).toMatchSnapshot();
  });
});
