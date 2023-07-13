import type { Theme } from '../../../types';
import { getCss, isHighContrastMode } from '../../../utils';
import {
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  getTransition,
  hoverMediaQuery,
} from '../../../styles';
import { borderRadiusSmall, fontLineHeight, spacingStaticSmall } from '../../../../../utilities/projects/utilities';

export const getComponentCss = (theme: Theme): string => {
  const { primaryColor, contrastHighColor, backgroundSurfaceColor, disabledColor } = getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  return getCss({
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: `${spacingStaticSmall} 12px`,
      flex: `1 0 calc(${fontLineHeight} + ${spacingStaticSmall} * 2)`,
      color: contrastHighColor,
      cursor: 'pointer',
      textAlign: 'left',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
      borderRadius: borderRadiusSmall,
      transition: ['background-color', 'color'].map(getTransition).join(),
      '&[role=status]': {
        cursor: 'not-allowed',
      },
      '&__sr': getHiddenTextJssStyle(),
      ...hoverMediaQuery({
        '&:not([aria-disabled]):not([role=status]):hover': {
          color: isHighContrastMode ? highlightColor : primaryColor,
          background: backgroundSurfaceColor,
        },
      }),
      '&--highlighted, &--selected': {
        color: isHighContrastMode ? highlightColor : primaryColor,
        background: backgroundSurfaceColor,
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
      },
      '&--hidden': {
        display: 'none',
      },
    },
  });
};
