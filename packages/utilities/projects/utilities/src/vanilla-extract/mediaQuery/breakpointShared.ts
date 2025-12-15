export const breakpoints = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;
export type Breakpoint = (typeof breakpoints)[number];
