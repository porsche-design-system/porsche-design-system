import { buildSlottedStyles, getBaseSlottedStyles, getCss, mergeDeep } from '../../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStyles(host, { '& a': { textDecoration: 'none' } })
    )
  );
};
