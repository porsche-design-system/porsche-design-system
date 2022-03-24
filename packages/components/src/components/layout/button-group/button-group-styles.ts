import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../../../utils';
import type { ButtonGroupDirectionType, ButtonGroupDirection } from './button-group-utils';
import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';

const getDirectionJssStyle: GetJssStyleFunction = (direction: ButtonGroupDirectionType): JssStyle => {
  const style: { [key in ButtonGroupDirectionType]: JssStyle } = {
    column: {
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
      marginRight: 0,
      marginLeft: 0,
    },
    row: {
      flexFlow: 'row wrap',
      alignItems: 'center',
      marginRight: `-${spacing[8]}`,
      marginLeft: `-${spacing[8]}`,
    },
  };
  return style[direction];
};

const getDirectionSlottedJssStyle: GetJssStyleFunction = (direction: ButtonGroupDirectionType): JssStyle => {
  const style: { [key in ButtonGroupDirectionType]: JssStyle } = {
    column: {
      marginRight: 0,
      marginLeft: 0,
    },
    row: {
      marginRight: spacing[8],
      marginLeft: spacing[8],
    },
  };
  return style[direction];
};

export const getComponentCss = (direction: ButtonGroupDirection): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      div: {
        display: 'flex',
        marginTop: `-${spacing[16]}`,
        ...buildResponsiveStyles(direction, getDirectionJssStyle),
      },
      '::slotted(*)': addImportantToEachRule({
        marginTop: spacing[16],
        ...buildResponsiveStyles(direction, getDirectionSlottedJssStyle),
      }),
    },
  });
};
