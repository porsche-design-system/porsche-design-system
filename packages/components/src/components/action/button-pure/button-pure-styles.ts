import { buildResponsiveHostStyles, getCss } from '../../../utils';
import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';

const getStretchStyles: GetStylesFunction = (stretch: boolean): JssStyle => ({
  display: stretch ? 'block' : 'inline-block',
});

export const getComponentCss = (stretch: BreakpointCustomizable<boolean>): string => {
  return getCss(buildResponsiveHostStyles(stretch, getStretchStyles));
};
