import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHighContrastColors,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import type { DividerColor, DividerDirection } from './divider-utils';

export const getComponentCss = (
  color: DividerColor,
  orientation: BreakpointCustomizable<DividerDirection>,
  theme: Theme
): string => {
  const { contrast20Color, contrast50Color, contrast80Color } = getThemedColors(theme);
  const {
    contrast20Color: contrast20ColorDark,
    contrast50Color: contrast50ColorDark,
    contrast80Color: contrast80ColorDark,
  } = getThemedColors('dark');
  const colorMap: Record<DividerColor, string> = {
    'contrast-low': contrast20Color,
    'contrast-medium': contrast50Color,
    'contrast-high': contrast80Color,
  };
  const colorMapDark: Record<DividerColor, string> = {
    'contrast-low': contrast20ColorDark,
    'contrast-medium': contrast50ColorDark,
    'contrast-high': contrast80ColorDark,
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
