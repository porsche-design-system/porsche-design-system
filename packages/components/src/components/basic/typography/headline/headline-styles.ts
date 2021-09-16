import { buildSlottedStyles, getBaseSlottedStyles, getCss, attachSlottedCss, mergeDeep } from '../../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStyles(host, { '& a': { textDecoration: 'none' } })
    )
  );
};

export const addSlottedCss = (host: HTMLElement): void => {
  attachSlottedCss(host, getSlottedCss(host));
};
