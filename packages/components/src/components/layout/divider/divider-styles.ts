import { buildGlobalStyles, buildHostStyles, buildResponsiveStyles, getCss, getThemedColors } from '../../../utils';
import type { DividerColor, DividerOrientation } from './divider-utils';
import type { Theme } from '../../../types';

export const getComponentCss = (color: DividerColor, orientation: DividerOrientation, theme: Theme): string => {
  const { contrastLowColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const colorMap: { [key in DividerColor]: string } = {
    'neutral-contrast-low': contrastLowColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-high': contrastHighColor,
  };

  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    ...buildGlobalStyles({
      hr: {
        margin: 0,
        padding: 0,
        border: 'none',
        textAlign: 'left',
        background: colorMap[color],
        ...buildResponsiveStyles(orientation, (o: DividerOrientation) =>
          o === 'horizontal' ? { height: 1, width: '100%' } : { height: '100%', width: 1 }
        ),
      },
    }),
  });
};
