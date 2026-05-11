import {
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { formElementPaddingVertical, getSlottedTextFieldTextareaSelectStyles } from '../../styles/form-styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { type PinCodeLength, removeSlottedSelector, removeStyles } from './pin-code-utils';

export const cssVarInternalPinCodeScaling = '--p-internal-pin-code-scaling';
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalPinCodeScaling}, ${compact ? 0.5 : 1})`;

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
  compact: boolean,
  theme: Theme
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
      getSlottedTextFieldTextareaSelectStyles('input', state, isLoading, theme, {
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
      ...getFunctionalComponentLabelAfterStyles(isDisabled),
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
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
