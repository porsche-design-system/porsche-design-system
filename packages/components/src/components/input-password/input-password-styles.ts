import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
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
  formElementLayeredGap,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
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
  disabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  passwordToggle: boolean,
  compact: boolean,
  readOnly: boolean,
  theme: Theme
): string => {
  // Determines the scaling factor for the input-password size. In "compact" mode, it uses 0.5 to achieve a 36px input-password (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalInputPasswordScaling`.
  const scalingVar = `var(${cssVarInternalInputPasswordScaling}, ${compact ? 0.5 : 1})`;
  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const paddingInline = `max(2px, ${formElementPaddingHorizontal} * ${scalingVar})`;

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
        all: 'unset',
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        height,
        paddingBlock,
        textIndent: 0,
        minWidth: '2rem',
        '&[type="text"]': {
          textOverflow: 'ellipsis',
        },
      },
    },
    root: {
      [cssVariableInputPaddingStart]: paddingInline,
      [cssVariableInputPaddingEnd]: `calc(${paddingInline} - (${paddingButton} * 2))`,
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
      borderRadius: borderRadiusSmall,
      paddingInlineStart: `var(${cssVariableInputPaddingStart})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
      paddingInlineEnd: `var(${cssVariableInputPaddingEnd})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: formElementLayeredGap,
      color: primaryColor,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: formStateColorDark || contrastMediumColorDark,
        color: primaryColorDark,
      }),
      '&:has(input:focus:not([readonly]))': {
        borderColor: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: primaryColorDark,
        }),
      },
      ...hoverMediaQuery({
        ...(!disabled &&
          !readOnly && {
            '&:hover:not(:has(input:focus)):not(:has(p-button-pure:hover))': {
              borderColor: formStateHoverColor || primaryColor,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: formStateHoverColorDark || primaryColorDark,
              }),
            },
          }),
      }),
      ...(disabled && {
        cursor: 'not-allowed',
        color: disabledColor,
        borderColor: disabledColor,
        WebkitTextFillColor: disabledColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: disabledColorDark,
          borderColor: disabledColorDark,
          WebkitTextFillColor: disabledColorDark,
        }),
      }),
      ...(readOnly && {
        cursor: 'text',
        borderColor: contrastLowColor,
        background: contrastLowColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: contrastLowColorDark,
          background: contrastLowColorDark,
        }),
      }),
    },
    ...(passwordToggle && {
      button: {
        placeSelf: 'center',
        padding: paddingButton,
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(disabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
