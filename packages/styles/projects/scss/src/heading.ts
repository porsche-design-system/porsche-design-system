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
    @mixin prose-heading-2xl {
      font: normal normal ${fontWeightNormal} ${fontSize2Xl} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }
    @mixin prose-heading-xl {
      font: normal normal ${fontWeightNormal} ${fontSizeXl} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }
    @mixin prose-heading-lg {
      font: normal normal ${fontWeightNormal} ${fontSizeLg} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }
    @mixin prose-heading-md {
      font: normal normal ${fontWeightNormal} ${fontSizeMd} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }
    @mixin prose-heading-sm {
      font: normal normal ${fontWeightNormal} ${fontSizeSm} / ${fontLineHeightNormal} ${fontFamilyPorscheNext};
    }

    /* alias (deprecated) */
    @mixin pds-heading-xx-large {
      @include prose-heading-2xl();
    }
    /* alias (deprecated) */
    @mixin pds-heading-x-large {
      @include prose-heading-xl();
    }
    /* alias (deprecated) */
    @mixin pds-heading-large {
      @include prose-heading-lg();
    }
    /* alias (deprecated) */
    @mixin pds-heading-medium {
      @include prose-heading-md();
    }
    /* alias (deprecated) */
    @mixin pds-heading-small {
      @include prose-heading-sm();
    }
`;
};
