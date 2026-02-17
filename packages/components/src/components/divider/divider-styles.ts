import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  colorContrastHigh,
  colorContrastLow,
  colorContrastLower,
  colorContrastMedium,
} from '../../styles/css-variables';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { DividerColor, DividerDirection } from './divider-utils';

const colorMap: Record<DividerColor, string> = {
  'contrast-lower': colorContrastLower,
  'contrast-low': colorContrastLow,
  'contrast-medium': colorContrastMedium,
  'contrast-high': colorContrastHigh,
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
