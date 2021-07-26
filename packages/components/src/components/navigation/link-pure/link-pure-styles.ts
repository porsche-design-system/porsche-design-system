import type { Styles } from '../../../utils';
import { buildSlottedStyles, getCss, getFocusPseudoStyles, insertSlottedStyles } from '../../../utils';

export const getSlottedStyles = (): Styles => {
  return getFocusPseudoStyles({ offset: 1 });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getSlottedStyles()));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
