import { addImportantToEachRule, colors, hostHiddenStyles } from '../../styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { DividerColor, DividerDirection } from './divider-utils';

const { contrastLowerColor, contrastLowColor, contrastMediumColor, contrastHighColor } = colors;
const colorMap: Record<DividerColor, string> = {
  'contrast-lower': contrastLowerColor,
  'contrast-low': contrastLowColor,
  'contrast-medium': contrastMediumColor,
  'contrast-high': contrastHighColor,
};

export const getComponentCss = (color: DividerColor, orientation: BreakpointCustomizable<DividerDirection>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      hr: {
        all: 'unset',
        display: 'block',
        background: colorMap[color],
        ...buildResponsiveStyles(orientation, (o: DividerDirection) =>
          o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' }
        ),
      },
    },
  });
};
