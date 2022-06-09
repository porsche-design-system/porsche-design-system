import type { Styles } from 'jss';
const hoverMediaQueryExp = '@media(hover:hover)';

// this helper should be wrapped around any hover style to disable hover behaviour on mobile´
export const hoverMediaQuery = (style: Styles): Styles =>
  ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
    ? { [hoverMediaQueryExp]: style }
    : style;
