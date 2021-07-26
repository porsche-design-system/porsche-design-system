import type { Styles } from '../../../utils';
import { buildSlottedStyles, getCss, getFocusPseudoStyles, insertSlottedStyles } from '../../../utils';
import { color } from '@porsche-design-system/utilities';

export const getSlottedStyles = (): Styles => {
  return {
    ...getFocusPseudoStyles({ color: color.default }),
    '&[theme="dark"] a:focus::before': {
      outlineColor: color.background.default,
    },
    '&[theme="dark"] a:focus:not(:focus-visible)::before': {
      outlineColor: 'transparent',
    },
  };
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getSlottedStyles()));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
