import type { Styles } from 'jss';
import type { FormState, Theme } from '../../../types';
import { getTransition, getThemedFormStateColors } from '../../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';

export const getFunctionalComponentStateMessageStyles = (theme: Theme, state: FormState): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      marginTop: spacing[4],
      color: getThemedFormStateColors(theme, state).formStateColor,
      transition: getTransition('color'),
      '&__icon': {
        marginRight: spacing[4],
      },
    },
  };
};
