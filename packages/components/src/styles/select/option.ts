import { borderRadiusSmall, fontLineHeight, spacingStaticSmall, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { type Theme, isHighContrastMode } from '../../utils';
import { getHighContrastColors, getThemedColors } from '../colors';
import { getTransition } from '../common-styles';
import { hoverMediaQuery } from '../hover-media-query';
import { getNoResultsOptionJssStyle } from '../option-styles';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';

export const getOptionJssStyle = (
  componentName: 'select-wrapper' | 'select-option' | 'multi-select-option',
  cssVarScaling: string | 1, // "1" is needed for components not yet supporting compact mode
  theme: Theme
): JssStyle => {
  const {
    primaryColor: primaryColorDark,
    hoverColor: hoverColorDark,
    contrastHighColor: contrastHighColorDark,
    disabledColor: disabledColorDark,
    contrastLowColor: contrastLowColorDark,
  } = getThemedColors('dark');
  const { primaryColor, hoverColor, contrastLowColor, contrastHighColor, disabledColor } = getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  const gap = `max(4px, ${cssVarScaling} * 12px)`;
  const paddingBlock = `max(2px, ${cssVarScaling} * ${spacingStaticSmall})`;
  const paddingInline = `max(4px, ${cssVarScaling} * var(--p-internal-${componentName}-padding-left, 12px)) max(4px, ${cssVarScaling} * 12px)`;

  return {
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
        background: hoverColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: isHighContrastMode ? highlightColor : primaryColorDark,
          background: hoverColorDark,
        }),
      },
    }),
    '&--selected': {
      ...(componentName === 'select-option' && {
        cursor: 'default',
        pointerEvents: 'none',
      }),
      background: hoverColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: hoverColorDark,
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
  };
};
