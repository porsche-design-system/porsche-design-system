import type { Styles } from '../../utils';
import {
  addImportantToRule,
  BreakpointCustomizable,
  buildResponsiveStyles,
  colorDarken,
  getFormTextHiddenJssStyle,
  getInset,
  getThemedColors,
  getThemedFormStateColors,
  getTransition,
  pxToRemWithUnit,
} from '../../utils';
import { color, font } from '@porsche-design-system/utilities';
import { FormState, Theme } from '../../types';
import { JssStyle } from 'jss';

export const isVisibleState = (state: FormState): boolean => state === 'success' || state === 'error';

export type ChildSelector = 'input' | 'textarea';

export const getBaseChildStyles = (
  child: ChildSelector,
  state: FormState,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { baseColor, backgroundColor, contrastMediumColor } = getThemedColors(theme);
  const { stateColor, stateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleState(state);

  const { disabled } = color.state; // 🤷 no theming here
  const readonly = '#ebebeb'; // 🤷

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      position: 'relative',
      ...getInset(),
      width: '100%',
      ...(child === 'input' && { height: pxToRemWithUnit(48) }),
      margin: 0,
      outline: '1px solid transparent',
      outlineOffset: '2px',
      appearance: 'none',
      boxSizing: 'border-box',
      border: hasVisibleState ? `2px solid ${stateColor}` : `1px solid ${contrastMediumColor}`,
      borderRadius: 0,
      backgroundColor,
      opacity: 1,
      fontFamily: font.family,
      fontWeight: font.weight.regular,
      ...font.size.small,
      textIndent: 0,
      color: baseColor,
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(','),
      ...additionalDefaultJssStyle,
    },
    [`::slotted(${child}:hover)`]: {
      borderColor: hasVisibleState ? stateHoverColor : baseColor,
    },
    [`::slotted(${child}:focus)`]: {
      outlineColor: hasVisibleState ? stateColor : contrastMediumColor,
    },
    [`::slotted(${child}[readonly]:focus)`]: {
      outlineColor: 'transparent',
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: disabled, // 🤷
      borderColor: disabled,
      WebkitTextFillColor: disabled, // fix placeholder color bug in Safari
    },
    [`::slotted(${child}[readonly])`]: {
      borderColor: readonly,
      backgroundColor: readonly,
    },
    [`::slotted(${child}[readonly]:not(:disabled))`]: {
      color: contrastMediumColor,
    },
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
  const hasVisibleState = isVisibleState(state);

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
          borderColor: addImportantToRule(hasVisibleState ? colorDarken.notification[state] : baseColor),
        },
      },
    },
  };
};
