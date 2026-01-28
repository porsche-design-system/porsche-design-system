import {
  borderRadius2Xl,
  borderRadius3Xl,
  borderRadius4Xl,
  borderRadiusFull,
  borderRadiusLg,
  borderRadiusMd,
  borderRadiusSm,
  borderRadiusXl,
  borderRadiusXs,
  borderWidthRegular,
  borderWidthThin,
} from '@porsche-design-system/tokens';

export const getBorderScss = () => {
  return `
    $border-radius-xs: ${borderRadiusXs};
    $border-radius-sm: ${borderRadiusSm};
    $border-radius-md: ${borderRadiusMd};
    $border-radius-lg: ${borderRadiusLg};
    $border-radius-xl: ${borderRadiusXl};
    $border-radius-2xl: ${borderRadius2Xl};
    $border-radius-3xl: ${borderRadius3Xl};
    $border-radius-4xl: ${borderRadius4Xl};
    $border-radius-full: ${borderRadiusFull};

    $border-width-1: ${borderWidthThin};
    $border-width-2: ${borderWidthRegular};

    $pds-border-radius-small: ${borderRadiusSm}; /* alias (deprecated) */
    $pds-border-radius-medium: ${borderRadiusMd}; /* alias (deprecated) */
    $pds-border-radius-large: ${borderRadiusLg}; /* alias (deprecated) */
    $pds-border-width-base: ${borderWidthRegular}; /* alias (deprecated) */
    $pds-border-width-thin: ${borderWidthThin}; /* alias (deprecated) */
`;
};
