import { gradientFadeDark } from '@porsche-design-system/tokens';

export const getGradientScss = () => {
  return `
    $gradient-stops-fade-dark: ${gradientFadeDark};

    /* alias (deprecated) */
    @mixin pds-gradient-to-bottom {
      background: linear-gradient(to bottom, $gradient-stops-fade-dark);
    }
    /* alias (deprecated) */
    @mixin pds-gradient-to-left {
      background: linear-gradient(to left, $gradient-stops-fade-dark);
    }
    /* alias (deprecated) */
    @mixin pds-gradient-to-right {
      background: linear-gradient(to right, $gradient-stops-fade-dark);
    }
    /* alias (deprecated) */
    @mixin pds-gradient-to-top {
      background: linear-gradient(to top, $gradient-stops-fade-dark);
    }
`;
};
