import type { MarqueSize } from './marque-size';
import type { JssStyle } from 'jss';
import { getMediaQueryMin } from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, getFocusJssStyle, hostHiddenStyles } from '../../styles';

const baseSizes: Record<Exclude<MarqueSize, 'responsive'>, Pick<JssStyle, 'height' | 'width'>> = {
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
        ...addImportantToEachRule({
          outline: 0,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      a: {
        display: 'block',
        textDecoration: 'none',
        '&::before': {
          // needs to be defined always to have correct custom click area
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '1px',
        },
        ...getFocusJssStyle('light', { pseudo: true }), // TODO: we need to support theme
      },
      picture: {
        display: 'block',
        ...(size === 'responsive'
          ? {
              ...baseSizes.small,
              [getMediaQueryMin('l')]: baseSizes.medium,
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
