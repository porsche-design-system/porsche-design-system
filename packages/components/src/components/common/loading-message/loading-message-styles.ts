import type { Styles } from '../../../utils/css-serializer';
import { getHiddenTextCssStyle } from '../../../styles';

export const getFunctionalComponentLoadingMessageStyles = (): Styles<'loading'> => {
  return {
    loading: getHiddenTextCssStyle(),
  };
};
