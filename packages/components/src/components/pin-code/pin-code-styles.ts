import { borderWidthThin, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  getDisabledBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { colorPrimary, legacyRadiusSmall, radiusLg, radiusXl } from '../../styles/css-variables';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { PinCodeLength } from './pin-code-utils';

export const cssVarInternalPinCodeScaling = '--p-internal-pin-code-scaling';

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
  isCompact: boolean
): string => {
  const { formStateBackgroundColor, formStateBorderColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  const gap = `calc(11.2px * (var(${cssVarInternalPinCodeScaling}) - 0.64285714) + 4px)`;
  const inputBorderWidth = borderWidthThin;
  const inputDimension = `calc(var(${cssVarInternalPinCodeScaling}) * 3.5rem)`;
  const inputPadding = `calc(11.2px * (var(${cssVarInternalPinCodeScaling}) - 0.64285714) + 4px)`;
  const inputMinWidth = `calc(1ch + ${inputPadding} * 2 + ${inputBorderWidth} * 2)`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        [`${cssVarInternalPinCodeScaling}`]: isCompact ? 0.64285714 : 1,
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...getFunctionalComponentLabelAfterStyles(),
      ...preventFoucOfNestedElementsStyles,
      input: {
        all: 'unset',
        display: 'block',
        width: 'auto',
        minWidth: inputMinWidth,
        maxWidth: inputDimension,
        height: inputDimension,
        padding: inputPadding,
        boxSizing: 'border-box',
        border: `${inputBorderWidth} solid ${formStateBorderColor}`,
        borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusLg : radiusXl})`,
        background: formStateBackgroundColor,
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        color: colorPrimary,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        textOverflow: 'ellipsis',
        cursor: isDisabled || isLoading ? 'not-allowed' : 'text',
        textAlign: 'center',
        ...((isDisabled || isLoading) && getDisabledBaseStyles()),
        '&:focus-visible': {
          borderColor: formStateBorderHoverColor,
        },
        ...(!isLoading &&
          !isDisabled &&
          hoverMediaQuery({
            '&:hover': {
              borderColor: formStateBorderHoverColor,
            },
          })),
      },
    },
    root: {
      all: 'unset',
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
        width: inputDimension,
        height: inputDimension,
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
