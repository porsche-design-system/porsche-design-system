import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import { isType, showCustomCalendarOrTimeIndicator } from './text-field-wrapper-utils';
import type { FormState } from '../../utils/form/form-state';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
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
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const cssVariableInputPaddingStart = '--p-internal-text-field-input-padding-start';
export const cssVariableInputPaddingEnd = '--p-internal-text-field-input-padding-end';

const inputSafeZone = '9px'; // TODO: why not using spacingStaticSmall instead?
const inputSafeZoneWithBorder = `calc(${inputSafeZone} + ${borderWidthBase})`;
const buttonOrIconSize = `calc(${fontLineHeight} + ${spacingStaticXSmall} * 2)`;
const buttonOffsetBottom = '11px'; // it would be much cleaner with place-self: center instead but this is not possible when dom semantic shall be valid

const baseButtonOrIconStyles: JssStyle = {
  marginBottom: buttonOffsetBottom,
  padding: spacingStaticXSmall,
};

const getInputPaddingHorizontal = (buttonOrIconAmount: number): string => {
  return `calc(${inputSafeZone} * 2 + ${buttonOrIconSize} * ${buttonOrIconAmount})`;
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
          [cssVariableInputPaddingStart]: isSearchWithoutForm ? getInputPaddingHorizontal(1) : spacingStaticMedium,
          [cssVariableInputPaddingEnd]:
            isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
              ? getInputPaddingHorizontal(isSearchWithForm ? 2 : 1)
              : spacingStaticMedium,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        ...getBaseChildStyles('input', state, theme, {
          padding: `${spacingStaticSmall} 0`,
          paddingInline: `var(${cssVariableInputPaddingStart}) var(${cssVariableInputPaddingEnd})`,
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
    root: {
      display: 'grid',
      gridTemplateColumns: `${inputSafeZoneWithBorder} auto minmax(0, 1fr) auto auto ${inputSafeZoneWithBorder}`,
      alignItems: 'flex-end',
    },
    ...((isSearchOrPassword || isCalendarOrTimeWithCustomIndicator) && {
      button: {
        ...baseButtonOrIconStyles,
        gridArea: '1 / 5',
        // TODO: maybe we should render hidden button conditionally, needs to be checked if a11y compliant
        '&:not([hidden]) ~ .button': {
          gridArea: '1 / 4',
        },
      },
    }),
    ...(isSearchWithoutForm && {
      icon: {
        ...baseButtonOrIconStyles,
        gridArea: '1 / 2',
        pointerEvents: 'none',
      },
    }),
    ...getLabelStyles(
      'input',
      isDisabled,
      hideLabel,
      state,
      theme,
      hasUnitOrVisibleCounter && {
        unit: {
          gridArea: `3 / ${unitPosition === 'suffix' ? 3 : 1}`,
          placeSelf: 'center',
          zIndex: 1,
          paddingInline: unitPosition === 'suffix' ? `10px ${spacingStaticMedium}` : `${spacingStaticMedium} 10px`, // padding needed for proper JS calc
          font: textSmallStyle.font,
          color: contrastMediumColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastMediumColorDark,
          }),
        },
      },
      {
        gridArea: '1 / 1 / auto / span 6',
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    // TODO: could be made conditional if we had hasUnit
    'sr-only': getHiddenTextJssStyle(),
  });
};
