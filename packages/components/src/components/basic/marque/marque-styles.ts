import { getCss, getFocusStyles, mediaQuery } from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { MarqueSize } from './marque-utils';
import type { JssStyle } from '../../../utils';

const baseSizes: { [key in MarqueSize]?: Pick<JssStyle, 'height' | 'width'> } = {
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
    ':host': {
      display: 'inline-flex',
      verticalAlign: 'top',
    },
    '@global': {
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
    },
  });
};
