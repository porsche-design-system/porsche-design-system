import type { JssStyle } from 'jss';
import type { GetStyleFunction } from '../../../utils';
import type { ButtonGroupDirectionType, ButtonGroupDirection } from './button-group-utils';
import { buildResponsiveStyle, getCss } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';

const getDirectionStyle: GetStyleFunction = (direction: ButtonGroupDirectionType): JssStyle => {
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

const getDirectionSlottedStyle: GetStyleFunction = (direction: ButtonGroupDirectionType): JssStyle => {
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
        ...buildResponsiveStyle(direction, getDirectionStyle),
      },
      '::slotted(*)': addImportantToEachRule({
        marginTop: spacing[16],
        ...buildResponsiveStyle(direction, getDirectionSlottedStyle),
      }),
    },
  });
};
