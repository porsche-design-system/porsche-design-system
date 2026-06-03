import {
  colorContrastMedium,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  radiusLg,
  radiusXl,
  ref,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  getDisabledBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import { getUnitCounterJssStyle } from '../../styles/form-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { TextareaResize } from './textarea-utils';

export const cssVarInternalTextareaScaling = '--_p-textarea-a';

/**
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
  const textareaMinHeight = `calc(${ref(cssVarInternalTextareaScaling)} * 3.5rem)`;
  const textareaPaddingBlock = `calc(28px * (${ref(cssVarInternalTextareaScaling)} - 0.64285714) + 5px)`;
  const textareaPaddingInline = `calc(22.4px * (${ref(cssVarInternalTextareaScaling)} - 0.64285714) + 8px)`;
  const textareaPaddingBottom = `calc(${ref(leadingNormal)} + calc(22.4px * (${ref(cssVarInternalTextareaScaling)} - 0.64285714) + 4px))`;
  const counterMarginBottom = `calc(11.2px * (${ref(cssVarInternalTextareaScaling)} - 0.64285714) + 4px)`;

  const { formStateBorderColor, formStateBackgroundColor, formStateBorderHoverColor } = getThemedFormStateColors(state);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        [`${cssVarInternalTextareaScaling}`]: isCompact ? 0.64285714 : 1,
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...getFunctionalComponentLabelAfterStyles(),
      ...preventFoucOfNestedElementsStyles,
      textarea: {
        all: 'unset',
        gridArea: '1/1',
        display: 'block',
        resize,
        fieldSizing: ref('--p-textarea-field-sizing', 'unset'),
        minWidth: ref('--p-textarea-min-width', '2ch'), // to show at least 2 characters in very narrow containers
        maxWidth: ref('--p-textarea-max-width', 'unset'),
        minHeight: ref('--p-textarea-min-height', textareaMinHeight),
        maxHeight: ref('--p-textarea-max-height', 'unset'),
        border: `1px solid ${formStateBorderColor}`,
        borderRadius: ref(legacyRadiusSmall, isCompact ? ref(radiusLg) : ref(radiusXl)),
        background: formStateBackgroundColor,
        color: ref(colorPrimary),
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
        boxSizing: 'border-box',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        padding: hasCounter
          ? `${textareaPaddingBlock} ${textareaPaddingInline} ${textareaPaddingBottom}`
          : `${textareaPaddingBlock} ${textareaPaddingInline}`,
        '&:focus': {
          borderColor: formStateBorderHoverColor,
        },
        cursor: isDisabled ? 'not-allowed' : 'text',
        ...(isReadonly && {
          borderColor: 'transparent',
          background: ref(colorFrosted),
          color: ref(colorContrastMedium),
        }),
        ...(!isDisabled &&
          !isReadonly &&
          hoverMediaQuery({
            '&:hover,.label-wrapper:hover~&': {
              borderColor: formStateBorderHoverColor,
            },
          })),
      },
    },
    root: {
      display: 'grid',
      gap: ref(spacingStaticXs),
    },
    wrapper: {
      display: 'grid',
      ...(isDisabled && getDisabledBaseStyles()),
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
    ...getFunctionalComponentLabelStyles(isDisabled, false, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
