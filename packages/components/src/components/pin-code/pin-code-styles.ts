import type { FormState } from '../../utils/form/form-state';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import { formElementPaddingVertical, getSlottedTextFieldTextareaSelectStyles } from '../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { type PinCodeLength, removeSlottedSelector, removeStyles } from './pin-code-utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import {
  borderWidthBase,
  fontLineHeight,
  getMediaQueryMax,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  isWithinForm: boolean,
  length: PinCodeLength,
  theme: Theme
): string => {
  const inputSize = `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`; // equivalent to calculation of input height within form-styles
  const inputStyles = removeStyles(
    'input[readonly]',
    removeSlottedSelector(
      getSlottedTextFieldTextareaSelectStyles('input', state, isLoading, theme, {
        // TODO: move into getSlottedTextFieldTextareaSelectStyles()
        padding: `${formElementPaddingVertical} ${spacingStaticXSmall}`,
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. textAlign=center|start
        textAlign: 'center',
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. size=max|min
        width: inputSize,
        ...(length > 4 && {
          [getMediaQueryMax('xs')]: {
            // TODO: instead of having dedicated css rules depending on length we should try to implement a fluid one fits all solution
            width: `calc((276px - (${spacingStaticSmall} * ${length - 1})) / ${length})`, // calculate the max with of the inputs that fit into grid in viewport base (276px)
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
      // input
      ...inputStyles,
      ...(isWithinForm &&
        addImportantToEachRule({
          '::slotted([slot=internal-input])': {
            position: 'absolute',
            height: inputSize,
            width: 0,
            opacity: 0,
          },
        })),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
      justifySelf: 'flex-start',
      gap: spacingStaticSmall,
    },
    ...(isLoading && {
      spinner: {
        gridArea: '1/1/1/-1',
        placeSelf: 'center',
        width: inputSize,
        height: inputSize,
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
