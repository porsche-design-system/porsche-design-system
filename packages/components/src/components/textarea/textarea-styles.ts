import { borderWidthThin, fontLineHeight, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colors,
  getDisabledBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { legacyRadiusSmall, radiusLg, radiusXl } from '../../styles/css-variables';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import { getUnitCounterJssStyle } from '../../styles/form-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { TextareaResize } from './textarea-utils';

const { primaryColor, contrastMediumColor, frostedColor } = colors;

export const cssVarInternalTextareaScaling = '--p-internal-textarea-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 * @css-variable {"name":"--p-textarea-field-sizing","description":"Controls CSS `field-sizing` for textarea.","defaultValue":"unset"}
 * @css-variable {"name":"--p-textarea-min-width","description":"Minimum width of the textarea.","defaultValue":"52px"}
 * @css-variable {"name":"--p-textarea-max-width","description":"Maximum width of the textarea.","defaultValue":"unset"}
 * @css-variable {"name":"--p-textarea-min-height","description":"Minimum height of the textarea.","defaultValue":"unset"}
 * @css-variable {"name":"--p-textarea-max-height","description":"Maximum height of the textarea.","defaultValue":"unset"}
 */

export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isCompact: boolean,
  hasCounter: boolean,
  resize: TextareaResize
): string => {
  const textareaMinHeight = `calc(var(${cssVarInternalTextareaScaling}) * 3.5rem)`;
  const textareaPaddingBlock = `calc(28px * (var(${cssVarInternalTextareaScaling}) - 0.64285714) + 5px)`;
  const textareaPaddingInline = `calc(22.4px * (var(${cssVarInternalTextareaScaling}) - 0.64285714) + 8px)`;
  const textareaPaddingBottom = `calc(${fontLineHeight} + calc(22.4px * (var(${cssVarInternalTextareaScaling}) - 0.64285714) + 4px))`;
  const counterMarginBottom = `calc(11.2px * (var(${cssVarInternalTextareaScaling}) - 0.64285714) + 4px)`;

  const { formStateBorderColor, formStateBackgroundColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        [`${cssVarInternalTextareaScaling}`]: isCompact ? 0.64285714 : 1,
        ...addImportantToEachRule({
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
        fieldSizing: 'var(--p-textarea-field-sizing, unset)',
        minWidth: `var(--p-textarea-min-width, 2ch)`, // to show at least 2 characters in very narrow containers
        maxWidth: 'var(--p-textarea-max-width, unset)',
        minHeight: `var(--p-textarea-min-height, ${textareaMinHeight})`,
        maxHeight: 'var(--p-textarea-max-height, unset)',
        border: `${borderWidthThin} solid ${formStateBorderColor}`,
        borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusLg : radiusXl})`,
        background: formStateBackgroundColor,
        color: primaryColor,
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
        boxSizing: 'border-box',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        font: textSmallStyle.font,
        padding: hasCounter
          ? `${textareaPaddingBlock} ${textareaPaddingInline} ${textareaPaddingBottom}`
          : `${textareaPaddingBlock} ${textareaPaddingInline}`,
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
    ...(hasCounter && {
      counter: {
        ...getUnitCounterJssStyle(),
        gridArea: '1/1',
        placeSelf: 'flex-end',
        marginInlineEnd: textareaPaddingInline,
        marginBottom: counterMarginBottom,
      },
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
