import {
  fontPorscheNext,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  typescale2Xl,
  typescale2Xs,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '@porsche-design-system/tokens';

export const getFontScss = () => {
  return `
    $font-porsche-next: ${fontPorscheNext};

    $leading-normal: ${leadingNormal};

    $typescale-2xs: ${typescale2Xs};
    $typescale-xs: ${typescaleXs};
    $typescale-sm: ${typescaleSm};
    $typescale-md: ${typescaleMd};
    $typescale-lg: ${typescaleLg};
    $typescale-xl: ${typescaleXl};
    $typescale-2xl: ${typescale2Xl};

    $font-weight-normal: ${fontWeightNormal};
    $font-weight-semibold: ${fontWeightSemibold};
    $font-weight-bold: ${fontWeightBold};

    $pds-font-family: ${fontPorscheNext}; /* alias (deprecated) */
    $pds-font-hyphenation-style-overflow-wrap: break-word; /* alias (deprecated) */
    $pds-font-hyphenation-style-hyphens: var(--p-hyphens, auto); /* alias (deprecated) */
    $pds-font-line-height: ${leadingNormal}; /* alias (deprecated) */
    $pds-font-size-text-xx-small: ${typescale2Xs}; /* alias (deprecated) */
    $pds-font-size-text-x-small: ${typescaleXs}; /* alias (deprecated) */
    $pds-font-size-text-small: ${typescaleSm}; /* alias (deprecated) */
    $pds-font-size-text-medium: ${typescaleMd}; /* alias (deprecated) */
    $pds-font-size-text-large: ${typescaleLg}; /* alias (deprecated) */
    $pds-font-size-text-x-large: ${typescaleXl}; /* alias (deprecated) */
    $pds-font-size-heading-small: ${typescaleSm}; /* alias (deprecated) */
    $pds-font-size-heading-medium: ${typescaleMd}; /* alias (deprecated) */
    $pds-font-size-heading-large: ${typescaleLg}; /* alias (deprecated) */
    $pds-font-size-heading-x-large: ${typescaleXl}; /* alias (deprecated) */
    $pds-font-size-heading-xx-large: ${typescale2Xl}; /* alias (deprecated) */
    $pds-font-size-display-small: clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem); /* alias (deprecated) */
    $pds-font-size-display-medium: clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem); /* alias (deprecated) */
    $pds-font-size-display-large: clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem); /* alias (deprecated) */
    $pds-font-style-normal: normal; /* alias (deprecated) */
    $pds-font-style-italic: italic; /* alias (deprecated) */
    $pds-font-variant: normal; /* alias (deprecated) */
    $pds-font-weight-regular: ${fontWeightNormal}; /* alias (deprecated) */
    $pds-font-weight-semi-bold: ${fontWeightSemibold}; /* alias (deprecated) */
    $pds-font-weight-bold: ${fontWeightBold}; /* alias (deprecated) */
`;
};
