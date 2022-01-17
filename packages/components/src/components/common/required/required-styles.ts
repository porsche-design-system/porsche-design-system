import { Theme } from '../../../types';
import { getThemedColors, Styles } from '../../../utils';

export const getFunctionalComponentRequiredStyles = (theme: Theme): Styles<'required'> => {
  return {
    required: {
      userSelect: 'none',
      color: getThemedColors(theme).errorColor,
    },
  };
};
