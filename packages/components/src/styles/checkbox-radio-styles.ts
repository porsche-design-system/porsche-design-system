import { buildResponsiveStyles, getFormCheckboxRadioHiddenJssStyle, getThemedColors, getTransition } from '../utils';
import type { BreakpointCustomizable, Theme } from '../types';
import type { JssStyle } from '../utils';

export const getCheckboxRadioLabelJssStyle = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme
): JssStyle => {
  const { baseColor, disabledColor } = getThemedColors(theme);
  return {
    order: 1,
    display: 'inline-block',
    cursor: isDisabled ? 'default' : 'pointer',
    outline: 'none',
    color: isDisabled ? disabledColor : baseColor,
    transition: getTransition('color'),
    ...buildResponsiveStyles(hideLabel, getFormCheckboxRadioHiddenJssStyle),
  };
};
