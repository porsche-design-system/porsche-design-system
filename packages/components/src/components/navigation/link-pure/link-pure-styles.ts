import { buildSlottedStyles, getCss, getFocusPseudoStyles, insertSlottedStyles } from '../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusPseudoStyles({ offset: 1 })));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
