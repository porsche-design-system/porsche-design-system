import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';

export const getDropShadowScss = () => {
  return `
    @mixin pds-drop-shadow-high {
      box-shadow: ${shadowLg};
    }

    @mixin pds-drop-shadow-low {
      box-shadow: ${shadowSm};
    }

    @mixin pds-drop-shadow-medium {
      box-shadow: ${shadowMd};
    }
`;
};
