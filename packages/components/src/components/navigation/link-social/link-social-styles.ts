import {
  buildSlottedStyles,
  buildSlottedStylesForDarkTheme,
  getCss,
  getFocusPseudoStyles,
  insertSlottedStyles,
  mergeDeep,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getFocusPseudoStyles({ color: color.default })),
      buildSlottedStylesForDarkTheme(host, {
        '& a:focus::before': {
          outlineColor: color.background.default,
        },
      })
    )
  );
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
