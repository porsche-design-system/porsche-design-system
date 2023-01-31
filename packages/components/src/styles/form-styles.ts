import type { JssStyle, Styles } from 'jss';
import type { BreakpointCustomizable, Theme } from '../types';
import { buildResponsiveStyles, isVisibleFormState } from '../utils';
import { addImportantToRule, getFormTextHiddenJssStyle, getThemedColors, getTransition } from './';
import {
  borderRadiusSmall,
  textSmallStyle,
  fontSizeTextXSmall,
  spacingStaticXSmall,
  borderWidthBase,
} from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from './form-state-color-styles';
import { hoverMediaQuery } from './hover-media-query';
import type { FormState } from '../utils/form/form-state';

// TODO: should be removed if possible?
export const INPUT_HEIGHT = 54;

export type ChildSelector = 'input' | 'select' | 'textarea';

export const getBaseChildStyles = (
  child: ChildSelector,
  state: FormState,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      width: '100%',
      height: 'auto',
      outline: 0,
      WebkitAppearance: 'none', // iOS safari
      appearance: 'none',
      boxSizing: 'border-box',
      border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
      borderRadius: borderRadiusSmall,
      background: 'transparent',
      font: textSmallStyle.font,
      textIndent: 0,
      color: primaryColor,
      transition: getTransition('border-color'),
      ...additionalDefaultJssStyle,
    },
    ...(hoverMediaQuery({
      // with the media query the selector has higher priority and overrides disabled styles
      [`::slotted(${child}:not(:disabled):not(:focus):not([readonly]):hover)`]: {
        borderColor: formStateHoverColor || primaryColor,
      },
    }) as Styles),
    [`::slotted(${child}:focus)`]: {
      borderColor: primaryColor,
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
      display: 'flex',
      flexDirection: 'column',
      gap: spacingStaticXSmall,
      position: 'relative', // for unit and counter
      '&__text': {
        display: 'block',
        ...buildResponsiveStyles(hideLabel, getFormTextHiddenJssStyle),
        ...textSmallStyle,
        color: isDisabled ? disabledColor : primaryColor,
        transition: getTransition('color'), // for smooth transitions between disabled states
        '&+&': {
          marginTop: `-${spacingStaticXSmall}`,
          fontSize: fontSizeTextXSmall,
          ...(!isDisabled && {
            color: contrastHighColor,
          }),
        },
        ...hoverMediaQuery({
          '&:hover': {
            [`&~::slotted(${child}:not(:disabled):not(:focus):not([readonly]))` +
            (hasVisibleState ? `,::slotted(${child}:not(:disabled):not(:focus):not([readonly]):hover)` : '')]: {
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
