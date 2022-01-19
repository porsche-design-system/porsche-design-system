import type { Theme } from '../../../types';
import type { Styles } from '../../../utils';
import { getThemedColors } from '../../../styles/colors';

export const getFunctionalComponentRequiredStyles = (theme: Theme): Styles<'required'> => {
  return {
    required: {
      userSelect: 'none',
      color: getThemedColors(theme).errorColor,
    },
  };
};
