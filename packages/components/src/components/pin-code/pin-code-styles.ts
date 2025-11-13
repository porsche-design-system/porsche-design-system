import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
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
import { type PinCodeLength, removeSlottedSelector, removeStyles } from './pin-code-utils';

export const cssVarInternalPinCodeScaling = '--p-internal-pin-code-scaling';
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalPinCodeScaling}, ${compact ? 0.5 : 1})`;

export type ChildSelector = 'input' | 'select' | 'textarea';

const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = colors;

export const getSlottedTextFieldTextareaSelectStyles = (
  child: ChildSelector,
  state: FormState,
  isLoading: boolean,
  additionalDefaultJssStyle?: JssStyle
): Styles => {
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(state);

  return {
    [`::slotted(${child})`]: {
      display: 'block',
      width: '100%',
      height:
        child !== 'textarea'
          ? `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)` // we need 10px additionally so input height becomes 54px
          : 'auto',
      margin: 0,
      outline: 0,
      WebkitAppearance: 'none', // iOS safari
      appearance: 'none',
      boxSizing: 'border-box',
      border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
      borderRadius: borderRadiusSmall,
      background: 'transparent',
      font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
      textIndent: 0,
      color: primaryColor,
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
      ...additionalDefaultJssStyle,
    },
    '::slotted(:not(input[type="password"]))': {
      textOverflow: 'ellipsis',
    },
    ...(!isLoading &&
      (hoverMediaQuery({
        // with the media query the selector has higher priority and overrides disabled styles
        [`::slotted(${child}:not(:disabled):not(:focus):not([readonly]):hover),label:hover~.wrapper ::slotted(${child}:not(:disabled):not(:focus):not([readonly]))${
          child === 'select' ? ',label:hover~.wrapper ::part(select-wrapper-dropdown)' : ''
        }`]: {
          borderColor: formStateHoverColor || primaryColor,
        },
      }) as Styles)),
    // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
    [`::slotted(${child}:focus)`]: {
      borderColor: primaryColor,
    },
    [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: disabledColor,
      borderColor: disabledColor,
      WebkitTextFillColor: disabledColor,
    },
    ...(child !== 'select' && {
      [`::slotted(${child}[readonly])`]: {
        borderColor: contrastLowColor,
        background: contrastLowColor,
      },
    }),
  };
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  length: PinCodeLength,
  compact: boolean
): string => {
  const scalingVar = getScalingVar(compact);

  const dimension = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
  const gap = `max(${spacingStaticXSmall}, ${scalingVar} * ${spacingStaticSmall})`;
  const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
  // Min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least.
  const minWidth = `max(1rem, calc(${dimension} - ${borderWidthBase}*2 - ${paddingBlock}*2))`;

  const inputStyles = removeStyles(
    'input[readonly]',
    removeSlottedSelector(
      getSlottedTextFieldTextareaSelectStyles('input', state, isLoading, {
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. textAlign=center|start
        textAlign: 'center',
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. isLoading
        ...(isLoading && {
          opacity: 0.2, // TODO: not in sync with e.g. checkbox/radio-button loading style
          cursor: 'not-allowed',
        }),
        height: dimension,
        minWidth,
        maxWidth: dimension,
        width: 'auto',
        padding: paddingBlock,
        boxSizing: 'content-box',
      })
    )
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
      // input
      ...inputStyles,
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
