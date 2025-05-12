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
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import {
  formElementLayeredGap,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
} from '../../../styles/form-styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../state-message/state-message-styles';
import type { JssStyle, Styles } from 'jss';

export const cssVarInternalInputBaseScaling = '--p-internal-input-base-scaling';
// Determines the scaling factor for the input-number size. In "compact" mode, it uses 0.5 to achieve a 36px input-number (compact size).
// Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalInputBaseScaling`.
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalInputBaseScaling}, ${compact ? 0.5 : 1})`;

export const getFunctionalComponentInputBaseStyles = (
  disabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  button: boolean,
  compact: boolean,
  readOnly: boolean,
  theme: Theme,
  additionalInputJssStyle?: JssStyle
): Styles => {
  const scalingVar = getScalingVar(compact);

  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const paddingInline = `max(2px, ${formElementPaddingHorizontal} * ${scalingVar})`;

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

  const hoverStyles = {
    borderColor: formStateHoverColor || primaryColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      borderColor: formStateHoverColorDark || primaryColorDark,
    }),
  };

  return {
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
        appearance: 'none',
        flex: 1,
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        height,
        paddingBlock,
        textIndent: 0,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
        width: '100%',
        minWidth: '2rem',
        ...additionalInputJssStyle,
      },
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
      borderRadius: borderRadiusSmall,
      paddingInlineStart: paddingInline,
      paddingInlineEnd: button ? paddingBlock : paddingInline, // TODO resolve inconsistency in Figma
      display: 'flex',
      gap: formElementLayeredGap,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: formStateColorDark || contrastMediumColorDark,
      }),
      '&:has(input:focus:not([readonly]))': {
        borderColor: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: primaryColorDark,
        }),
      },
      ...(!disabled &&
        !readOnly &&
        hoverMediaQuery({
          '&:hover:not(:has(.button:hover, input:focus ))': hoverStyles,
        })),
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
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      disabled,
      hideLabel,
      theme,
      !disabled &&
        !readOnly &&
        hoverMediaQuery({
          '&:hover~.wrapper': hoverStyles,
        })
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  };
};
