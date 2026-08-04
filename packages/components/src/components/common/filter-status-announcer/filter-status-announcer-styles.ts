import type { Styles } from 'jss';
import { getHiddenTextJssStyle } from '../../../styles';

export const getFunctionalComponentFilterStatusAnnouncerStyles = (): Styles => ({
  'filter-status': getHiddenTextJssStyle(),
});
