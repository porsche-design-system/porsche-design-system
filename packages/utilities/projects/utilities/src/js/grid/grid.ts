import { gridGutter } from './grid-gutter';
import { gridMaxWidth } from './grid-max-width';
import { gridSafeZone } from './grid-safe-zone';
import { mediaQueryMin } from '../mediaQuery';

const getGridTemplateColumns = (safeZone: string): string => {
  const calc = `calc(${safeZone} - ${gridGutter})`;
  return `[grid-start] ${calc} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc} [grid-end]`;
};

export const grid = {
  display: 'grid',
  gridColumnGap: gridGutter,
  gridTemplateColumns: getGridTemplateColumns(gridSafeZone.base),
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
  [mediaQueryMin('xl')]: {
    gridTemplateColumns: getGridTemplateColumns(gridSafeZone.xl),
  },
};
