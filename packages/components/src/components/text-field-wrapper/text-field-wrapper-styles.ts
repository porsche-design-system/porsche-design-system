import type { BreakpointCustomizable, Theme } from '../../types';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import { isType, showCustomCalendarOrTimeIndicator } from './text-field-wrapper-utils';
import type { FormState } from '../../utils/form/form-state';
import { getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, getHiddenTextJssStyle, hostHiddenStyles } from '../../styles';
import { getSlottedInputTextareaSelectStyles, getUnitCounterStyles } from '../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import {
  borderWidthBase,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';

export const cssVariableInputPaddingStart = '--p-internal-text-field-input-padding-start';
export const cssVariableInputPaddingEnd = '--p-internal-text-field-input-padding-end';

const inputSafeZone = '9px'; // to have same distance vertically and horizontally for button/icon in combination with input
const inputSafeZoneWithBorder = `calc(${inputSafeZone} + ${borderWidthBase})`;
const buttonOrIconSize = `calc(${fontLineHeight} + ${spacingStaticXSmall} * 2)`;

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
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // ::slotted(input)
      ...addImportantToEachRule({
        ...getSlottedInputTextareaSelectStyles('input', state, theme, {
          gridArea: '1/1/1/7',
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
      [cssVariableInputPaddingStart]: isSearchWithoutForm ? getInputPaddingHorizontal(1) : spacingStaticMedium,
      [cssVariableInputPaddingEnd]:
        isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
          ? getInputPaddingHorizontal(isSearchWithForm ? 2 : 1)
          : spacingStaticMedium,
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `${inputSafeZoneWithBorder} auto minmax(0, 1fr) auto auto ${inputSafeZoneWithBorder}`,
    },
    ...((isSearchOrPassword || isCalendarOrTimeWithCustomIndicator) && {
      button: {
        gridArea: '1/5',
        placeSelf: 'center',
        padding: spacingStaticXSmall,
        // TODO: maybe we should render hidden button conditionally, needs to be checked if a11y compliant
        '&:not([hidden])~.button': {
          gridArea: '1/4',
        },
      },
    }),
    ...(isSearchWithoutForm && {
      icon: {
        gridArea: '1/2',
        placeSelf: 'center',
        padding: spacingStaticXSmall,
        pointerEvents: 'none',
      },
    }),
    ...(hasUnitOrVisibleCounter && {
      unit: {
        ...getUnitCounterStyles(isDisabled, theme),
        gridArea: `1/${unitPosition === 'suffix' ? 5 : 1}/1/${unitPosition === 'suffix' ? 7 : 3}`,
        placeSelf: 'center',
        paddingInline: unitPosition === 'suffix' ? `10px ${spacingStaticMedium}` : `${spacingStaticMedium} 10px`, // padding needed for correct input padding synchronisation
      },
    }),
    // TODO: maybe we should extract it as functional component too
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
