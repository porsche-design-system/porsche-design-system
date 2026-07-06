import type { Styles } from '../../../utils/css-serializer';
import { getHiddenTextJssStyle } from '../../../styles';

export const getFunctionalComponentLoadingMessageStyles = (): Styles<'loading'> => {
  return {
    loading: getHiddenTextJssStyle(),
  };
};
