import { blurFrosted } from '@porsche-design-system/tokens';

export const getBlurScss = () => {
  return `
    $blur-frosted: ${blurFrosted};

    /* alias (deprecated) */
    @mixin pds-frosted-glass {
      backdrop-filter: ${blurFrosted};
      -webkit-backdrop-filter: ${blurFrosted};
    }
`;
};
