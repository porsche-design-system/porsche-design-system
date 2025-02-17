import {
  borderRadiusSmall,
  fontLineHeight,
  fontWeightRegular,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { Styles } from 'jss';
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
import { getNoResultsOptionJssStyle } from '../../../styles/option-styles';
import type { Theme } from '../../../types';
import { getCss, isHighContrastMode } from '../../../utils';

export const cssVariableSelectPaddingInlineStart = '--p-internal-select-option-padding-left';

const cssVarInternalSelectOptionScaling = '--p-internal-select-option-scaling';
const scalingVar = `var(${cssVarInternalSelectOptionScaling}, 1)`;

// TODO: Enforce order of slotted text, img
export const getComponentCss = (theme: Theme): string => {
  return getCss({
    '@global': {
      ...addImportantToEachRule({
        ':host': {
          // TODO: display is missing
          scrollMargin: '6px', // Aligns option when list is scrolled by navigating with keyboard
          ...hostHiddenStyles,
        },
        '::slotted(img)': {
          height: fontLineHeight,
          borderRadius: borderRadiusSmall,
          width: 'auto',
        },
      }),
      ...preventFoucOfNestedElementsStyles,
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

  const gap = `max(4px, ${scalingVar} * 12px)`;
  const paddingBlock = `max(2px, ${scalingVar} * ${spacingStaticSmall})`;
  const paddingInline = `max(4px, ${scalingVar} * var(${cssVariableSelectPaddingInlineStart}, 12px)) max(4px, ${scalingVar} * 12px)`;

  return {
    option: {
      fontWeight: fontWeightRegular,
      display: 'flex',
      gap,
      paddingBlock,
      paddingInline,
      minHeight: fontLineHeight, // preserves height for empty option
      ...textSmallStyle,
      color: contrastHighColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
      }),
      cursor: 'pointer',
      textAlign: 'start',
      wordBreak: 'break-word',
      boxSizing: 'content-box',
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
