import type { WordmarkSize } from './wordmark-utils';
import type { Theme } from '../../types';
import { getCss, isThemeDark } from '../../utils';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors, hostHiddenStyles } from '../../styles';
import { filterLightPrimary, filterDarkPrimary } from '../../styles/color-filters';
import { borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2/';
import { wordmarkFluidHeight } from './wordmark-utils';

export const getComponentCss = (size: WordmarkSize, theme: Theme): string => {
  const isSizeFluid = size === 'small';
  const { focusColor } = getThemedColors(theme);
  const isDark = isThemeDark(theme);

  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-flex',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
          ...hostHiddenStyles,
          boxSizing: 'content-box', // needed for custom clickarea to revert styles from Vue component
          ...(isSizeFluid && { height: wordmarkFluidHeight }),
        }),
      },
      a: {
        outline: 0,
        display: 'block',
        textDecoration: 'none',
        height: 'inherit',
        '&::before': {
          content: '""',
          position: 'absolute',
          borderRadius: borderRadiusSmall,
          ...getInsetJssStyle(-6),
        },
        '&:focus::before': {
          border: `${borderWidthBase} solid ${focusColor}`,
        },
        '&:focus:not(:focus-visible)::before': {
          border: 0,
        },
      },
      svg: {
        display: 'block',
        pointerEvents: 'none', // prevents image drag
        transform: 'translateZ(0)', // Safari IOS render dark theme filter
        filter: isDark ? filterDarkPrimary : filterLightPrimary,
        height: 'inherit',
      },
    },
  });
};
