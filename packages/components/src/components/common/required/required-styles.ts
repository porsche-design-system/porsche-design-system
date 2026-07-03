import type { Styles } from '../../../utils/emotionCss';

export const getFunctionalComponentRequiredStyles = (): Styles<'required'> => {
  return {
    required: {
      userSelect: 'none',
    },
  };
};
