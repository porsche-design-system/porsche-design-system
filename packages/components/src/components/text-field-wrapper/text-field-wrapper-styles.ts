import type { BreakpointCustomizable, Theme } from '../../types';
import { buildSlottedStyles, getCss } from '../../utils';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import { isType } from './text-field-wrapper-utils';
import { addImportantToEachRule, getScreenReaderOnlyJssStyle, getThemedColors } from '../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { FormState } from '../../utils/form/form-state';
import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const cssVariableInputPaddingLeft = '--p-internal-text-field-input-padding-left';
export const cssVariableInputPaddingRight = '--p-internal-text-field-input-padding-right';

const buttonOrIconPadding = '4px';
const buttonOrIconSize = `calc(${fontLineHeight} + ${buttonOrIconPadding} * 2)`;
const buttonOrIconOffset = '9px';

const baseButtonOrIconStyles = {
  position: 'absolute',
  bottom: '11px',
  padding: buttonOrIconPadding,
  font: `1rem ${fontFamily}`,
};

const getInputPaddingHorizontal = (buttonOrIconAmount: number): string => {
  return `calc(${buttonOrIconOffset} * 2 + ${buttonOrIconSize} * ${buttonOrIconAmount})`;
};

const getButtonOrIconOffsetHorizontal = (buttonOrIconAmount: number): string => {
  const multiplier = buttonOrIconAmount > 1 ? ` + ${buttonOrIconSize} * ${buttonOrIconAmount - 1}` : '';
  return `calc(${buttonOrIconOffset} + ${borderWidthBase}${multiplier})`;
};

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasUnitOrVisibleCounter: boolean,
  unitPosition: TextFieldWrapperUnitPosition,
  inputType: string,
  isWithinForm: boolean,
  theme: Theme
): string => {
  const { contrastMediumColor } = getThemedColors(theme);
  const isSearch = isType(inputType, 'search');
  const isPassword = isType(inputType, 'password');
  const isNumber = isType(inputType, 'number');
  const isSearchOrPassword = isSearch || isPassword;
  const isSearchWithoutForm = isSearch && !isWithinForm;
  const isSearchWithForm = isSearch && isWithinForm;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [cssVariableInputPaddingLeft]: isSearchWithoutForm ? getInputPaddingHorizontal(1) : spacingStaticMedium,
          [cssVariableInputPaddingRight]: isSearchOrPassword
            ? getInputPaddingHorizontal(isSearchWithForm ? 2 : 1)
            : spacingStaticMedium,
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        ...getBaseChildStyles('input', state, theme, {
          padding: `13px var(${cssVariableInputPaddingRight}) 13px var(${cssVariableInputPaddingLeft})`,
          ...(isNumber && {
            MozAppearance: 'textfield', // hides up/down spin button for Firefox
          }),
        }),
        '::slotted': {
          '&(input:-internal-autofill-selected),&(input:-internal-autofill-previewed),&(input:-webkit-autofill),&(input:-webkit-autofill:focus)':
            {
              WebkitBackgroundClip: 'padding-box', // reset webkit autofill styles
            },
        },
      }),
    },
    ...(isSearchOrPassword && {
      button: {
        ...baseButtonOrIconStyles,
        right: getButtonOrIconOffsetHorizontal(1),
        // TODO: maybe we should render hidden button conditionally, needs to be checked if a11y compliant
        '&:not([hidden]) ~ .button': {
          right: getButtonOrIconOffsetHorizontal(2),
        },
      },
    }),
    ...(isSearchWithoutForm && {
      icon: {
        ...baseButtonOrIconStyles,
        left: getButtonOrIconOffsetHorizontal(1),
        pointerEvents: 'none',
      },
    }),
    root: {
      display: 'block',
      position: 'relative',
    },
    ...getLabelStyles(
      'input',
      isDisabled,
      hideLabel,
      state,
      theme,
      hasUnitOrVisibleCounter && {
        unit: {
          position: 'absolute',
          bottom: '15px',
          [unitPosition === 'suffix' ? 'right' : 'left']: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          padding: unitPosition === 'suffix' ? `0 ${spacingStaticMedium} 0 10px` : `0 10px 0 ${spacingStaticMedium}`,
          font: textSmallStyle.font,
          color: contrastMediumColor,
        },
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    'sr-only': {
      ...getScreenReaderOnlyJssStyle(),
      padding: 0,
    },
  });
};

// TODO: should be transferred to normalize styles (getInitialStyles partial)
export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      // the following selectors don't work within ::slotted() pseudo selector, therefore we have to apply them via light DOM
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration':
        {
          WebkitAppearance: 'none',
          appearance: 'none',
        },
      '& input[type="search"]::-webkit-search-cancel-button': {
        display: 'none',
      },
      '& input[type="text"]': {
        '&::-webkit-contacts-auto-fill-button, &::-webkit-credentials-auto-fill-button': {
          // TODO: does it have any effect?
          marginRight: '2.4375rem',
        },
      },
    })
  );
};
