import {
  addImportantToRule,
  buildGlobalStyles,
  buildHostStyles,
  getCss,
  getFocusStyles,
  mediaQuery,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import { MarqueSize } from './marque-utils';

const baseSizes = {
  small: {
    width: 100,
    height: 60,
  },
  medium: {
    width: 120,
    height: 72,
  },
};

export const getComponentCss = (size: MarqueSize): string => {
  return getCss({
    ...buildHostStyles({
      display: 'inline-flex',
      verticalAlign: 'top',
      outline: addImportantToRule(0),
    }),
    ...buildGlobalStyles({
      a: {
        display: 'block',
        textDecoration: 'none',
        ...getFocusStyles({ color: color.default, offset: 0 }),
      },
      picture: {
        display: 'block',
        ...baseSizes.small,
        ...(size !== 'responsive' ? baseSizes[size] : { [mediaQuery('l')]: baseSizes.medium }),
      },
      img: {
        display: 'block',
        width: '100%',
        height: 'auto',
      },
    }),
  });
};
