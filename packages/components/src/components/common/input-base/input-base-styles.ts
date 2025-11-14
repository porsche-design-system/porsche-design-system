import {
  borderRadiusSmall,
  borderWidthThin,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getDisabledBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { formElementPaddingHorizontal, formElementPaddingVertical } from '../../../styles/form-styles';
import type { BreakpointCustomizable } from '../../../types';
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

const { primaryColor, contrastMediumColor, frostedColor } = colors;

export const getFunctionalComponentInputBaseStyles = (
  disabled: boolean,
  loading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  readOnly: boolean,
  additionalInputJssStyle?: JssStyle
): Styles => {
  const scalingVar = getScalingVar(compact);

  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  const paddingInline = `max(2px, ${formElementPaddingHorizontal} * ${scalingVar})`;

  const height = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;

  const gap = `max(4px, calc(${spacingStaticMedium} * ${scalingVar}))`;

  // This will return 0 for <= 0.5, ~4 for 1 and ~8 for 2 scaling...
  const buttonCompensation = `clamp(0, 6.42 * pow(calc(${scalingVar} - 0.5), 0.6826), 12)`;

  const { formStateBackgroundColor, formStateBorderColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  return {
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [`${cssVarButtonPurePadding}`]: `calc(1px * ${buttonCompensation})`,
          [`${cssVarButtonPureMargin}`]: `calc(-1px * ${buttonCompensation})`,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...(disabled && getDisabledBaseStyles()),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      input: {
        all: 'unset',
        flex: 1,
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        color: 'inherit', // relies on wrapper color
        height,
        paddingBlock,
        width: '100%',
        minWidth: '2ch', // to show at least 2 characters in very narrow containers
        textOverflow: 'ellipsis', // TODO: do we need this style?
        ...additionalInputJssStyle,
      },
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap,
      height,
      paddingBlock,
      paddingInline,
      border: `${borderWidthThin} solid ${formStateBorderColor}`,
      borderRadius: borderRadiusSmall,
      background: formStateBackgroundColor,
      color: primaryColor,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      ...(readOnly && {
        borderColor: 'transparent',
        background: frostedColor,
        color: contrastMediumColor,
      }),
      '&:focus-within': {
        borderColor: formStateBorderHoverColor,
      },
      ...(!disabled &&
        !readOnly &&
        !loading &&
        hoverMediaQuery({
          '&:hover:not(.button:hover),label:hover~&': {
            borderColor: formStateBorderHoverColor,
          },
        })),
    },
    ...(loading && {
      spinner: {
        font: textSmallStyle.font,
        width: fontLineHeight,
        height: fontLineHeight,
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(disabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  };
};
