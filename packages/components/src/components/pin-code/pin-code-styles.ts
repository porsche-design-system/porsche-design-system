import type { FormState } from '../../utils/form/form-state';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import { formElementPaddingVertical, getSlottedTextFieldTextareaSelectStyles } from '../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { type PinCodeLength, removeSlottedSelector, removeStyles } from './pin-code-utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  fontLineHeight,
  getMediaQueryMax,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

export const cssVarInternalPinCodeScaling = '--p-internal-pin-code-scaling';
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalPinCodeScaling}, ${compact ? 0.5 : 1})`;

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

  const inputStyles = removeStyles(
    'input[readonly]',
    removeSlottedSelector(
      getSlottedTextFieldTextareaSelectStyles('input', state, isLoading, theme, {
        // TODO: move into getSlottedTextFieldTextareaSelectStyles()
        // padding: `${formElementPaddingVertical} ${spacingStaticXSmall}`,
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. textAlign=center|start
        textAlign: 'center',
        ...(length > 4 && {
          [getMediaQueryMax('xs')]: {
            // TODO: instead of having dedicated css rules depending on length we should try to implement a fluid one fits all solution
            maxWidth: 'auto',
            background: 'red',
            // width: `calc((276px - (${spacingStaticSmall} * ${length - 1})) / ${length})`, // calculate the max with of the inputs that fit into grid in viewport base (276px)
          },
        }),
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. isLoading
        ...(isLoading && {
          opacity: 0.2, // TODO: not in sync with e.g. checkbox/radio-button loading style
          cursor: 'not-allowed',
        }),
        // since @playwright/test@1.40.1 this does not work anymore in Webkit browser engine for unknown reasons
        /* ...Object.fromEntries(
          Array.from(Array(length)).map((_, i) => {
            return [`&:nth-of-type(${i + 1})`, { gridArea: `1/${i + 1}` }];
          })
        ),*/
        '&:nth-of-type(1)': { gridArea: '1/1' },
        '&:nth-of-type(2)': { gridArea: '1/2' },
        '&:nth-of-type(3)': { gridArea: '1/3' },
        '&:nth-of-type(4)': { gridArea: '1/4' },
        '&:nth-of-type(5)': { gridArea: '1/5' },
        '&:nth-of-type(6)': { gridArea: '1/6' },
        height: dimension,
        width: dimension,
        padding: paddingBlock,
        boxSizing: 'inherit',
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
      gap: spacingStaticSmall,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `repeat(${length}, minmax(auto, 1fr))`,
      justifySelf: 'flex-start',
      gap,
    },
    ...(isLoading && {
      spinner: {
        gridArea: '1/1/1/-1',
        placeSelf: 'center',
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
