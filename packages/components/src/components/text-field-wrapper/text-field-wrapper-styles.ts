import { borderWidthBase, fontLineHeight, spacingStaticXSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
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
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss, isThemeDark } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import {
  isType,
  showCustomCalendarOrTimeIndicator,
  type TextFieldWrapperUnitPosition,
} from './text-field-wrapper-utils';

export const cssVariableInputPaddingStart = '--p-internal-text-field-input-padding-start';
export const cssVariableInputPaddingEnd = '--p-internal-text-field-input-padding-end';

export const cssVarInternalTextFieldScaling = '--p-internal-text-field-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasUnitOrVisibleCounter: boolean,
  unitPosition: TextFieldWrapperUnitPosition,
  inputType: string,
  showPasswordToggle: boolean,
  isWithinForm: boolean,
  hasSubmitButton: boolean,
  theme: Theme,
  unitLength: number
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
  const counterCharacterLengthCssVar = 'var(--p-internal-counter-character-length)';
  const paddingInlineIfUnitOrCounter =
    hasUnitOrVisibleCounter &&
    `calc(${formElementLayeredGap} + ${formElementPaddingHorizontal} + ${borderWidthBase} + ${unitLength || counterCharacterLengthCssVar} * 1ch * log(2.6))`;

  // Determines the scaling factor for the text field size. In "compact" mode, it uses 0.5 to achieve a 36px text field (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalTextFieldScaling`.
  const scalingVar = `var(${cssVarInternalTextFieldScaling}, 1)`;

  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const paddingInline = `max(4px, ${formElementPaddingHorizontal} * ${scalingVar})`;
  const height = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      // ::slotted(input)
      ...addImportantToEachRule({
        ...getSlottedTextFieldTextareaSelectStyles('input', state, false, theme, {
          gridArea: '1/1/1/-1',
          paddingBlock,
          paddingInline,
          width: 'auto',
          height,
          boxSizing: 'content-box',
          paddingInlineStart:
            hasUnitOrVisibleCounter && unitPosition === 'prefix'
              ? paddingInlineIfUnitOrCounter
              : `var(${cssVariableInputPaddingStart})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
          paddingInlineEnd:
            hasUnitOrVisibleCounter && unitPosition === 'suffix'
              ? paddingInlineIfUnitOrCounter
              : `var(${cssVariableInputPaddingEnd})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
          // TODO: move into getSlottedTextFieldTextareaSelectStyles()
          ...(isNumber && {
            MozAppearance: 'textfield', // hides up/down spin button for Firefox
          }),
          ...((isCalendar || isTime) && {
            // for native placeholder color in safari, background has to be a special value, `transparent` or `rgba(0,0,0,0)` won't work
            // this works nice for `theme="light"`, but for `theme="dark"` placeholder appears blue which is still better
            // than having invisible dots or colons for data/time or not seeing the value at all after selection
            // found on https://browserstrangeness.bitbucket.io/css_hacks.html#safari
            '@supports (-webkit-hyphens: none)': {
              background: 'rgba(0,0,1,0)',
              color: isThemeDark(theme) ? getThemedColors(theme).primaryColor : 'initial',
            },
          }),
        }),
        // TODO: move into getSlottedTextFieldTextareaSelectStyles()
        '::slotted': {
          '&(input:-internal-autofill-selected),&(input:-internal-autofill-previewed),&(input:-webkit-autofill),&(input:-webkit-autofill:focus)':
            {
              WebkitBackgroundClip: 'padding-box', // reset webkit autofill styles
            },
          '&(input[type="email"]),&(input[type="tel"])': {
            direction: 'ltr', // fixes specific input types in RTL mode. Should always be LTR. See https://rtlstyling.com/posts/rtl-styling#form-inputs
          },
        },
      }),
    },
    root: {
      [cssVariableInputPaddingStart]: isSearchWithoutFormOrSubmitButton
        ? getCalculatedFormElementPaddingHorizontal(1)
        : paddingInline,
      [cssVariableInputPaddingEnd]:
        isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
          ? getCalculatedFormElementPaddingHorizontal(isSearchWithForm && hasSubmitButton ? 2 : 1)
          : paddingInline,
      display: 'grid',
      gap: spacingStaticXSmall,
      // min width is needed for showing at least 1 character in very narrow containers. The "2rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(2rem + ${formElementPaddingHorizontal} + ${borderWidthBase}*2 + ${hasUnitOrVisibleCounter || isSearch || isPassword || isCalendarOrTimeWithCustomIndicator ? getCalculatedFormElementPaddingHorizontal(isSearch ? 2 : 1) : '0px'})`,
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
      'unit-counter': {
        ...getUnitCounterJssStyle(isDisabled, isReadonly, theme),
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
