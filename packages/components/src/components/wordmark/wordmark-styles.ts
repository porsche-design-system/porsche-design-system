import type { Styles } from 'jss';
import { addImportantToEachRule, colors, getFocusBaseStyles, hostHiddenStyles } from '../../styles';
import { getCss } from '../../utils';
import type { WordmarkSize } from './wordmark-utils';

const { primaryColor } = colors;

export const getComponentCss = (size: WordmarkSize): string => {
  const sizingStyles: Styles = {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    height: 'inherit',
  };
  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          maxWidth: '100%',
          maxHeight: '100%',
          boxSizing: 'content-box', // needed for correct height calculation when padding is set on host (e.g. custom click area)
          ...(size !== 'inherit' && {
            height: 'clamp(0.63rem, 0.42vw + 0.5rem, 1rem)',
            // workaround for Safari to optimize image rendering
            '@supports (height: round(down, 1px, 1px))': {
              height: 'round(down, clamp(0.63rem, 0.42vw + 0.5rem, 1rem), 1px)',
            },
          }),
          ...hostHiddenStyles,
        }),
      },
      a: {
        all: 'unset',
        ...sizingStyles,
        cursor: 'pointer',
        '&::before': {
          // needs to be defined always to have correct custom click area
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '1px',
        },
        '&:focus-visible::before': getFocusBaseStyles(),
      },
      svg: {
        ...sizingStyles,
        fill: primaryColor,
      },
    },
  });
};
