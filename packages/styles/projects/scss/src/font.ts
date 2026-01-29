import {
  fontFamilyPorscheNext,
  fontLineHeightNormal,
  fontSize2Xl,
  fontSize2Xs,
  fontSizeLg,
  fontSizeMd,
  fontSizeSm,
  fontSizeXl,
  fontSizeXs,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemiBold,
} from '@porsche-design-system/tokens';

export const getFontScss = () => {
  return `
    $font-porsche-next: ${fontFamilyPorscheNext};

    $leading-normal: ${fontLineHeightNormal};

    $typescale-2xs: ${fontSize2Xs};
    $typescale-xs: ${fontSizeXs};
    $typescale-sm: ${fontSizeSm};
    $typescale-md: ${fontSizeMd};
    $typescale-lg: ${fontSizeLg};
    $typescale-xl: ${fontSizeXl};
    $typescale-2xl: ${fontSize2Xl};

    $font-weight-normal: ${fontWeightNormal};
    $font-weight-semibold: ${fontWeightSemiBold};
    $font-weight-bold: ${fontWeightBold};

    $pds-font-family: ${fontFamilyPorscheNext}; /* alias (deprecated) */
    $pds-font-hyphenation-style-overflow-wrap: break-word; /* alias (deprecated) */
    $pds-font-hyphenation-style-hyphens: var(--p-hyphens, auto); /* alias (deprecated) */
    $pds-font-line-height: ${fontLineHeightNormal}; /* alias (deprecated) */
    $pds-font-size-text-xx-small: ${fontSize2Xs}; /* alias (deprecated) */
    $pds-font-size-text-x-small: ${fontSizeXs}; /* alias (deprecated) */
    $pds-font-size-text-small: ${fontSizeSm}; /* alias (deprecated) */
    $pds-font-size-text-medium: ${fontSizeMd}; /* alias (deprecated) */
    $pds-font-size-text-large: ${fontSizeLg}; /* alias (deprecated) */
    $pds-font-size-text-x-large: ${fontSizeXl}; /* alias (deprecated) */
    $pds-font-size-heading-small: ${fontSizeSm}; /* alias (deprecated) */
    $pds-font-size-heading-medium: ${fontSizeMd}; /* alias (deprecated) */
    $pds-font-size-heading-large: ${fontSizeLg}; /* alias (deprecated) */
    $pds-font-size-heading-x-large: ${fontSizeXl}; /* alias (deprecated) */
    $pds-font-size-heading-xx-large: ${fontSize2Xl}; /* alias (deprecated) */
    $pds-font-size-display-small: clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem); /* alias (deprecated) */
    $pds-font-size-display-medium: clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem); /* alias (deprecated) */
    $pds-font-size-display-large: clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem); /* alias (deprecated) */
    $pds-font-style-normal: normal; /* alias (deprecated) */
    $pds-font-style-italic: italic; /* alias (deprecated) */
    $pds-font-variant: normal; /* alias (deprecated) */
    $pds-font-weight-regular: ${fontWeightNormal}; /* alias (deprecated) */
    $pds-font-weight-semi-bold: ${fontWeightSemiBold}; /* alias (deprecated) */
    $pds-font-weight-bold: ${fontWeightBold}; /* alias (deprecated) */
`;
};
