import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import type { JssDirections } from '../../styles/jss-direction-styles';
import { getJssDirectionStyle } from '../../styles/jss-direction-styles';

export const getComponentCss = (direction: BreakpointCustomizable<JssDirections>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      div: {
        display: 'flex',
        gap: spacingFluidSmall,
        ...buildResponsiveStyles(direction, getJssDirectionStyle),
      },
    },
  });
};
