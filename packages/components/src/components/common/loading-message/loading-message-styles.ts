import { type Styles } from 'jss';
import { getHiddenTextJssStyle } from '../../../styles';

export const getFunctionalComponentLoadingMessageStyles = (): Styles<'status'> => {
  return {
    status: getHiddenTextJssStyle(),
  };
};
