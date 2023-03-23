import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../utils';

export const GROUP_DIRECTIONS = ['row', 'column'] as const;
export type GroupDirection = (typeof GROUP_DIRECTIONS)[number];

const groupDirectionJssStyles: Record<GroupDirection, JssStyle> = {
  column: {
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  row: {
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
};

export const getGroupDirectionJssStyles: GetJssStyleFunction = (direction: GroupDirection): JssStyle => {
  return groupDirectionJssStyles[direction];
};
