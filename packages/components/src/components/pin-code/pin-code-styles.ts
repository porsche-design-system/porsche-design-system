import type { FormState } from '../../utils/form/form-state';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { removeStyles, removeSlottedSelector } from './pin-code-utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import {
  borderWidthBase,
  fontLineHeight,
  getMediaQueryMax,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  isWithinForm: boolean,
  length,
  theme: Theme
): string => {
  const inputSize = `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`; // equivalent to calculation of input height within form-styles
  const labelStyles = removeStyles(
    '@media(hover:hover)',
    removeSlottedSelector(getLabelStyles('input', isDisabled, hideLabel, state, theme))
  );
  const inputStyles = removeStyles(
    'input[readonly]',
    removeSlottedSelector(
      getBaseChildStyles('input', state, theme, {
        textAlign: 'center',
        width: inputSize,
        ...(length === 6 && {
          [getMediaQueryMax('xs')]: {
            width: `calc((276px - (${spacingStaticSmall} * 5)) / 6)`, // calculate the max with of the inputs that fit into grid in viewport base (276px)
          },
        }),
        ...(isLoading && {
          opacity: 0.2,
          cursor: 'not-allowed',
        }),
      })
    )
  );

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
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
    ...(isLoading && {
      spinner: {
        width: '100%',
        height: inputSize,
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    }),
    'input-container': {
      display: 'flex',
      position: 'relative',
      gap: spacingStaticSmall,
      flexWrap: 'wrap',
      width: 'fit-content',
    },
    ...mergeDeep(labelStyles, {
      label: {
        ...buildResponsiveStyles(
          hideLabel,
          // workaround: since pin-code component is not wrapped into label tag it behaves differently
          (isLabelHidden: boolean) => (isLabelHidden ? { display: 'none' } : { display: 'inline-flex' })
        ),
        marginBottom: spacingStaticXSmall,
      },
    }),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
