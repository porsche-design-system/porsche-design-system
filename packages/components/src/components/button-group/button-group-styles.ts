import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import type { GroupDirection } from '../../styles/group-direction-styles';
import { getGroupDirectionStyles } from '../../styles/group-direction-styles';

export const getComponentCss = (direction: BreakpointCustomizable<GroupDirection>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      div: {
        display: 'flex',
        gap: spacingFluidSmall,
        ...buildResponsiveStyles(direction, getGroupDirectionStyles),
      },
    },
  });
};
