import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  typescale2Xl,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
} from '@porsche-design-system/tokens';

export const getHeadingScss = () => {
  return `
    @mixin prose-heading-2xl {
      font: normal normal ${fontWeightNormal} ${typescale2Xl} / ${leadingNormal} ${fontPorscheNext};
    }
    @mixin prose-heading-xl {
      font: normal normal ${fontWeightNormal} ${typescaleXl} / ${leadingNormal} ${fontPorscheNext};
    }
    @mixin prose-heading-lg {
      font: normal normal ${fontWeightNormal} ${typescaleLg} / ${leadingNormal} ${fontPorscheNext};
    }
    @mixin prose-heading-md {
      font: normal normal ${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext};
    }
    @mixin prose-heading-sm {
      font: normal normal ${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext};
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
