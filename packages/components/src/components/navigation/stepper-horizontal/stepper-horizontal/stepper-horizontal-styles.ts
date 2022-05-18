import { getCss } from '../../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      '::slotted(*:not(:last-child))': {
        marginRight: '1em',
      },
    },
    'item-wrapper': {
      display: 'flex',
    },
  });
};
