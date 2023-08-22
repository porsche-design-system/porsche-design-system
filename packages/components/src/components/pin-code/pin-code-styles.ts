import type { FormState } from '../../utils/form/form-state';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { getBaseChildStyles, getLabelStyles } from '../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import { getStylesWithoutSlottedSelector } from './pin-code-utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { borderWidthBase, fontLineHeight, spacingStaticSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  theme: Theme
): string => {
  const inputSize = `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`; // we need 10px additionally so input height becomes 54px
  const labelStyles = getStylesWithoutSlottedSelector(getLabelStyles('input', isDisabled, hideLabel, state, theme));
  const inputStyles = getStylesWithoutSlottedSelector(
    getBaseChildStyles('input', state, theme, {
      textAlign: 'center',
      width: inputSize,
    })
  );

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
          display: 'block',
          ...hostHiddenStyles,
        }),
      ...inputStyles,
      '::slotted(input)': addImportantToEachRule({
        position: 'absolute',
        height: inputSize,
        width: 0,
        opacity: 0,
      }),
    },
    'pin-code-container': {
      display: 'flex',
      gap: spacingStaticSmall,
      justifyContent: 'start',
      flexWrap: 'wrap',
    },
    ...mergeDeep(labelStyles, {
      label: {
        display: 'inline-flex',
      },
    }),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
