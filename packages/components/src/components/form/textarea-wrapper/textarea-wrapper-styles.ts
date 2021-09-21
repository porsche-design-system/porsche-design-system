import { buildSlottedStyles, getBaseSlottedStyles, getCss } from '../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
