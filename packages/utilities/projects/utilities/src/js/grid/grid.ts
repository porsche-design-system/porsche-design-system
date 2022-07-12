import { mediaQueryMin } from '../mediaQuery';

// variables are exported for internal usage by deep import only, no public api
export const gridMaxWidth = '120rem';
export const gridGutter: { base: string; s: string; m: string } = {
  base: '1rem',
  s: '1.5rem',
  m: '2.25rem',
};
export const gridSafeZone: { base: string; xl: string; xxl: string } = {
  base: '7vw',
  xl: '10vw',
  xxl: '12rem',
};

const getGridTemplateColumns = (safeZone: string, gutter: string): string => {
  const calc = `calc(${safeZone} - ${gutter})`;
  return `[grid-start] ${calc} [content-start] repeat(12, minmax(0, 1fr)) [content-end] ${calc} [grid-end]`;
};

export const grid = {
  display: 'grid',
  gridColumnGap: gridGutter.base,
  gridTemplateColumns: getGridTemplateColumns(gridSafeZone.base, gridGutter.base),
  maxWidth: gridMaxWidth,
  margin: '0 auto',
  padding: 0,
  [mediaQueryMin('s')]: {
    gridColumnGap: gridGutter.s,
    gridTemplateColumns: getGridTemplateColumns(gridSafeZone.base, gridGutter.s),
  },
  [mediaQueryMin('m')]: {
    gridColumnGap: gridGutter.m,
    gridTemplateColumns: getGridTemplateColumns(gridSafeZone.base, gridGutter.m),
  },
  [mediaQueryMin('xl')]: {
    gridTemplateColumns: getGridTemplateColumns(gridSafeZone.xl, gridGutter.m),
  },
  [mediaQueryMin('xxl')]: {
    gridTemplateColumns: getGridTemplateColumns(gridSafeZone.xxl, gridGutter.m),
  },
};
