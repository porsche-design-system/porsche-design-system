import { gridGutter } from './grid-gutter';
import { gridMaxWidth } from './grid-max-width';
import { gridSafeZone } from './grid-safe-zone';

const calc = `calc(${gridSafeZone} - ${gridGutter})`;
export const grid = {
  display: 'grid',
  gridColumnGap: gridGutter,
  gridTemplateColumns: `[grid-start] ${calc} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc} [grid-end]`,
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
};
