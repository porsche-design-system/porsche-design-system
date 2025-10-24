import { spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle, Styles } from 'jss';
import { getTransition, prefersColorSchemeDarkMediaQuery } from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { Theme } from '../../../types';
import type { FormState } from '../../../utils/form/form-state';

export const getFunctionalComponentStateMessageStyles = (
  theme: Theme,
  state: FormState,
  additionalDefaultJssStyle?: JssStyle
): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      gap: spacingStaticXSmall,
      ...textSmallStyle,
      color: getThemedFormStateColors(theme, state).formStateColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: getThemedFormStateColors('dark', state).formStateColor,
      }),
      transition: `${getTransition('color')}, ${getTransition('opacity')}`,
      ...additionalDefaultJssStyle,
      '&:empty': {
        opacity: '0',
        position: 'absolute',
      },
    },
  };
};
