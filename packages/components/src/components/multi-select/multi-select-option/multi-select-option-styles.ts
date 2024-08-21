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
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { borderRadiusSmall, fontLineHeight, spacingStaticSmall } from '@porsche-design-system/styles';
export const cssVariableMultiSelectPaddingInlineStart = '--p-internal-multi-select-option-padding-left';

export const getComponentCss = (theme: Theme): string => {
  const { primaryColor, contrastHighColor, backgroundSurfaceColor, disabledColor, contrastLowColor } =
    getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastHighColor: contrastHighColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    contrastLowColor: contrastLowColorDark,
  } = getThemedColors('dark');
  const { highlightColor } = getHighContrastColors();

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        scrollMarginTop: spacingStaticSmall, // Creates top margin when navigating with keyboard and list is scrolled automatically
        ...hostHiddenStyles,
      }),
      ...preventFoucOfNestedElementsStyles,
    },
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: `${spacingStaticSmall} 12px`,
      paddingInlineStart: `var(${cssVariableMultiSelectPaddingInlineStart}, 12px)`,
      flex: `1 0 calc(${fontLineHeight} + ${spacingStaticSmall} * 2)`,
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
    checkbox: {
      pointerEvents: 'none', // Avoid checkbox label click which updates input within p-checkbox-wrapper
    },
  });
};
