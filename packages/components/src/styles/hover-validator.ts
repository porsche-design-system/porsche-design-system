import type { Styles } from 'jss';

export const hoverValidator = (style: Styles): Styles =>
  ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
    ? { '@media (hover: hover)': style }
    : style;
