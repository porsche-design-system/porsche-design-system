import { getComponentCss } from './switch-styles';
import type { BreakpointCustomizable } from '../../../utils';
import type { AlignLabel, LinkButtonPureIconName, TextSize, Theme } from '../../../types';
import { ThemeExtendedElectric } from '../../../types';

describe('getComponentCss()', () => {
  const breakpointCustomizableAlignLabel: AlignLabel = {
    base: 'left',
    xs: 'right',
    s: 'left',
    m: 'right',
    l: 'left',
    xl: 'right',
  };
  const breakpointCustomizableStretch: BreakpointCustomizable<boolean> = {
    base: false,
    xs: true,
    s: false,
    m: true,
    l: false,
    xl: true,
  };
  const breakpointCustomizableHideLabel: BreakpointCustomizable<boolean> = {
    base: true,
    xs: false,
    s: true,
    m: false,
    l: true,
    xl: false,
  };

  it.each<{
    alignLabel: AlignLabel;
    hideLabel: BreakpointCustomizable<boolean>;
    stretch: BreakpointCustomizable<boolean>;
    checked: boolean;
    loading: boolean;
    isDisabledOrLoading: boolean;
    theme: ThemeExtendedElectric;
  }>([
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: false,
      checked: false,
      loading: false,
      isDisabledOrLoading: false,
      theme: 'light',
    },
    {
      alignLabel: 'left',
      hideLabel: true,
      stretch: false,
      checked: false,
      loading: false,
      isDisabledOrLoading: false,
      theme: 'light',
    },
    {
      alignLabel: breakpointCustomizableAlignLabel,
      hideLabel: breakpointCustomizableHideLabel,
      stretch: breakpointCustomizableStretch,
      checked: false,
      loading: false,
      isDisabledOrLoading: false,
      theme: 'light',
    },
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: true,
      checked: false,
      loading: false,
      isDisabledOrLoading: false,
      theme: 'light',
    },
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: true,
      checked: true,
      loading: false,
      isDisabledOrLoading: false,
      theme: 'light',
    },
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: true,
      checked: false,
      loading: true,
      isDisabledOrLoading: false,
      theme: 'light',
    },
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: true,
      checked: false,
      loading: false,
      isDisabledOrLoading: true,
      theme: 'light',
    },
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: true,
      checked: false,
      loading: false,
      isDisabledOrLoading: true,
      theme: 'dark',
    },
  ])(
    'should return correct css for %j',
    ({ alignLabel, hideLabel, stretch, checked, loading, isDisabledOrLoading, theme }) => {
      expect(
        getComponentCss(alignLabel, hideLabel, stretch, checked, loading, isDisabledOrLoading, theme)
      ).toMatchSnapshot();
    }
  );
});
