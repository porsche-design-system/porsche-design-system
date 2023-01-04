import type { JssStyle, Styles } from 'jss';
import type { BreakpointCustomizable, Theme } from '../types';
import { buildResponsiveStyles, isThemeDark, isVisibleFormState } from '../utils';
import {
  addImportantToRule,
  getFormTextHiddenJssStyle,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from './';
import { textSmallFluid, textXSmallFluid } from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from './form-state-color-styles';
import { hoverMediaQuery } from './hover-media-query';
import type { FormState } from '../utils/form/form-state';

const { disabledColor: lightThemeDisabledColor } = getThemedColors('light');

export const INPUT_HEIGHT = 48;

export type ChildSelector = 'input' | 'select' | 'textarea';

export const getBaseChildStyles = (
  child: ChildSelector,
  state: FormState,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { primaryColor, backgroundColor, contrastHighColor, contrastMediumColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState(state);

  // TODO: Add readonly color to utilities package
  const readonly = '#ebebeb'; // 🤷

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      position: 'relative',
      ...getInsetJssStyle(),
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
      ...textSmallFluid,
      overflowWrap: null,
      hyphens: null,
      textIndent: 0,
      color: primaryColor,
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(),
      ...additionalDefaultJssStyle,
    },
    ...(hoverMediaQuery({
      // with the media query the selector has higher priority and overrides disabled styles
      [`::slotted(${child}:not(:disabled):not([readonly]):hover)`]: {
        borderColor: formStateHoverColor || (isThemeDark(theme) ? contrastHighColor : primaryColor),
      },
    }) as Styles),
    [`::slotted(${child}:focus)`]: {
      outlineColor: formStateColor || contrastMediumColor,
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: lightThemeDisabledColor, // 🤷 no theming here
      borderColor: lightThemeDisabledColor, // 🤷 no theming here
      WebkitTextFillColor: lightThemeDisabledColor, // 🤷 no theming here; fix placeholder color bug in Safari
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
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme,
  counterOrUnitOrIconStyles?: Styles<'counter'> | Styles<'unit'> | Styles<'icon'>
): Styles => {
  const { primaryColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
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
        ...textSmallFluid,
        color: isDisabled ? disabledColor : primaryColor,
        transition: getTransition('color'),
        '&+&--description': {
          marginTop: pxToRemWithUnit(-4),
          paddingBottom: pxToRemWithUnit(8),
          ...textXSmallFluid,
        },
        ...(!isDisabled && {
          '&--description': {
            color: contrastMediumColor,
          },
        }),
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
