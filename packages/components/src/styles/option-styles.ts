import type { JssStyle } from 'jss';
import { getHiddenTextJssStyle } from '.';

export const OPTION_HEIGHT = 40; // optgroups are higher and ignored
export const MULTI_SELECT_OPTION_HEIGHT = 44;

export const getNoResultsOptionJssStyle = (): JssStyle => ({
  '&[role=status]': {
    cursor: 'not-allowed',
  },
  '&__sr': getHiddenTextJssStyle(),
});
