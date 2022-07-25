import { gridGutter } from './grid-gutter';
import { gridMaxWidth } from './grid-max-width';
import { gridSafeZone } from './grid-safe-zone';
import { mediaQueryMin } from '../mediaQuery';

const calc = `calc(${gridSafeZone} - ${gridGutter})`;

export const grid = {
  display: 'grid',
  gridColumnGap: gridGutter,
  gridTemplateColumns: `[grid-start] ${calc} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc} [grid-end]`,
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
};

const calc1 = `calc(max(1rem, min(7vw, 8.4rem)) - ${gridGutter})`;

export const grid7vwLinear = {
  display: 'grid',
  gridColumnGap: gridGutter,
  gridTemplateColumns: `[grid-start] ${calc1} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc1} [grid-end]`,
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
};

const calc2 = `calc(max(1.4rem, min(calc(12vw - 2.4rem), 12rem)) - ${gridGutter})`;

export const gridImprovedLinear = {
  display: 'grid',
  gridColumnGap: gridGutter,
  gridTemplateColumns: `[grid-start] ${calc2} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc2} [grid-end]`,
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
};

const calc3 = `calc(max(1rem, min(7vw, 7.7rem)) - ${gridGutter})`;
const calc3Xl = `calc(max(7.7rem, min(calc(43vw - 39.6rem), 12rem)) - ${gridGutter})`;

export const gridFluidInterpolation = {
  display: 'grid',
  gridColumnGap: gridGutter,
  gridTemplateColumns: `[grid-start] ${calc3} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc3} [grid-end]`,
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
  [mediaQueryMin('xl')]: {
    gridTemplateColumns: `[grid-start] ${calc3Xl} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc3Xl} [grid-end]`,
  },
};
