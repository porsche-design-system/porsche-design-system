// TODO: unit test this
import { JssStyle } from 'jss';
import { GetJssStyleFunction } from '../utils';

// TODO: think about naming?
export const JSS_DIRECTIONS = ['row', 'column'] as const;
export type JssDirections = typeof JSS_DIRECTIONS[number];
export const getJssDirectionStyle: GetJssStyleFunction = (direction: JssDirections): JssStyle => {
  const style: Record<JssDirections, JssStyle> = {
    column: {
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
    },
    row: {
      flexFlow: 'row wrap',
      alignItems: 'center',
    },
  };
  return style[direction];
};
