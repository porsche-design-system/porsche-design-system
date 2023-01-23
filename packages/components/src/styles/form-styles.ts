import type { JssStyle, Styles } from 'jss';
import type { BreakpointCustomizable, Theme } from '../types';
import { buildResponsiveStyles, isThemeDark, isVisibleFormState } from '../utils';
import { addImportantToRule, getFormTextHiddenJssStyle, getThemedColors, getTransition, pxToRemWithUnit } from './';
import {
  borderRadiusSmall,
  textSmallStyle,
  fontSizeTextXSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from './form-state-color-styles';
import { hoverMediaQuery } from './hover-media-query';
import type { FormState } from '../utils/form/form-state';

export const INPUT_HEIGHT = 54;

export type ChildSelector = 'input' | 'select' | 'textarea';

export const getBaseChildStyles = (
  child: ChildSelector,
  state: FormState,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { primaryColor, primaryColorDarken, contrastLowColor, contrastHighColor, contrastMediumColor, disabledColor } =
    getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState(state);

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      position: 'relative',
      width: '100%',
      ...(child !== 'textarea' && { height: pxToRemWithUnit(INPUT_HEIGHT) }),
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
        borderColor: contrastLowColor,
        background: contrastLowColor,
      },
      [`::slotted(${child}[readonly]:focus)`]: {
        background: contrastLowColor,
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

  const counterOrUnitOrIconStylesKey = counterOrUnitOrIconStyles && Object.keys(counterOrUnitOrIconStyles)[0];

  return {
    label: {
      display: 'block',
      position: 'relative', // for unit and counter
      '&__text': {
        display: 'block',
        ...buildResponsiveStyles(hideLabel, getFormTextHiddenJssStyle),
        ...textSmallStyle,
        color: isDisabled ? disabledColor : primaryColor,
        // transition: getTransition('color'),
        '&+&': {
          marginTop: `-${spacingStaticXSmall}`,
          fontSize: fontSizeTextXSmall,
          ...(!isDisabled && {
            color: contrastHighColor,
          }),
        },
        ...hoverMediaQuery({
          '&:hover': {
            [`&~::slotted(${child}:not(:disabled):not([readonly]))` +
            (hasVisibleState ? `,::slotted(${child}:not(:disabled):not([readonly]):hover)` : '')]: {
              borderColor: addImportantToRule(hasVisibleState ? formStateHoverColor : primaryColor),
            },
          },
        }),
      },
    },
    ...(counterOrUnitOrIconStyles && {
      [counterOrUnitOrIconStylesKey]: {
        ...counterOrUnitOrIconStyles[counterOrUnitOrIconStylesKey],
        pointerEvents: 'none',
        ...(isDisabled && {
          color: disabledColor,
          cursor: 'not-allowed',
        }),
      },
    }),
  };
};
