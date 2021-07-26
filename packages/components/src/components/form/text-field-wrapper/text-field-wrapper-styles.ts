import { buildSlottedStyles, getBaseSlottedStyles, getCss, insertSlottedStyles, Styles } from '../../../utils';

export const getSlottedStyles = (): Styles => {
  return {
    ...getBaseSlottedStyles(),
    '& input&::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration':
      {
        WebkitAppearance: 'none',
        appearance: 'none',
      },
    '& input[type="text"]::-webkit-contacts-auto-fill-button, & input[type="text"]::-webkit-credentials-auto-fill-button':
      {
        marginRight: '2.4375rem',
      },
  };
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getSlottedStyles()));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};
