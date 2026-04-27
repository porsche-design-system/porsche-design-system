import {
  addImportantToEachRule,
  getDisabledBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  radiusLg,
  radiusXl,
  spacingStaticXs,
  typescaleSm,
} from '../../styles/css-variables';
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

export const cssVarInternalPinCodeScaling = '--_p-pin-code-a';

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
  const inputBorderWidth = '1px';
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
        font: `${fontWeightNormal} ${typescaleSm} / calc(${leadingNormal} + 6px) ${fontPorscheNext}`, // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
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
      gap: spacingStaticXs,
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
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, isLoading, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
