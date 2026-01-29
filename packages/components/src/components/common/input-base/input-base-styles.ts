import { borderWidthThin, fontLineHeight, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/emotion';
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
  forcedColorsMediaQuery,
} from '../../../styles';
import { legacyRadiusSmall, radiusLg, radiusXl } from '../../../styles/css-variables';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { BreakpointCustomizable } from '../../../types';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../state-message/state-message-styles';

/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
export const cssVarButtonPurePadding = '--ref-p-input-slotted-padding';
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
export const cssVarButtonPureMargin = '--ref-p-input-slotted-margin';

export const cssVarInternalInputBaseScaling = '--p-internal-input-base-scaling';

const { primaryColor, contrastMediumColor, frostedColor } = colors;

export const getFunctionalComponentInputBaseStyles = (
  isDisabled: boolean,
  isLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isCompact: boolean,
  readOnly: boolean,
  additionalInputJssStyle?: JssStyle
): Styles => {
  const wrapperBorderWidth = borderWidthThin;
  const wrapperHeight = `calc(var(${cssVarInternalInputBaseScaling}) * 3.5rem)`;
  const wrapperPaddingInline = `calc(22.4px * (var(${cssVarInternalInputBaseScaling}) - 0.64285714) + 8px)`;
  const wrapperGap = `calc(22.4px * (var(${cssVarInternalInputBaseScaling}) - 0.64285714) + 4px)`;
  const buttonPadding = `calc(11.2px * (var(${cssVarInternalInputBaseScaling}) - 0.64285714))`;
  const buttonMargin = `calc(-1 * ${buttonPadding})`;

  const { formStateBackgroundColor, formStateBorderColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  return {
    '@global': {
      ':host': {
        display: 'block',
        [`${cssVarInternalInputBaseScaling}`]: isCompact ? 0.64285714 : 1,
        ...addImportantToEachRule({
          [`${cssVarButtonPurePadding}`]: buttonPadding,
          [`${cssVarButtonPureMargin}`]: buttonMargin,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...(isDisabled && getDisabledBaseStyles()),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      input: {
        all: 'unset',
        flex: 1,
        width: 'max(100%, 2ch)', // show at least 2 characters in very narrow containers
        height: '100%',
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        textOverflow: 'ellipsis',
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
      gap: wrapperGap,
      height: wrapperHeight,
      boxSizing: 'border-box',
      paddingInline: wrapperPaddingInline,
      border: `${wrapperBorderWidth} solid ${formStateBorderColor}`,
      ...(isDisabled &&
        forcedColorsMediaQuery({
          borderColor: 'GrayText',
        })),
      borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusLg : radiusXl})`,
      background: formStateBackgroundColor,
      color: primaryColor,
      cursor: isDisabled ? 'not-allowed' : 'text',
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
      ...(readOnly && {
        borderColor: 'transparent',
        background: frostedColor,
        color: contrastMediumColor,
      }),
      '&:focus-within': {
        borderColor: formStateBorderHoverColor,
      },
      ...(!isDisabled &&
        !readOnly &&
        !isLoading &&
        hoverMediaQuery({
          '&:hover:not(.button:hover),label:hover~&': {
            borderColor: formStateBorderHoverColor,
          },
        })),
    },
    ...(isLoading && {
      spinner: {
        font: textSmallStyle.font,
        width: fontLineHeight,
        height: fontLineHeight,
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  };
};
