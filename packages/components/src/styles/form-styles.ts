import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import type { Theme } from '../types';
import type { FormState } from '../utils/form/form-state';
import { getThemedColors, getTransition, hoverMediaQuery, prefersColorSchemeDarkMediaQuery } from './';
import { getThemedFormStateColors } from './form-state-color-styles';

export type ChildSelector = 'input' | 'select' | 'textarea';

export const getSlottedTextFieldTextareaSelectStyles = (
  child: ChildSelector,
  state: FormState,
  isLoading: boolean,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { primaryColor, contrast20Color, contrast50Color, contrast40Color } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrast20Color: contrast20ColorDark,
    contrast50Color: contrast50ColorDark,
    contrast40Color: contrast40ColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  return {
    [`::slotted(${child})`]: {
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
      border: `${borderWidthBase} solid ${formStateColor || contrast50Color}`,
      borderRadius: borderRadiusSmall,
      background: 'transparent',
      font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
      textIndent: 0,
      color: primaryColor,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: formStateColorDark || contrast50ColorDark,
        color: primaryColorDark,
      }),
      ...additionalDefaultJssStyle,
    },
    '::slotted(:not(input[type="password"]))': {
      textOverflow: 'ellipsis',
    },
    ...(!isLoading &&
      (hoverMediaQuery({
        // with the media query the selector has higher priority and overrides disabled styles
        [`::slotted(${child}:not(:disabled):not(:focus):not([readonly]):hover),label:hover~.wrapper ::slotted(${child}:not(:disabled):not(:focus):not([readonly]))${
          child === 'select' ? ',label:hover~.wrapper ::part(select-wrapper-dropdown)' : ''
        }`]: {
          borderColor: formStateHoverColor || primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: formStateHoverColorDark || primaryColorDark,
          }),
        },
      }) as Styles)),
    // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
    [`::slotted(${child}:focus)`]: {
      borderColor: primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: primaryColorDark,
      }),
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: contrast40Color,
      borderColor: contrast40Color,
      WebkitTextFillColor: contrast40Color,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrast40ColorDark,
        borderColor: contrast40ColorDark,
        WebkitTextFillColor: contrast40ColorDark,
      }),
    },
    ...(child !== 'select' && {
      [`::slotted(${child}[readonly])`]: {
        borderColor: contrast20Color,
        background: contrast20Color,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: contrast20ColorDark,
          background: contrast20ColorDark,
        }),
      },
    }),
  };
};

export const formElementLayeredGap = '9px'; // to have same distance vertically and horizontally for e.g. button/icon within form element
export const formElementLayeredSafeZone = `calc(${formElementLayeredGap} + ${borderWidthBase})`;
// TODO: basic button/icon padding can already be set within style function instead of on component style level
export const formButtonOrIconPadding = spacingStaticXSmall;
// TODO: if we'd use 12px instead, it wouldn't be necessary for textarea to have a custom vertical padding,
//  unfortunately line-height alignment breaks for a select element for some reasons then
// TODO: basic form element padding can already be set within style function instead of on component style level
export const formElementPaddingVertical = spacingStaticSmall;
// TODO: basic form element padding can already be set within style function instead of on component style level
export const formElementPaddingHorizontal = spacingStaticMedium;
export const getCalculatedFormElementPaddingHorizontal = (buttonOrIconAmount: 1 | 2): string => {
  // when applied, font-family and font-size needs to be set too for correct calculation of ex-unit ($fontLineHeight)
  return `calc(${formElementLayeredGap} + ${formElementPaddingHorizontal} / 2 + (${fontLineHeight} + ${formButtonOrIconPadding} * 2) * ${buttonOrIconAmount})`;
};

// TODO: re-use in textarea-wrapper not only in text-field-wrapper
export const getUnitCounterJssStyle = (isDisabled: boolean, isReadonly: boolean, theme: Theme): JssStyle => {
  const { contrast40Color, contrast50Color, contrast80Color } = getThemedColors(theme);
  const {
    contrast40Color: contrast40ColorDark,
    contrast50Color: contrast50ColorDark,
    contrast80Color: contrast80ColorDark,
  } = getThemedColors('dark');

  return {
    pointerEvents: 'none',
    maxWidth: '100%',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    font: textSmallStyle.font,
    color: contrast50Color,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: contrast50ColorDark,
    }),
    ...(isDisabled && {
      color: contrast40Color,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrast40ColorDark,
      }),
    }),
    ...(isReadonly && {
      color: contrast80Color,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrast80ColorDark,
      }),
    }),
  };
};
