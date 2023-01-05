export type Breakpoint = 'base' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpoint: { [key in Breakpoint]: string } = {
  base: '0px',
  xs: '480px',
  s: '760px',
  m: '1000px',
  l: '1300px',
  xl: '1760px',
  xxl: '1920px',
};
