import type { Styles } from 'jss';
import type { Theme } from '../../../utils';
import { getTransition } from '../../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { FormState } from '../../form/form-state';

const { xSmall: spacingXSmall } = spacing;

export const getFunctionalComponentStateMessageStyles = (theme: Theme, state: FormState): Styles<'message'> => {
  return {
    message: {
      display: 'flex',
      marginTop: spacingXSmall,
      color: getThemedFormStateColors(theme, state).formStateColor,
      transition: getTransition('color'),
      '&__icon': {
        marginRight: spacingXSmall,
      },
    },
  };
};
