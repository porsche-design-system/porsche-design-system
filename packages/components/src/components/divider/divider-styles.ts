import type { DividerColor, DividerOrientation } from './divider-utils';
import type { Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { getThemedColors } from '../../styles';

export const getComponentCss = (color: DividerColor, orientation: DividerOrientation, theme: Theme): string => {
  const { contrastLowColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const colorMap: { [key in DividerColor]: string } = {
    'neutral-contrast-low': contrastLowColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-high': contrastHighColor,
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      hr: {
        margin: 0,
        padding: 0,
        border: 'none',
        textAlign: 'left',
        background: colorMap[color],
        ...buildResponsiveStyles(orientation, (o: DividerOrientation) =>
          o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' }
        ),
      },
    },
  });
};
