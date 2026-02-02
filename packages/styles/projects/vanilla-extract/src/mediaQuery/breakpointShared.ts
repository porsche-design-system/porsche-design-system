/** @deprecated since v4.0.0, will be removed with next major release. Use 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' instead. */
const breakpointsLegacy = ['base', 's', 'm', 'l', 'xxl'] as const;

export const breakpoints = [...breakpointsLegacy, 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export type Breakpoint = (typeof breakpoints)[number];
