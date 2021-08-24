import {
  attachCss,
  buildResponsiveHostStyles,
  buildSlottedStyles,
  getCss,
  getFocusPseudoStyles,
  hasSlottedSubline,
  insertSlottedStyles,
} from '../../../utils';
import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusPseudoStyles({ offset: 1 })));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};

const getStretchStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  display: stretch ? 'block' : 'inline-block',
});

export const getComponentCss = (stretch: BreakpointCustomizable<boolean>): string => {
  return getCss(buildResponsiveHostStyles(stretch, getStretchStyles));
};

export const addComponentCss = (host: HTMLElement, stretch: BreakpointCustomizable<boolean>): void => {
  if (hasSlottedSubline(host)) {
    attachCss(host, getComponentCss(false));
  } else {
    attachCss(host, getComponentCss(stretch));
  }
};
