import type { WordmarkSize } from './wordmark-utils';
import type { Theme } from '../../types';
import { getCss } from '../../utils';
import { addImportantToEachRule, focusPseudoJssStyle, getThemedColors, hostHiddenStyles } from '../../styles';

export const getComponentCss = (size: WordmarkSize, theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
          boxSizing: 'content-box', // needed for correct height calculation when padding is set on host (e.g. custom click area)
          ...(!(size === 'inherit') && { height: 'clamp(0.63rem, 0.42vw + 0.5rem, 1rem)' }),
          ...hostHiddenStyles,
        }),
      },
      a: {
        display: 'block',
        textDecoration: 'none',
        height: 'inherit',
        ...focusPseudoJssStyle,
      },
      svg: {
        display: 'block',
        height: 'inherit',
        fill: getThemedColors(theme).primaryColor,
      },
    },
  });
};
