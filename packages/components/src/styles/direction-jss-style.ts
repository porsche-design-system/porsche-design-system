// TODO: unit test this
import { GetJssStyleFunction } from './jss';
import { JssStyle } from 'jss';

export const BUTTON_LINK_GROUP_DIRECTIONS = ['row', 'column'] as const;
export type ButtonLinkGroupDirection = typeof BUTTON_LINK_GROUP_DIRECTIONS[number];
export const getDirectionJssStyle: GetJssStyleFunction = (direction: ButtonLinkGroupDirection): JssStyle => {
  const style: Record<ButtonLinkGroupDirection, JssStyle> = {
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
