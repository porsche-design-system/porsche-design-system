import type { FormState } from '../../utils/form/form-state';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { getStylesWithoutSlottedSelector } from './pin-code-utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  isWithinForm: boolean,
  theme: Theme
): string => {
  const inputSize = `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`; // we need 10px additionally so input height becomes 54px
  const labelStyles = getStylesWithoutSlottedSelector(
    getLabelStyles('input', isDisabledOrLoading(isDisabled, isLoading), hideLabel, state, theme)
  );
  const inputStyles = getStylesWithoutSlottedSelector(
    getBaseChildStyles('input', state, theme, {
      textAlign: 'center',
      width: inputSize,
      '@media (max-width: 480px)': {
        width: '39px', // max width that fits into grid
      },
      ...(isLoading && {
        opacity: 0.2,
      }),
    })
  );

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      ...addImportantToEachRule({
        ...inputStyles,
        ...(isWithinForm && {
          '::slotted(input)': {
            position: 'absolute',
            height: inputSize,
            width: 0,
            opacity: 0,
          },
        }),
      }),
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
    'pin-code-container': {
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
