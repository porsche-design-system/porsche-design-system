import type { MarqueSize } from './marque-utils';
import type { JssStyle } from 'jss';
import { getCss } from '../../../utils';
import { addImportantToRule, getFocusStyle, mediaQuery, getThemedColors } from '../../../styles';

const baseSizes: { [key in Exclude<MarqueSize, 'responsive'>]: Pick<JssStyle, 'height' | 'width'> } = {
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
      outline: addImportantToRule(0),
    },
    '@global': {
      a: {
        display: 'block',
        textDecoration: 'none',
        ...getFocusStyle({ color: getThemedColors('light').baseColor, offset: 0 }),
      },
      picture: {
        display: 'block',
        ...(size === 'responsive'
          ? {
              ...baseSizes.small,
              [mediaQuery('l')]: baseSizes.medium,
            }
          : baseSizes[size]),
      },
      img: {
        display: 'block',
        width: '100%',
        height: 'auto',
      },
    },
  });
};
