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
} from '../../styles';
import {
  formButtonOrIconPadding,
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
  getSlottedTextFieldTextareaSelectStyles,
  getUnitCounterJssStyle,
} from '../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { borderRadiusSmall, borderWidthBase, spacingStaticXSmall } from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';

export const cssVariableInputPaddingStart = '--p-internal-text-field-input-padding-start';
export const cssVariableInputPaddingEnd = '--p-internal-text-field-input-padding-end';
export const cssVariableInputUnitCounterTextLength = '--p-internal-text-field-input-unit-counter-text-length';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasUnitOrVisibleCounter: boolean,
  unitPosition: TextFieldWrapperUnitPosition,
  inputType: string,
  showPasswordToggle: boolean,
  isWithinForm: boolean,
  hasSubmitButton: boolean,
  theme: Theme
): string => {
  const isSearch = isType(inputType, 'search');
  const isPassword = isType(inputType, 'password');
  const isNumber = isType(inputType, 'number');
  const isCalendar = isType(inputType, 'date') || isType(inputType, 'week') || isType(inputType, 'month');
  const isTime = isType(inputType, 'time');
  const isSearchOrPassword = isSearch || (isPassword && showPasswordToggle);
  const isSearchWithoutFormOrSubmitButton = isSearch && (!isWithinForm || !hasSubmitButton);
  const isSearchWithForm = isSearch && isWithinForm;
  const isCalendarOrTimeWithCustomIndicator = showCustomCalendarOrTimeIndicator(isCalendar, isTime);
  const isUnitPositionSuffix = unitPosition === 'suffix';
  const { contrastMediumColor } = getThemedColors(theme);
  const { formStateColor } = getThemedFormStateColors(theme, state);

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
          ...(hasUnitOrVisibleCounter && {
            gridArea: isUnitPositionSuffix ? '1/1/1/4' : '1/3/1/-1',
            ...(isUnitPositionSuffix && {
              borderRight: 'none',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }),
            ...(!isUnitPositionSuffix && {
              borderLeft: 'none',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }),
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
      [cssVariableInputPaddingStart]: isSearchWithoutFormOrSubmitButton
        ? getCalculatedFormElementPaddingHorizontal(1)
        : formElementPaddingHorizontal,
      [cssVariableInputPaddingEnd]:
        isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
          ? getCalculatedFormElementPaddingHorizontal(isSearchWithForm && hasSubmitButton ? 2 : 1)
          : formElementPaddingHorizontal,
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `${formElementLayeredSafeZone} auto minmax(0, 1fr) auto auto ${formElementLayeredSafeZone}`,
      ...(hasUnitOrVisibleCounter && {
        cursor: 'text',
      }),
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
    ...(isSearchWithoutFormOrSubmitButton && {
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
        display: 'flex',
        alignItems: 'center',
        cursor: 'text',
        border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
        borderRadius: borderRadiusSmall,
        paddingInlineStart: `var(${cssVariableInputPaddingStart})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
        paddingInlineEnd: `var(${cssVariableInputPaddingEnd})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
        ...(isUnitPositionSuffix && {
          borderLeft: 'none',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          paddingInlineStart: 0,
          paddingInlineEnd: `var(${cssVariableInputPaddingEnd})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
        }),
        ...(!isUnitPositionSuffix && {
          borderRight: 'none',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          paddingInlineStart: `var(${cssVariableInputPaddingStart})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
          paddingInlineEnd: 0,
        }),
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
