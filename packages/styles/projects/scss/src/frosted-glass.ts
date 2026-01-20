import { blurFrosted } from '@porsche-design-system/tokens';

export const getFrostedGlassScss = () => {
  return `
    @mixin pds-frosted-glass {
      backdrop-filter: ${blurFrosted};
      -webkit-backdrop-filter: ${blurFrosted};
    }
`;
};
