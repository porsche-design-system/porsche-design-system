import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';

export const getFieldsetWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-fieldset-wrapper': {
        '&:not(.hydrated)': {
          visibility: 'visible',
          display: 'block',
          position: 'relative',
        },
      },
    },
  });
};
