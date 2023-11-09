import type { FormState } from '../../utils/form/form-state';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import { getBaseChildStyles } from '../../styles/form-styles';
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
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles2';

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
      getBaseChildStyles('input', state, theme, {
        textAlign: 'center',
        width: inputSize,
        ...(length > 4 && {
          [getMediaQueryMax('xs')]: {
            // TODO: instead of having dedicated css rules depending on length we should try to implement a fluid one fits all solution
            width: `calc((276px - (${spacingStaticSmall} * ${length - 1})) / ${length})`, // calculate the max with of the inputs that fit into grid in viewport base (276px)
          },
        }),
        ...(isLoading && {
          opacity: 0.2, // TODO: not in sync with e.g. checkbox/radio-button loading style
          cursor: 'not-allowed', // TODO: why is it not the default for all form elements in disabled state?
        }),
        ...Object.fromEntries(
          Array.from(Array(length)).map((_, i) => {
            return [`&:nth-of-type(${i + 1})`, { gridArea: `1/${i + 1}` }];
          })
        ),
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
          '::slotted(input)': {
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
      justifySelf: 'flex-start',
      gap: spacingStaticSmall,
    },
    ...(isLoading && {
      spinner: {
        gridArea: `1/1/1/${length + 1}`,
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
