import { buildSlottedStyles, getBaseSlottedStyles, getCss, insertSlottedStyles, mergeDeep } from '../../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStyles(host, { '& a': { textDecoration: 'none' } })
    )
  );
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
