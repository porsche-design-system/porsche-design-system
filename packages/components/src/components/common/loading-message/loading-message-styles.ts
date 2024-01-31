import { type Styles } from 'jss';
import { getHiddenTextJssStyle } from '../../../styles';

export const getFunctionalComponentLoadingMessageStyles = (): Styles<'loading'> => {
  return {
    loading: getHiddenTextJssStyle(),
  };
};
