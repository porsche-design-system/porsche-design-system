import { ref } from '@porsche-design-system/stylesheets';
import type { JssStyle } from '../../utils/css-serializer';

export const getOptionsJssStyle = (scalingVarName: string): JssStyle => {
  const gap = `calc(11.2px * (${ref(scalingVarName)} - 0.64285714) + 4px)`;

  return {
    display: 'flex',
    flexDirection: 'column',
    gap,
  };
};
