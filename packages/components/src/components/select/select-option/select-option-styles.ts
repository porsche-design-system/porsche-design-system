import type { Theme } from '../../../types';
import { getCss, isHighContrastMode } from '../../../utils';
import { getNoResultsOptionJssStyle } from '../../../styles/option-styles';
import {
  addImportantToEachRule,
  getHighContrastColors,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { borderRadiusSmall, fontLineHeight, spacingStaticSmall } from '@porsche-design-system/utilities-v2';
import { Styles } from 'jss';

export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        scrollMarginTop: spacingStaticSmall, // Creates top margin when navigating with keyboard and list is scrolled automatically
        ...hostHiddenStyles,
      }),
      ...addImportantToEachRule({
        '::slotted(img)': {
          height: fontLineHeight,
          borderRadius: borderRadiusSmall,
        },
      }),
    },
    ...getOptionStyles(theme),
    icon: {
      marginInlineStart: 'auto',
    },
  });
};

// TODO: Copied from multi-select and select-wrapper-dropdown, extract and reuse
export const getOptionStyles = (theme: Theme): Styles => {
  const {
    primaryColor: primaryColorDark,
    contrastHighColor: contrastHighColorDark,
    disabledColor: disabledColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    contrastLowColor: contrastLowColorDark,
  } = getThemedColors('dark');
  const { primaryColor, contrastHighColor, backgroundSurfaceColor, disabledColor, contrastLowColor } =
    getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  return {
    option: {
      display: 'flex',
      // justifyContent: 'space-between', // TODO: Commenented out
      gap: '12px',
      padding: `${spacingStaticSmall} 12px`,
      flex: `1 0 calc(${fontLineHeight} + ${spacingStaticSmall} * 2)`,
      minHeight: `calc(${fontLineHeight} + ${spacingStaticSmall} * 2)`, // TODO: Added this line to preserve height for empty option
      color: contrastHighColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
      }),
      cursor: 'pointer',
      textAlign: 'start',
      wordBreak: 'break-word',
      boxSizing: 'border-box',
      borderRadius: borderRadiusSmall,
      transition: `${getTransition('background-color')}, ${getTransition('color')}`,
      ...getNoResultsOptionJssStyle(),
      ...hoverMediaQuery({
        '&:not([aria-disabled]):not(.option--disabled):not([role=status]):hover': {
          color: isHighContrastMode ? highlightColor : primaryColor,
          background: contrastLowColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: isHighContrastMode ? highlightColor : primaryColorDark,
            background: contrastLowColorDark,
          }),
        },
      }),
      '&--selected': {
        cursor: 'default',
        pointerEvents: 'none',
        background: backgroundSurfaceColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundSurfaceColorDark,
        }),
      },
      '&--highlighted': {
        background: contrastLowColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: contrastLowColorDark,
        }),
      },
      '&--highlighted, &--selected': {
        color: isHighContrastMode ? highlightColor : primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: isHighContrastMode ? highlightColor : primaryColorDark,
        }),
      },
      '&--disabled': {
        cursor: 'not-allowed',
        color: disabledColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: disabledColorDark,
        }),
      },
      '&--hidden': {
        display: 'none',
      },
    },
  };
};
