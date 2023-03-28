import type { WordmarkSize } from './wordmark-utils';
import type { Theme } from '../../types';
import { getCss } from '../../utils';
import { addImportantToEachRule, getThemedColors, hostHiddenStyles } from '../../styles';
import { borderWidthBase, themeLightStateFocus } from '@porsche-design-system/utilities-v2/';

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
        outline: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '1px',
        },
        '&:focus::before': {
          outline: `${borderWidthBase} solid ${themeLightStateFocus}`,
          outlineOffset: '2px',
        },
        // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
        '&:focus:not(:focus-visible)::before': {
          outlineColor: 'transparent',
        },
      },
      svg: {
        display: 'block',
        height: 'inherit',
        fill: getThemedColors(theme).primaryColor,
      },
    },
  });
};
