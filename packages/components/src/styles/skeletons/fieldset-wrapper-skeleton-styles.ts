import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';

export const getFieldsetTextListWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-fieldset-wrapper, p-text-list': {
        '&:not(.hydrated)': {
          display: 'block',
          position: 'relative',
          visibility: 'visible',
        },
      },
    },
  });
};
