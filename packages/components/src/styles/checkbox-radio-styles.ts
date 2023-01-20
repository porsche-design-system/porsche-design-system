import type { BreakpointCustomizable, Theme } from '../types';
import type { Styles } from 'jss';
import { buildResponsiveStyles } from '../utils';
import {
  addImportantToEachRule,
  getFormCheckboxRadioHiddenJssStyle,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
} from '.';
import { borderWidthBase, fontFamily, fontLineHeight, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { FormState } from '../utils/form/form-state';
import { getThemedFormStateColors } from './form-state-color-styles';
import { hostHiddenStyles } from './host-hidden-styles';
import { hoverMediaQuery } from './hover-media-query';
import { getFunctionalComponentRequiredStyles } from '../components/common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../components/common/state-message/state-message-styles';

export const getCheckboxRadioLabelJssStyle = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  theme: Theme
): Styles => {
  const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor, focusColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);

  const uncheckedColor = isDisabled ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const checkedColor = isDisabled ? disabledColor : formStateColor || primaryColor;
  const checkedHoverColor = formStateHoverColor || contrastHighColor;

  return {
    '@global': {
      ':host': addImportantToEachRule({
        ...hostHiddenStyles,
        display: 'block',
      }),
      '::slotted': addImportantToEachRule({
        '&(input)': {
          position: 'relative',
          width: fontLineHeight,
          height: fontLineHeight,
          fontFamily, // needed for correct width and height definition
          fontSize: '1rem', // needed for correct width and height definition
          flexShrink: 0,
          display: 'block',
          margin: 0,
          padding: 0,
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          boxSizing: 'content-box',
          backgroundSize: fontLineHeight,
          backgroundColor: 'transparent',
          transition: ['border-color', 'background-color'].map(getTransition).join(),
          border: `2px solid ${uncheckedColor}`,
          outline: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        },
        '&(input:checked)': {
          borderColor: checkedColor,
          backgroundColor: checkedColor,
        },
        ...(!isDisabled && {
          ...hoverMediaQuery({
            '&(input:hover), .text:hover ~ &(input)': {
              borderColor: uncheckedHoverColor,
            },
            '&(input:checked:hover), .text:hover ~ &(input:checked)': {
              borderColor: checkedHoverColor,
              backgroundColor: checkedHoverColor,
            },
          }),
          '&(input:focus)::before': {
            content: '""',
            position: 'absolute',
            ...getInsetJssStyle(-6),
            border: `${borderWidthBase} solid ${focusColor}`,
          },
          '&(input:focus:not(:focus-visible))::before': {
            borderColor: 'transparent',
          },
        }),
      }),
      label: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
      },
    },
    text: {
      order: 1,
      cursor: isDisabled ? 'default' : 'pointer',
      ...textSmallStyle,
      color: isDisabled ? disabledColor : primaryColor,
      transition: getTransition('color'),
      ...buildResponsiveStyles(hideLabel, getFormCheckboxRadioHiddenJssStyle),
    },
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  };
};
