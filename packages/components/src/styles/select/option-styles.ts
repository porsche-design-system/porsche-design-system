import { isHighContrastMode, Theme } from '../../utils';
import { getHighContrastColors, getThemedColors } from '../colors';
import { borderRadiusSmall, fontLineHeight, spacingStaticSmall } from '../../../../utilities/projects/utilities';
import { getHiddenTextJssStyle, getTransition } from '../common-styles';
import { hoverMediaQuery } from '../hover-media-query';
import { JssStyle, Styles } from 'jss';

export const OPTION_HEIGHT = 40; // optgroups are higher and ignored

export const getSelectOptionStyles = (theme: Theme, additionalOptionJSSStyle?: JssStyle): Styles => {
  const { primaryColor, contrastHighColor, backgroundSurfaceColor, disabledColor } = getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  return {
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
      ...getNoResultsOptionJSSStyles(),
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
      ...additionalOptionJSSStyle,
    },
  };
};

export const getNoResultsOptionJSSStyles = (): JssStyle => ({
  '&[role=status]': {
    cursor: 'not-allowed',
  },
  '&__sr': getHiddenTextJssStyle(),
});
