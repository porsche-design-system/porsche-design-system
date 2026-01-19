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
    $pds-spacing-static-x-small: ${spacingStaticXs};
    $pds-spacing-static-small: ${spacingStaticSm};
    $pds-spacing-static-medium: ${spacingStaticMd};
    $pds-spacing-static-large: ${spacingStaticLg};
    $pds-spacing-static-x-large: ${spacingStaticXl};
    $pds-spacing-static-xx-large: ${spacingStatic2Xl};
    $pds-spacing-fluid-x-small: ${spacingFluidXs};
    $pds-spacing-fluid-small: ${spacingFluidSm};
    $pds-spacing-fluid-medium: ${spacingFluidMd};
    $pds-spacing-fluid-large: ${spacingFluidLg};
    $pds-spacing-fluid-x-large: ${spacingFluidXl};
    $pds-spacing-fluid-xx-large: ${spacingFluid2Xl};
`;
};
