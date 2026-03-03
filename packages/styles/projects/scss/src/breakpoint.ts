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
    $breakpoint-xs: ${breakpointXs};
    $breakpoint-sm: ${breakpointSm};
    $breakpoint-md: ${breakpointMd};
    $breakpoint-lg: ${breakpointLg};
    $breakpoint-xl: ${breakpointXl};
    $breakpoint-2xl: ${breakpoint2Xl};

    $pds-breakpoint-base: 0; /* alias (deprecated) */
    $pds-breakpoint-xs: ${breakpointXs}; /* alias (deprecated) */
    $pds-breakpoint-s: ${breakpointSm}; /* alias (deprecated) */
    $pds-breakpoint-m: ${breakpointMd}; /* alias (deprecated) */
    $pds-breakpoint-l: ${breakpointLg}; /* alias (deprecated) */
    $pds-breakpoint-xl: ${breakpointXl}; /* alias (deprecated) */
    $pds-breakpoint-xxl: ${breakpoint2Xl}; /* alias (deprecated) */
`;
};
