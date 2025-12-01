import type { JssStyle } from 'jss';
import { colors } from '../colors';

const { canvasColor } = colors;

export const getFilterJssStyle = (scalingVar: string): JssStyle => {
  return {
    position: 'sticky',
    top: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
    padding: `max(2px, ${scalingVar} * 6px)`,
    margin: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
    background: canvasColor,
    zIndex: 1,
  };
};
