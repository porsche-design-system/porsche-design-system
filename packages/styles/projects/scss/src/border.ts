import {
  borderRadiusLg,
  borderRadiusMd,
  borderRadiusSm,
  borderWidthRegular,
  borderWidthThin,
} from '@porsche-design-system/tokens';

export const getBorderScss = () => {
  return `
    $pds-border-radius-small: ${borderRadiusSm};
    $pds-border-radius-medium: ${borderRadiusMd};
    $pds-border-radius-large: ${borderRadiusLg};
    $pds-border-width-base: ${borderWidthRegular};
    $pds-border-width-thin: ${borderWidthThin};
`;
};
