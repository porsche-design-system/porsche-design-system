import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import {
  formButtonOrIconPadding,
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
} from '../../styles/form-styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

export const cssVariableInputPaddingStart = '--p-internal-input-password-input-padding-start';
export const cssVariableInputPaddingEnd = '--p-internal-input-password-input-padding-end';

export const cssVarInternalInputPasswordScaling = '--p-internal-input-password-scaling';

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  showPasswordToggle: boolean,
  theme: Theme
): string => {
  // Determines the scaling factor for the text field size. In "compact" mode, it uses 0.5 to achieve a 36px text field (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalInputPasswordScaling`.
  const scalingVar = `var(${cssVarInternalInputPasswordScaling}, 1)`;

  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const paddingInline = `max(4px, ${formElementPaddingHorizontal} * ${scalingVar})`;
  const height = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;

  const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastLowColor: contrastLowColorDark,
    contrastMediumColor: contrastMediumColorDark,
    disabledColor: disabledColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

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

      input: {
        display: 'block',
        margin: 0,
        outline: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
        borderRadius: borderRadiusSmall,
        background: 'transparent',
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        textIndent: 0,
        color: primaryColor,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: formStateColorDark || contrastMediumColorDark,
          color: primaryColorDark,
        }),
        gridArea: '1/1/1/-1',
        paddingBlock,
        paddingInline,
        width: 'auto',
        height,
        boxSizing: 'content-box',
        paddingInlineStart: `var(${cssVariableInputPaddingStart})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
        paddingInlineEnd: `var(${cssVariableInputPaddingEnd})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
      },
      ':not(input[type="password"])': {
        textOverflow: 'ellipsis',
      },
      ...(hoverMediaQuery({
        // with the media query the selector has higher priority and overrides disabled styles
        'input:not(:disabled):not(:focus):not([readonly]):hover,label:hover~.wrapper input:not(:disabled):not(:focus):not([readonly])':
          {
            borderColor: formStateHoverColor || primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: formStateHoverColorDark || primaryColorDark,
            }),
          },
      }) as Styles),
      'input:focus': {
        borderColor: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: primaryColorDark,
        }),
      },
      'input:disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
        borderColor: disabledColor,
        WebkitTextFillColor: disabledColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: disabledColorDark,
          borderColor: disabledColorDark,
          WebkitTextFillColor: disabledColorDark,
        }),
      },
      'input[readonly]': {
        borderColor: contrastLowColor,
        background: contrastLowColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: contrastLowColorDark,
          background: contrastLowColorDark,
        }),
      },
      '&(input:-internal-autofill-selected),&(input:-internal-autofill-previewed),&(input:-webkit-autofill),&(input:-webkit-autofill:focus)':
        {
          WebkitBackgroundClip: 'padding-box', // reset webkit autofill styles
        },
    },
    root: {
      [cssVariableInputPaddingStart]: paddingInline,
      [cssVariableInputPaddingEnd]: showPasswordToggle ? getCalculatedFormElementPaddingHorizontal(1) : paddingInline,
      display: 'grid',
      gap: spacingStaticXSmall,
      // min width is needed for showing at least 1 character in very narrow containers. The "2rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(2rem + ${formElementPaddingHorizontal} + ${borderWidthBase}*2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `${formElementLayeredSafeZone} auto minmax(0, 1fr) auto auto ${formElementLayeredSafeZone}`,
    },
    ...(showPasswordToggle && {
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
    // TODO: maybe we should extract it as functional component too
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
