import { buildSlottedStyles, getBaseSlottedStyles, getCss } from '../../../utils';

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      ...getBaseSlottedStyles(),
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration':
        {
          WebkitAppearance: 'none',
          appearance: 'none',
        },
      '& input[type="text"]': {
        '&::-webkit-contacts-auto-fill-button, &::-webkit-credentials-auto-fill-button': {
          marginRight: '2.4375rem',
        },
      },
    })
  );
};
