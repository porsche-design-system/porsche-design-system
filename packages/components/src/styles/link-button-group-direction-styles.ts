import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../utils';

export const LINK_BUTTON_GROUP_DIRECTIONS = ['row', 'column'] as const;
export type LinkButtonGroupDirection = (typeof LINK_BUTTON_GROUP_DIRECTIONS)[number];

export const getLinkButtonGroupDirectionStyles: GetJssStyleFunction = (
  direction: LinkButtonGroupDirection
): JssStyle => {
  const style: Record<LinkButtonGroupDirection, JssStyle> = {
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
