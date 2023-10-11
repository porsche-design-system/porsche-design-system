import type { DividerColor, DividerDirection, DividerColorDeprecated } from './divider-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHighContrastColors,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';

export const getComponentCss = (
  color: Exclude<DividerColor, DividerColorDeprecated>,
  orientation: BreakpointCustomizable<DividerDirection>,
  theme: Theme
): string => {
  const { contrastLowColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const {
    contrastLowColor: contrastLowColorDark,
    contrastMediumColor: contrastMediumColorDark,
    contrastHighColor: contrastHighColorDark,
  } = getThemedColors('dark');
  const colorMap: Record<Exclude<DividerColor, DividerColorDeprecated>, string> = {
    'contrast-low': contrastLowColor,
    'contrast-medium': contrastMediumColor,
    'contrast-high': contrastHighColor,
  };
  const colorMapDark: Record<Exclude<DividerColor, DividerColorDeprecated>, string> = {
    'contrast-low': contrastLowColorDark,
    'contrast-medium': contrastMediumColorDark,
    'contrast-high': contrastHighColorDark,
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      hr: {
        margin: 0,
        padding: 0,
        border: 'none',
        textAlign: 'start',
        ...(isHighContrastMode
          ? {
              background: getHighContrastColors().canvasTextColor,
            }
          : {
              background: colorMap[color],
              ...prefersColorSchemeDarkMediaQuery(theme, {
                background: colorMapDark[color],
              }),
            }),
        ...buildResponsiveStyles(orientation, (o: DividerDirection) =>
          o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' }
        ),
      },
    },
  });
};
