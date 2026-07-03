import type { Styles } from '../../../utils/jss';
import { getHiddenTextJssStyle } from '../../../styles';

export const getFunctionalComponentLoadingMessageStyles = (): Styles<'loading'> => {
  return {
    loading: getHiddenTextJssStyle(),
  };
};
