import type { JssStyle, Styles } from 'jss';
import type { BreakpointCustomizable, Theme } from '../types';
import { buildResponsiveStyles, isThemeDark, isVisibleFormState } from '../utils';
import { addImportantToRule, getFormTextHiddenJssStyle, getThemedColors, getTransition } from './';
import {
  borderRadiusSmall,
  textSmallStyle,
  fontSizeTextXSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from './form-state-color-styles';
import { hoverMediaQuery } from './hover-media-query';
import type { FormState } from '../utils/form/form-state';

export const INPUT_HEIGHT = '54px';

export type ChildSelector = 'input' | 'select' | 'textarea';

export const getBaseChildStyles = (
  child: ChildSelector,
  state: FormState,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { primaryColor, primaryColorDarken, contrastHighColor, contrastMediumColor, disabledColor } =
    getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState(state);

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      position: 'relative',
      width: '100%',
      ...(child !== 'textarea' && { height: INPUT_HEIGHT }),
      outline: 'none',
      WebkitAppearance: 'none', // iOS safari
      appearance: 'none',
      boxSizing: 'border-box',
      border: `2px solid ${hasVisibleState ? formStateColor : contrastMediumColor}`, // TODO: verify color
      borderRadius: borderRadiusSmall,
      background: 'transparent',
      font: textSmallStyle.font,
      textIndent: 0,
      color: primaryColor, // TODO: verify color
      transition: getTransition('border-color'),
      ...additionalDefaultJssStyle,
    },
    ...(hoverMediaQuery({
      // with the media query the selector has higher priority and overrides disabled styles
      [`::slotted(${child}:not(:disabled):not([readonly]):hover)`]: {
        borderColor: formStateHoverColor || (isThemeDark(theme) ? contrastHighColor : primaryColor),
      },
    }) as Styles),
    [`::slotted(${child}:focus)`]: {
      borderColor: formStateColor || primaryColorDarken,
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: disabledColor,
      borderColor: disabledColor,
      WebkitTextFillColor: disabledColor,
    },
    ...(child !== 'select' && {
      [`::slotted(${child}[readonly])`]: {
        borderColor: disabledColor,
        background: disabledColor,
      },
      [`::slotted(${child}[readonly]:focus)`]: {
        background: disabledColor,
      },
    }),
  };
};

export const getLabelStyles = (
  child: ChildSelector,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme,
  counterOrUnitOrIconStyles?: Styles<'counter'> | Styles<'unit'> | Styles<'icon'>
): Styles => {
  const { primaryColor, disabledColor, contrastHighColor } = getThemedColors(theme);
  const { formStateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState(state);

  // jss prefers flat and simple selectors, therefore we reuse properties
  const labelTextHoverJssStyle: JssStyle = hoverMediaQuery({
    '&:hover': {
      [`&~::slotted(${child}:not(:disabled):not([readonly]))` +
      (hasVisibleState ? `,::slotted(${child}:not(:disabled):not([readonly]):hover)` : '')]: {
        borderColor: addImportantToRule(hasVisibleState ? formStateHoverColor : primaryColor),
      },
    },
  });

  const counterOrUnitOrIconStylesKey = counterOrUnitOrIconStyles && Object.keys(counterOrUnitOrIconStyles)[0];

  return {
    label: {
      display: 'block',
      position: 'relative', // for unit and counter
      '&__text': {
        display: 'block',
        ...buildResponsiveStyles(hideLabel, getFormTextHiddenJssStyle),
        ...textSmallStyle,
        color: isDisabled ? disabledColor : primaryColor, // TODO: check color
        // transition: getTransition('color'),
        '&:last-of-type': {
          marginBottom: spacingStaticXSmall,
        },
        '&+&': {
          fontSize: fontSizeTextXSmall,
          ...(!isDisabled && {
            color: contrastHighColor, // TODO: check color
          }),
        },
        ...labelTextHoverJssStyle,
      },
    },
    ...(counterOrUnitOrIconStyles && {
      [counterOrUnitOrIconStylesKey]: {
        ...counterOrUnitOrIconStyles[counterOrUnitOrIconStylesKey],
        ...(isDisabled && {
          color: disabledColor,
          cursor: 'not-allowed',
        }),
        ...labelTextHoverJssStyle,
      },
    }),
  };
};
