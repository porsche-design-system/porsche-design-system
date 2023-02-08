import type { Styles } from 'jss';

export const getFunctionalComponentRequiredStyles = (): Styles<'required'> => {
  return {
    required: {
      userSelect: 'none',
    },
  };
};
