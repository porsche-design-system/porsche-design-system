import type { JssStyle } from 'jss';
import { colors } from '../colors';

const { canvasColor } = colors;

export const getFilterJssStyle = (scalingVarName: string): JssStyle => {
  const padding = `calc(11.2px * (var(${scalingVarName}) - 0.64285714) + 4px)`;
  const margin = `calc(${padding} * -1)`;
  const top = margin;

  return {
    position: 'sticky',
    top,
    padding,
    margin,
    background: canvasColor,
    zIndex: 1,
  };
};
