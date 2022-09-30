import type { BreakpointCustomizable, Theme } from '../types';
import type { JssStyle } from 'jss';
import { buildResponsiveStyles } from '../utils';
import { getFormCheckboxRadioHiddenJssStyle, getTransition, getThemedColors } from '.';
import { textSmall } from '@porsche-design-system/utilities-v2';

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
    ...textSmall,
    color: isDisabled ? disabledColor : baseColor,
    transition: getTransition('color'),
    ...buildResponsiveStyles(hideLabel, getFormCheckboxRadioHiddenJssStyle),
  };
};
