import type { JssStyle } from 'jss';
import { getHiddenTextJssStyle } from '.';

export const OPTION_HEIGHT = 40; // optgroups are higher and ignored
export const MULTI_SELECT_OPTION_HEIGHT = 44;

export const getNoResultsOptionJssStyle = (): JssStyle => ({
  '&[role=status]': {
    cursor: 'not-allowed',
  },
  // TODO: shouldn't be used here, instead use sr-only functional component and style
  '&__sr': getHiddenTextJssStyle(),
});
