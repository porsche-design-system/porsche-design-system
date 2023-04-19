import type { DividerColor, DividerDirection, DividerColorDeprecated } from './divider-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import { addImportantToEachRule, getHighContrastColors, getThemedColors, hostHiddenStyles } from '../../styles';

export const getComponentCss = (
  color: Exclude<DividerColor, DividerColorDeprecated>,
  orientation: BreakpointCustomizable<DividerDirection>,
  theme: Theme
): string => {
  const { contrastLowColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const colorMap: Record<Exclude<DividerColor, DividerColorDeprecated>, string> = {
    'contrast-low': contrastLowColor,
    'contrast-medium': contrastMediumColor,
    'contrast-high': contrastHighColor,
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      hr: {
        margin: 0,
        padding: 0,
        border: 'none',
        textAlign: 'left',
        background: isHighContrastMode ? getHighContrastColors().canvasTextColor : colorMap[color],
        ...buildResponsiveStyles(orientation, (o: DividerDirection) =>
          o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' }
        ),
      },
    },
  });
};
