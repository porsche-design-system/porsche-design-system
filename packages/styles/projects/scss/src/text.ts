import {
  fontFamilyPorscheNext,
  fontLineHeightNormal,
  fontSize2Xs,
  fontSizeLg,
  fontSizeMd,
  fontSizeSm,
  fontSizeXl,
  fontSizeXs,
  fontWeightNormal,
} from '@porsche-design-system/tokens';

export const getTextScss = () => {
  return `
    @mixin pds-text-large {
      font: normal normal ${fontWeightNormal} ${fontSizeLg} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }

    @mixin pds-text-medium {
      font: normal normal ${fontWeightNormal} ${fontSizeMd} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }

    @mixin pds-text-small {
      font: normal normal ${fontWeightNormal} ${fontSizeSm} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }

    @mixin pds-text-x-large {
      font: normal normal ${fontWeightNormal} ${fontSizeXl} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }

    @mixin pds-text-x-small {
      font: normal normal ${fontWeightNormal} ${fontSizeXs} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }

    @mixin pds-text-xx-small {
      font: normal normal ${fontWeightNormal} ${fontSize2Xs} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }
  `;
};
