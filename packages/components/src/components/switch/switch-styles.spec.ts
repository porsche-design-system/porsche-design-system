import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { AlignLabel, BreakpointCustomizable } from '../../types';
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
  }>([
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
    },
    {
      alignLabel: 'right',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
    },
    {
      alignLabel: 'left',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: true,
      loading: false,
      compact: false,
    },
    {
      alignLabel: 'start',
      hideLabel: true,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
    },
    {
      alignLabel: breakpointCustomizableAlignLabel,
      hideLabel: breakpointCustomizableHideLabel,
      stretch: breakpointCustomizableStretch,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: false,
      loading: false,
      compact: false,
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: true,
      disabled: false,
      loading: false,
      compact: false,
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: false,
      loading: true,
      compact: false,
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: true,
      loading: true,
      compact: false,
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: true,
      checked: false,
      disabled: true,
      loading: true,
      compact: false,
    },
    {
      alignLabel: 'end',
      hideLabel: false,
      stretch: false,
      checked: false,
      disabled: false,
      loading: false,
      compact: true,
    },
  ])('should return correct css for %j', ({ alignLabel, hideLabel, stretch, checked, disabled, loading, compact }) => {
    validateCssAndMatchSnapshot(getComponentCss(alignLabel, hideLabel, stretch, checked, disabled, loading, compact));
  });
});
