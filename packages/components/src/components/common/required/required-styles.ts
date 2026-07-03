import type { Styles } from '../../../utils/jss';

export const getFunctionalComponentRequiredStyles = (): Styles<'required'> => {
  return {
    required: {
      userSelect: 'none',
    },
  };
};
