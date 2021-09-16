import { buildSlottedStyles, getBaseSlottedStyles, getCss, attachSlottedCss } from '../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};

export const addSlottedCss = (host: HTMLElement): void => {
  attachSlottedCss(host, getSlottedCss(host));
};
