import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import { spacingFluidSmall } from '@porsche-design-system/styles';
import type { BreakpointCustomizable } from '../../types';
import { type GroupDirection, getGroupDirectionJssStyles } from '../../styles/group-direction-styles';

export const getComponentCss = (direction: BreakpointCustomizable<GroupDirection>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      div: {
        display: 'flex',
        gap: spacingFluidSmall,
        ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
      },
    },
  });
};
