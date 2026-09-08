import {
  colorContrastHigh,
  colorContrastLow,
  colorContrastLower,
  colorContrastMedium,
  ref,
} from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, forcedColorsMediaQuery, hostHiddenStyles } from '../../styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { DividerColor, DividerDirection } from './divider-utils';

const colorMap: Record<DividerColor, string> = {
  'contrast-lower': ref(colorContrastLower),
  'contrast-low': ref(colorContrastLow),
  'contrast-medium': ref(colorContrastMedium),
  'contrast-high': ref(colorContrastHigh),
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
        ...forcedColorsMediaQuery({
          background: 'CanvasText',
        }),
        ...buildResponsiveStyles(orientation, (o: DividerDirection) =>
          o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' }
        ),
      },
    },
  });
};
