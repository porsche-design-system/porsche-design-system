import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import type { FlexDirections } from '../../styles/flex-direction-styles';
import { getFlexDirectionStyle } from '../../styles/flex-direction-styles';

export const getComponentCss = (direction: BreakpointCustomizable<FlexDirections>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      div: {
        display: 'flex',
        gap: spacingFluidSmall,
        ...buildResponsiveStyles(direction, getFlexDirectionStyle),
      },
    },
  });
};
