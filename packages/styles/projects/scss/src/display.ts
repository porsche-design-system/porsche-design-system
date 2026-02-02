import { fontPorscheNext, fontWeightNormal, leadingNormal } from '@porsche-design-system/tokens';

export const getDisplayScss = () => {
  return `
    @mixin prose-display-lg {
      font: normal normal ${fontWeightNormal} clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem) / ${leadingNormal} ${fontPorscheNext};
    }
    @mixin prose-display-md {
      font: normal normal ${fontWeightNormal} clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem) / ${leadingNormal} ${fontPorscheNext};
    }
    @mixin prose-display-sm {
      font: normal normal ${fontWeightNormal} clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem) / ${leadingNormal} ${fontPorscheNext};
    }

    /* alias (deprecated) */
    @mixin pds-display-large {
      @include prose-display-lg();
    }
    /* alias (deprecated) */
    @mixin pds-display-medium {
      @include prose-display-md();
    }
    /* alias (deprecated) */
    @mixin pds-display-small {
      @include prose-display-sm();
    }
  `;
};
