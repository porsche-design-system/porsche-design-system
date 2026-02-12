import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';

export const getShadowScss = () => {
  return `
    $shadow-sm: ${shadowSm};
    $shadow-md: ${shadowMd};
    $shadow-lg: ${shadowLg};

    /* alias (deprecated) */
    @mixin pds-drop-shadow-high {
      box-shadow: ${shadowLg};
    }

    /* alias (deprecated) */
    @mixin pds-drop-shadow-low {
      box-shadow: ${shadowSm};
    }

    /* alias (deprecated) */
    @mixin pds-drop-shadow-medium {
      box-shadow: ${shadowMd};
    }
`;
};
