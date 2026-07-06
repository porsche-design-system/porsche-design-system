import type { JssStyle, Styles } from '../../../utils/css-serializer';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import {
  colorContrastMedium,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusLg,
  radiusXl,
  ref,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { BreakpointCustomizable } from '../../../types';
import { mergeDeep } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelAfterStyles, getFunctionalComponentLabelStyles } from '../label/label-styles';
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

export const cssVarInternalInputBaseScaling = '--_p-input-base-a';

export const getFunctionalComponentInputBaseStyles = (
  isDisabled: boolean,
  isLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isCompact: boolean,
  readOnly: boolean,
  additionalInputJssStyle?: JssStyle,
  additionalHostJssStyle?: JssStyle
): Styles => {
  const wrapperBorderWidth = '1px';
  const wrapperHeight = `calc(${ref(cssVarInternalInputBaseScaling)} * 3.5rem)`;
  const wrapperPaddingInline = `calc(22.4px * (${ref(cssVarInternalInputBaseScaling)} - 0.64285714) + 8px)`;
  const wrapperGap = `calc(22.4px * (${ref(cssVarInternalInputBaseScaling)} - 0.64285714) + 4px)`;
  const buttonPadding = `calc(11.2px * (${ref(cssVarInternalInputBaseScaling)} - 0.64285714))`;
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
          ...hostHiddenStyles,
        }),
        // Alignment and direction of placeholder is set always to the right in RTL mode, because it is expected to have rtl language as placeholder value
        '&(:dir(rtl)) input::placeholder': {
          direction: 'rtl',
          textAlign: 'end',
        },
        ...additionalHostJssStyle,
      },
      ...getFunctionalComponentLabelAfterStyles(),
      ...preventFoucOfNestedElementsStyles,
      input: {
        all: 'unset',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        width: 'max(100%, 2ch)', // show at least 2 characters in very narrow containers
        height: '100%',
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / calc(${ref(leadingNormal)} + 6px) ${ref(fontPorscheNext)}`, // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
        textOverflow: 'ellipsis',
        ...additionalInputJssStyle,
      },
    },
    root: {
      display: 'grid',
      gap: ref(spacingStaticXs),
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: wrapperGap,
      height: wrapperHeight,
      boxSizing: 'border-box',
      paddingInline: wrapperPaddingInline,
      border: `${wrapperBorderWidth} solid ${formStateBorderColor}`,
      borderRadius: isCompact ? ref(radiusLg) : ref(radiusXl),
      background: formStateBackgroundColor,
      color: ref(colorPrimary),
      cursor: isDisabled ? 'not-allowed' : 'text',
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
      ...(readOnly && {
        borderColor: 'transparent',
        background: ref(colorFrosted),
        color: ref(colorContrastMedium),
      }),
      '&:not(:has(input:disabled)):focus-within': {
        borderColor: formStateBorderHoverColor,
        ...forcedColorsMediaQuery({
          outline: '2px solid Highlight',
          outlineOffset: '2px',
        }),
      },
      ...(isDisabled && {
        ...mergeDeep(
          { ...getDisabledBaseStyles() },
          {
            ...forcedColorsMediaQuery({
              borderColor: 'GrayText',
            }),
          }
        ),
        '& > *': {
          ...getDisabledBaseStyles(),
        },
      }),
      ...(!isDisabled &&
        !readOnly &&
        !isLoading &&
        hoverMediaQuery({
          '&:hover:not(.button:hover),.label-wrapper:hover~&': {
            borderColor: formStateBorderHoverColor,
          },
        })),
    },
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, isLoading, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  };
};
