import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import type { ButtonLinkGroupDirection } from '../../styles/direction-jss-style';
import { getDirectionJssStyle } from '../../styles/direction-jss-style';

export const getComponentCss = (direction: BreakpointCustomizable<ButtonLinkGroupDirection>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      div: {
        display: 'flex',
        gap: spacingFluidSmall,
        ...buildResponsiveStyles(direction, getDirectionJssStyle),
      },
    },
  });
};
