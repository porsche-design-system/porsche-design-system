import { gridGap } from './grid-gap';
import { gridMaxWidth, gridMinWidth } from './grid-width';
import { gridSafeZone } from './grid-safe-zone';
import { mediaQueryMin } from '../mediaQuery';

const getGridTemplateColumns = (safeZone: string): string => {
  const calc = `calc(${safeZone} - ${gridGap})`;
  return `[grid-start] ${calc} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc} [grid-end]`;
};

export const grid = {
  display: 'grid',
  gridGap: gridGap,
  gridTemplateColumns: getGridTemplateColumns(gridSafeZone.base),
  minWidth: gridMinWidth,
  maxWidth: gridMaxWidth,
  margin: 0,
  padding: `0 calc((100% - ${gridMaxWidth}) / 2)`,
  boxSizing: 'content-box',
  [mediaQueryMin('xl')]: {
    gridTemplateColumns: getGridTemplateColumns(gridSafeZone.xl),
  },
};
