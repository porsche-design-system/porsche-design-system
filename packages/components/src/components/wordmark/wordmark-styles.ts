import type { WordmarkSize } from './wordmark-utils';
import type { Theme } from '../../types';
import { getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  focusPseudoJssStyle,
  getHighContrastColors,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';

export const getComponentCss = (size: WordmarkSize, theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
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
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      'a, svg': {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        height: 'inherit',
      },
      a: {
        textDecoration: 'none',
        ...focusPseudoJssStyle,
      },
      svg: isHighContrastMode
        ? {
            fill: getHighContrastColors().canvasTextColor,
          }
        : {
            fill: getThemedColors(theme).primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              fill: getThemedColors('dark').primaryColor,
            }),
          },
    },
  });
};
