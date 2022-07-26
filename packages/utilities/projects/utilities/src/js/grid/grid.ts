import { gridGap } from './grid-gap';
import { gridMaxWidth } from './grid-max-width';
import { gridSafeZone } from './grid-safe-zone';
import { mediaQueryMin } from '../mediaQuery';

const getGridTemplateColumns = (safeZone: string): string => {
  const calc = `calc(${safeZone} - ${gridGap})`;
  return `[grid-start] ${calc} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc} [grid-end]`;
};

export const grid = {
  display: 'grid',
  gridColumnGap: gridGap,
  gridRowGap: `calc(${gridGap} * 3)`,
  gridTemplateColumns: getGridTemplateColumns(gridSafeZone.base),
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
  [mediaQueryMin('xl')]: {
    gridTemplateColumns: getGridTemplateColumns(gridSafeZone.xl),
  },
};
