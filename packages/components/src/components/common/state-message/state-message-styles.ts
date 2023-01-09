import type { Styles } from 'jss';
import type { Theme } from '../../../types';
import { getTransition } from '../../../styles';
import { spacingStaticXSmall, textSmall } from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../../utils/form/form-state';

export const getFunctionalComponentStateMessageStyles = (theme: Theme, state: FormState): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      marginTop: spacingStaticXSmall,
      ...textSmall,
      color: getThemedFormStateColors(theme, state).formStateColor,
      transition: getTransition('color'),
      '&__icon': {
        marginRight: spacingStaticXSmall,
      },
    },
  };
};
