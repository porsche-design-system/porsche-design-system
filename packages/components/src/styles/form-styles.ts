import type { JssStyle, Styles } from 'jss';
import type { Theme } from '../types';
import { getThemedColors, getTransition, hoverMediaQuery, prefersColorSchemeDarkMediaQuery } from './';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from './form-state-color-styles';
import type { FormState } from '../utils/form/form-state';

// TODO: should be removed if possible?
export const INPUT_HEIGHT = 54;

export type ChildSelector = 'input' | 'select' | 'textarea';

export const getSlottedInputTextareaSelectStyles = (
  child: ChildSelector,
  state: FormState,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastLowColor: contrastLowColorDark,
    contrastMediumColor: contrastMediumColorDark,
    disabledColor: disabledColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  return {
    [`::slotted(${child})`]: {
      // TODO: gridArea should be defined by integrating style
      gridArea: '3 / 1 / auto / span 3',
      display: 'block',
      width: '100%',
      height:
        child !== 'textarea'
          ? `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)` // we need 10px additionally so input height becomes 54px
          : 'auto',
      margin: 0,
      outline: 0,
      WebkitAppearance: 'none', // iOS safari
      appearance: 'none',
      boxSizing: 'border-box',
      border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
      borderRadius: borderRadiusSmall,
      background: 'transparent',
      font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
      textIndent: 0,
      color: primaryColor,
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(), // for smooth transitions between e.g. disabled states
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: formStateColorDark || contrastMediumColorDark,
        color: primaryColorDark,
      }),
      ...additionalDefaultJssStyle,
    },
    ...(hoverMediaQuery({
      // with the media query the selector has higher priority and overrides disabled styles
      [`::slotted(${child}:not(:disabled):not(:focus):not([readonly]):hover),.label:hover~* ::slotted(${child}:not(:disabled):not(:focus):not([readonly]))`]:
        {
          borderColor: formStateHoverColor || primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: formStateHoverColorDark || primaryColorDark,
          }),
        },
    }) as Styles),
    [`::slotted(${child}:focus)`]: {
      borderColor: primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: primaryColorDark,
      }),
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: disabledColor,
      borderColor: disabledColor,
      WebkitTextFillColor: disabledColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: disabledColorDark,
        borderColor: disabledColorDark,
        WebkitTextFillColor: disabledColorDark,
      }),
    },
    ...(child !== 'select' && {
      [`::slotted(${child}[readonly])`]: {
        borderColor: contrastLowColor,
        background: contrastLowColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: contrastLowColorDark,
          background: contrastLowColorDark,
        }),
      },
    }),
  };
};

export const getUnitCounterStyles = (isDisabled: boolean, theme: Theme): JssStyle => {
  const { disabledColor, contrastMediumColor } = getThemedColors(theme);
  const { disabledColor: disabledColorDark, contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');

  return {
    pointerEvents: 'none',
    font: textSmallStyle.font,
    color: contrastMediumColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: contrastMediumColorDark,
    }),
    ...(isDisabled && {
      color: disabledColor,
      cursor: 'not-allowed',
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: disabledColorDark,
      }),
    }),
  };
};
