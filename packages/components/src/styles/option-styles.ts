import type { JssStyle } from 'jss';
import { getHiddenTextJssStyle } from '.';

export const getNoResultsOptionJssStyle = (): JssStyle => ({
  '&[role=status]': {
    cursor: 'not-allowed',
  },
  // TODO: shouldn't be used here, instead use sr-only functional component and style
  '&__sr': getHiddenTextJssStyle(),
});
