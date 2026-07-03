import { colorCanvas, ref } from '@porsche-design-system/stylesheets';
import type { JssStyle } from '../../utils/jss';

export const getFilterJssStyle = (scalingVarName: string): JssStyle => {
  const padding = `calc(11.2px * (${ref(scalingVarName)} - 0.64285714) + 4px)`;
  const margin = `calc(${padding} * -1)`;
  const top = margin;

  return {
    position: 'sticky',
    top,
    padding,
    margin,
    background: ref(colorCanvas),
    zIndex: 1,
  };
};
