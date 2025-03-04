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
  passwordToggle: boolean,
  compact: boolean,
  theme: Theme
): string => {
  // Determines the scaling factor for the input-password size. In "compact" mode, it uses 0.5 to achieve a 36px input-password (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalInputPasswordScaling`.
  const scalingVar = `var(${cssVarInternalInputPasswordScaling}, ${compact ? 0.5 : 1})`;

  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const paddingInline = `max(4px, ${formElementPaddingHorizontal} * ${scalingVar})`;

  // TODO: Ideally, 'compact' should only influence the calculation of scalingVar,
  // ensuring that the paddingButton calculation solely depends on the scaling factor.
  const paddingButton = compact ? '0px' : `calc(${formButtonOrIconPadding} * ${scalingVar})`;
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
        '&:not([type="password"])': {
          textOverflow: 'ellipsis',
        },
        '&:focus': {
          borderColor: primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: primaryColorDark,
          }),
        },
        '&:disabled': {
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
        '&[readonly]': {
          borderColor: contrastLowColor,
          background: contrastLowColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: contrastLowColorDark,
            background: contrastLowColorDark,
          }),
        },
        '&:is(:-webkit-autofill, :-internal-autofill-previewed, :-internal-autofill-selected, :-webkit-autofill:focus)':
          {
            WebkitBackgroundClip: 'padding-box', // reset webkit autofill styles
          },
      },
      ...(hoverMediaQuery({
        // with the media query the selector has higher priority and overrides disabled styles
        'input:not(:disabled, :focus, [readonly]):hover,label:hover~.wrapper input:not(:disabled, :focus, [readonly])':
          {
            borderColor: formStateHoverColor || primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: formStateHoverColorDark || primaryColorDark,
            }),
          },
      }) as Styles),
    },
    root: {
      [cssVariableInputPaddingStart]: paddingInline,
      [cssVariableInputPaddingEnd]: passwordToggle ? getCalculatedFormElementPaddingHorizontal(1) : paddingInline,
      display: 'grid',
      gap: spacingStaticXSmall,
      // min width is needed for showing at least 1 character in very narrow containers. The "2rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(2rem + ${formElementPaddingHorizontal} + ${borderWidthBase}*2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `${formElementLayeredSafeZone} auto minmax(0, 1fr) auto auto ${formElementLayeredSafeZone}`,
    },
    ...(passwordToggle && {
      button: {
        gridArea: '1/5',
        placeSelf: 'center',
        padding: paddingButton,
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
