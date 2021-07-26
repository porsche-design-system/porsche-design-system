import {
  buildSlottedStyles,
  buildSlottedStylesForDarkTheme,
  getBaseSlottedStyles,
  getCss,
  insertSlottedStyles,
  mergeDeep,
} from '../../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStylesForDarkTheme(host, getBaseSlottedStyles(true))
    )
  );
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
