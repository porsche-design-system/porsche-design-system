import type { BreakpointCustomizable, Theme } from '../types';
import type { Styles } from 'jss';
import { buildResponsiveStyles, isDisabledOrLoading, isHighContrastMode } from '../utils';
import {
  addImportantToEachRule,
  getHiddenTextStyles,
  getHighContrastColors,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '.';
import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { FormState } from '../utils/form/form-state';
import { getThemedFormStateColors } from './form-state-color-styles';
import { getFunctionalComponentRequiredStyles } from '../components/common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../components/common/state-message/state-message-styles';

export const getCheckboxRadioJssStyle = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): Styles => {
  const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor, focusColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { canvasTextColor } = getHighContrastColors();
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const checkedColor = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
    ? disabledColor
    : formStateColor || primaryColor;
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
          background: `transparent 0% 0% / ${fontLineHeight}`,
          transition: ['border-color', 'background-color'].map(getTransition).join(),
          border: `2px solid ${uncheckedColor}`,
          outline: 0,
          cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
        },
        '&(input:checked)': {
          // background-image is merged in later
          borderColor: checkedColor,
          backgroundColor: checkedColor,
        },
        ...(!disabledOrLoading && {
          ...(!isHighContrastMode &&
            hoverMediaQuery({
              '&(input:hover), .text:hover ~ &(input)': {
                borderColor: uncheckedHoverColor,
              },
              '&(input:checked:hover), .text:hover ~ &(input:checked)': {
                borderColor: checkedHoverColor,
                backgroundColor: checkedHoverColor,
              },
            })),
          ...(!isDisabled && {
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
      }),
      label: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
      },
    },
    text: {
      order: 1,
      cursor: disabledOrLoading ? 'default' : 'pointer',
      ...textSmallStyle,
      color: disabledOrLoading ? disabledColor : primaryColor,
      transition: getTransition('color'), // for smooth transition between different states
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) => ({
        ...getHiddenTextStyles(isHidden, { width: 'auto', padding: `2px 0 0 ${spacingStaticSmall}` }),
      })),
    },
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  };
};
