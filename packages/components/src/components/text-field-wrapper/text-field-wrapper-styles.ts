import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import type { FormState } from '../../utils/form/form-state';
import { getCss } from '../../utils';
import { isType, showCustomCalendarOrTimeIndicator } from './text-field-wrapper-utils';
import {
  addImportantToEachRule,
  getHiddenTextJssStyle,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const cssVariableInputPaddingLeft = '--p-internal-text-field-input-padding-left';
export const cssVariableInputPaddingRight = '--p-internal-text-field-input-padding-right';

const buttonOrIconPadding = '4px';
const buttonOrIconSize = `calc(${fontLineHeight} + ${buttonOrIconPadding} * 2)`;
const buttonOrIconOffset = '9px';

const baseButtonOrIconStyles: JssStyle = {
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
  showPasswordToggle: boolean,
  isWithinForm: boolean,
  theme: Theme
): string => {
  const { contrastMediumColor } = getThemedColors(theme);
  const { contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
  const isSearch = isType(inputType, 'search');
  const isPassword = isType(inputType, 'password');
  const isNumber = isType(inputType, 'number');
  const isCalendar = isType(inputType, 'date') || isType(inputType, 'week') || isType(inputType, 'month');
  const isTime = isType(inputType, 'time');
  const isSearchOrPassword = isSearch || (isPassword && showPasswordToggle);
  const isSearchWithoutForm = isSearch && !isWithinForm;
  const isSearchWithForm = isSearch && isWithinForm;
  const isCalendarOrTimeWithCustomIndicator = showCustomCalendarOrTimeIndicator(isCalendar, isTime);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [cssVariableInputPaddingLeft]: isSearchWithoutForm ? getInputPaddingHorizontal(1) : spacingStaticMedium,
          [cssVariableInputPaddingRight]:
            isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
              ? getInputPaddingHorizontal(isSearchWithForm ? 2 : 1)
              : spacingStaticMedium,
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        ...getBaseChildStyles('input', state, theme, {
          padding: `${spacingStaticSmall} var(${cssVariableInputPaddingRight}) ${spacingStaticSmall} var(${cssVariableInputPaddingLeft})`,
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
    ...((isSearchOrPassword || isCalendarOrTimeWithCustomIndicator) && {
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
          padding: unitPosition === 'suffix' ? `0 ${spacingStaticMedium} 0 10px` : `0 10px 0 ${spacingStaticMedium}`, // padding needed for proper JS calc
          font: textSmallStyle.font,
          color: contrastMediumColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastMediumColorDark,
          }),
        },
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    // TODO: could be made conditional if we had hasUnit
    'sr-only': {
      ...getHiddenTextJssStyle(),
      padding: 0,
    },
  });
};
