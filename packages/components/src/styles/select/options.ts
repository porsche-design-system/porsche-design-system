import { ref } from '@porsche-design-system/stylesheets';
import type { CssStyle } from '../../utils/css-serializer';

export const getOptionsCssStyle = (scalingVarName: string): CssStyle => {
  const gap = `calc(11.2px * (${ref(scalingVarName)} - 0.64285714) + 4px)`;

  return {
    display: 'flex',
    flexDirection: 'column',
    gap,
  };
};
