import { shadowLg, shadowMd, shadowSm } from '@porsche-design-system/tokens';

export const getShadowScss = () => {
  return `
    $box-shadow-sm: ${shadowSm};
    $box-shadow-md: ${shadowMd};
    $box-shadow-lg: ${shadowLg};

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
