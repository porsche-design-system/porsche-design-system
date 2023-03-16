import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';
import type { LinkButtonGroupDirection } from '../../styles/link-button-group-direction-styles';
import { getLinkButtonGroupDirectionStyles } from '../../styles/link-button-group-direction-styles';

export const getComponentCss = (direction: BreakpointCustomizable<LinkButtonGroupDirection>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      div: {
        display: 'flex',
        gap: spacingFluidSmall,
        ...buildResponsiveStyles(direction, getLinkButtonGroupDirectionStyles),
      },
    },
  });
};
