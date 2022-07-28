import type { Styles } from 'jss';
import type { Theme } from '../../../utils';
import { getThemedColors } from '../../../styles';

export const getFunctionalComponentRequiredStyles = (theme: Theme): Styles<'required'> => {
  return {
    required: {
      userSelect: 'none',
      color: getThemedColors(theme).errorColor,
    },
  };
};
