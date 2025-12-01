import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  borderWidthThin,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  colors,
  getDisabledBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import { formElementPaddingHorizontal, getUnitCounterJssStyle } from '../../styles/form-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { TextareaResize } from './textarea-utils';

const { primaryColor, contrastMediumColor, frostedColor } = colors;

export const cssVarInternalTextareaScaling = '--p-internal-textarea-scaling';
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalTextareaScaling}, ${compact ? 0.5 : 1})`;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  counter: boolean,
  resize: TextareaResize
): string => {
  const scalingVar = getScalingVar(compact);

  const minPadding = '2px';
  const minCounterPadding = '12px';

  const basePaddingInline = `max(${minPadding}, calc(${formElementPaddingHorizontal} * ${scalingVar}))`;
  const basePaddingBlock = `max(${minPadding}, calc(12px * ${scalingVar}))`;

  const counterPaddingInline = `max(${minCounterPadding}, calc((${formElementPaddingHorizontal} + ${borderWidthBase}) * ${scalingVar}))`;
  const counterPaddingBlock = `max(${minPadding}, calc(6px * ${scalingVar}))`;

  const paddingBottom = `calc(${fontLineHeight} + ${counterPaddingBlock} * 2 - 4px)`;

  const { formStateBorderColor, formStateBackgroundColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

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
      textarea: {
        all: 'unset',
        gridArea: '1/1',
        display: 'block',
        resize,
        border: `${borderWidthThin} solid ${formStateBorderColor}`,
        borderRadius: borderRadiusSmall,
        background: formStateBackgroundColor,
        color: primaryColor,
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
        minWidth: '2ch', // to show at least 2 characters in very narrow containers
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        font: textSmallStyle.font,
        padding: counter
          ? `${basePaddingBlock} ${basePaddingInline} ${paddingBottom}`
          : `${basePaddingBlock} ${basePaddingInline}`,
        '&:focus': {
          borderColor: formStateBorderHoverColor,
        },
        cursor: isDisabled ? 'not-allowed' : 'text',
        ...(isReadonly && {
          borderColor: 'transparent',
          background: frostedColor,
          color: contrastMediumColor,
        }),
        ...(!isDisabled &&
          !isReadonly &&
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
      display: 'grid',
    },
    ...(counter && {
      counter: {
        ...getUnitCounterJssStyle(),
        gridArea: '1/1',
        placeSelf: 'flex-end',
        padding: `${counterPaddingBlock} ${counterPaddingInline}`,
      },
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
