import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { AlignLabel, BreakpointCustomizable, Theme } from '../../types';
import { getComponentCss } from './switch-styles';

describe('getComponentCss()', () => {
  const breakpointCustomizableAlignLabel: BreakpointCustomizable<AlignLabel> = {
    base: 'start',
    xs: 'end',
    s: 'start',
    m: 'end',
    l: 'start',
    xl: 'end',
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
    alignLabel: BreakpointCustomizable<AlignLabel>;
    hideLabel: BreakpointCustomizable<boolean>;
    stretch: BreakpointCustomizable<boolean>;
    checked: boolean;
    disabled: boolean;
    loading: boolean;
    compact: boolean;
    theme: Theme;
  }>([
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'left',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: true,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'start',
      hideLabel: true,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: breakpointCustomizableAlignLabel,
      hideLabel: breakpointCustomizableHideLabel,
      stretch: breakpointCustomizableStretch,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: true,
      disabled: false,
      loading: false,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: false,
      loading: true,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: true,
      loading: true,
      compact: false,
      theme: 'light',
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: true,
      loading: true,
      compact: false,
      theme: 'dark',
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: true,
      theme: 'light',
    },
  ])(
    'should return correct css for %j',
    ({ alignLabel, hideLabel, stretch, checked, disabled, loading, compact, theme }) => {
      validateCssAndMatchSnapshot(
        getComponentCss(alignLabel, hideLabel, stretch, checked, disabled, loading, compact, theme)
      );
    }
  );
});
