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
    @mixin prose-text-xl {
      font: normal normal ${fontWeightNormal} ${fontSizeXl} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }
    @mixin prose-text-lg {
      font: normal normal ${fontWeightNormal} ${fontSizeLg} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }
    @mixin prose-text-md {
      font: normal normal ${fontWeightNormal} ${fontSizeMd} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }
    @mixin prose-text-sm {
      font: normal normal ${fontWeightNormal} ${fontSizeSm} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }
    @mixin prose-text-xs {
      font: normal normal ${fontWeightNormal} ${fontSizeXs} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }
    @mixin prose-text-2xs {
      font: normal normal ${fontWeightNormal} ${fontSize2Xs} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
      hyphens: var(--p-hyphens, auto);
      overflow-wrap: break-word;
    }

    /* alias (deprecated) */
    @mixin pds-text-x-large {
      @include prose-text-xl();
    }
    /* alias (deprecated) */
    @mixin pds-text-large {
      @include prose-text-lg();
    }
    /* alias (deprecated) */
    @mixin pds-text-medium {
      @include prose-text-md();
    }
    /* alias (deprecated) */
    @mixin pds-text-small {
      @include prose-text-sm();
    }
    /* alias (deprecated) */
    @mixin pds-text-x-small {
      @include prose-text-xs();
    }
    /* alias (deprecated) */
    @mixin pds-text-xx-small {
      @include prose-text-2xs();
    }
  `;
};
