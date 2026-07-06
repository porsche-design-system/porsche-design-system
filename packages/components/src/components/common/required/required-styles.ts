import type { Styles } from '../../../utils/css-serializer';

export const getFunctionalComponentRequiredStyles = (): Styles<'required'> => {
  return {
    required: {
      userSelect: 'none',
    },
  };
};
