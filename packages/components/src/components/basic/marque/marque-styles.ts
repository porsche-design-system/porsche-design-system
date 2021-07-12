import { attachCss, buildGlobalStyles, buildHostStyles, getCss, getFocusStyles, mediaQuery } from '../../../utils';
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

const baseCss: string = getCss({
  ...buildHostStyles({
    display: 'inline-flex',
    verticalAlign: 'top',
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
      [mediaQuery('l')]: baseSizes.medium,
    },
    img: {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  }),
});

const getDynamicCss = (size: MarqueSize): string => {
  return getCss(
    buildGlobalStyles({
      picture: baseSizes[size],
    })
  );
};

export const getComponentCss = (size: MarqueSize): string => {
  return getCss(
    buildGlobalStyles({
      picture: baseSizes[size],
    })
  );
};

export const addComponentCss = (host: HTMLElement, size: MarqueSize): void => {
  attachCss(host, baseCss + getDynamicCss(size));
};
