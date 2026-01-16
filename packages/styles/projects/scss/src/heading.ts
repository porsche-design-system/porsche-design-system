import {
  fontFamilyPorscheNext,
  fontLineHeightNormal,
  fontSize2Xl,
  fontSizeLg,
  fontSizeMd,
  fontSizeSm,
  fontSizeXl,
  fontWeightNormal,
} from '@porsche-design-system/tokens';

export const getHeadingScss = () => {
  return `
    @mixin pds-heading-large {
      font: normal normal ${fontWeightNormal} ${fontSizeLg}/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }

    @mixin pds-heading-medium {
      font: normal normal ${fontWeightNormal} ${fontSizeMd}/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }

    @mixin pds-heading-small {
      font: normal normal ${fontWeightNormal} ${fontSizeSm}/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }

    @mixin pds-heading-x-large {
      font: normal normal ${fontWeightNormal} ${fontSizeXl}/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }

    @mixin pds-heading-xx-large {
      font: normal normal ${fontWeightNormal} ${fontSize2Xl}/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }
`;
};
