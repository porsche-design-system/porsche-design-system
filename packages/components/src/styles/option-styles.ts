import type { JssStyle } from '../utils/css-serializer';
import { getHiddenTextJssStyle } from '.';

export const getNoResultsOptionJssStyle = (): JssStyle => ({
  '&[role=option]': {
    cursor: 'not-allowed',
  },
  // TODO: shouldn't be used here, instead use sr-only functional component and style
  '&__sr': getHiddenTextJssStyle(),
});
