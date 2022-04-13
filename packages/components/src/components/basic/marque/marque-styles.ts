import type { MarqueSize } from './marque-utils';
import type { JssStyle } from 'jss';
import { mediaQueryMin } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../../utils';
import { addImportantToRule, getFocusJssStyle, getThemedColors } from '../../../styles';

const baseSizes: { [key in Exclude<MarqueSize, 'responsive'>]: Pick<JssStyle, 'height' | 'width'> } = {
  small: {
    width: '100px',
    height: '60px',
  },
  medium: {
    width: '120px',
    height: '72px',
  },
};

export const getComponentCss = (size: MarqueSize): string => {
  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: addImportantToRule(0),
      },
      a: {
        display: 'block',
        textDecoration: 'none',
        ...getFocusJssStyle({ color: getThemedColors('light').baseColor, offset: 0, pseudo: '::before' }),
      },
      picture: {
        display: 'block',
        ...(size === 'responsive'
          ? {
              ...baseSizes.small,
              [mediaQueryMin('l')]: baseSizes.medium,
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
