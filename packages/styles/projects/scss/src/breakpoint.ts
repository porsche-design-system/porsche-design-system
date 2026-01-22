import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';

export const getBreakpointScss = () => {
  return `
    $pds-breakpoint-base: 0;
    $pds-breakpoint-xs: ${breakpointXs};
    $pds-breakpoint-s: ${breakpointSm};
    $pds-breakpoint-m: ${breakpointMd};
    $pds-breakpoint-l: ${breakpointLg};
    $pds-breakpoint-xl: ${breakpointXl};
    $pds-breakpoint-xxl: ${breakpoint2Xl};
`;
};
