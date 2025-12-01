import type { JssStyle } from 'jss';

/**
 * utility to wrap jss styles parameter in `@media (hover: hover)`
 * which is used to not have hover styles on touch devices
 */
export const hoverMediaQuery = (style: JssStyle): JssStyle => ({ '@media(hover:hover)': style });
