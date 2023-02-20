import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../../utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { ButtonGroupDirection } from './button-group-utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';

const getDirectionJssStyle: GetJssStyleFunction = (direction: ButtonGroupDirection): JssStyle => {
  const style: Record<ButtonGroupDirection, JssStyle> = {
    column: {
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
    row: {
      flexFlow: 'row wrap',
      alignItems: 'stretch',
    },
  };
  return style[direction];
};

export const getComponentCss = (direction: BreakpointCustomizable<ButtonGroupDirection>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      div: {
        display: 'flex',
        marginTop: spacingFluidSmall,
        gap: spacingFluidSmall,
        ...buildResponsiveStyles(direction, getDirectionJssStyle),
      },
    },
  });
};
