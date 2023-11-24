import type { BreakpointCustomizable, Theme } from '../../types';
import type { TextFieldWrapperUnitPosition } from './text-field-wrapper-utils';
import { isType, showCustomCalendarOrTimeIndicator } from './text-field-wrapper-utils';
import type { FormState } from '../../utils/form/form-state';
import { getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, getHiddenTextJssStyle, hostHiddenStyles } from '../../styles';
import {
  formButtonOrIconPadding,
  formElementLayeredGap,
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
  getSlottedTextFieldTextareaSelectStyles,
  getUnitCounterJssStyle,
} from '../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { borderWidthBase, spacingStaticXSmall } from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';

export const cssVariableInputPaddingStart = '--p-internal-text-field-input-padding-start';
export const cssVariableInputPaddingEnd = '--p-internal-text-field-input-padding-end';

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
        ...getSlottedTextFieldTextareaSelectStyles('input', state, false, theme, {
          gridArea: '1/1/1/-1',
          padding: `${formElementPaddingVertical} ${formElementPaddingHorizontal}`,
          paddingInlineStart: `var(${cssVariableInputPaddingStart})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
          paddingInlineEnd: `var(${cssVariableInputPaddingEnd})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
          // TODO: move into getSlottedTextFieldTextareaSelectStyles()
          ...(isNumber && {
            MozAppearance: 'textfield', // hides up/down spin button for Firefox
          }),
        }),
        // TODO: move into getSlottedTextFieldTextareaSelectStyles()
        '::slotted': {
          '&(input:-internal-autofill-selected),&(input:-internal-autofill-previewed),&(input:-webkit-autofill),&(input:-webkit-autofill:focus)':
            {
              WebkitBackgroundClip: 'padding-box', // reset webkit autofill styles
            },
        },
      }),
    },
    root: {
      [cssVariableInputPaddingStart]: isSearchWithoutForm
        ? getCalculatedFormElementPaddingHorizontal(1)
        : formElementPaddingHorizontal,
      [cssVariableInputPaddingEnd]:
        isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
          ? getCalculatedFormElementPaddingHorizontal(isSearchWithForm ? 2 : 1)
          : formElementPaddingHorizontal,
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `${formElementLayeredSafeZone} auto minmax(0, 1fr) auto auto ${formElementLayeredSafeZone}`,
    },
    ...((isSearchOrPassword || isCalendarOrTimeWithCustomIndicator) && {
      // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf) like done for unit class
      button: {
        gridArea: '1/5',
        placeSelf: 'center',
        padding: formButtonOrIconPadding,
        // TODO: maybe we should render hidden button conditionally, needs to be checked if a11y compliant
        '&:not([hidden])~.button': {
          gridArea: '1/4',
        },
      },
    }),
    ...(isSearchWithoutForm && {
      // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf) like done for unit class
      icon: {
        gridArea: '1/2',
        placeSelf: 'center',
        padding: formButtonOrIconPadding,
        pointerEvents: 'none',
      },
    }),
    ...(hasUnitOrVisibleCounter && {
      // TODO: rename to unit-counter?
      unit: {
        ...getUnitCounterJssStyle(isDisabled, theme),
        gridArea: `1/${unitPosition === 'suffix' ? 5 : 1}/1/${unitPosition === 'suffix' ? 7 : 3}`,
        placeSelf: 'center',
        paddingInline:
          unitPosition === 'suffix'
            ? `${formElementLayeredGap} calc(${formElementPaddingHorizontal} + ${borderWidthBase})`
            : `calc(${formElementPaddingHorizontal} + ${borderWidthBase}) ${formElementLayeredGap}`, // padding needed for correct input padding synchronisation
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
