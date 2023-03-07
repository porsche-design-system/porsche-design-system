// TODO: unit test this
import { JssStyle } from 'jss';
import { GetJssStyleFunction } from '../utils';

export const FLEX_DIRECTIONS = ['row', 'column'] as const;
export type FlexDirections = typeof FLEX_DIRECTIONS[number];
export const getFlexDirectionStyle: GetJssStyleFunction = (direction: FlexDirections): JssStyle => {
  const style: Record<FlexDirections, JssStyle> = {
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
