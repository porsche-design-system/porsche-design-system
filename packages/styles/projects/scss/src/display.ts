import { fontFamilyPorscheNext, fontLineHeightNormal, fontWeightNormal } from '@porsche-design-system/tokens';

export const getDisplayScss = () => {
  return `
    @mixin pds-display-large {
      font: normal normal ${fontWeightNormal} clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }

    @mixin pds-display-medium {
      font: normal normal ${fontWeightNormal} clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }

    @mixin pds-display-small {
      font: normal normal ${fontWeightNormal} clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)/${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }
  `;
};
