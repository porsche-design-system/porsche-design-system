import type { BreakpointCustomizable, Theme } from '../types';
import type { JssStyle } from 'jss';
import { buildResponsiveStyles } from '../utils';
import { getFormCheckboxRadioHiddenJssStyle, getTransition, getThemedColors } from '.';
import { textFluidSmall } from '@porsche-design-system/utilities-v2';

export const getCheckboxRadioLabelJssStyle = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme
): JssStyle => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  return {
    order: 1,
    display: 'inline-block',
    cursor: isDisabled ? 'default' : 'pointer',
    ...textFluidSmall,
    color: isDisabled ? disabledColor : primaryColor,
    transition: getTransition('color'),
    ...buildResponsiveStyles(hideLabel, getFormCheckboxRadioHiddenJssStyle),
  };
};
