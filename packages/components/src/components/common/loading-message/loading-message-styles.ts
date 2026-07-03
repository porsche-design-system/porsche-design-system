import type { Styles } from '../../../utils/emotionCss';
import { getHiddenTextJssStyle } from '../../../styles';

export const getFunctionalComponentLoadingMessageStyles = (): Styles<'loading'> => {
  return {
    loading: getHiddenTextJssStyle(),
  };
};
