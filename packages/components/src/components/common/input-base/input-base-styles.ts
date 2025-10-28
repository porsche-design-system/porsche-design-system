import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
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
import { formElementPaddingHorizontal, formElementPaddingVertical } from '../../../styles/form-styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../state-message/state-message-styles';

export const cssVarInternalInputBaseScaling = '--p-internal-input-base-scaling';
// Determines the scaling factor for the input-number size. In "compact" mode, it uses 0.5 to achieve a 36px input-number (compact size).
// Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalInputBaseScaling`.
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalInputBaseScaling}, ${compact ? 0.5 : 1})`;

/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
export const cssVarButtonPurePadding = '--ref-p-input-slotted-padding';
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
export const cssVarButtonPureMargin = '--ref-p-input-slotted-margin';

export const getFunctionalComponentInputBaseStyles = (
  disabled: boolean,
  loading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  readOnly: boolean,
  theme: Theme,
  additionalInputJssStyle?: JssStyle
): Styles => {
  const scalingVar = getScalingVar(compact);

  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const paddingInline = `max(2px, ${formElementPaddingHorizontal} * ${scalingVar})`;

  const height = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;

  const gap = `max(4px, calc(${spacingStaticMedium} * ${scalingVar}))`;

  // This will return 0 for <= 0.5, ~4 for 1 and ~8 for 2 scaling...
  const buttonCompensation = `clamp(0, 6.42 * pow(calc(${scalingVar} - 0.5), 0.6826), 12)`;

  const { primaryColor, contrast20Color, contrast50Color, contrast40Color } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrast20Color: contrast20ColorDark,
    contrast50Color: contrast50ColorDark,
    contrast40Color: contrast40ColorDark,
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
          [`${cssVarButtonPurePadding}`]: `calc(1px * ${buttonCompensation})`,
          [`${cssVarButtonPureMargin}`]: `calc(-1px * ${buttonCompensation})`,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      input: {
        all: 'unset',
        flex: 1,
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        height,
        paddingBlock,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
        width: '100%',
        minWidth: '2rem',
        ...(disabled && {
          color: contrast40Color,
          WebkitTextFillColor: contrast40Color,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrast40ColorDark,
            WebkitTextFillColor: contrast40ColorDark,
          }),
        }),
        ...additionalInputJssStyle,
      },
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      border: `${borderWidthBase} solid ${formStateColor || contrast50Color}`,
      borderRadius: borderRadiusSmall,
      paddingInline,
      display: 'flex',
      alignItems: 'center',
      gap,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        borderColor: formStateColorDark || contrast50ColorDark,
      }),
      ...(!disabled &&
        !readOnly && {
          '&:has(input:focus)': {
            borderColor: primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: primaryColorDark,
            }),
          },
          ...hoverMediaQuery({
            '&:hover:not(:has(.button:hover, input:focus ))': hoverStyles,
          }),
        }),
      ...(disabled && {
        cursor: 'not-allowed',
        borderColor: contrast40Color,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: contrast40ColorDark,
        }),
      }),
      ...(readOnly && {
        cursor: 'text',
        borderColor: contrast20Color,
        background: contrast20Color,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: contrast20ColorDark,
          background: contrast20ColorDark,
        }),
      }),
    },
    ...(loading && {
      spinner: {
        font: textSmallStyle.font,
        width: fontLineHeight,
        height: fontLineHeight,
      },
    }),
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
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  };
};
