import {
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  fontLineHeight,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getDisabledBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import { formElementPaddingVertical } from '../../styles/form-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { PinCodeLength } from './pin-code-utils';

export const cssVarInternalPinCodeScaling = '--p-internal-pin-code-scaling';
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalPinCodeScaling}, ${compact ? 0.5 : 1})`;

const { primaryColor } = colors;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  length: PinCodeLength,
  compact: boolean
): string => {
  const { formStateBackgroundColor, formStateBorderColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  const scalingVar = getScalingVar(compact);

  const dimension = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
  const gap = `max(${spacingStaticXSmall}, ${scalingVar} * ${spacingStaticSmall})`;
  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  // Min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least.
  const minWidth = `max(1rem, calc(${dimension} - ${borderWidthBase}*2 - ${paddingBlock}*2))`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...(isDisabled && getDisabledBaseStyles()),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      input: {
        all: 'unset',
        display: 'block',
        width: 'auto',
        height: dimension,
        border: `${borderWidthThin} solid ${formStateBorderColor}`,
        borderRadius: borderRadiusSmall,
        background: formStateBackgroundColor,
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        color: primaryColor,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
        textOverflow: 'ellipsis',
        cursor: isDisabled ? 'not-allowed' : 'text',
        textAlign: 'center',
        ...(isLoading && {
          opacity: 0.2, // TODO: not in sync with e.g. checkbox/radio-button loading style
          cursor: 'not-allowed',
        }),
        minWidth,
        maxWidth: dimension,
        padding: paddingBlock,
        boxSizing: 'content-box',
        '&:focus-visible': {
          borderColor: formStateBorderHoverColor,
        },
        ...(!isLoading &&
          !isDisabled &&
          hoverMediaQuery({
            '&:hover,label:hover~&': {
              borderColor: formStateBorderHoverColor,
            },
          })),
      },
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `repeat(${length}, 1fr)`,
      justifySelf: 'flex-start',
      gap,
    },
    ...(isLoading && {
      spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: dimension,
        height: dimension,
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
