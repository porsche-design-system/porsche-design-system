import { gradientFadeDark } from '@porsche-design-system/tokens';

export const getGradientScss = () => {
  return `
    @mixin pds-gradient-to-bottom {
      background: linear-gradient(
        to bottom,
        ${gradientFadeDark}
      );
    }

    @mixin pds-gradient-to-left {
      background: linear-gradient(
        to left,
        ${gradientFadeDark}
      );
    }

    @mixin pds-gradient-to-right {
      background: linear-gradient(
        to right,
        ${gradientFadeDark}
      );
    }

    @mixin pds-gradient-to-top {
      background: linear-gradient(
        to top,
        ${gradientFadeDark}
      );
    }
`;
};
