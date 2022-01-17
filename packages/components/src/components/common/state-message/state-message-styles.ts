import { FormState, Theme } from '../../../types';
import { getThemedFormStateColors, getTransition, Styles } from '../../../utils';
import { spacing } from '@porsche-design-system/utilities';

export const getFunctionalComponentStateMessageStyles = (theme: Theme, state: FormState): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      marginTop: spacing[4],
      color: getThemedFormStateColors(theme, state).stateColor,
      transition: getTransition('color'),
      '&__icon': {
        marginRight: spacing[4],
      },
    },
  };
};
