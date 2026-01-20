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
    $pds-font-family: ${fontFamilyPorscheNext};
    $pds-font-hyphenation-style-overflow-wrap: break-word;
    $pds-font-hyphenation-style-hyphens: var(--p-hyphens, auto);
    $pds-font-line-height: ${fontLineHeightNormal};
    $pds-font-size-text-xx-small: ${fontSize2Xs};
    $pds-font-size-text-x-small: ${fontSizeXs};
    $pds-font-size-text-small: ${fontSizeSm};
    $pds-font-size-text-medium: ${fontSizeMd};
    $pds-font-size-text-large: ${fontSizeLg};
    $pds-font-size-text-x-large: ${fontSizeXl};
    $pds-font-size-heading-small: ${fontSizeSm};
    $pds-font-size-heading-medium: ${fontSizeMd};
    $pds-font-size-heading-large: ${fontSizeLg};
    $pds-font-size-heading-x-large: ${fontSizeXl};
    $pds-font-size-heading-xx-large: ${fontSize2Xl};
    $pds-font-size-display-small: clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem);
    $pds-font-size-display-medium: clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem);
    $pds-font-size-display-large: clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem);
    $pds-font-style-normal: normal;
    $pds-font-style-italic: italic;
    $pds-font-variant: normal;
    $pds-font-weight-regular: ${fontWeightNormal};
    $pds-font-weight-semi-bold: ${fontWeightSemiBold};
    $pds-font-weight-bold: ${fontWeightBold};
`;
};
