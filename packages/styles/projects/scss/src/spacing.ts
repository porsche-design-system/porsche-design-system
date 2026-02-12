import {
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
} from '@porsche-design-system/tokens';

export const getSpacingScss = () => {
  return `
    $spacing-static-xs: ${spacingStaticXs};
    $spacing-static-sm: ${spacingStaticSm};
    $spacing-static-md: ${spacingStaticMd};
    $spacing-static-lg: ${spacingStaticLg};
    $spacing-static-xl: ${spacingStaticXl};
    $spacing-static-2xl: ${spacingStatic2Xl};

    $spacing-fluid-xs: ${spacingFluidXs};
    $spacing-fluid-sm: ${spacingFluidSm};
    $spacing-fluid-md: ${spacingFluidMd};
    $spacing-fluid-lg: ${spacingFluidLg};
    $spacing-fluid-xl: ${spacingFluidXl};
    $spacing-fluid-2xl: ${spacingFluid2Xl};

    $pds-spacing-static-x-small: ${spacingStaticXs}; /* alias (deprecated) */
    $pds-spacing-static-small: ${spacingStaticSm}; /* alias (deprecated) */
    $pds-spacing-static-medium: ${spacingStaticMd}; /* alias (deprecated) */
    $pds-spacing-static-large: ${spacingStaticLg}; /* alias (deprecated) */
    $pds-spacing-static-x-large: ${spacingStaticXl}; /* alias (deprecated) */
    $pds-spacing-static-xx-large: ${spacingStatic2Xl}; /* alias (deprecated) */

    $pds-spacing-fluid-x-small: ${spacingFluidXs}; /* alias (deprecated) */
    $pds-spacing-fluid-small: ${spacingFluidSm}; /* alias (deprecated) */
    $pds-spacing-fluid-medium: ${spacingFluidMd}; /* alias (deprecated) */
    $pds-spacing-fluid-large: ${spacingFluidLg}; /* alias (deprecated) */
    $pds-spacing-fluid-x-large: ${spacingFluidXl}; /* alias (deprecated) */
    $pds-spacing-fluid-xx-large: ${spacingFluid2Xl}; /* alias (deprecated) */
`;
};
