import { isHighContrastMode, Theme } from '../../utils';
import { getHighContrastColors, getThemedColors } from '../colors';
import { borderRadiusSmall, fontLineHeight, spacingStaticSmall } from '@porsche-design-system/utilities-v2';
import { getHiddenTextJssStyle, getTransition } from '../common-styles';
import { hoverMediaQuery } from '../hover-media-query';
import { JssStyle, Styles } from 'jss';

export const OPTION_HEIGHT = 40; // optgroups are higher and ignored
export const MULTI_SELECT_OPTION_HEIGHT = 44;

export const getSelectOptionStyles = (theme: Theme, additionalOptionJssStyle?: JssStyle): Styles => {
  const { primaryColor, contrastHighColor, backgroundSurfaceColor, disabledColor, contrastLowColor } =
    getThemedColors(theme);
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
      ...getNoResultsOptionJssStyle(),
      ...hoverMediaQuery({
        '&:not([aria-disabled]):not(.option--disabled):not([role=status]):hover': {
          color: isHighContrastMode ? highlightColor : primaryColor,
          background: contrastLowColor,
        },
      }),
      '&--selected': {
        background: backgroundSurfaceColor,
      },
      '&--highlighted': {
        background: contrastLowColor,
      },
      '&--highlighted, &--selected': {
        color: isHighContrastMode ? highlightColor : primaryColor,
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
      },
      '&--hidden': {
        display: 'none',
      },
      ...additionalOptionJssStyle,
    },
  };
};

export const getNoResultsOptionJssStyle = (): JssStyle => ({
  '&[role=status]': {
    cursor: 'not-allowed',
  },
  '&__sr': getHiddenTextJssStyle(),
});
