import { attachComponentCss, buildResponsiveHostStyles, getCss, hasSlottedSubline } from '../../../utils';
import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';

const getStretchStyles: GetStylesFunction = (stretch: boolean): JssStyle => ({
  display: stretch ? 'block' : 'inline-block',
});

export const getComponentCss = (stretch: BreakpointCustomizable<boolean>): string => {
  return getCss(buildResponsiveHostStyles(stretch, getStretchStyles));
};

export const addComponentCss = (host: HTMLElement, stretch: BreakpointCustomizable<boolean>): void => {
  // Subline does not support stretch, therefore it needs to be called with false if with subline
  attachComponentCss(host, getComponentCss, hasSlottedSubline(host) ? false : stretch);
};
