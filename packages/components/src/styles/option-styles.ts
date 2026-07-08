import type { CssStyle } from '../utils/css-serializer';
import { getHiddenTextCssStyle } from '.';

export const getNoResultsOptionCssStyle = (): CssStyle => ({
  '&[role=option]': {
    cursor: 'not-allowed',
  },
  // TODO: shouldn't be used here, instead use sr-only functional component and style
  '&__sr': getHiddenTextCssStyle(),
});
