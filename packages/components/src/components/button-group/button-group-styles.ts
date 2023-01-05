import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../../utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { ButtonGroupDirection } from './button-group-utils';
import { addImportantToEachRule } from '../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';
import type { BreakpointCustomizable } from '../../types';

const { medium: spacingMedium, small: spacingSmall } = spacing.static;

const getDirectionJssStyle: GetJssStyleFunction = (direction: ButtonGroupDirection): JssStyle => {
  const style: Record<ButtonGroupDirection, JssStyle> = {
    column: {
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
      marginRight: 0,
      marginLeft: 0,
    },
    row: {
      flexFlow: 'row wrap',
      alignItems: 'center',
      marginRight: `-${spacingSmall}`,
      marginLeft: `-${spacingSmall}`,
    },
  };
  return style[direction];
};

const getDirectionSlottedJssStyle: GetJssStyleFunction = (direction: ButtonGroupDirection): JssStyle => {
  const style: Record<ButtonGroupDirection, JssStyle> = {
    column: {
      marginRight: 0,
      marginLeft: 0,
    },
    row: {
      marginRight: spacingSmall,
      marginLeft: spacingSmall,
    },
  };
  return style[direction];
};

export const getComponentCss = (direction: BreakpointCustomizable<ButtonGroupDirection>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      div: {
        display: 'flex',
        marginTop: `-${spacingMedium}`,
        ...buildResponsiveStyles(direction, getDirectionJssStyle),
      },
      '::slotted(*)': addImportantToEachRule({
        marginTop: spacingMedium,
        ...buildResponsiveStyles(direction, getDirectionSlottedJssStyle),
      }),
    },
  });
};
