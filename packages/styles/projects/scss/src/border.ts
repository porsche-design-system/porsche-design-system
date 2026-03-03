import {
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
} from '@porsche-design-system/tokens';

export const getBorderScss = () => {
  return `
    $radius-xs: ${radiusXs};
    $radius-sm: ${radiusSm};
    $radius-md: ${radiusMd};
    $radius-lg: ${radiusLg};
    $radius-xl: ${radiusXl};
    $radius-2xl: ${radius2Xl};
    $radius-3xl: ${radius3Xl};
    $radius-4xl: ${radius4Xl};
    $radius-full: ${radiusFull};

    $pds-border-radius-small: ${radiusSm}; /* alias (deprecated) */
    $pds-border-radius-medium: ${radiusMd}; /* alias (deprecated) */
    $pds-border-radius-large: ${radiusLg}; /* alias (deprecated) */
    $pds-border-width-base: 2px; /* alias (deprecated) */
    $pds-border-width-thin: 1px; /* alias (deprecated) */
`;
};
