import type { Styles } from '../utils';
import {
  addImportantToRule,
  BreakpointCustomizable,
  buildResponsiveStyles,
  getFormTextHiddenJssStyle,
  getInset,
  getThemedColors,
  getThemedFormStateColors,
  getTransition,
  isThemeDark,
  pxToRemWithUnit,
} from '../utils';
import { color, defaultFontFamilyAndWeight, fontSize } from '@porsche-design-system/utilities';
import type { FormState, Theme } from '../types';
import type { JssStyle } from '../utils';
import { isVisibleFormState } from '../utils/form-state';

export const INPUT_HEIGHT = 48;

export type ChildSelector = 'input' | 'select' | 'textarea';

export const getBaseChildStyles = (
  child: ChildSelector,
  state: FormState,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { baseColor, backgroundColor, contrastHighColor, contrastMediumColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState(state);

  const { disabled } = color.state; // 🤷 no theming here
  // TODO: Add readonly color to utilities package
  const readonly = '#ebebeb'; // 🤷

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      position: 'relative',
      ...getInset(),
      width: '100%',
      ...(child !== 'textarea' && { height: pxToRemWithUnit(INPUT_HEIGHT) }),
      margin: 0,
      outline: '1px solid transparent',
      outlineOffset: '2px',
      WebkitAppearance: 'none', // iOS safari
      appearance: 'none',
      boxSizing: 'border-box',
      border: hasVisibleState ? `2px solid ${formStateColor}` : `1px solid ${contrastMediumColor}`,
      borderRadius: 0,
      backgroundColor,
      opacity: 1,
      ...defaultFontFamilyAndWeight,
      ...fontSize.small,
      textIndent: 0,
      color: baseColor,
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(','),
      ...additionalDefaultJssStyle,
    },
    [`::slotted(${child}:hover)`]: {
      borderColor: formStateHoverColor || (isThemeDark(theme) ? contrastHighColor : baseColor),
    },
    [`::slotted(${child}:focus)`]: {
      outlineColor: formStateColor || contrastMediumColor,
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: disabled, // 🤷
      borderColor: disabled,
      WebkitTextFillColor: disabled, // fix placeholder color bug in Safari
    },
    ...(child !== 'select' && {
      [`::slotted(${child}[readonly])`]: {
        borderColor: readonly,
        backgroundColor: readonly,
      },
      [`::slotted(${child}[readonly]:focus)`]: {
        outlineColor: 'transparent',
      },
      [`::slotted(${child}[readonly]:not(:disabled))`]: {
        color: contrastMediumColor,
      },
    }),
  };
};

export const getLabelStyles = (
  child: ChildSelector,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme,
  additionalRefForInputHover?: string
): Styles => {
  const { baseColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const { formStateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState(state);

  return {
    label: {
      display: 'block',
      position: 'relative', // for unit and counter
      '&--disabled': {
        '& .label__text': {
          color: disabledColor,
        },
        ...(additionalRefForInputHover && {
          [`& ${additionalRefForInputHover}`]: {
            color: disabledColor,
            cursor: 'not-allowed',
          },
        }),
      },
      '&__text': {
        ...buildResponsiveStyles(hideLabel, getFormTextHiddenJssStyle),
        display: 'block',
        width: 'fit-content',
        transition: getTransition('color'),
        '&+&--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
        },
        '&--description': {
          color: contrastMediumColor,
        },
      },
    },
    ['label__text' + (additionalRefForInputHover ? `,${additionalRefForInputHover}` : '')]: {
      '&:hover': {
        [`&~::slotted(${child}:not(:disabled):not([readonly]))` +
        (hasVisibleState ? `, ::slotted(${child}:hover:not(:disabled):not([readonly]))` : '')]: {
          borderColor: addImportantToRule(hasVisibleState ? formStateHoverColor : baseColor),
        },
      },
    },
  };
};
