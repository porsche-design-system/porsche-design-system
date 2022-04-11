export type Breakpoint = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpoint: { [key in Breakpoint]: string } = {
  xxs: '0px', // TODO: might be base to be in sync with breakpoint customizable
  xs: '480px',
  s: '760px',
  m: '1000px',
  l: '1300px',
  xl: '1760px',
  xxl: '1920px', // TODO: xxl missing in breakpoint customizable
};
