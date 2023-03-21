import type { WordmarkSize } from './wordmark-utils';
import type { Theme } from '../../types';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getResetInitialStylesForSlottedAnchor,
  getThemedColors,
  hostHiddenStyles,
} from '../../styles';
import { filterDarkPrimary, filterLightPrimary } from '../../styles/color-filters';
import { borderWidthBase, borderRadiusMedium } from '@porsche-design-system/utilities-v2/';

export const getComponentCss = (size: WordmarkSize, theme: Theme): string => {
  const isSizeInherit = size === 'inherit';
  const { focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-flex',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
          ...hostHiddenStyles,
        }),
      },
      a: {
        ...getResetInitialStylesForSlottedAnchor,
        outline: 0,
        display: 'block',
        textDecoration: 'none',
        '&:focus::before': {
          content: '""',
          position: 'absolute',
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusMedium,
          ...getInsetJssStyle(-6),
        },
      },
      img: {
        display: 'block',
        // pointerEvents: 'none', // prevents image drag // TODO: check if needed
        filter: theme === 'light' ? filterLightPrimary : filterDarkPrimary,
        height: isSizeInherit ? size : 'clamp(0.63rem, 0.42vw + 0.5rem, 1rem)',
      },
    },
  });
};
