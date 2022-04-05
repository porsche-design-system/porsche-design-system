export type Breakpoint = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export const breakpoint: { [key in Breakpoint]: number } = {
  xxs: 0, // TODO: might be base to be in sync with breakpoint customizable
  xs: 480,
  s: 760,
  m: 1000,
  l: 1300,
  xl: 1760,
  xxl: 1920, // TODO: xxl missing in breakpoint customizable
};
