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
    $radius-xs: ${borderRadiusXs};
    $radius-sm: ${borderRadiusSm};
    $radius-md: ${borderRadiusMd};
    $radius-lg: ${borderRadiusLg};
    $radius-xl: ${borderRadiusXl};
    $radius-2xl: ${borderRadius2Xl};
    $radius-3xl: ${borderRadius3Xl};
    $radius-4xl: ${borderRadius4Xl};
    $radius-full: ${borderRadiusFull};

    $pds-border-radius-small: ${borderRadiusSm}; /* alias (deprecated) */
    $pds-border-radius-medium: ${borderRadiusMd}; /* alias (deprecated) */
    $pds-border-radius-large: ${borderRadiusLg}; /* alias (deprecated) */
    $pds-border-width-base: ${borderWidthRegular}; /* alias (deprecated) */
    $pds-border-width-thin: ${borderWidthThin}; /* alias (deprecated) */
`;
};
