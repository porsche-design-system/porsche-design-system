import type { CssStyle } from '../utils/css-serializer';
import type { GetCssStyleFunction } from '../utils';

export const GROUP_DIRECTIONS = ['row', 'column'] as const;
export type GroupDirection = (typeof GROUP_DIRECTIONS)[number];

const groupDirectionCssStyles: Record<GroupDirection, CssStyle> = {
  column: {
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  row: {
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
};

export const getGroupDirectionCssStyles: GetCssStyleFunction = (direction: GroupDirection): CssStyle => {
  return groupDirectionCssStyles[direction];
};
