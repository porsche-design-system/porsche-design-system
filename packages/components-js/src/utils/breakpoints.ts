export const breakpoints: any = {
  xxs: '(min-width: 0px)',
  xs: '(min-width: 480px)',
  s: '(min-width: 760px)',
  m: '(min-width: 1000px)',
  l: '(min-width: 1300px)',
  xl: '(min-width: 1760px)',
  xxl: '(min-width: 1920px)'
};

export const matchBreakpoint = (breakpoint: string | undefined) => {
  if (breakpoint === undefined || breakpoint === '') {
    return true;
  }
  if ((window as any).matchMedia) {
    const mediaQuery = breakpoints[breakpoint];
    return window.matchMedia(mediaQuery).matches;
  }
  return false;
};
