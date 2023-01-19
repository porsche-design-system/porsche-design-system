import type { BreakpointCustomizable, Theme } from '../types';
import type { JssStyle } from 'jss';
import { buildResponsiveStyles } from '../utils';
import { getFormCheckboxRadioHiddenJssStyle, getTransition, getThemedColors } from '.';
import { textSmallStyle } from '@porsche-design-system/utilities-v2';

export const getCheckboxRadioLabelJssStyle = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme
): JssStyle => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  return {
    order: 1,
    cursor: isDisabled ? 'default' : 'pointer',
    ...textSmallStyle,
    color: isDisabled ? disabledColor : primaryColor,
    transition: getTransition('color'),
    ...buildResponsiveStyles(hideLabel, getFormCheckboxRadioHiddenJssStyle),
  };
};
